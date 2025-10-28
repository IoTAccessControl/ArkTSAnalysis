if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationDetailTopSearch_Params {
    currentBreakpoint?: string;
    currentConversationUserName?: string;
    pageInfo?: NavPathStack;
}
import { BaseConstants, BreakpointConstants, StandardIcon } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import deviceInfo from "@ohos:deviceInfo";
export class ConversationDetailTopSearch extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__currentConversationUserName = new SynchedPropertySimpleTwoWayPU(params.currentConversationUserName, this, "currentConversationUserName");
        this.__pageInfo = this.initializeConsume('pageInfo', "pageInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationDetailTopSearch_Params) {
    }
    updateStateVars(params: ConversationDetailTopSearch_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentConversationUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentConversationUserName.aboutToBeDeleted();
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
    private __currentConversationUserName: SynchedPropertySimpleTwoWayPU<string>;
    get currentConversationUserName() {
        return this.__currentConversationUserName.get();
    }
    set currentConversationUserName(newValue: string) {
        this.__currentConversationUserName.set(newValue);
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
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("features/home/src/main/ets/views/Conversation/ConversationDetailTopSearch.ets(27:5)", "home");
            Flex.width(BaseConstants.FULL_WIDTH);
            Flex.height(BaseConstants.FULL_HEIGHT);
            Flex.padding({ left: { "id": 50331692, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331692, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331860, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331797, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.onClick(() => {
                if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
                    this.pageInfo.clear();
                }
                else if (this.pageInfo.size() === 1) {
                    this.pageInfo.clear();
                    this.pageInfo.pushPath({ name: 'ConversationDetailNone' });
                }
                else {
                    this.pageInfo.clear();
                    this.pageInfo.pushPath({ name: 'ConversationDetailNone' });
                }
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StandardIcon(this, { icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/Conversation/ConversationDetailTopSearch.ets", line: 28, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }
            }, { name: "StandardIcon" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentConversationUserName || HomeConstants.CONVERSATION_DETAIL_TOP_TITLE);
            Text.debugLine("features/home/src/main/ets/views/Conversation/ConversationDetailTopSearch.ets(40:7)", "home");
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
            Text.fontSize(BaseConstants.FONT_SIZE_EIGHTEEN);
            Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
            Text.fontColor({ "id": 50331881, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StandardIcon(this, { icon: { "id": 50331762, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/Conversation/ConversationDetailTopSearch.ets", line: 45, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            icon: { "id": 50331762, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        icon: { "id": 50331762, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }
            }, { name: "StandardIcon" });
        }
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
