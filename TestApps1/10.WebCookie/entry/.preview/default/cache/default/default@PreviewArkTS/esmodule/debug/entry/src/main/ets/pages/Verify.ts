if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Verify_Params {
    pathStack?: NavPathStack;
    fileAccess?: boolean;
    controller?: webview.WebviewController;
    isRedirect?: boolean;
}
import webview from "@ohos:web.webview";
import { showDialog } from "@bundle:com.example.webcookie/entry/ets/common/utils/DialogUtil";
import { CommonConstants } from "@bundle:com.example.webcookie/entry/ets/common/constants/CommonConstant";
export function VerifyPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Verify(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Verify.ets", line: 22, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Verify" });
    }
}
export class Verify extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pathStack = new NavPathStack();
        this.fileAccess = true;
        this.controller = new webview.WebviewController();
        this.isRedirect = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Verify_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.fileAccess !== undefined) {
            this.fileAccess = params.fileAccess;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.isRedirect !== undefined) {
            this.isRedirect = params.isRedirect;
        }
    }
    updateStateVars(params: Verify_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private pathStack: NavPathStack;
    private fileAccess: boolean;
    private controller: webview.WebviewController;
    private isRedirect: boolean;
    onPageShow(): void {
        this.isRedirect = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/pages/Verify.ets(41:7)", "entry");
                    Text.fontSize(CommonConstants.TITLE_SIZE);
                    Text.fontWeight(CommonConstants.FONT_WEIGHT_DEEPER);
                    Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
                    Text.width(CommonConstants.PAGE_TITLE_WIDTH);
                    Text.height(CommonConstants.PAGE_TITLE_HEIGHT);
                    Text.margin({
                        top: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" },
                        bottom: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" }
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Web.create({
                        src: CommonConstants.USER_ABOUT_URL,
                        controller: this.controller
                    });
                    Web.debugLine("entry/src/main/ets/pages/Verify.ets(52:7)", "entry");
                    Web.height(CommonConstants.WEB_HEIGHT);
                    Web.width(CommonConstants.WEB_WIDTH);
                    Web.fileAccess(this.fileAccess);
                    Web.javaScriptAccess(true);
                    Web.onPageEnd(() => {
                        try {
                            let originCookie = webview.WebCookieManager.fetchCookieSync(CommonConstants.USER_ABOUT_URL);
                            if (originCookie === '' || this.isRedirect) {
                                return;
                            }
                            this.isRedirect = true;
                            showDialog(originCookie);
                        }
                        catch (error) {
                            showDialog('Failed to load the web page.' + JSON.stringify(error));
                        }
                    });
                }, Web);
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Verify" });
            NavDestination.backgroundColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            NavDestination.width(CommonConstants.FULL_WIDTH);
            NavDestination.height(CommonConstants.FULL_HEIGHT);
            NavDestination.title({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            NavDestination.hideToolBar(true);
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
            });
            NavDestination.debugLine("entry/src/main/ets/pages/Verify.ets(40:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Verify", wrapBuilder(VerifyPageBuilder));
    }
})();
