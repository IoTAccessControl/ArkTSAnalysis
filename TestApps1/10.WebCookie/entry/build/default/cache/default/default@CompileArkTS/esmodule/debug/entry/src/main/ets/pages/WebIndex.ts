if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WebIndex_Params {
    controller?: webview.WebviewController;
    pathStack?: NavPathStack;
}
import webview from "@ohos:web.webview";
import { CommonConstants } from "@bundle:com.example.webcookie/entry/ets/common/constants/CommonConstant";
import { LinkButton } from "@bundle:com.example.webcookie/entry/ets/view/LinkButton";
import { showDialog } from "@bundle:com.example.webcookie/entry/ets/common/utils/DialogUtil";
import router from "@ohos:router";
class WebIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new webview.WebviewController();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WebIndex_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: WebIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: webview.WebviewController;
    private pathStack: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/WebIndex", isUserCreateStack: true });
            Navigation.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Navigation.width(CommonConstants.FULL_WIDTH);
            Navigation.height(CommonConstants.FULL_HEIGHT);
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Text.fontSize(CommonConstants.NAVIGATOR_SIZE);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_DEEPER);
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Text.width(CommonConstants.FULL_WIDTH);
            Text.margin({
                top: CommonConstants.APP_TITLE_MARGIN_TOP,
                left: CommonConstants.APP_TITLE_MARGIN_LEFT
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Text.fontSize(CommonConstants.TITLE_SIZE);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_DEEPER);
            Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.width(CommonConstants.WEB_WIDTH);
            Text.height(CommonConstants.PAGE_TITLE_HEIGHT);
            Text.margin({
                top: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" },
                bottom: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Web.create({
                src: CommonConstants.USER_CENTER_URL,
                controller: this.controller
            });
            Web.domStorageAccess(true);
            Web.javaScriptAccess(true);
            Web.height(CommonConstants.WEB_HEIGHT);
            Web.width(CommonConstants.WEB_WIDTH);
            Web.margin({ bottom: CommonConstants.WEB_MARGIN_BOTTOM });
            Web.onErrorReceive((event) => {
                if (event?.request.isMainFrame()) {
                    let message = { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" };
                    showDialog(message);
                }
            });
        }, Web);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.WEB_WIDTH);
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LinkButton(this, { buttonType: CommonConstants.CookieOperation[0], isNeedDivider: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebIndex.ets", line: 72, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            buttonType: CommonConstants.CookieOperation[0],
                            isNeedDivider: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LinkButton" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LinkButton(this, { buttonType: CommonConstants.CookieOperation[1], isNeedDivider: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebIndex.ets", line: 73, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            buttonType: CommonConstants.CookieOperation[1],
                            isNeedDivider: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LinkButton" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LinkButton(this, { buttonType: CommonConstants.CookieOperation[2], isNeedDivider: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebIndex.ets", line: 74, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            buttonType: CommonConstants.CookieOperation[2],
                            isNeedDivider: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LinkButton" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LinkButton(this, { buttonType: CommonConstants.CookieOperation[3], isNeedDivider: false, pathStack: this.pathStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WebIndex.ets", line: 75, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            buttonType: CommonConstants.CookieOperation[3],
                            isNeedDivider: false,
                            pathStack: this.pathStack
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LinkButton" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Permissions Test Page');
            Button.width(CommonConstants.WEB_WIDTH);
            Button.margin({ top: 10 });
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/PermissionsTest' });
            });
        }, Button);
        Button.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WebIndex";
    }
}
registerNamedRoute(() => new WebIndex(undefined, {}), "", { bundleName: "com.example.webcookie", moduleName: "entry", pagePath: "pages/WebIndex", pageFullPath: "entry/src/main/ets/pages/WebIndex", integratedHsp: "false", moduleType: "followWithHap" });
