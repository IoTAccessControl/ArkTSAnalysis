// This file is part of libNMC, which is the foundation of ohos-weather.
// Copyright (C) 2023  Tingjin<dev@peercat.cn>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import geoLocationManager from '@ohos.geoLocationManager';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import { City } from '../Data/City';
import { Logger } from '../Logger';
import { DataUtils } from '../Utils/DataUtils';
import { TaskManager } from './TaskManager';

let TAG = "ApiManager";

export class ApiManager {
  public static getInstance(): ApiManager {
    Logger.log("ApiManager.getInstance CALLED");
    if (globalThis.__ApiManager == undefined) {
      Logger.log("ApiManager.getInstance IS CREATING AN NEW INSTANCE IN globalThis.__ApiManager")
      globalThis.__ApiManager = new ApiManager();
    }
    Logger.log("ApiManager.getInstance is returning an api manager instance: ", globalThis.__ApiManager);
    return globalThis.__ApiManager;
  }

  public async GetAllProvince() {
    const res = await TaskManager.getInstance().getAllProvince();
    return res;
  }

  public async GetPosition(station?: string) {
    const res = await TaskManager.getInstance().getPosition(station);
    return res;
  }

  public async GetWeatherBundle(station: string) {
    const res = await TaskManager.getInstance().getWeatherData(station);
    return res;
  }

  public async GetWeatherOfCurrentPosition() {
    const pos = await TaskManager.getInstance().getPosition();
    const weather = this.GetWeatherBundle(pos.code);
    return weather;
  }

  public async GetStations(province: string) {
    const res = await TaskManager.getInstance().getStations(province);
    return res;
  }

  public async qGetWarning(location: string) {
    const res = await TaskManager.getInstance().qGetWarnings(location);
    return res;
  }

  public async qGetWeatherRealTime(location: string) {
    const res = await TaskManager.getInstance().qGetWeatherRealTime(location);
    return res;
  }

  public async qGetWeatherDaily(location: string) {
    const res = await TaskManager.getInstance().qGetWeatherDaily(location);
    return res;
  }

  public async qLookupCity(location: string) {
    const res = await TaskManager.getInstance().qLookupCity(location);
    return res;
  }

  public async qLookupPoi(location: string) {
    const res = await TaskManager.getInstance().qLookupPoi(location);
    return res;
  }

  public async qSearchGeoLocation(location: string) {
    const cities = await this.qLookupCity(location);
    const points = await this.qLookupPoi(location);
    return cities.concat(points);
  }

  public async qTopCity() {
    const res = await TaskManager.getInstance().qTopCity();
    return res;
  }

  public async qGetWeatherHourly(location: string) {
    const res = await TaskManager.getInstance().qGetWeatherHourly(location);
    return res;
  }

  public async qVerifyApiKey(key: string) {
    const res = await TaskManager.getInstance().qVerifyApiKey(key);
    return res;
  }

  public async getCurrentNetworkLocation(): Promise<City> {
    let currentLocation = DataUtils.emptyCity();
    let nmcResponse = await this.GetPosition();
    currentLocation.name = nmcResponse.city;
    let qLookupResponse = await this.qLookupCity(currentLocation.name);
    if (qLookupResponse.length == 0) {
      return currentLocation;
    } else {
      return qLookupResponse[0];
    }
  }

  public async getCurrentLocation(): Promise<City> {
    let currentLocation = DataUtils.emptyCity();
    let atMan = abilityAccessCtrl.createAtManager();
    let grantStatus = await atMan.requestPermissionsFromUser(globalThis.context, ['ohos.permission.APPROXIMATELY_LOCATION'])
    if (grantStatus.authResults[0] == 0) {
      try {
        let geoLocation = await geoLocationManager.getCurrentLocation();
        currentLocation.lat = geoLocation.latitude.toString();
        currentLocation.lon = geoLocation.longitude.toString();
        let aroundCities = await this.qLookupCity(DataUtils.getCitySearchIdentity(currentLocation));
        if (aroundCities.length == 0) {
          currentLocation = await this.getCurrentNetworkLocation();
        } else {
          currentLocation = aroundCities[0];
        }
      } catch (e) {
        Logger.err(TAG, "error while obtaining geo location", e);
        currentLocation = await this.getCurrentNetworkLocation();
      }
    } else {
      currentLocation = await this.getCurrentNetworkLocation();
    }
    currentLocation.isCurrentLocation = true;
    return currentLocation;
  }
}