// This file is part of ohos-weather.
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
import {
  ApiManager,
  City,
  DataUtils,
  ImmersiveUtils,
  LazyList,
  Logger,
  PreferenceManager,
  RdbManager,
  Warning,
  WeatherDaily,
  WeatherHourly,
  WeatherRealTime
} from '@ohos/nmc';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { StyleConstant } from '../constants/StyleConstant';
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { curves } from '@kit.ArkUI';

let TAG = "INDEX";

AppStorage.SetOrCreate('storedRealTimeWeather', Array<WeatherRealTime>());
AppStorage.SetOrCreate('storedCities', Array<City>());
AppStorage.SetOrCreate('storedDailyWeather', Array<Array<WeatherDaily>>());
AppStorage.SetOrCreate('storedWarnings', Array<LazyList<Warning>>());
AppStorage.SetOrCreate('storedHourlyWeather', Array<WeatherHourly>());

@Entry
@Component
struct Index {
  @StorageLink('storedCities') cities: City[] = [];
  @StorageLink('storedWarnings') warnings: LazyList<Warning>[] = [];
  @StorageLink('storedDailyWeather') dailyWeather: WeatherDaily[][] = [];
  @StorageLink('storedHourlyWeather') hourlyWeather: WeatherHourly[][] = [];
  @StorageLink('storedRealTimeWeather') realTimeWeather: WeatherRealTime[] = [];
  @State activeSwiperIndex: number = 0;
  @State lastRefreshTime: string = "";
  @State pageOpacity: number = 1;
  @State isRefreshing: boolean = false;
  private jumpToEditOnLoadingFinished: boolean = false;
  private swiperController: SwiperController = new SwiperController();

  getWeather(force?: boolean) {
    this.isRefreshing = true;
    promptAction.showToast({ message: $r('app.string.loading') })
    PreferenceManager.getInstance().getLastRequestTime()
      .then(lastRefreshTime => {
        this.lastRefreshTime = new Date(lastRefreshTime).toTimeString();
        RdbManager.getInstance()
          .getAllStoredCities()
          .then(cities => {
            this.cities = cities;
            Logger.info(TAG, "cities got", cities.length);
            return ApiManager.getInstance().getCurrentLocation()
          })
          .then(location => {
            let tempArr = [location];
            this.cities = tempArr.concat(this.cities);
            return PreferenceManager.getInstance().getCacheValidTime();
          })
          .then(cacheValidTime => {
            Logger.log(TAG, "Cache valid time is:", cacheValidTime);
            Logger.log(TAG, "Using cache:",!(new Date().getTime() - lastRefreshTime > cacheValidTime || force));
            // 递归数据刷新函数
            const loopRefresher = (index: number, useCache?: boolean) => {
              if (index == this.cities.length) {
                this.isRefreshing = false;
                if (this.jumpToEditOnLoadingFinished) router.pushUrl({ url: 'pages/EditPage' });
                if (!useCache) promptAction.showToast({ message: "刷新成功" });
                return;
              }
              Logger.log(TAG, "loop refresher:", `${index + 1}/${this.cities.length}`);
              let city = this.cities[index];
              ApiManager.getInstance().qLookupCity(DataUtils.getCitySearchIdentity(city))
                .then(info => {
                  // 矫正缓存的城市信息
                  this.cities[index].name = info[0].name;
                  this.cities[index].adm1 = info[0].adm1;
                  this.cities[index].adm2 = info[0].adm2;
                  if (!useCache) {
                    // 各城市气象警告
                    ApiManager.getInstance()
                      .qGetWarning(DataUtils.getCitySearchIdentity(city))
                      .then(warnings => {
                        if (this.warnings[index]) {
                          this.warnings[index] = new LazyList(warnings);
                        } else {
                          this.warnings.push(new LazyList(warnings));
                        }
                        return RdbManager.getInstance()
                          .setCache(DataUtils.getCitySearchIdentity(city), 'warnings', warnings)
                          .then((): Promise<WeatherDaily[]> => {
                            // 各城市每日预报
                            return ApiManager.getInstance().qGetWeatherDaily(DataUtils.getCitySearchIdentity(city));
                          });
                      })
                      .then(dailyWeather => {
                        if (this.dailyWeather[index]) {
                          this.dailyWeather[index] = dailyWeather;
                        } else {
                          this.dailyWeather.push(dailyWeather);
                        }
                        return RdbManager.getInstance()
                          .setCache(DataUtils.getCitySearchIdentity(city), 'daily', dailyWeather)
                          .then((): Promise<WeatherHourly[]> => {
                            // 获取每小时预报
                            return ApiManager.getInstance().qGetWeatherHourly(DataUtils.getCitySearchIdentity(city));
                          });
                      })
                      .then(hourlyWeather => {
                        if (this.hourlyWeather[index]) {
                          this.hourlyWeather[index] = hourlyWeather;
                        } else {
                          this.hourlyWeather.push(hourlyWeather);
                        }
                        return RdbManager.getInstance()
                          .setCache(DataUtils.getCitySearchIdentity(city), 'hourly', hourlyWeather)
                          .then((): Promise<WeatherRealTime> => {
                            // 获取实时天气
                            return ApiManager.getInstance().qGetWeatherRealTime(DataUtils.getCitySearchIdentity(city));
                          });
                      })
                      .then(realTimeWeather => {
                        if (this.realTimeWeather[index]) {
                          this.realTimeWeather[index] = realTimeWeather;
                        } else {
                          this.realTimeWeather.push(realTimeWeather);
                        }
                        RdbManager.getInstance()
                          .setCache(DataUtils.getCitySearchIdentity(city), 'realtime', realTimeWeather)
                          .then(() => {
                            index++;
                            this.lastRefreshTime = new Date().toTimeString();
                            PreferenceManager.getInstance().setLastRequestTime(new Date().getTime());
                            loopRefresher(index);
                          });
                      });
                  } else {
                    RdbManager.getInstance()
                      .getCache(DataUtils.getCitySearchIdentity(city))
                      .then(cache => {
                        Logger.log(TAG, "read warning cache", cache.warnings);
                        this.warnings.push(new LazyList(cache.warnings));
                        Logger.log(TAG, "read daily cache", cache.daily);
                        this.dailyWeather.push(cache.daily);
                        Logger.log(TAG, "read hourly cache", cache.hourly);
                        this.hourlyWeather.push(cache.hourly);
                        Logger.log(TAG, "read realtime cache", cache.realtime);
                        this.realTimeWeather.push(cache.realtime);
                        index++;
                        loopRefresher(index, useCache);
                      })
                  }
                })
            }
            // 如果上次刷新时间离现在过短，且不是强制刷新，则从rdb读取缓存气象信息
            if (!(new Date().getTime() - lastRefreshTime > cacheValidTime || force)) {
              loopRefresher(0, true);
            } else {
              loopRefresher(0);
            }
          });
      });
  }

  onPageShow() {
    ImmersiveUtils.immersive(globalThis.windowStage, StyleConstant.IMMERSIVE_CONFIG.INDEX);
    // let routerParams = router.getParams();
    // // 如果路由指定了参数，则翻页到指定位置
    // if (routerParams && routerParams['weatherIndex']) {
    //   return;
    //   // 以下代码无法实现翻动到指定页面，错误为不生效
    //   // 该错误可能会在后续的API版本中被修复，故保留在此处
    //   // let index = routerParams['weatherIndex'];
    //   // const swipeTo = (index: number) => {
    //   //   if (this.activeSwiperIndex == index) return;
    //   //   if (this.activeSwiperIndex < index) {
    //   //     this.swiperController.showNext();
    //   //   } else {
    //   //     this.swiperController.showPrevious();
    //   //   }
    //   //   swipeTo(index);
    //   // }
    //   // swipeTo(index);
    // }
  }

  aboutToAppear() {
    this.jumpToEditOnLoadingFinished = false;
    PreferenceManager.getInstance().getApiKey()
      .then((key): Promise<boolean> => {
        return ApiManager.getInstance().qVerifyApiKey(key);
      })
      .then(valid => {
        if (!valid) {
          router.replaceUrl({ url: "pages/ApiKeySettingPage" });
        } else {
          this.getWeather();
        }
      });
  }

  build() {
    Stack() {
      Swiper(this.swiperController) {
        // 为确保数据完整性，此处的迭代数组必须是最后一项获取的信息，若getWeather改动，必须检查此处是否为最后一项
        ForEach(this.realTimeWeather, (realtimeWeather: WeatherRealTime, index: number) => {
          WeatherDisplay({
            city: this.cities[index],
            warnings: this.warnings[index],
            dailyWeather: this.dailyWeather[index],
            realTimeWeather: realtimeWeather,
            hourlyWeather: this.hourlyWeather[index]
          })
        })
      }
      .gesture(
        TapGesture({ count: 2 })
          .onAction(() => {
            if (!this.isRefreshing) this.getWeather(true);
          })
      )
      .curve(curves.springMotion(0.3,0.9))
      .onChange(i => {
        this.activeSwiperIndex = i;
      })
      .indicatorStyle({
        selectedColor: StyleConstant.DEFAULT_FONT_COLOR
      })
      .loop(false)

      Column({ space: 13 }) {
        Row() {
          Image($r('app.media.ic_bar_map_all'))
            .width(24)
            .height(24)
            .onClick(() => {
              router.pushUrl({ url: 'pages/WeatherMapPage' })
            })
          Column() {
            Row() {
              ForEach(this.cities, (city: City, index: number) => {
                if (city.isCurrentLocation) {
                  Image($r('app.media.ic_swiper_indicator_current_position'))
                    .size({ width: 17, height: 17 })
                    .fillColor(0 == this.activeSwiperIndex ? Color.White : StyleConstant.INACTIVE_BOTTOM_INDICATOR_COLOR)
                } else {
                  Image($r('app.media.ic_swiper_indicator_city'))
                    .size({ width: 17, height: 17 })
                    .fillColor(index == this.activeSwiperIndex ? Color.White : StyleConstant.INACTIVE_BOTTOM_INDICATOR_COLOR)
                }
              })
            }
          }

          Image($r('app.media.ic_bar_more'))
            .width(24)
            .height(24)
            .onClick(() => {
              if (this.realTimeWeather.length < this.cities.length) {
                promptAction.showToast({ message: $r('app.string.loading') });
                this.jumpToEditOnLoadingFinished = true;
                return;
              }
              router.pushUrl({ url: 'pages/EditPage' })
            })
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .padding(StyleConstant.BOTTOM_BAR_ROW_PADDING)
        .width('100%')

        Text() {
          Span($r('app.string.update_time'))
          Span(this.lastRefreshTime)
        }
        .fontColor(StyleConstant.DEFAULT_FONT_COLOR)
        .fontSize(StyleConstant.WIDGET_FONT_SIZE)
      }
      .width('100%')
      .height(StyleConstant.BOTTOM_BAR_HEIGHT)
      .linearGradient({
        angle: 180,
        colors: [
          ["#ff4c85c4", 0],
          ["#ff5d99d6", 1]
        ]
      })
      .border(StyleConstant.BOTTOM_BAR_BORDER)
    }
    .alignContent(Alignment.Bottom)
    .height('100%')
    .linearGradient({
      angle: 180,
      colors: [
        ["#286098", 0],
        ["#6AA2DB", 1]
      ]
    })
    .opacity(this.pageOpacity)
    .padding(StyleConstant.INDEX_PADDING)
  }
}