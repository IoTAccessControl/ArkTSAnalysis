import type { BusinessError as BusinessError } from "@ohos:base";
import commonEventManager from "@ohos:commonEventManager";
import hilog from "@ohos:hilog";
const TAG: string = 'Ads Demo-InterstitialAdStatusHandler';
const KEY_INTERSTITIAL_STATUS: string = 'interstitial_ad_status';
export class InterstitialAdStatusHandler {
    // Used to save the created subscriber object for subsequent subscription and unsubscription.
    private subscriber: commonEventManager.CommonEventSubscriber | null = null;
    registerPPSReceiver(): void {
        if (this.subscriber) {
            this.unRegisterPPSReceiver();
        }
        const subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
            events: ['com.huawei.hms.pps.action.PPS_INTERSTITIAL_STATUS_CHANGED'],
            publisherBundleName: 'com.huawei.hms.adsservice'
        };
        commonEventManager.createSubscriber(subscribeInfo, (err: BusinessError, commonEventSubscriber: commonEventManager.CommonEventSubscriber) => {
            if (err) {
                hilog.error(0x0000, TAG, `Failed to create subscriber. Code is ${err.code}, message is ${err.message}`);
                return;
            }
            hilog.info(0x0000, TAG, 'Succeeded in creating subscriber');
            this.subscriber = commonEventSubscriber;
            if (!this.subscriber) {
                hilog.warn(0x0000, TAG, 'Need to create subscriber');
                return;
            }
            commonEventManager.subscribe(this.subscriber, (err: BusinessError, commonEventData: commonEventManager.CommonEventData) => {
                if (err) {
                    hilog.error(0x0000, TAG, `Failed to subscribe. Code is ${err.code}, message is ${err.message}`);
                }
                else {
                    hilog.info(0x0000, TAG, 'Succeeded in subscribing data');
                    const status: string = commonEventData?.parameters?.[KEY_INTERSTITIAL_STATUS];
                    switch (status) {
                        case 'onAdOpen':
                            hilog.info(0x0000, TAG, 'Status is onAdOpen');
                            break;
                        case 'onAdClick':
                            hilog.info(0x0000, TAG, 'Status is onAdClick');
                            break;
                        case 'onAdClose':
                            hilog.info(0x0000, TAG, 'Status is onAdClose');
                            this.unRegisterPPSReceiver();
                            break;
                        case 'onVideoPlayBegin':
                            hilog.info(0x0000, TAG, 'Status is onVideoPlayBegin');
                            break;
                        case 'onVideoPlayEnd':
                            hilog.info(0x0000, TAG, 'Status is onVideoPlayEnd');
                            break;
                    }
                }
            });
        });
    }
    unRegisterPPSReceiver(): void {
        commonEventManager.unsubscribe(this.subscriber, (err: BusinessError) => {
            if (err) {
                hilog.error(0x0000, TAG, `Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
            }
            else {
                hilog.info(0x0000, TAG, 'Succeeded in unsubscribing');
                this.subscriber = null;
            }
        });
    }
}
