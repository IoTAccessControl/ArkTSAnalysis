if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationList_Params {
    currentBreakpoint?: string;
    currentConversationUserName?: Resource;
    currentContactUserName?: string;
    currentIndex?: number;
    pageInfo?: NavPathStack;
}
import { Adaptive } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { ConversationListData } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/ConversationViewModel";
import type { ConversationDataInterface } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/ConversationViewModel";
import { ConversationItem } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Conversation/ConversationItem";
import { HomeTopSearch } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/common/HomeTopSearch";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import deviceInfo from "@ohos:deviceInfo";
export class ConversationList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.__currentConversationUserName = new SynchedPropertyObjectTwoWayPU(params.currentConversationUserName, this, "currentConversationUserName");
        this.__currentContactUserName = new SynchedPropertySimpleTwoWayPU(params.currentContactUserName, this, "currentContactUserName");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__pageInfo = this.initializeConsume('pageInfo', "pageInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationList_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    updateStateVars(params: ConversationList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentConversationUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentConversationUserName.aboutToBeDeleted();
        this.__currentContactUserName.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
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
    private __currentConversationUserName: SynchedPropertySimpleOneWayPU<Resource>;
    get currentConversationUserName() {
        return this.__currentConversationUserName.get();
    }
    set currentConversationUserName(newValue: Resource) {
        this.__currentConversationUserName.set(newValue);
    }
    private __currentContactUserName: SynchedPropertySimpleTwoWayPU<string>;
    get currentContactUserName() {
        return this.__currentContactUserName.get();
    }
    set currentContactUserName(newValue: string) {
        this.__currentContactUserName.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
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
            Flex.create({ direction: FlexDirection.Column });
            Flex.height('100%');
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.height('13%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTopSearch(this, { title: HomeConstants.CONVERSATION_TITLE }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationList.ets", line: 34, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: HomeConstants.CONVERSATION_TITLE
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: HomeConstants.CONVERSATION_TITLE
                    });
                }
            }, { name: "HomeTopSearch" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start conversation_list]
            List.create();
            // [Start conversation_list]
            List.padding({
                bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint === 'lg' ? '28vp' : '0vp'
            });
            // [Start conversation_list]
            List.backgroundColor(Color.White);
            // [Start conversation_list]
            List.width('100%');
            // [Start conversation_list]
            List.height('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.height(Adaptive.ContactItemHeight(this.currentBreakpoint));
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.onClick(() => {
                                if (this.pageInfo.size() > 1) {
                                    this.pageInfo.pop();
                                }
                                this.pageInfo.pushPath({ name: 'ConversationDetail' });
                                this.currentConversationUserName = item.name;
                                this.currentContactUserName = '';
                                this.currentIndex = index;
                            });
                            __Common__.backgroundColor(this.currentIndex === index ? '#33D8D8D8' : Color.White);
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ConversationItem(this, item, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ConversationList.ets", line: 40, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return item;
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "ConversationItem" });
                        }
                        __Common__.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, ConversationListData, forEachItemGenFunction, (item: ConversationDataInterface, index: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        // [Start conversation_list]
        List.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
