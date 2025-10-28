if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuickLoginPage_Params {
    logTag?: string;
    domainId?: number;
    srcPath?;
    params?: Record<string, Object>;
    privacyText?: loginComponentManager.PrivacyText[];
    controller?: loginComponentManager.LoginWithHuaweiIDButtonController;
    quickLoginAnonymousPhone?: string;
    isSelected?: boolean;
    showPopUp?: boolean;
    enableStatus?: boolean;
    pageInfos?: NavPathStack;
}
import type common from "@ohos:app.ability.common";
import { loginComponentManager as loginComponentManager } from "@hms:core.account.LoginComponent";
import { LoginWithHuaweiIDButton as LoginWithHuaweiIDButton } from "@hms:core.account.LoginComponent";
import hilog from "@ohos:hilog";
import type { BusinessError as BusinessError } from "@ohos:base";
import buffer from "@ohos:buffer";
import connection from "@ohos:net.connection";
import { showToast } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/common/ShowToast";
import { ErrorCode } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/common/Constants";
// Key value of the link to the HUAWEI ID User Authentication Agreement.
const PRIVACY_URL = 'privacy_url';
export class QuickLoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'QuickLoginPage';
        this.domainId = 0x0000;
        this.srcPath = 'data.json';
        this.params = undefined;
        this.privacyText = [{
                text: { "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            }, {
                text: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.RICH_TEXT,
                // Change the link to that of your own privacy policy.
                // ...
                tag: ''
            }, {
                text: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.RICH_TEXT,
                // Change the link to that of your own privacy policy.
                // ...
                tag: ''
            }, {
                text: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            }, {
                text: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.RICH_TEXT,
                tag: this.getProtocolUrl(PRIVACY_URL)
            }, {
                text: { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            }];
        this.controller = new loginComponentManager.LoginWithHuaweiIDButtonController()
            // Users need to accept relevant agreements before they can sign in wth HUAWEI IDs. Set the agreement status to NOT_ACCEPTED first. Once the user accepts the agreements, change the agreement status to ACCEPTED to complete HUAWEI ID sign-in.
            .setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED)
            .onClickLoginWithHuaweiIDButton((error: BusinessError, response: loginComponentManager.HuaweiIDCredential) => {
            // Process the logic of a tap on the one-tap sign-in button.
            this.handleLoginWithHuaweiIDButton(error, response);
            if (error) {
                this.dealAllError(error);
            }
        });
        this.__quickLoginAnonymousPhone = new ObservedPropertySimplePU('', this, "quickLoginAnonymousPhone");
        this.__isSelected = new ObservedPropertySimplePU(false, this, "isSelected");
        this.__showPopUp = new ObservedPropertySimplePU(false, this, "showPopUp");
        this.__enableStatus = new ObservedPropertySimplePU(true, this, "enableStatus");
        this.__pageInfos = this.initializeConsume('pageInfos', "pageInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuickLoginPage_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.srcPath !== undefined) {
            this.srcPath = params.srcPath;
        }
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.privacyText !== undefined) {
            this.privacyText = params.privacyText;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.quickLoginAnonymousPhone !== undefined) {
            this.quickLoginAnonymousPhone = params.quickLoginAnonymousPhone;
        }
        if (params.isSelected !== undefined) {
            this.isSelected = params.isSelected;
        }
        if (params.showPopUp !== undefined) {
            this.showPopUp = params.showPopUp;
        }
        if (params.enableStatus !== undefined) {
            this.enableStatus = params.enableStatus;
        }
    }
    updateStateVars(params: QuickLoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quickLoginAnonymousPhone.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelected.purgeDependencyOnElmtId(rmElmtId);
        this.__showPopUp.purgeDependencyOnElmtId(rmElmtId);
        this.__enableStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quickLoginAnonymousPhone.aboutToBeDeleted();
        this.__isSelected.aboutToBeDeleted();
        this.__showPopUp.aboutToBeDeleted();
        this.__enableStatus.aboutToBeDeleted();
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    // File used to configure the link to the HUAWEI ID User Authentication Agreement.
    private readonly srcPath;
    private params?: Record<string, Object>;
    private privacyText: loginComponentManager.PrivacyText[];
    private controller: loginComponentManager.LoginWithHuaweiIDButtonController;
    private __quickLoginAnonymousPhone: ObservedPropertySimplePU<string>;
    get quickLoginAnonymousPhone() {
        return this.__quickLoginAnonymousPhone.get();
    }
    set quickLoginAnonymousPhone(newValue: string) {
        this.__quickLoginAnonymousPhone.set(newValue);
    }
    // Specify whether to accept the agreements.
    private __isSelected: ObservedPropertySimplePU<boolean>;
    get isSelected() {
        return this.__isSelected.get();
    }
    set isSelected(newValue: boolean) {
        this.__isSelected.set(newValue);
    }
    // Specify whether to display a message asking the user to accept the agreements.
    private __showPopUp: ObservedPropertySimplePU<boolean>;
    get showPopUp() {
        return this.__showPopUp.get();
    }
    set showPopUp(newValue: boolean) {
        this.__showPopUp.set(newValue);
    }
    // Variable that determines whether the agreement and checkbox are unavailable for tapping during the sign-in process.
    private __enableStatus: ObservedPropertySimplePU<boolean>;
    get enableStatus() {
        return this.__enableStatus.get();
    }
    set enableStatus(newValue: boolean) {
        this.__enableStatus.set(newValue);
    }
    private __pageInfos?: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    aboutToAppear() {
        hilog.info(this.domainId, this.logTag, 'aboutToAppear');
        // Obtain the passed parameter object.
        if (this.params && this.params !== null) {
            this.quickLoginAnonymousPhone = (this.params['anonymousPhone'] ?? '') as string;
        }
    }
    // Processing logic returned after a gesture operation is executed.
    onBackPress(): boolean | void {
        if (this.pageInfos && this.pageInfos.size() > 0) {
            this.pageInfos.pop();
            return true;
        }
    }
    // Method that processes a tap on the one-tap sign-in button.
    handleLoginWithHuaweiIDButton(error: BusinessError | undefined, response: loginComponentManager.HuaweiIDCredential) {
        this.enableStatus = false;
        if (error) {
            hilog.error(this.domainId, this.logTag, `Failed to login with LoginWithHuaweiIDButton. errCode is ${error.code}, errMessage is ${error.message}`);
            if (error.code === ErrorCode.ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED) {
                // If the agreements are not accepted, a pop-up message is displayed.
                this.showPopUp = true;
            }
            else {
                showToast(this.getUIContext(), error);
            }
            this.enableStatus = true;
            return;
        }
        try {
            if (this.isSelected) {
                if (response) {
                    hilog.info(this.domainId, this.logTag, 'Succeeded in clicking LoginWithHuaweiIDButton.');
                    const authCode = response.authorizationCode;
                    const openID = response.openID;
                    const unionID = response.unionID;
                    const idToken = response.idToken;
                    // After sign-in to the app is successful, process the server sign-in execution logic here.
                    // After sign-in on the server is successful, the data to be displayed on the main screen is returned.
                    // ...
                    // In this example, after a successful sign-in, the personal information screen is displayed.
                    this.pageInfos?.pushPathByName('PersonalInfoPage', null, true);
                }
            }
            else {
                // If the agreements are not accepted, a pop-up message is displayed.
                this.showPopUp = true;
            }
        }
        catch (error) {
            hilog.error(this.domainId, this.logTag, `Failed to login with LoginWithHuaweiIDButton. errCode is ${error.code}, errMessage is ${error.message}`);
            showToast(this.getUIContext(), error as BusinessError);
        }
        finally {
            this.enableStatus = true;
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
        else if (error.code === ErrorCode.ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED) {
            // The user does not accept the agreements.
        }
        else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
            // Repeated request. No further action is needed.
        }
        else {
            // Sign-in failed. Try another sign-in option.
        }
    }
    // Redirect to the HUAWEI ID User Authentication Agreement page.
    jumpToPrivacyWebView(privacyText: loginComponentManager.PrivacyText) {
        const hasNet: boolean = connection.hasDefaultNetSync();
        if (!hasNet) {
            const hint: string = (this.getUIContext()
                .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
            showToast(this.getUIContext(), hint);
            return;
        }
        if (privacyText.tag && privacyText.tag !== '') {
            // Obtain the multi-language environment information of the system.
            const systemLanguage: string = (this.getUIContext().getHostContext() as common.UIExtensionContext).config.language ?? '';
            hilog.info(this.domainId, this.logTag, `systemLanguage is ${systemLanguage}`);
            const params: Record<string, Object> = { 'protocolUrl': privacyText.tag + systemLanguage };
            // Concatenate link parameters.
            this.pageInfos?.pushPathByName('ProtocolWebView', params, true);
        }
    }
    // Obtain the privacy policy address from rawfile.
    getProtocolUrl(privacyUrl: string): string {
        try {
            // Read files from /AppScope/resources/rawfile.
            const value: Uint8Array = (this.getUIContext()
                .getHostContext() as common.UIAbilityContext).resourceManager.getRawFileContentSync(this.srcPath);
            // Return the link to the HUAWEI ID User Authentication Agreement.
            return JSON.parse(buffer.from(value.buffer).toString())[privacyUrl] as string;
        }
        catch (error) {
            hilog.error(this.domainId, this.logTag, `getProtocolUrl Error. errCode is ${error.code}, errMessage is ${error.message}`);
            return '';
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({
                        left: 16,
                        right: 16,
                        top: 36,
                        bottom: 28
                    });
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.backgroundColor('#F1F3F5');
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({
                        direction: FlexDirection.Column,
                        alignItems: ItemAlign.Center,
                        justifyContent: FlexAlign.SpaceBetween
                    });
                    Flex.width('100%');
                    Flex.height('40%');
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Back button.
                    Row.create();
                    // Back button.
                    Row.height(56);
                    // Back button.
                    Row.padding({ top: 8, bottom: 8 });
                    // Back button.
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild({ type: ButtonType.Normal });
                    Button.alignSelf(ItemAlign.Start);
                    Button.backgroundColor({ "id": 125829510, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Button.borderRadius(20);
                    Button.width(40);
                    Button.height(40);
                    Button.id('quickLoginAppBackButton');
                    Button.onClick(() => {
                        hilog.info(this.domainId, this.logTag, `pageInfos is ${this.pageInfos?.size()}`);
                        if (this.pageInfos && this.pageInfos.size() > 0) {
                            this.pageInfos.pop();
                        }
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Image.backgroundColor(Color.Transparent);
                    Image.borderRadius(20);
                    Image.width(40);
                    Image.height(40);
                    Image.draggable(false);
                    Image.autoResize(false);
                    Image.focusable(true);
                    Image.fillColor({ "id": 125829402, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Image.matchTextDirection(true);
                }, Image);
                Button.pop();
                // Back button.
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // App icon.
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Image.width(80);
                    Image.height(80);
                    Image.draggable(false);
                    Image.copyOption(CopyOptions.None);
                    Image.borderRadius(20);
                    Image.onComplete(() => {
                        hilog.info(this.domainId, this.logTag, 'Succeeded in loading appIcon.');
                    });
                    Image.onError(() => {
                        hilog.error(this.domainId, this.logTag, 'Failed to load appIcon.');
                    });
                }, Image);
                // App icon.
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Mobile number and its description.
                    Column.create();
                    // Mobile number and its description.
                    Column.margin({ bottom: -36 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.quickLoginAnonymousPhone);
                    Text.fontSize(36);
                    Text.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Bold);
                    Text.lineHeight(48);
                    Text.height(48);
                    Text.textAlign(TextAlign.Center);
                    Text.maxLines(1);
                    Text.constraintSize({ maxWidth: '100%', minHeight: 48 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontSize(12);
                    Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Regular);
                    Text.lineHeight(16);
                    Text.height(16);
                    Text.textAlign(TextAlign.Center);
                    Text.maxLines(1);
                    Text.constraintSize({ maxWidth: '100%' });
                    Text.margin({ top: 8 });
                }, Text);
                Text.pop();
                // Mobile number and its description.
                Column.pop();
                Flex.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('60%');
                    Column.justifyContent(FlexAlign.SpaceBetween);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // One-tap sign-in.
                    Column.create();
                    // One-tap sign-in.
                    Column.height(40);
                    // One-tap sign-in.
                    Column.width('100%');
                    // One-tap sign-in.
                    Column.constraintSize({ maxWidth: 448 });
                    // One-tap sign-in.
                    Column.margin({ top: 92 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create(true);
                    __Common__.id('login_with_huaweiId_button');
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LoginWithHuaweiIDButton(this, {
                                params: {
                                    style: loginComponentManager.Style.BUTTON_RED,
                                    extraStyle: {
                                        buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
                                            show: true
                                        })
                                    },
                                    loginType: loginComponentManager.LoginType.QUICK_LOGIN
                                },
                                controller: this.controller
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/QuickLoginPage.ets", line: 272, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    params: {
                                        style: loginComponentManager.Style.BUTTON_RED,
                                        extraStyle: {
                                            buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
                                                show: true
                                            })
                                        },
                                        loginType: loginComponentManager.LoginType.QUICK_LOGIN
                                    },
                                    controller: this.controller
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "LoginWithHuaweiIDButton" });
                }
                __Common__.pop();
                // One-tap sign-in.
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({
                        justifyContent: FlexAlign.Center,
                        alignItems: ItemAlign.Start
                    });
                    Flex.width('100%');
                    Flex.margin({ bottom: 16 });
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.padding({ right: 12 });
                    Row.bindPopup(this.showPopUp, {
                        message: (this.getUIContext()
                            .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" }),
                        onStateChange: (event) => {
                            this.showPopUp = event.isVisible;
                        },
                        mask: false
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Checkbox.create({ name: 'privacyCheckbox', group: 'privacyCheckboxGroup' });
                    Checkbox.width(24);
                    Checkbox.height(24);
                    Checkbox.focusable(true);
                    Checkbox.focusOnTouch(true);
                    Checkbox.selectedColor('#CE0E2D');
                    Checkbox.select(this.isSelected);
                    Checkbox.enabled(this.enableStatus);
                    Checkbox.margin({ top: 0 });
                    Checkbox.onChange((value: boolean) => {
                        hilog.info(this.domainId, this.logTag, `agreementChecked: ${value}`);
                        if (value) {
                            this.isSelected = true;
                            this.showPopUp = false;
                            // Set the agreement status to ACCEPTED.
                            this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.ACCEPTED);
                        }
                        else {
                            this.isSelected = false;
                            // Set the agreement status to NOT_ACCEPTED.
                            this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED);
                        }
                    });
                }, Checkbox);
                Checkbox.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.constraintSize({ minHeight: 24 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create();
                }, Text);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.privacyText && this.privacyText.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const item = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (item?.type === loginComponentManager.TextType.PLAIN_TEXT && item?.text) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Span.create(item?.text);
                                                    Span.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                    Span.fontFamily({ "id": 125829694, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                    Span.fontWeight(FontWeight.Regular);
                                                    Span.fontSize({ "id": 125829686, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                }, Span);
                                            });
                                        }
                                        else if (item?.type === loginComponentManager.TextType.RICH_TEXT && item?.text) {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                                if (!If.canRetake('quickLoginProtocolUrlSpan')) {
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        Span.create(item?.text);
                                                        Span.fontColor({ "id": 125829210, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                        Span.fontFamily({ "id": 125829695, "type": 10003, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                        Span.fontWeight(FontWeight.Medium);
                                                        Span.fontSize({ "id": 125829686, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                                                        Span.focusable(true);
                                                        Span.focusOnTouch(true);
                                                        Span.enabled(this.enableStatus);
                                                        Span.id('quickLoginProtocolUrlSpan');
                                                        Span.onClick(() => {
                                                            hilog.info(this.domainId, this.logTag, 'Click protocol url');
                                                            if (this.enableStatus) {
                                                                try {
                                                                    this.jumpToPrivacyWebView(item);
                                                                }
                                                                catch (error) {
                                                                    const code: number = error.code;
                                                                    const message: string = error.message;
                                                                    hilog.error(this.domainId, this.logTag, `Failed to jump privacy webview. errCode is ${code}, errMessage is ${message}`);
                                                                }
                                                            }
                                                        });
                                                    }, Span);
                                                }
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(2, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                };
                                this.forEachUpdateFunction(elmtId, this.privacyText, forEachItemGenFunction, (item: loginComponentManager.PrivacyText, index: number) => `${item.text}_${index}}`, false, true);
                            }, ForEach);
                            ForEach.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Text.pop();
                Row.pop();
                Flex.pop();
                Column.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/QuickLoginPage" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
