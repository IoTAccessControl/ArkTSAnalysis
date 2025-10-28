if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LinkButton_Params {
    buttonType?: string;
    isNeedDivider?: boolean;
    pathStack?: NavPathStack;
}
import webview from "@ohos:web.webview";
import { showDialog } from "@bundle:com.example.webcookie/entry/ets/common/utils/DialogUtil";
import { CommonConstants } from "@bundle:com.example.webcookie/entry/ets/common/constants/CommonConstant";
export class LinkButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.buttonType = undefined;
        this.isNeedDivider = undefined;
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LinkButton_Params) {
        if (params.buttonType !== undefined) {
            this.buttonType = params.buttonType;
        }
        if (params.isNeedDivider !== undefined) {
            this.isNeedDivider = params.isNeedDivider;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: LinkButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private buttonType?: string;
    private isNeedDivider?: boolean;
    private pathStack: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.buttonType);
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            Text.fontSize(CommonConstants.BUTTON_SIZE);
            Text.textAlign(TextAlign.Center);
            Text.fontWeight(FontWeight.Normal);
            Text.onClick(() => {
                this.operationMethod();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isNeedDivider) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.vertical(true);
                        Divider.margin(CommonConstants.DIVIDER_MARGIN);
                        Divider.height(CommonConstants.DIVIDER_HEIGHT);
                    }, Divider);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    operationMethod(): void {
        try {
            if (this.buttonType === CommonConstants.CookieOperation[0]) {
                let originCookie = webview.WebCookieManager.fetchCookieSync(CommonConstants.USER_CENTER_URL);
                showDialog(originCookie);
            }
            else if (this.buttonType === CommonConstants.CookieOperation[1]) {
                webview.WebCookieManager.configCookieSync(CommonConstants.USER_ABOUT_URL, 'info=测试cookie写入');
                showDialog({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" });
            }
            else if (this.buttonType === CommonConstants.CookieOperation[2]) {
                webview.WebCookieManager.clearAllCookiesSync();
                let deleteMessage = { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" };
                showDialog(deleteMessage);
            }
            else {
                this.pathStack.pushPathByName('Verify', undefined);
            }
        }
        catch (error) {
            showDialog('Operation failed.' + JSON.stringify(error));
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
