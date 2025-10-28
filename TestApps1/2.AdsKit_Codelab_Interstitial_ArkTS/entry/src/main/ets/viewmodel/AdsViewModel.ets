/*
 * Copyright 2025. Huawei Technologies Co., Ltd. All rights reserved.

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
import { common } from '@kit.AbilityKit';
import { advertising } from '@kit.AdsKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { InterstitialAdStatusHandler } from '../event/InterstitialAdStatusHandler';

const TAG: string = 'Ads Demo-AdsViewModel';

export class AdsViewModel {
  // Ad configuration.
  adOptions: advertising.AdOptions = {
    // Whether you want your ad content to be treated as child-directed according to the regulations of COPPA.
    tagForChildProtection: -1,
    // Maximum ad content rating.
    adContentClassification: 'A',
    // Whether to request non-personalized ads.
    nonPersonalizedAd: 0,
    // Whether to allow ad asset download through mobile data.
    allowMobileTraffic: 0,
    // Whether you want the ad request to be processed in a way that is suitable for users in the European Economic Area (EEA) who are below the legal age of consent.
    tagForUnderAgeOfPromise: -1
  };

  // Ad display parameters.
  adDisplayOptions: advertising.AdDisplayOptions = {
    // Whether to mute the ad.
    mute: true
  };

  private context: common.UIAbilityContext;

  constructor(uiContext: UIContext) {
    this.context = uiContext.getHostContext() as common.UIAbilityContext;
  }

  async loadAd(adRequestParams: advertising.AdRequestParams): Promise<void> {
    // Ad request callback listener.
    const adLoadListener: advertising.AdLoadListener = {
      onAdLoadFailure: (errorCode: number, errorMsg: string) => {
        hilog.error(0x0000, TAG, `Failed to load ad. Code is ${errorCode}, message is ${errorMsg}`);
      },
      onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
        hilog.info(0x0000, TAG, 'Succeeded in loading ad');
        if (ads[0]?.adType === 12) {
          // Register a status listener for rewarded ads to monitor their playback status.
          new InterstitialAdStatusHandler().registerPPSReceiver();
          // Call the API for displaying ads.
          advertising.showAd(ads[0], this.adDisplayOptions, this.context);
          return;
        }
      }
    };
    // Create an AdLoader ad object.
    const adLoader: advertising.AdLoader = new advertising.AdLoader(this.context);
    // Call the API for requesting ads.
    adLoader.loadAd(adRequestParams, this.adOptions, adLoadListener);
  }
}
// [End sampleCode]