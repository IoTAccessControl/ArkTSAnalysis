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
import http from '@ohos.net.http';
import { Province, Station, WeatherBundle } from './ApiResponse';
import { ApiEndpoint } from './ApiEndpoint';
import { Warning } from '../Data/Warning';
import { WeatherRealTime } from '../Data/WeatherRealTime';
import promptAction from '@ohos.promptAction';
import { WeatherDaily } from '../Data/WeatherDaily';
import { City } from '../Data/City';
import { Logger } from '../Logger';
import { WeatherHourly } from '../Data/WeatherHourly';
import { DataUtils } from '../Utils/DataUtils';
import { PoiType } from '../Data/Types';

export async function ApiGetAllProvince(): Promise<Province[]> {
  "use concurrent"
  return await new Promise<Province[]>((success, error) => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.REST_PROVINCE_ALL(),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          error(err);
        } else if (data.responseCode != http.ResponseCode.OK) {
          error(data);
        } else {
          let jObj: Province[] = JSON.parse(data.result.toString());
          success(jObj);
        }
      }
    )
  })
}

export async function ApiGetWeatherData(station: string): Promise<WeatherBundle> {
  "use concurrent"
  let TAG = "ApiGetWeatherData";
  return await new Promise<WeatherBundle>((success, error) => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.REST_WEATHER(station),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          error(err);
        } else if (data.responseCode != http.ResponseCode.OK) {
          error(data);
        } else {
          let jObj: WeatherBundle = JSON.parse(data.result.toString());
          success(jObj);
        }
        req.destroy();
      }
    )
  })
}

export async function ApiGetPosition(stationCode?: string): Promise<Station> {
  "use concurrent"
  let TAG = "ApiGetPosition"
  return await new Promise<Station>((success, error) => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.REST_POSITION(stationCode),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          error(err);
        } else if (data.responseCode != http.ResponseCode.OK) {
          error(data);
        } else {
          let jObj: Station = JSON.parse(data.result.toString());
          success(jObj);
        }
        req.destroy();
      }
    )
  })
}

export async function ApiGetStations(province: string): Promise<Station[]> {
  "use concurrent"
  let TAG = "ApiGetStations";
  return await new Promise<Station[]>((success, error) => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.REST_PROVINCE_P(province),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          error(err);
        } else if (data.responseCode != http.ResponseCode.OK) {
          error(data);
        } else {
          let jObj: Station[] = JSON.parse(data.result.toString());
          success(jObj);
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiGetWarnings(location: string, key: string, lang: string = 'zh'): Promise<Warning[]> {
  "use concurrent"
  let TAG = "Q_ApiGetWarnings";
  return await new Promise<Warning[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_WARNING(location, key, lang),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          ret([]);
        } else {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            ret([])
          } else {
            let result: Warning[] = JSON.parse(data.result.toString())['warning'];
            ret(result);
          }
        }
        req.destroy();
      }
    )
  });
}

export async function Q_ApiGetWeather_RealTime(location: string, key: string, lang: string, unit: 'i' | 'm'): Promise<WeatherRealTime> {
  "use concurrent"
  return await new Promise<WeatherRealTime>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_WEATHER_REALTIME_CITY(location, key, lang, unit),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
        } else if (data.responseCode != http.ResponseCode.OK) {
          promptAction.showToast({ message: '网络请求错误' });
        } else {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            ret(DataUtils.emptyWeatherRealTime())
          } else {
            ret(JSON.parse(data.result.toString())['now']);
          }
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiGetWeather_Daily(location: string, key: string, lang: string, unit: 'i' | 'm', dayNum: 3 | 7 | 10 | 15 | 30): Promise<WeatherDaily[]> {
  "use concurrent"
  return await new Promise<WeatherDaily[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_WEATHER_DAILY_CITY(location, key, lang, unit, dayNum),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
        } else if (data.responseCode != http.ResponseCode.OK) {
          promptAction.showToast({ message: '网络请求错误' });
        } else {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            ret([]);
          } else {
            ret(JSON.parse(data.result.toString())['daily']);
          }
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiLookupPoi(location: string, type: PoiType, key: string, lang: string): Promise<City[]> {
  "use concurrent"
  return await new Promise<City[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_POI_LOOKUP(location, type, key, lang),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        Logger.info("City look up", data.result.toString())
        try {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            Logger.err("Q_ApiLookupCity", "err code:", JSON.parse(data.result.toString())['code'])
            ret([]);
          } else {
            ret(JSON.parse(data.result.toString())['poi']);
          }
        } catch (e) {
          Logger.err("city look up", e)
          ret([])
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiLookupCity(location: string, key: string, lang: string): Promise<City[]> {
  "use concurrent"
  return await new Promise<City[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_CITY_LOOKUP(location, key, lang),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        Logger.info("City look up", data.result.toString())
        try {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            Logger.err("Q_ApiLookupCity", "err code:", JSON.parse(data.result.toString())['code'])
            ret([]);
          } else {
            ret(JSON.parse(data.result.toString())['location']);
          }
        } catch (e) {
          Logger.err("city look up", e)
          ret([])
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiTopCity(key: string, lang: string): Promise<City[]> {
  "use concurrent"
  return await new Promise<City[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_CITY_TOP(key, lang),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        try {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            Logger.err("Q_ApiTopCity", "err code:", JSON.parse(data.result.toString())['code'])
            ret([]);
          } else {
            ret(JSON.parse(data.result.toString())['topCityList']);
          }
        } catch (e) {
          Logger.err("city look up", e)
          ret([])
        }
        req.destroy();
      }
    )
  })
}

export async function Q_ApiGetWeather_Hourly(location: string, key: string, lang: string, unit: 'i' | 'm', hourNum: 24 | 72 | 168): Promise<WeatherHourly[]> {
  "use concurrent"
  return await new Promise<WeatherHourly[]>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.Q_WEATHER_HOURLY(location, key, lang, unit, hourNum),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        try {
          if (JSON.parse(data.result.toString())['code'] != "200") {
            ret([])
          } else {
            ret(JSON.parse(data.result.toString())['hourly']);
          }
        } catch (e) {
          Logger.err("GetHourly", e)
          ret([])
        }
        req.destroy();
      }
    )
  })
}

export async function Q_VerifyApiKey(key: string): Promise<boolean> {
  "use concurrent"
  return await new Promise<boolean>(ret => {
    const req = http.createHttp();
    req.request(
      ApiEndpoint.ApiKeyVerify(key),
      {
        method: http.RequestMethod.GET
      },
      (err, data) => {
        if (err) {
          Logger.err("API KEY VERIFY ERROR:", err);
          ret(false);
        } else {
          try {
            let result: boolean = JSON.parse(data.result.toString())['code'] == "200";
            Logger.info("API VERIFY", "result is", result);
            ret(result);
          } catch (e) {
            Logger.err("GetHourly", e)
            ret(false)
          }
          req.destroy();
        }
      }
    )
  })
}