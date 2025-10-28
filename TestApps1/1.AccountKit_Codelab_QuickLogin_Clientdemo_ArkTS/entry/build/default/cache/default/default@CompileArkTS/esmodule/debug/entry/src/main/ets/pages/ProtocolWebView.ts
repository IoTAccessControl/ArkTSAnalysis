if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProtocolWebView_Params {
    logTag?: string;
    domainId?: number;
    params?: Record<string, Object>;
    controller?: webview.WebviewController;
    url?: string;
    progress?: number;
    webViewWidth?: string;
    pageInfos?: NavPathStack;
}
import webview from "@ohos:web.webview";
import hilog from "@ohos:hilog";
import display from "@ohos:display";
import { showToast } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/common/ShowToast";
export class ProtocolWebView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'ProtocolWebView';
        this.domainId = 0x0000;
        this.params = undefined;
        this.controller = new webview.WebviewController();
        this.url = '';
        this.__progress = new ObservedPropertySimplePU(0, this, "progress");
        this.__webViewWidth = new ObservedPropertySimplePU(this.getWebviewWidth(), this, "webViewWidth");
        this.__pageInfos = this.initializeConsume('pageInfos', "pageInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProtocolWebView_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.webViewWidth !== undefined) {
            this.webViewWidth = params.webViewWidth;
        }
    }
    updateStateVars(params: ProtocolWebView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__progress.purgeDependencyOnElmtId(rmElmtId);
        this.__webViewWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__webViewWidth.aboutToBeDeleted();
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    private params?: Record<string, Object>;
    private controller: webview.WebviewController;
    private url: string;
    private __progress: ObservedPropertySimplePU<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __webViewWidth: ObservedPropertySimplePU<string>;
    get webViewWidth() {
        return this.__webViewWidth.get();
    }
    set webViewWidth(newValue: string) {
        this.__webViewWidth.set(newValue);
    }
    private __pageInfos?: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    aboutToAppear(): void {
        hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
        // Obtain the passed parameter object.
        if (this.params && this.params !== null) {
            this.url = (this.params['protocolUrl'] ?? '') as string;
        }
    }
    // Obtains the page width.
    getWebviewWidth() {
        const WEB_PAGE_MARGIN = 32;
        const UI_PAGE_MARGIN = 16;
        const displayWidth: number = this.getUIContext().px2vp(display.getDefaultDisplaySync().width);
        return ((displayWidth + (WEB_PAGE_MARGIN - UI_PAGE_MARGIN) * 2) * 100 / displayWidth).toFixed(2) + '%';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.padding({ bottom: 60 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild({ type: ButtonType.Normal });
                    Button.alignSelf(ItemAlign.Start);
                    Button.backgroundColor({ "id": 125829510, "type": 10001, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" });
                    Button.borderRadius(20);
                    Button.width(40);
                    Button.height(40);
                    Button.margin({
                        top: 36,
                        bottom: { "id": 125829748, "type": 10002, params: [], "bundleName": "com.example.accountkit_quicklogin_sample", "moduleName": "entry" },
                        left: 16
                    });
                    Button.id('appBackButton');
                    Button.onClick(() => {
                        if (this.pageInfos && this.pageInfos.size() > 1) {
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Progress.create({ value: this.progress, type: ProgressType.Linear });
                    Progress.width('100%');
                    Progress.visibility(this.progress <= 99 ? Visibility.Visible : Visibility.None);
                }, Progress);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Web.create({ src: this.url, controller: this.controller });
                    Web.javaScriptAccess(true);
                    Web.geolocationAccess(false);
                    Web.fileAccess(false);
                    Web.width(this.webViewWidth);
                    Web.margin({ bottom: 60 });
                    Web.backgroundColor(Color.Transparent);
                    Web.onProgressChange((event) => {
                        hilog.info(this.domainId, this.logTag, 'onProgressChange: ', (event ? event.newProgress : -1));
                        this.progress = event ? event.newProgress : 0;
                    });
                    Web.onAppear(async () => {
                        try {
                            this.controller.loadUrl(this.url);
                        }
                        catch (error) {
                            hilog.error(this.domainId, this.logTag, `Failed to load ProtocolWebView. errCode is ${error.code}, errMessage is ${error.message}`);
                            showToast(this.getUIContext(), error);
                        }
                    });
                }, Web);
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ProtocolWebView" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
