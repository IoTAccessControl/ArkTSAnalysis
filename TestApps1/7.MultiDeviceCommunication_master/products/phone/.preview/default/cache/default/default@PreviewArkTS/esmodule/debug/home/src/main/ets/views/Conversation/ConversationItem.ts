if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationItem_Params {
    currentBreakpoint?: string;
    name?: Resource;
    msg?: Resource;
    time?: ResourceStr;
    icon?: Resource;
}
import { BaseConstants, BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
export class ConversationItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.name = undefined;
        this.msg = undefined;
        this.time = undefined;
        this.icon = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationItem_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
    }
    updateStateVars(params: ConversationItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
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
    private name?: Resource;
    private msg?: Resource;
    private time?: ResourceStr;
    private icon?: Resource;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(28:5)", "home");
            Flex.width(BaseConstants.FULL_WIDTH);
            Flex.padding({ "id": 50331793, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(29:7)", "home");
            Column.width({ "id": 50331674, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Column.margin({ left: { "id": 50331692, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331691, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.icon);
            Image.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(30:9)", "home");
            Image.height({ "id": 50331674, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.width({ "id": 50331674, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
            Flex.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(37:7)", "home");
            Flex.flexShrink(BaseConstants.FLEX_SHRINK_ONE);
            Flex.margin({ left: { "id": 50331691, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.name);
            Text.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(38:9)", "home");
            Text.fontSize(BaseConstants.FONT_SIZE_SIXTEEN);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
            Text.lineHeight({ "id": 50331702, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.msg);
            Text.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(43:9)", "home");
            Text.maxLines(HomeConstants.CONVERSATION_DETAIL_MAX_LINE);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontSize(BaseConstants.FONT_SIZE_FOURTEEN);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
            Text.lineHeight({ "id": 50331700, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
            Text.fontColor(Color.Grey);
            Text.width(BaseConstants.FULL_WIDTH);
        }, Text);
        Text.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(56:7)", "home");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(57:7)", "home");
            Column.flexBasis(HomeConstants.FLEX_BASIS_AUTO);
            Column.margin({ left: { "id": 50331692, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331691, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.time);
            Text.debugLine("features/home/src/main/ets/views/Conversation/ConversationItem.ets(58:9)", "home");
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
            Text.fontSize(BaseConstants.FONT_SIZE_TEN);
            Text.fontColor(Color.Grey);
            Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
            Text.width({ "id": 50331794, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Text);
        Text.pop();
        Column.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
