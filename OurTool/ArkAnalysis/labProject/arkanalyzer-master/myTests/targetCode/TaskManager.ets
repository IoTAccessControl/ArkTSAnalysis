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
import { Province, Station, WeatherBundle } from './ApiResponse';
import taskpool from '@ohos.taskpool';
import {
  ApiGetAllProvince,
  ApiGetPosition,
  ApiGetStations,
  ApiGetWeatherData,
  Q_ApiGetWarnings,
  Q_ApiGetWeather_Daily,
  Q_ApiGetWeather_Hourly,
  Q_ApiGetWeather_RealTime,
  Q_ApiLookupCity,
  Q_ApiLookupPoi,
  Q_ApiTopCity,
  Q_VerifyApiKey
} from './ApiBundle';
import { Logger } from '../Logger';
import { Warning } from '../Data/Warning';
import { PreferenceManager } from '../manager/PreferenceManager';
import { WeatherRealTime } from '../Data/WeatherRealTime';
import { WeatherDaily } from '../Data/WeatherDaily';
import { City } from '../Data/City';
import { WeatherHourly } from '../Data/WeatherHourly';

let TAG = "TASK_MANAGER";

export class TaskManager {
  public static getInstance(): TaskManager {
    if (globalThis.__TaskManager == undefined) globalThis.__TaskManager = new TaskManager();
    return globalThis.__TaskManager;
  }

  public async getAllProvince(): Promise<Province[]> {
    Logger.log(TAG, "is building getAllProvince task");
    const task = new taskpool.Task(ApiGetAllProvince);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as Province[];
    Logger.log(TAG, "getAllProvinceResponse[0] is:", res[0]);
    return res;
  }

  public async getWeatherData(station: string): Promise<WeatherBundle> {
    Logger.log(TAG, "is building getWeatherData task");
    const task = new taskpool.Task(ApiGetWeatherData, station);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as WeatherBundle;
    Logger.log(TAG, "getWeatherData result:", res.msg);
    return res;
  }

  public async getPosition(station?: string): Promise<Station> {
    Logger.log(TAG, "is building getPosition task");
    const task = new taskpool.Task(ApiGetPosition, station??'');
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as Station;
    Logger.log(TAG, "getWeatherData result:", res);
    return res;
  }

  public async getStations(province: string): Promise<Station[]> {
    Logger.log(TAG, "is building getStations task");
    const task = new taskpool.Task(ApiGetStations, province);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as Station[];
    Logger.log(TAG, "getStations length:", res.length);
    return res;
  }

  public async qGetWarnings(location: string): Promise<Warning[]> {
    Logger.log(TAG, "is building qGetWarnings task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const task = new taskpool.Task(Q_ApiGetWarnings, location, key, lang);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as Warning[];
    Logger.log(TAG, "getWarning length:", res.length);
    return res;
  }

  public async qGetWeatherRealTime(location: string): Promise<WeatherRealTime> {
    Logger.log(TAG, "is building qGetWeatherRealTime task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const unit = await PreferenceManager.getInstance().getUnit();
    const task = new taskpool.Task(Q_ApiGetWeather_RealTime, location, key, lang, unit);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as WeatherRealTime;
    Logger.log(TAG, "getWeather:", res);
    return res;
  }

  public async qGetWeatherDaily(location: string): Promise<WeatherDaily[]> {
    Logger.log(TAG, "is building qGetWeatherDaily task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const unit = await PreferenceManager.getInstance().getUnit();
    const dayNum = await PreferenceManager.getInstance().getDailyRequestDayNum();
    const task = new taskpool.Task(Q_ApiGetWeather_Daily, location, key, lang, unit, dayNum);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as WeatherDaily[];
    Logger.log(TAG, "getWeather length:", res.length);
    return res;
  }

  public async qLookupCity(location: string): Promise<City[]> {
    Logger.log(TAG, "is building qLookupCity task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const task = new taskpool.Task(Q_ApiLookupCity, location, key, lang);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as City[];
    Logger.log(TAG, "getCity length:", res.length);
    return res;
  }

  public async qLookupPoi(location: string): Promise<City[]> {
    Logger.log(TAG, "is building qLookupPoi task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const type = await PreferenceManager.getInstance().getPoiType();
    const task = new taskpool.Task(Q_ApiLookupPoi, location, type, key, lang);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as City[];
    Logger.log(TAG, "getPoi length:", res.length);
    return res;
  }

  public async qTopCity(): Promise<City[]> {
    Logger.log(TAG, "is building qLookupCity task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const task = new taskpool.Task(Q_ApiTopCity, key, lang);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as City[];
    Logger.log(TAG, "getCity length:", res.length);
    return res;
  }

  public async qGetWeatherHourly(location: string): Promise<WeatherHourly[]> {
    Logger.log(TAG, "is building qGetWeatherHourly task");
    const key = await PreferenceManager.getInstance().getApiKey();
    const lang = await PreferenceManager.getInstance().getLanguage();
    const unit = await PreferenceManager.getInstance().getUnit();
    const hourNum = await PreferenceManager.getInstance().getHourlyRequestHourNum();
    const task = new taskpool.Task(Q_ApiGetWeather_Hourly, location, key, lang, unit, hourNum);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as WeatherHourly[];
    Logger.log(TAG, "getWeather length:", res.length);
    return res;
  }

  public async qVerifyApiKey(key: string): Promise<boolean> {
    Logger.log(TAG, "is building qVerifyApiKey task");
    const task = new taskpool.Task(Q_VerifyApiKey, key);
    Logger.log(TAG, "task built")
    let res = await taskpool.execute(task) as boolean;
    Logger.log(TAG, "getResult length:", res);
    return res;
  }
}