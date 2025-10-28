if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FunctionalAPIPage_Params {
    systemInfo?: string;
    systemInfoSync?: string;
    systemSettings?: string;
}
import atomicService from "@hms:core.atomicserviceComponent.atomicservice";
import router from "@ohos:router";
class FunctionalAPIPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__systemInfo = new ObservedPropertySimplePU('GetSystemInfo', this, "systemInfo");
        this.__systemInfoSync = new ObservedPropertySimplePU('GetSystemInfoSync', this, "systemInfoSync");
        this.__systemSettings = new ObservedPropertySimplePU('GetSystemSettings', this, "systemSettings");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FunctionalAPIPage_Params) {
        if (params.systemInfo !== undefined) {
            this.systemInfo = params.systemInfo;
        }
        if (params.systemInfoSync !== undefined) {
            this.systemInfoSync = params.systemInfoSync;
        }
        if (params.systemSettings !== undefined) {
            this.systemSettings = params.systemSettings;
        }
    }
    updateStateVars(params: FunctionalAPIPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__systemInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__systemInfoSync.purgeDependencyOnElmtId(rmElmtId);
        this.__systemSettings.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__systemInfo.aboutToBeDeleted();
        this.__systemInfoSync.aboutToBeDeleted();
        this.__systemSettings.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __systemInfo: ObservedPropertySimplePU<string>;
    get systemInfo() {
        return this.__systemInfo.get();
    }
    set systemInfo(newValue: string) {
        this.__systemInfo.set(newValue);
    }
    private __systemInfoSync: ObservedPropertySimplePU<string>;
    get systemInfoSync() {
        return this.__systemInfoSync.get();
    }
    set systemInfoSync(newValue: string) {
        this.__systemInfoSync.set(newValue);
    }
    private __systemSettings: ObservedPropertySimplePU<string>;
    get systemSettings() {
        return this.__systemSettings.get();
    }
    set systemSettings(newValue: string) {
        this.__systemSettings.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(12:5)", "entry");
            Column.justifyContent(FlexAlign.Center);
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.systemInfo);
            Button.debugLine("entry/src/main/ets/pages/Index.ets(13:7)", "entry");
            Button.type(ButtonType.Capsule);
            Button.margin(20);
            Button.backgroundColor('#ff3888be');
            Button.width('40%');
            Button.onClick(() => {
                let arr: Array<atomicService.SystemInfoType> = ['windowWidth'];
                atomicService.getSystemInfo(arr).then((result) => {
                    this.systemInfo = String(result.windowWidth);
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.systemInfoSync);
            Button.debugLine("entry/src/main/ets/pages/Index.ets(25:7)", "entry");
            Button.type(ButtonType.Capsule);
            Button.margin(20);
            Button.backgroundColor('#ff3888be');
            Button.width('40%');
            Button.onClick(() => {
                let arr: Array<atomicService.SystemInfoType> = ['brand'];
                let result = atomicService.getSystemInfoSync(arr);
                this.systemInfoSync = String(result.brand);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.systemSettings);
            Button.debugLine("entry/src/main/ets/pages/Index.ets(36:7)", "entry");
            Button.type(ButtonType.Capsule);
            Button.margin(20);
            Button.backgroundColor('#ff3888be');
            Button.width('40%');
            Button.onClick(() => {
                let arr: Array<atomicService.SystemSettingType> = ['deviceOrientation'];
                let result = atomicService.getSystemSetting(arr);
                this.systemSettings = String(result.deviceOrientation);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Go to Permissions Demo');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(47:7)", "entry");
            Button.type(ButtonType.Capsule);
            Button.margin(20);
            Button.backgroundColor('#ff3888be');
            Button.width('40%');
            Button.onClick(() => {
                try {
                    router.pushUrl({
                        url: 'pages/PermissionsDemo'
                    });
                }
                catch (e) {
                    console.error(`Failed to push page: ${e}`);
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FunctionalAPIPage";
    }
}
registerNamedRoute(() => new FunctionalAPIPage(undefined, {}), "", { bundleName: "com.example.scenariofusionkit_codelab_functionalapi_arkts", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
