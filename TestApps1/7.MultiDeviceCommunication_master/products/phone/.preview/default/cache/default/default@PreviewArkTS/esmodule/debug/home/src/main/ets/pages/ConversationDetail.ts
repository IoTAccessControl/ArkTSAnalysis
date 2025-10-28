if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationDetail_Params {
    currentBreakpoint?: string;
    currentConversationUserName?: string;
    currentFeatureIndex?: number;
    pageInfo?: NavPathStack;
}
import { Adaptive } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { ConversationDetailBottom } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Conversation/ConversationDetailBottom";
import ConversationDetailItem from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Conversation/ConversationDetailItem";
import { ConversationDetailTopSearch } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Conversation/ConversationDetailTopSearch";
import deviceInfo from "@ohos:deviceInfo";
export class ConversationDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.__currentConversationUserName = new SynchedPropertySimpleOneWayPU(params.currentConversationUserName, this, "currentConversationUserName");
        this.__currentFeatureIndex = new SynchedPropertySimpleOneWayPU(params.currentFeatureIndex, this, "currentFeatureIndex");
        this.__pageInfo = this.initializeConsume('pageInfo', "pageInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationDetail_Params) {
    }
    updateStateVars(params: ConversationDetail_Params) {
        this.__currentConversationUserName.reset(params.currentConversationUserName);
        this.__currentFeatureIndex.reset(params.currentFeatureIndex);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentConversationUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentFeatureIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentConversationUserName.aboutToBeDeleted();
        this.__currentFeatureIndex.aboutToBeDeleted();
        this.__pageInfo.aboutToBeDeleted();
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
    private __currentConversationUserName: SynchedPropertySimpleOneWayPU<string>;
    get currentConversationUserName() {
        return this.__currentConversationUserName.get();
    }
    set currentConversationUserName(newValue: string) {
        this.__currentConversationUserName.set(newValue);
    }
    private __currentFeatureIndex: SynchedPropertySimpleOneWayPU<number>;
    get currentFeatureIndex() {
        return this.__currentFeatureIndex.get();
    }
    set currentFeatureIndex(newValue: number) {
        this.__currentFeatureIndex.set(newValue);
    }
    private __pageInfo: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfo() {
        return this.__pageInfo.get();
    }
    set pageInfo(newValue: NavPathStack) {
        this.__pageInfo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ direction: FlexDirection.Column });
                    Flex.debugLine("features/home/src/main/ets/pages/ConversationDetail.ets(33:7)", "home");
                    Flex.height('100%');
                    Flex.width('100%');
                    Flex.backgroundColor({ "id": 50331664, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Flex.padding({
                        bottom: deviceInfo.deviceType !== '2in1' ? '28vp' : '0vp'
                    });
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.height(Adaptive.ContactItemHeight(this.currentBreakpoint));
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ConversationDetailTopSearch(this, { currentConversationUserName: this.__currentConversationUserName, }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 34, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    currentConversationUserName: this.currentConversationUserName
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ConversationDetailTopSearch" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.currentConversationUserName.length === 3) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: true,
                                            content: '芬芬邀请你喝奶茶啦',
                                            isAppletMsg: true,
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 37, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: true,
                                                content: '芬芬邀请你喝奶茶啦',
                                                isAppletMsg: true,
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: true,
                                            content: '请你喝奶茶，快点单吧！！速度速度，就差你了',
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 44, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: true,
                                                content: '请你喝奶茶，快点单吧！！速度速度，就差你了',
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: false,
                                            content: '哈哈，今天有什么喜事说来听听',
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 50, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: false,
                                                content: '哈哈，今天有什么喜事说来听听',
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: true,
                                            content: '市场部2023年新产品宣传规划',
                                            isDocumentMsg: true,
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 57, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: true,
                                                content: '市场部2023年新产品宣传规划',
                                                isDocumentMsg: true,
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: true,
                                            content: '这是明天会议的资料，请发给Jack，让他确认',
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 64, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: true,
                                                content: '这是明天会议的资料，请发给Jack，让他确认',
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ConversationDetailItem(this, {
                                            receivedName: this.__currentConversationUserName,
                                            isReceived: false,
                                            content: '好的，我明天过去',
                                            currentFeatureIndex: this.__currentFeatureIndex
                                        }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 70, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                receivedName: this.currentConversationUserName,
                                                isReceived: false,
                                                content: '好的，我明天过去',
                                                currentFeatureIndex: this.currentFeatureIndex
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ConversationDetailItem" });
                            }
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                    Blank.debugLine("features/home/src/main/ets/pages/ConversationDetail.ets(77:9)", "home");
                }, Blank);
                Blank.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ConversationDetailBottom(this, {}, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationDetail.ets", line: 78, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ConversationDetailBottom" });
                }
                Flex.pop();
            }, { moduleName: "phone", pagePath: "features/home/src/main/ets/pages/ConversationDetail" });
            NavDestination.hideTitleBar(true);
            NavDestination.debugLine("features/home/src/main/ets/pages/ConversationDetail.ets(32:5)", "home");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
