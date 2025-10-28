if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MessageBubble_Params {
    currentBreakpoint?: string;
    receivedName?: Resource;
    currentFeatureIndex?: number;
    isReceived?: boolean;
    content?: ResourceStr;
    isAppletMsg?: boolean;
    isDocumentMsg?: boolean;
    avatar1?: Resource;
    avatar2?: Resource;
}
import { BaseConstants, BreakpointConstants, IntroduceText, NormalText } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import { ConversationListData } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/ConversationViewModel";
export class MessageBubble extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__receivedName = new SynchedPropertyObjectTwoWayPU(params.receivedName, this, "receivedName");
        this.__currentFeatureIndex = new SynchedPropertySimpleTwoWayPU(params.currentFeatureIndex, this, "currentFeatureIndex");
        this.isReceived = !HomeConstants.IS_RECEIVED;
        this.content = "";
        this.isAppletMsg = undefined;
        this.isDocumentMsg = undefined;
        this.avatar1 = { "id": 50331713, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
        this.avatar2 = { "id": 50331714, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MessageBubble_Params) {
        if (params.isReceived !== undefined) {
            this.isReceived = params.isReceived;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.isAppletMsg !== undefined) {
            this.isAppletMsg = params.isAppletMsg;
        }
        if (params.isDocumentMsg !== undefined) {
            this.isDocumentMsg = params.isDocumentMsg;
        }
        if (params.avatar1 !== undefined) {
            this.avatar1 = params.avatar1;
        }
        if (params.avatar2 !== undefined) {
            this.avatar2 = params.avatar2;
        }
    }
    updateStateVars(params: MessageBubble_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__receivedName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentFeatureIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__receivedName.aboutToBeDeleted();
        this.__currentFeatureIndex.aboutToBeDeleted();
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
    private __receivedName: SynchedPropertySimpleOneWayPU<Resource>;
    get receivedName() {
        return this.__receivedName.get();
    }
    set receivedName(newValue: Resource) {
        this.__receivedName.set(newValue);
    }
    private __currentFeatureIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentFeatureIndex() {
        return this.__currentFeatureIndex.get();
    }
    set currentFeatureIndex(newValue: number) {
        this.__currentFeatureIndex.set(newValue);
    }
    private isReceived: boolean;
    private content: ResourceStr;
    private isAppletMsg?: boolean;
    private isDocumentMsg?: boolean;
    private avatar1: Resource;
    private avatar2: Resource;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/views/MessageBubble.ets(33:5)", "home");
            Column.margin({ left: { "id": 50331833, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331834, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: this.isReceived ? FlexAlign.Start : FlexAlign.End, direction: FlexDirection.Row });
            Flex.debugLine("features/home/src/main/ets/views/MessageBubble.ets(34:7)", "home");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isReceived) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(ConversationListData.find((item) => item.name === this.receivedName)?.icon || this.avatar1);
                        Image.debugLine("features/home/src/main/ets/views/MessageBubble.ets(36:11)", "home");
                        Image.width({ "id": 50331674, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331674, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.flexShrink(BaseConstants.FLEX_SHRINK_ZERO);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/views/MessageBubble.ets(41:9)", "home");
            Column.width(BaseConstants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: this.isReceived ? Alignment.TopStart : Alignment.TopEnd });
            Stack.debugLine("features/home/src/main/ets/views/MessageBubble.ets(42:11)", "home");
            Stack.padding({
                top: { "id": 50331842, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331840, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331841, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331835, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            Stack.width(BaseConstants.FULL_WIDTH);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.debugLine("features/home/src/main/ets/views/MessageBubble.ets(43:13)", "home");
            Path.commands('M-10 1 L0 18 L32 1 Z');
            Path.fillOpacity(HomeConstants.CONVERSATION_DETAIL_FILL_OPACITY);
            Path.stroke(Color.White);
            Path.strokeWidth(HomeConstants.CONVERSATION_DETAIL_STROKE_WIDTH);
            Path.fill(Color.White);
            Path.visibility(this.isReceived ? Visibility.Visible : Visibility.None);
        }, Path);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.debugLine("features/home/src/main/ets/views/MessageBubble.ets(50:13)", "home");
            Path.commands('M23 1 L0 28 L-10 1 Z');
            Path.fillOpacity(HomeConstants.CONVERSATION_DETAIL_FILL_OPACITY);
            Path.stroke(Color.White);
            Path.strokeWidth(HomeConstants.CONVERSATION_DETAIL_STROKE_WIDTH);
            Path.fill(Color.White);
            Path.visibility(this.isReceived ? Visibility.None : Visibility.Visible);
            Path.zIndex(HomeConstants.CONTACTS_DETAIL_AVATAR_Z_INDEX);
            Path.margin({ right: { "id": 50331792, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Path);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/views/MessageBubble.ets(59:13)", "home");
            Column.padding({
                left: { "id": 50331837, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                top: { "id": 50331839, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331836, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            Column.backgroundColor(Color.White);
            Column.borderRadius(HomeConstants.PATH_BORDER_RADIUS);
        }, Column);
        this.MessageContent.bind(this)();
        Column.pop();
        Stack.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isReceived) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.avatar2);
                        Image.debugLine("features/home/src/main/ets/views/MessageBubble.ets(82:11)", "home");
                        Image.width({ "id": 50331825, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331823, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.flexShrink(BaseConstants.FLEX_SHRINK_ZERO);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Flex.pop();
        Column.pop();
    }
    MessageContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isAppletMsg) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("features/home/src/main/ets/views/MessageBubble.ets(95:7)", "home");
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("features/home/src/main/ets/views/MessageBubble.ets(96:9)", "home");
                        Row.margin({ bottom: { "id": 50331776, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 50331755, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.debugLine("features/home/src/main/ets/views/MessageBubble.ets(97:11)", "home");
                        Image.height({ "id": 50331771, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.width({ "id": 50331771, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331770, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(HomeConstants.APPLET_TITLE);
                        Text.debugLine("features/home/src/main/ets/views/MessageBubble.ets(101:11)", "home");
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontColor({ "id": 50331881, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.textAlign(TextAlign.Start);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.content);
                        Text.debugLine("features/home/src/main/ets/views/MessageBubble.ets(110:9)", "home");
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontColor({ "id": 50331881, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.textAlign(TextAlign.Start);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                        Text.margin({ bottom: { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        Text.copyOption(CopyOptions.LocalDevice);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create();
                        Flex.debugLine("features/home/src/main/ets/views/MessageBubble.ets(118:9)", "home");
                        Flex.height({ "id": 50331773, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.width({ "id": 50331774, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.backgroundImage({ "id": 50331879, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.backgroundImageSize({ width: { "id": 50331774, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, height: { "id": 50331773, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        Flex.constraintSize({ maxWidth: BaseConstants.FULL_WIDTH });
                        Flex.margin({ bottom: { "id": 50331772, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Flex);
                    Flex.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(HomeConstants.APPLET_DESCRIBE);
                        Text.debugLine("features/home/src/main/ets/views/MessageBubble.ets(127:9)", "home");
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TEN);
                        Text.fontColor({ "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.textAlign(TextAlign.Start);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.isDocumentMsg) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("features/home/src/main/ets/views/MessageBubble.ets(136:7)", "home");
                        Column.alignItems(HorizontalAlign.Start);
                        Column.width({ "id": 50331809, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Column.margin({ bottom: { "id": 50331799, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("features/home/src/main/ets/views/MessageBubble.ets(137:9)", "home");
                        Row.margin({ bottom: { "id": 50331800, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: { "id": 50331770, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        __Common__.width({ "id": 50331808, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NormalText(this, { data: this.content }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/MessageBubble.ets", line: 138, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        data: this.content
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    data: this.content
                                });
                            }
                        }, { name: "NormalText" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 50331726, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.debugLine("features/home/src/main/ets/views/MessageBubble.ets(141:11)", "home");
                        Image.height({ "id": 50331802, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.width({ "id": 50331802, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331801, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ bottom: { "id": 50331806, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IntroduceText(this, { data: HomeConstants.DOCUMENT_SIZE, fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/MessageBubble.ets", line: 148, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        data: HomeConstants.DOCUMENT_SIZE,
                                        fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    data: HomeConstants.DOCUMENT_SIZE, fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                });
                            }
                        }, { name: "IntroduceText" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.debugLine("features/home/src/main/ets/views/MessageBubble.ets(150:9)", "home");
                        Divider.color({ "id": 50331883, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Divider.strokeWidth(HomeConstants.DOCUMENT_DIVIDER_WIDTH);
                        Divider.margin({ bottom: { "id": 50331798, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Divider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("features/home/src/main/ets/views/MessageBubble.ets(153:9)", "home");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 50331862, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.debugLine("features/home/src/main/ets/views/MessageBubble.ets(154:11)", "home");
                        Image.width({ "id": 50331805, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331805, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331804, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ top: { "id": 50331803, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IntroduceText(this, {
                                    data: HomeConstants.DOCUMENT_INTRODUCE,
                                    fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/MessageBubble.ets", line: 158, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        data: HomeConstants.DOCUMENT_INTRODUCE,
                                        fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    data: HomeConstants.DOCUMENT_INTRODUCE,
                                    fontColor: { "id": 50331665, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                });
                            }
                        }, { name: "IntroduceText" });
                    }
                    __Common__.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.content);
                        Text.debugLine("features/home/src/main/ets/views/MessageBubble.ets(169:7)", "home");
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                        Text.lineHeight({ "id": 50331788, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.fontColor({ "id": 50331881, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.copyOption(CopyOptions.LocalDevice);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
