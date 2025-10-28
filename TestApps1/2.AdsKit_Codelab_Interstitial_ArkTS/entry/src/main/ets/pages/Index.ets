/*
 * Copyright 2023. Huawei Technologies Co., Ltd. All rights reserved.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

// [Start sampleCode]
import { abilityAccessCtrl, common } from '@kit.AbilityKit';
import { advertising, identifier } from '@kit.AdsKit';
import { AppStorageV2 } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { AdsViewModel } from '../viewmodel/AdsViewModel';
import geolocation from '@ohos.geolocation';
import { BusinessError } from '@ohos.base';
import sim from '@ohos.telephony.sim';
import radio from '@ohos.telephony.radio';
import UserInfo from './UserInfo'


const TAG: string = 'Ads Demo-Index';

@Entry
@ComponentV2
struct Index {
  @Local private buttonsOptions: ButtonOptions[] = [];
  @Local private locationText: string = '';
  @Local private phoneInfoText: string = '';
  private context: common.UIAbilityContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
  private navPathStack: NavPathStack = AppStorageV2.connect(NavPathStack, () => new NavPathStack())!;
  private viewModel: AdsViewModel = new AdsViewModel(this.getUIContext());
  private scroller: Scroller = new Scroller();

  async aboutToAppear() {
    const oaid = await requestOAID(this.context);
    // Interstitial video ad.
    this.buttonsOptions.push({
      text: $r('app.string.request_interstitial_video_ad_btn'),
      adRequestParams: {
        adId: 'testb4znbuh3n2',
        adType: 12,
        oaid: oaid
      }
    });
    // Interstitial image ad.
    this.buttonsOptions.push({
      text: $r('app.string.request_interstitial_image_ad_btn'),
      adRequestParams: {
        adId: 'teste9ih9j0rc3',
        adType: 12,
        oaid: oaid
      }
    });

    // Request permissions
    await this.requestPermissions();
  }

  async requestPermissions() {
    try {
      const atManager = abilityAccessCtrl.createAtManager();
      await atManager.requestPermissionsFromUser(this.context, ['ohos.permission.LOCATION']);
      await atManager.requestPermissionsFromUser(this.context, ['ohos.permission.APPROXIMATELY_LOCATION']);
      await atManager.requestPermissionsFromUser(this.context, ['ohos.permission.GET_TELEPHONY_STATE']);
    } catch (err) {
      hilog.error(0x0000, TAG, `Failed to request permissions: ${JSON.stringify(err)}`);
    }
  }

  build() {
    Navigation(this.navPathStack) {
      Scroll(this.scroller) {
      Column() {
          Text("Ads Functionality")
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20 })

        Repeat<ButtonOptions>(this.buttonsOptions).each((repeatItem: RepeatItem<ButtonOptions>) => {
          Button(repeatItem.item.text)
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              const options: ButtonOptions = repeatItem.item;
              this.viewModel.loadAd(options.adRequestParams);
            })
        })

          Divider().height(2).color('#CCCCCC').width('90%').margin({ top: 20, bottom: 10 })

          Text("Location Services")
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })

          Button($r('app.string.enable_location_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.enableLocationService();
            })

          Button($r('app.string.get_current_location_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getCurrentLocation();
            })

          Button($r('app.string.get_last_location_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getLastLocation();
            })

          Button($r('app.string.listen_location_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.listenToLocationChanges();
            })

          Button($r('app.string.get_cell_info_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getCellInformation();
            })
        Button('UserInfo Pages')
          .fontSize(20)
          .fontWeight(FontWeight.Normal)
          .width('90%')
          .margin({ top: 10, bottom: 10 })
          .onClick(() => {
            try {
              router.pushUrl({
                url: 'pages/UserInfo'
              });
            } catch (e) {
              console.error(`Failed to push page: ${e}`);
            }
          })

          Text(this.locationText)
            .fontSize(16)
            .margin({ top: 10, bottom: 10, left: 20, right: 20 })
            .textAlign(TextAlign.Start)
            .width('90%')

          Divider().height(2).color('#CCCCCC').width('90%').margin({ top: 20, bottom: 10 })

          Text("Phone Information")
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 10 })

          /*
          Button($r('app.string.get_phone_number_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getPhoneNumber();
            })
          */

          /*
          Button($r('app.string.get_sim_account_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getSimAccountInfo();
            })
          */

          /*
          Button($r('app.string.get_active_sim_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getActiveSimInfo();
            })
          */

          /*
          Button($r('app.string.get_sim_telephone_number_btn'))
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
            .width('90%')
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              this.getSimTelephoneNumber();
            })
          */

          Text(this.phoneInfoText)
            .fontSize(16)
            .margin({ top: 10, bottom: 30, left: 20, right: 20 })
            .textAlign(TextAlign.Start)
            .width('90%')
        }
        .justifyContent(FlexAlign.Start)
      .height('100%')
      .width('100%')
        .padding({ top: 20 })
      }
    }
    .title($r('app.string.interstitial_ads_demo_title'))
    .titleMode(NavigationTitleMode.Mini)
    .mode(NavigationMode.Stack)
    .hideBackButton(true)
  }

  // Location Services Methods
  async enableLocationService() {
    try {
      let isEnabled = await geolocation.isLocationEnabled();
      if (isEnabled) {
        this.locationText = 'Location service is already enabled.';
        hilog.info(0x0000, TAG, this.locationText);
        return;
      }

      // Prompt the user to enable location services.
      await geolocation.requestEnableLocation();

      // Re-check the status after the request to confirm.
      isEnabled = await geolocation.isLocationEnabled();

      if (isEnabled) {
        this.locationText = 'Location service enabled successfully.';
        hilog.info(0x0000, TAG, this.locationText);
      } else {
        this.locationText = 'Failed to enable location service. Please enable it in system settings.';
        hilog.warn(0x0000, TAG, this.locationText);
      }
    } catch (error) {
      const err = error as BusinessError;
      this.locationText = `An error occurred while trying to enable location services: ${err.message}`;
      hilog.error(0x0000, TAG, `enableLocationService error: ${err.message}`);
    }
  }

  async getCurrentLocation() {
    try {
      const enabled = await geolocation.isLocationEnabled();
      if (!enabled) {
        this.locationText = 'Location service is not enabled. Please enable it first.';
        await geolocation.requestEnableLocation();
      }
      const request: geolocation.CurrentLocationRequest = {
        priority: geolocation.LocationRequestPriority.ACCURACY,
        timeoutMs: 10000,
      };
      const location = await geolocation.getCurrentLocation(request);
      this.locationText = `Current Location:\nLatitude: ${location.latitude}\nLongitude: ${location.longitude}`;
      hilog.info(0x0000, TAG, `Location acquired: ${JSON.stringify(location)}`);
    } catch (error) {
      const err = error as BusinessError;
      this.locationText = `Failed to get current location: ${err.message}`;
      hilog.error(0x0000, TAG, `getCurrentLocation failed: ${this.locationText}`);
    }
  }

  async getLastLocation() {
    try {
      const enabled = await geolocation.isLocationEnabled();
      if (!enabled) {
        this.locationText = 'Location service is not enabled. Please enable it first.';
        await geolocation.requestEnableLocation();
      }
      const location = await geolocation.getLastLocation();
      this.locationText = `Last Location:\nLatitude: ${location.latitude}\nLongitude: ${location.longitude}`;
      hilog.info(0x0000, TAG, `Last location acquired: ${JSON.stringify(location)}`);
    } catch (error) {
      const err = error as BusinessError;
      this.locationText = `Failed to get last location: ${err.message}`;
      hilog.error(0x0000, TAG, `getLastLocation failed: ${this.locationText}`);
    }
  }

  async listenToLocationChanges() {
    try {
      const enabled = await geolocation.isLocationEnabled();
      if (!enabled) {
        this.locationText = 'Location service is not enabled. Please enable it first.';
        await geolocation.requestEnableLocation();
      }
      const request: geolocation.LocationRequest = {
        priority: geolocation.LocationRequestPriority.ACCURACY,
        scenario: geolocation.LocationRequestScenario.UNSET,
        timeInterval: 5,
        distanceInterval: 1,
        maxAccuracy: 10,
      };
      geolocation.on('locationChange', request, (location) => {
        this.locationText = `Location Update:\nLatitude: ${location.latitude}\nLongitude: ${location.longitude}`;
        hilog.info(0x0000, TAG, `Location changed: ${JSON.stringify(location)}`);
      });
      this.locationText = 'Started listening to location changes.';
    } catch (error) {
      const err = error as BusinessError;
      this.locationText = `Error listening to location changes: ${err.message}`;
      hilog.error(0x0000, TAG, this.locationText);
    }
  }

  getCellInformation() {
    this.locationText = 'getCellInformation not supported in API 12';
    hilog.warn(0x0000, TAG, 'getCellInformation not supported in API 12');
  }

  // Phone Information Methods
  getPhoneNumber() {
    this.phoneInfoText = 'getShowNumber not supported in API 12';
    hilog.warn(0x0000, TAG, 'getShowNumber not supported in API 12');
  }

  getSimAccountInfo() {
    sim.getSimAccountInfo(0, (err, info) => {
      if (err) {
        this.phoneInfoText = `Failed to get SIM account info: ${err.message}`;
        hilog.error(0x0000, TAG, this.phoneInfoText);
        return;
      }
      this.phoneInfoText = `SIM Account Info:
ISO Country Code: ${info.iccId}`;
      hilog.info(0x0000, TAG, `Got SIM account info: ${JSON.stringify(info)}`);
    });
  }

  getActiveSimInfo() {
    sim.getActiveSimAccountInfoList((err, infoList) => {
      if (err) {
        this.phoneInfoText = `Failed to get active SIM info: ${err.message}`;
        hilog.error(0x0000, TAG, this.phoneInfoText);
        return;
      }
      this.phoneInfoText = `Active SIM Info: Found ${infoList.length} active SIMs`;
      if (infoList.length > 0) {
        this.phoneInfoText += `\nFirst SIM: ISO Country Code: ${infoList[0].iccId}`;
      }
      hilog.info(0x0000, TAG, `Got active SIM info: ${JSON.stringify(infoList)}`);
    });
  }

  getSimTelephoneNumber() {
    this.phoneInfoText = 'getSimTelephoneNumber not supported in API 12';
    hilog.warn(0x0000, TAG, 'getSimTelephoneNumber not supported in API 12');
  }
}

interface ButtonOptions {
  text: ResourceStr;
  adRequestParams: advertising.AdRequestParams;
}

async function requestOAID(context: Context): Promise<string | undefined> {
  try {
    const atManager = abilityAccessCtrl.createAtManager();
      await atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']);
    hilog.info(0x0000, TAG, 'Succeeded in requesting permission for OAID');
      const oaid = await identifier.getOAID();
      hilog.info(0x0000, TAG, 'Succeeded in getting OAID');
      return oaid;
    } catch (err) {
      hilog.error(0x0000, TAG, `Failed to get OAID. Code is ${err.code}, message is ${err.message}`);
    return undefined;
  }
}
// [End sampleCode]