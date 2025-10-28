if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    logTag?: string;
    domainId?: number;
    pageInfos?: NavPathStack;
}
import hilog from "@ohos:hilog";
import { QuickLoginPage } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/pages/QuickLoginPage";
import { PersonalInfoPage } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/pages/PersonalInfoPage";
import { ProtocolWebView } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/pages/ProtocolWebView";
import { PrepareLoginPage } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/pages/PrepareLoginPage";
import { PermissionsPage } from "@bundle:com.example.accountkit_quicklogin_sample/entry/ets/pages/PermissionsPage";
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.logTag = 'HomePage';
        this.domainId = 0x0000;
        this.__pageInfos = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageInfos");
        this.addProvidedVar("pageInfos", this.__pageInfos, false);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.logTag !== undefined) {
            this.logTag = params.logTag;
        }
        if (params.domainId !== undefined) {
            this.domainId = params.domainId;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private logTag: string;
    private domainId: number;
    private __pageInfos: ObservedPropertyObjectPU<NavPathStack>;
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue: NavPathStack) {
        this.__pageInfos.set(newValue);
    }
    aboutToAppear() {
        hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
    }
    PageMap(name: string, params: Record<string, Object>, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'PrepareLoginPage') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PrepareLoginPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 25, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PrepareLoginPage" });
                    }
                });
            }
            else if (name === 'QuickLoginPage') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new QuickLoginPage(this, { params }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 27, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        params
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "QuickLoginPage" });
                    }
                });
            }
            else if (name === 'PersonalInfoPage') {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PersonalInfoPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 29, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PersonalInfoPage" });
                    }
                });
            }
            else if (name === 'ProtocolWebView') {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ProtocolWebView(this, { params }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 31, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        params
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ProtocolWebView" });
                    }
                });
            }
            else if (name === 'PermissionsPage') {
                this.ifElseBranchUpdateFunction(4, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PermissionsPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 33, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PermissionsPage" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(5, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/HomePage", isUserCreateStack: true });
            Navigation.onAppear(() => {
                this.pageInfos?.pushPathByName('PrepareLoginPage', null, false);
            });
            Navigation.titleMode(NavigationTitleMode.Full);
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
            Navigation.mode(NavigationMode.Stack);
            Navigation.navDestination({ builder: this.PageMap.bind(this) });
        }, Navigation);
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.accountkit_quicklogin_sample", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
