if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentBreakpoint?: string;
    pageInfo?: NavPathStack;
    currentConversationUserName?: string;
    currentContactUserName?: string;
    currentContactUserIcon?: Resource;
    currentPageIndex?: number;
    currentFeatureIndex?: Number;
    isSplitAppletScreen?: boolean;
    isSplitDocumentScreen?: boolean;
}
import { Adaptive, BaseConstants, CurrentFeature, CurrentPage } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import ConversationDetailNone from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Conversation/ConversationDetailNone";
import { ContactsDetail } from "@bundle:com.example.multdevicecommunication/phone@home/ets/pages/ContactsDetail";
import { ContactsList } from "@bundle:com.example.multdevicecommunication/phone@home/ets/pages/ContactsList";
import { ConversationDetail } from "@bundle:com.example.multdevicecommunication/phone@home/ets/pages/ConversationDetail";
import { ConversationList } from "@bundle:com.example.multdevicecommunication/phone@home/ets/pages/ConversationList";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import { HomeTab } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/HomeTab";
import { SocialCircle } from "@bundle:com.example.multdevicecommunication/phone@socialCircle/Index";
import deviceInfo from "@ohos:deviceInfo";
import { PermissionPage } from "@bundle:com.example.multdevicecommunication/phone@home/ets/pages/PermissionPage";
export class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.__pageInfo = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageInfo");
        this.addProvidedVar("pageInfo", this.__pageInfo, false);
        this.__currentConversationUserName = new ObservedPropertySimplePU('', this, "currentConversationUserName");
        this.__currentContactUserName = new ObservedPropertySimplePU('', this, "currentContactUserName");
        this.__currentContactUserIcon = new ObservedPropertyObjectPU(HomeConstants.DEFAULT_AVATAR, this, "currentContactUserIcon");
        this.__currentPageIndex = new ObservedPropertySimplePU(CurrentPage.HOME, this, "currentPageIndex");
        this.__currentFeatureIndex = new ObservedPropertyObjectPU(CurrentFeature.HOME, this, "currentFeatureIndex");
        this.__isSplitAppletScreen = new ObservedPropertySimplePU(BaseConstants.SPLIT_APPLET_SCREEN, this, "isSplitAppletScreen");
        this.__isSplitDocumentScreen = new ObservedPropertySimplePU(BaseConstants.SPLIT_DOCUMENT_SCREEN, this, "isSplitDocumentScreen");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentBreakpoint", this.watchCurrentBreakpoint);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.pageInfo !== undefined) {
            this.pageInfo = params.pageInfo;
        }
        if (params.currentConversationUserName !== undefined) {
            this.currentConversationUserName = params.currentConversationUserName;
        }
        if (params.currentContactUserName !== undefined) {
            this.currentContactUserName = params.currentContactUserName;
        }
        if (params.currentContactUserIcon !== undefined) {
            this.currentContactUserIcon = params.currentContactUserIcon;
        }
        if (params.currentPageIndex !== undefined) {
            this.currentPageIndex = params.currentPageIndex;
        }
        if (params.currentFeatureIndex !== undefined) {
            this.currentFeatureIndex = params.currentFeatureIndex;
        }
        if (params.isSplitAppletScreen !== undefined) {
            this.isSplitAppletScreen = params.isSplitAppletScreen;
        }
        if (params.isSplitDocumentScreen !== undefined) {
            this.isSplitDocumentScreen = params.isSplitDocumentScreen;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__currentConversationUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPageIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentFeatureIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isSplitAppletScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__isSplitDocumentScreen.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__pageInfo.aboutToBeDeleted();
        this.__currentConversationUserName.aboutToBeDeleted();
        this.__currentContactUserName.aboutToBeDeleted();
        this.__currentContactUserIcon.aboutToBeDeleted();
        this.__currentPageIndex.aboutToBeDeleted();
        this.__currentFeatureIndex.aboutToBeDeleted();
        this.__isSplitAppletScreen.aboutToBeDeleted();
        this.__isSplitDocumentScreen.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    // [Start navigation_diff_device]
    private __pageInfo: ObservedPropertyObjectPU<NavPathStack>;
    get pageInfo() {
        return this.__pageInfo.get();
    }
    set pageInfo(newValue: NavPathStack) {
        this.__pageInfo.set(newValue);
    }
    // [StartExclude navigation_diff_device]
    private __currentConversationUserName: ObservedPropertySimplePU<string>;
    get currentConversationUserName() {
        return this.__currentConversationUserName.get();
    }
    set currentConversationUserName(newValue: string) {
        this.__currentConversationUserName.set(newValue);
    }
    private __currentContactUserName: ObservedPropertySimplePU<string>;
    get currentContactUserName() {
        return this.__currentContactUserName.get();
    }
    set currentContactUserName(newValue: string) {
        this.__currentContactUserName.set(newValue);
    }
    private __currentContactUserIcon: ObservedPropertyObjectPU<Resource>;
    get currentContactUserIcon() {
        return this.__currentContactUserIcon.get();
    }
    set currentContactUserIcon(newValue: Resource) {
        this.__currentContactUserIcon.set(newValue);
    }
    private __currentPageIndex: ObservedPropertySimplePU<number>;
    get currentPageIndex() {
        return this.__currentPageIndex.get();
    }
    set currentPageIndex(newValue: number) {
        this.__currentPageIndex.set(newValue);
    }
    private __currentFeatureIndex: ObservedPropertyObjectPU<Number>;
    get currentFeatureIndex() {
        return this.__currentFeatureIndex.get();
    }
    set currentFeatureIndex(newValue: Number) {
        this.__currentFeatureIndex.set(newValue);
    }
    private __isSplitAppletScreen: ObservedPropertySimplePU<boolean>;
    get isSplitAppletScreen() {
        return this.__isSplitAppletScreen.get();
    }
    set isSplitAppletScreen(newValue: boolean) {
        this.__isSplitAppletScreen.set(newValue);
    }
    private __isSplitDocumentScreen: ObservedPropertySimplePU<boolean>;
    get isSplitDocumentScreen() {
        return this.__isSplitDocumentScreen.get();
    }
    set isSplitDocumentScreen(newValue: boolean) {
        this.__isSplitDocumentScreen.set(newValue);
    }
    watchCurrentBreakpoint() {
        if (this.currentBreakpoint === 'sm' &&
            this.pageInfo.getParamByName('ConversationDetailNone').length === 1 && this.pageInfo.size() === 1) {
            this.pageInfo.pop();
        }
    }
    // [EndExclude navigation_diff_device]
    PageMap(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'ConversationDetail') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConversationDetail(this, { currentConversationUserName: this.currentConversationUserName, currentFeatureIndex: 1 }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 54, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentConversationUserName: this.currentConversationUserName,
                                        currentFeatureIndex: 1
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    currentConversationUserName: this.currentConversationUserName, currentFeatureIndex: 1
                                });
                            }
                        }, { name: "ConversationDetail" });
                    }
                });
            }
            else if (name === 'ConversationDetailNone') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConversationDetailNone(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 56, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ConversationDetailNone" });
                    }
                });
            }
            else if (name === 'ContactsDetail') {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ContactsDetail(this, {
                                    currentContactUserName: this.currentContactUserName,
                                    currentContactUserIcon: this.currentContactUserIcon
                                }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 58, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentContactUserName: this.currentContactUserName,
                                        currentContactUserIcon: this.currentContactUserIcon
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    currentContactUserName: this.currentContactUserName,
                                    currentContactUserIcon: this.currentContactUserIcon
                                });
                            }
                        }, { name: "ContactsDetail" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConversationDetailNone(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 63, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ConversationDetailNone" });
                    }
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.backgroundColor({ "id": 50331671, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * Home and contacts page
             */
            Flex.create();
            /**
             * Home and contacts page
             */
            Flex.visibility(this.currentPageIndex === 0 || this.currentPageIndex === 1 || this.currentPageIndex === 4 ? Visibility.Visible : Visibility.None);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
            __Common__.backgroundColor('#F1F3F5');
            __Common__.padding({
                top: '180vp',
                bottom: '180vp',
                left: '22vp'
            });
            __Common__.visibility(this.currentBreakpoint === 'lg' ? Visibility.Visible : Visibility.None);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 73, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentPageIndex: this.currentPageIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTab" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start nav_path_stack]
            Navigation.create(this.pageInfo, { moduleName: "phone", pagePath: "features/home/src/main/ets/pages/Index", isUserCreateStack: true });
            // [Start nav_path_stack]
            Navigation.hideTitleBar(true);
            // [Start nav_path_stack]
            Navigation.hideToolBar(true);
            // [Start nav_path_stack]
            Navigation.navBarWidth(this.currentBreakpoint === 'lg' ? '44.5%' : '50%');
            // [Start nav_path_stack]
            Navigation.navDestination({ builder: this.PageMap.bind(this) });
            // [Start nav_path_stack]
            Navigation.mode(this.currentBreakpoint === 'sm' ? NavigationMode.Stack : NavigationMode.Split);
            // [Start nav_path_stack]
            Navigation.width('100%');
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentPageIndex === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
                        Flex.padding({
                            bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
                        });
                        Flex.height('100%');
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.flexGrow(1);
                        __Common__.width('100%');
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConversationList(this, {
                                    currentConversationUserName: this.__currentConversationUserName,
                                    currentContactUserName: this.__currentContactUserName
                                }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 86, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentConversationUserName: this.currentConversationUserName,
                                        currentContactUserName: this.currentContactUserName
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ConversationList" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
                        __Common__.height(Adaptive.HomeTabHeight(this.currentBreakpoint));
                        __Common__.visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 92, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPageIndex: this.currentPageIndex
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "HomeTab" });
                    }
                    __Common__.pop();
                    Flex.pop();
                });
            }
            else if (this.currentPageIndex === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
                        Flex.height('100%');
                        Flex.padding({
                            bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
                        });
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.flexGrow(1);
                        __Common__.width('100%');
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ContactsList(this, {
                                    currentContactUserName: this.__currentContactUserName,
                                    currentConversationUserName: this.__currentConversationUserName,
                                    currentContactUserIcon: this.__currentContactUserIcon
                                }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 103, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentContactUserName: this.currentContactUserName,
                                        currentConversationUserName: this.currentConversationUserName,
                                        currentContactUserIcon: this.currentContactUserIcon
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ContactsList" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
                        __Common__.height(Adaptive.HomeTabHeight(this.currentBreakpoint));
                        __Common__.visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 110, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPageIndex: this.currentPageIndex
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "HomeTab" });
                    }
                    __Common__.pop();
                    Flex.pop();
                });
            }
            else if (this.currentPageIndex === 4) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
                        Flex.height('100%');
                        Flex.padding({
                            bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
                        });
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.flexGrow(1);
                        __Common__.width('100%');
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PermissionPage(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 121, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PermissionPage" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
                        __Common__.height(Adaptive.HomeTabHeight(this.currentBreakpoint));
                        __Common__.visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 124, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPageIndex: this.currentPageIndex
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "HomeTab" });
                    }
                    __Common__.pop();
                    Flex.pop();
                });
            }
            else // [End nav_path_stack]
             {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        // [Start nav_path_stack]
        Navigation.pop();
        /**
         * Home and contacts page
         */
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [StartExclude navigation_diff_device]
            /**
             * SocialCircle page
             */
            Flex.create({ direction: FlexDirection.Column });
            // [StartExclude navigation_diff_device]
            /**
             * SocialCircle page
             */
            Flex.width('100%');
            // [StartExclude navigation_diff_device]
            /**
             * SocialCircle page
             */
            Flex.height('100%');
            // [StartExclude navigation_diff_device]
            /**
             * SocialCircle page
             */
            Flex.visibility(this.currentPageIndex === CurrentPage.SOCIAL_CIRCLE && this.currentBreakpoint !==
                'lg' ? Visibility.Visible : Visibility.None);
            // [StartExclude navigation_diff_device]
            /**
             * SocialCircle page
             */
            Flex.padding({
                bottom: { "id": 50331831, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.flexGrow(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SocialCircle(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 150, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SocialCircle" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
            __Common__.height(Adaptive.HomeTabHeight(this.currentBreakpoint));
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 152, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentPageIndex: this.currentPageIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTab" });
        }
        __Common__.pop();
        // [StartExclude navigation_diff_device]
        /**
         * SocialCircle page
         */
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.visibility(this.currentPageIndex === CurrentPage.SOCIAL_CIRCLE && this.currentBreakpoint ===
                'lg' ? Visibility.Visible : Visibility.None);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
            __Common__.backgroundColor({ "id": 50331671, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            __Common__.padding({
                top: { "id": 50331798, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331796, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331797, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 166, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentPageIndex: this.currentPageIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTab" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(BaseConstants.NINETY_WIDTH_PERCENT);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SocialCircle(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 174, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SocialCircle" });
        }
        __Common__.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /**
             * Me page
             */
            Flex.create({ direction: FlexDirection.Column });
            /**
             * Me page
             */
            Flex.width('100%');
            /**
             * Me page
             */
            Flex.height('100%');
            /**
             * Me page
             */
            Flex.visibility(this.currentPageIndex === CurrentPage.ME && this.currentBreakpoint !==
                'lg' ? Visibility.Visible : Visibility.None);
            /**
             * Me page
             */
            Flex.padding({
                top: deviceInfo.deviceType === '2in1' ? { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: deviceInfo.deviceType !== '2in1'
                    && this.currentBreakpoint !== 'lg' ? { "id": 50331831, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexGrow(1);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
            __Common__.height(Adaptive.HomeTabHeight(this.currentBreakpoint));
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 187, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentPageIndex: this.currentPageIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTab" });
        }
        __Common__.pop();
        /**
         * Me page
         */
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.visibility(this.currentPageIndex === CurrentPage.ME && this.currentBreakpoint ===
                'lg' ? Visibility.Visible : Visibility.None);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(Adaptive.HomeTabWidth(this.currentBreakpoint));
            __Common__.backgroundColor({ "id": 50331671, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            __Common__.padding({
                top: { "id": 50331798, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331796, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331797, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTab(this, { currentPageIndex: this.__currentPageIndex }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/Index.ets", line: 204, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentPageIndex: this.currentPageIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomeTab" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(BaseConstants.NINETY_WIDTH_PERCENT);
            Column.height('100%');
        }, Column);
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.multdevicecommunication", moduleName: "phone", pagePath: "../../../../../features/home/src/main/ets/pages/Index", pageFullPath: "features/home/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
