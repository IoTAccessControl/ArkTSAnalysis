if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PrepareLoginPage_Params {
    logTag?: string;
    domainId?: number;
    isLogin?: boolean;
    pageInfos?: NavPathStack;
}
import type common from "@ohos:app.ability.common";
import authentication from "@hms:core.authentication";
import hilog from "@ohos:hilog";
import type { BusinessError as BusinessError } from "@ohos:base";
import { showToast } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/common/ShowToast";
import { ErrorCode } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/common/Constants";
export class PrepareLoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'PrepareLoginPage';
        this.domainId = 0x0000;
        this.__isLogin = new ObservedPropertySimplePU(false, this, "isLogin");
        this.__pageInfos = this.initializeConsume('pageInfos', "pageInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PrepareLoginPage_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
    }
    updateStateVars(params: PrepareLoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isLogin.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isLogin.aboutToBeDeleted();
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    private __isLogin: ObservedPropertySimplePU<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __pageInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    aboutToAppear() {
        hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
    }
    // Redirect to another page.
    private jumpLoginPage(quickLoginAnonymousPhone: string) {
        if (quickLoginAnonymousPhone) {
            // Obtain the anonymous mobile number, pass it, and redirect to the one-tap sign-in screen.
            const params: Record<string, Object> = { 'anonymousPhone': quickLoginAnonymousPhone };
            this.pageInfos?.pushPathByName('QuickLoginPage', params, true);
        }
        else {
            // If the anonymous mobile number cannot be obtained, an error message is displayed.
            const hint: string = (this.getUIContext()
                .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
            showToast(this.getUIContext(), hint);
        }
    }
    // Obtain the anonymous mobile number.
    getQuickLoginAnonymousPhone() {
        // Create an authorization request.
        const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
        // User information requested by the app.
        authRequest.scopes = ['quickLoginAnonymousPhone'];
        // In the one-tap sign-in scenario, forceAuthorization must be set to false.
        authRequest.forceAuthorization = false;
        const controller = new authentication.AuthenticationController();
        try {
            controller.executeRequest(authRequest).then((response: authentication.AuthorizationWithHuaweiIDResponse) => {
                // Obtain the UnionID, OpenID, and anonymous mobile number.
                const unionID = response.data?.unionID;
                const openID = response.data?.openID;
                const quickLoginAnonymousPhone = response.data?.extraInfo?.quickLoginAnonymousPhone as string;
                AppStorage.setOrCreate('quickLoginAnonymousPhone', quickLoginAnonymousPhone);
                this.jumpLoginPage(quickLoginAnonymousPhone);
                hilog.info(this.domainId, this.logTag, `Succeeded in authorizing. QuickLoginAnonymousPhone is ${quickLoginAnonymousPhone}`);
            }).catch((error: BusinessError) => {
                hilog.error(this.domainId, this.logTag, `Failed to authorize. errCode is ${error.code}, errMessage is ${error.message}`);
                this.dealAllError(error);
                showToast(this.getUIContext(), error);
            });
        }
        catch (error) {
            hilog.error(this.domainId, this.logTag, `Failed to authorize. errCode is ${error.code}, errMessage is ${error.message}`);
        }
    }
    dealAllError(error: BusinessError): void {
        // In app sign-in scenarios involving UI interactions, it is recommended to guide users with the following error code prompts:
        if (error.code === ErrorCode.ERROR_CODE_LOGIN_OUT) {
            // The user has not signed in with a HUAWEI ID. Use a HUAWEI ID to sign in and try again, or sign in to the app in another way.
        }
        else if (error.code === ErrorCode.ERROR_CODE_NETWORK_ERROR) {
            // Network exception. Check the current network status and try again, or sign in to the app in another way.
        }
        else if (error.code === ErrorCode.ERROR_CODE_INTERNAL_ERROR) {
            // Sign-in failed. Try another sign-in option.
        }
        else if (error.code === ErrorCode.ERROR_CODE_USER_CANCEL) {
            // The user cancels the authorization.
        }
        else if (error.code === ErrorCode.ERROR_CODE_SYSTEM_SERVICE) {
            // System service exception. Try again later or sign in to the app in another way.
        }
        else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
            // Repeated request. No further action is needed.
        }
        else {
            // Sign-in failed. Try another sign-in option.
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontSize(30);
                    Text.fontWeight(FontWeight.Medium);
                    Text.textAlign(TextAlign.Center);
                    Text.id('loginText');
                    Text.onClick(() => {
                        this.getQuickLoginAnonymousPhone();
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('权限功能测试');
                    Button.width('60%');
                    Button.height(50);
                    Button.margin({ top: 20 });
                    Button.backgroundColor('#E64A19');
                    Button.onClick(() => {
                        this.pageInfos?.pushPathByName('PermissionsPage', null, true);
                    });
                }, Button);
                Button.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/PrepareLoginPage" });
            NavDestination.backgroundColor('#F1F3F5');
            NavDestination.hideTitleBar(true);
            NavDestination.onBackPressed(() => {
                // Directly exit the app using a gesture.
                hilog.info(this.domainId, this.logTag, 'PrepareLoginPage onBackPressed');
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
