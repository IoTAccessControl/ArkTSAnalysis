if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import type advertising from "@ohos:advertising";
import identifier from "@ohos:identifier.oaid";
import { AppStorageV2 as AppStorageV2 } from "@ohos:arkui.StateManagement";
import hilog from "@ohos:hilog";
import { AdsViewModel } from "@bundle:com.huawei.ads.interstitial/entry/ets/viewmodel/AdsViewModel";
import geolocation from "@ohos:geolocation";
import type { BusinessError } from "@ohos:base";
import sim from "@ohos:telephony.sim";
const TAG: string = 'Ads Demo-Index';
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.buttonsOptions = [];
        this.locationText = '';
        this.phoneInfoText = '';
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.navPathStack = AppStorageV2.connect(NavPathStack, () => new NavPathStack())!;
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.scroller = new Scroller();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.buttonsOptions = [];
        this.locationText = '';
        this.phoneInfoText = '';
    }
    @Local
    private buttonsOptions: ButtonOptions[];
    @Local
    private locationText: string;
    @Local
    private phoneInfoText: string;
    private context: common.UIAbilityContext;
    private navPathStack: NavPathStack;
    private viewModel: AdsViewModel;
    private scroller: Scroller;
    async aboutToAppear() {
        const oaid = await requestOAID(this.context);
        // Interstitial video ad.
        this.buttonsOptions.push({
            text: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testb4znbuh3n2',
                adType: 12,
                oaid: oaid
            }
        });
        // Interstitial image ad.
        this.buttonsOptions.push({
            text: { "id": 16777234, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" },
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
        }
        catch (err) {
            hilog.error(0x0000, TAG, `Failed to request permissions: ${JSON.stringify(err)}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.navPathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.title({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.mode(NavigationMode.Stack);
            Navigation.hideBackButton(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.height('100%');
            Column.width('100%');
            Column.padding({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Ads Functionality");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<ButtonOptions>(this.buttonsOptions, this).each((repeatItem: RepeatItem<ButtonOptions>) => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(repeatItem.item.text);
                    Button.fontSize(20);
                    Button.fontWeight(FontWeight.Normal);
                    Button.width('90%');
                    Button.margin({ top: 10, bottom: 10 });
                    Button.onClick(() => {
                        const options: ButtonOptions = repeatItem.item;
                        this.viewModel.loadAd(options.adRequestParams);
                    });
                }, Button);
                Button.pop();
            }).render(isInitialRender);
        }, Repeat);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.height(2);
            Divider.color('#CCCCCC');
            Divider.width('90%');
            Divider.margin({ top: 20, bottom: 10 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Location Services");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Normal);
            Button.width('90%');
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                this.enableLocationService();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Normal);
            Button.width('90%');
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                this.getCurrentLocation();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Normal);
            Button.width('90%');
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                this.getLastLocation();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Normal);
            Button.width('90%');
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                this.listenToLocationChanges();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.huawei.ads.interstitial", "moduleName": "entry" });
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Normal);
            Button.width('90%');
            Button.margin({ top: 10, bottom: 10 });
            Button.onClick(() => {
                this.getCellInformation();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.locationText);
            Text.fontSize(16);
            Text.margin({ top: 10, bottom: 10, left: 20, right: 20 });
            Text.textAlign(TextAlign.Start);
            Text.width('90%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.height(2);
            Divider.color('#CCCCCC');
            Divider.width('90%');
            Divider.margin({ top: 20, bottom: 10 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Phone Information");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
            Text.create(this.phoneInfoText);
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
            Text.fontSize(16);
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
            Text.margin({ top: 10, bottom: 30, left: 20, right: 20 });
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
            Text.textAlign(TextAlign.Start);
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
            Text.width('90%');
        }, Text);
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
        Text.pop();
        Column.pop();
        Scroll.pop();
        Navigation.pop();
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
            }
            else {
                this.locationText = 'Failed to enable location service. Please enable it in system settings.';
                hilog.warn(0x0000, TAG, this.locationText);
            }
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
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
    }
    catch (err) {
        hilog.error(0x0000, TAG, `Failed to get OAID. Code is ${err.code}, message is ${err.message}`);
        return undefined;
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.ads.interstitial", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
