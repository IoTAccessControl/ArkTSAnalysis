if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PersonalInfoPage_Params {
    logTag?: string;
    domainId?: number;
    anonymousPhone?: string;
    pageInfos?: NavPathStack;
}
import type common from "@ohos:app.ability.common";
import hilog from "@ohos:hilog";
export class PersonalInfoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'PersonalInfoPage';
        this.domainId = 0x0000;
        this.__anonymousPhone = this.createStorageProp('quickLoginAnonymousPhone', '180******00', "anonymousPhone");
        this.__pageInfos = this.initializeConsume('pageInfos', "pageInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PersonalInfoPage_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
    }
    updateStateVars(params: PersonalInfoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__anonymousPhone.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__anonymousPhone.aboutToBeDeleted();
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    // This is only a sample display. The mobile number is displayed by default.
    private __anonymousPhone: ObservedPropertyAbstractPU<string>;
    get anonymousPhone() {
        return this.__anonymousPhone.get();
    }
    set anonymousPhone(newValue: string) {
        this.__anonymousPhone.set(newValue);
    }
    private __pageInfos?: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    aboutToAppear() {
        hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
    }
    // Sign out.
    logOut() {
        this.pageInfos?.pushPathByName('PrepareLoginPage', null, true);
        hilog.info(this.domainId, this.logTag, 'Succeeded in logging out.');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({
                        left: 16,
                        right: 16,
                        top: 36
                    });
                    Column.alignItems(HorizontalAlign.Center);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.backgroundColor('#F1F3F5');
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.alignSelf(ItemAlign.Start);
                    Row.height(56);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontSize({ "id": 125829676, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Medium);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(56);
                    Row.padding({
                        left: 12,
                        right: 12,
                        top: 4,
                        bottom: 4
                    });
                    Row.margin({ top: 12 });
                    Row.backgroundColor(Color.White);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.borderRadius(20);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontSize({ "id": 125829679, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Medium);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.anonymousPhone);
                    Text.fontSize({ "id": 125829680, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild();
                    Button.width('100%');
                    Button.constraintSize({ maxWidth: 448 });
                    Button.height(40);
                    Button.backgroundColor('#E7E8EA');
                    Button.margin({
                        bottom: 44,
                        top: 20
                    });
                    Button.id('logOutButton');
                    Button.onClick(() => {
                        this.logOut();
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontColor('#CE0E2D');
                    Text.fontSize({ "id": 125829679, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Medium);
                }, Text);
                Text.pop();
                Button.pop();
                Column.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/PersonalInfoPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.onBackPressed(() => {
                // Directly exit the app using a gesture.
                hilog.info(this.domainId, this.logTag, 'PersonalInfoPage onBackPressed');
                try {
                    (this.getUIContext().getHostContext() as common.UIAbilityContext).terminateSelf();
                }
                catch (error) {
                    hilog.error(this.domainId, this.logTag, `Failed to terminateSelf. errCode is ${error.code}, errMessage is ${error.message}`);
                }
                return true;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
