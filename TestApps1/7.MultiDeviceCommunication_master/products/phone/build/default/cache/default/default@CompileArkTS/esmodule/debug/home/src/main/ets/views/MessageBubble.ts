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
        this.avatar1 = { "id": 50331839, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
        this.avatar2 = { "id": 50331847, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
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
            Column.margin({ left: { "id": 50331811, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331812, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: this.isReceived ? FlexAlign.Start : FlexAlign.End, direction: FlexDirection.Row });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isReceived) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(ConversationListData.find((item) => item.name === this.receivedName)?.icon || this.avatar1);
                        Image.width({ "id": 50331679, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331679, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
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
            Column.width(BaseConstants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: this.isReceived ? Alignment.TopStart : Alignment.TopEnd });
            Stack.padding({
                top: { "id": 50331820, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331818, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331819, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331813, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            Stack.width(BaseConstants.FULL_WIDTH);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.commands('M-10 1 L0 18 L32 1 Z');
            Path.fillOpacity(HomeConstants.CONVERSATION_DETAIL_FILL_OPACITY);
            Path.stroke(Color.White);
            Path.strokeWidth(HomeConstants.CONVERSATION_DETAIL_STROKE_WIDTH);
            Path.fill(Color.White);
            Path.visibility(this.isReceived ? Visibility.Visible : Visibility.None);
        }, Path);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.commands('M23 1 L0 28 L-10 1 Z');
            Path.fillOpacity(HomeConstants.CONVERSATION_DETAIL_FILL_OPACITY);
            Path.stroke(Color.White);
            Path.strokeWidth(HomeConstants.CONVERSATION_DETAIL_STROKE_WIDTH);
            Path.fill(Color.White);
            Path.visibility(this.isReceived ? Visibility.None : Visibility.Visible);
            Path.zIndex(HomeConstants.CONTACTS_DETAIL_AVATAR_Z_INDEX);
            Path.margin({ right: { "id": 50331770, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Path);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                left: { "id": 50331815, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331816, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                top: { "id": 50331817, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331814, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
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
                        Image.width({ "id": 50331803, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331801, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
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
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ bottom: { "id": 50331754, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 50331879, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331749, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.width({ "id": 50331749, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331748, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(HomeConstants.APPLET_TITLE);
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontColor({ "id": 50331738, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.textAlign(TextAlign.Start);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.content);
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontColor({ "id": 50331738, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.textAlign(TextAlign.Start);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                        Text.margin({ bottom: { "id": 50331753, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        Text.copyOption(CopyOptions.LocalDevice);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create();
                        Flex.height({ "id": 50331751, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.width({ "id": 50331752, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.backgroundImage({ "id": 50331889, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Flex.backgroundImageSize({ width: { "id": 50331752, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, height: { "id": 50331751, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        Flex.constraintSize({ maxWidth: BaseConstants.FULL_WIDTH });
                        Flex.margin({ bottom: { "id": 50331750, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Flex);
                    Flex.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(HomeConstants.APPLET_DESCRIBE);
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontSize(BaseConstants.FONT_SIZE_TEN);
                        Text.fontColor({ "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
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
                        Column.alignItems(HorizontalAlign.Start);
                        Column.width({ "id": 50331787, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Column.margin({ bottom: { "id": 50331777, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ bottom: { "id": 50331778, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: { "id": 50331748, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                        __Common__.width({ "id": 50331786, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
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
                        Image.create({ "id": 50331850, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331780, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.width({ "id": 50331780, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331779, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ bottom: { "id": 50331784, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IntroduceText(this, { data: HomeConstants.DOCUMENT_SIZE, fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/MessageBubble.ets", line: 148, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        data: HomeConstants.DOCUMENT_SIZE,
                                        fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    data: HomeConstants.DOCUMENT_SIZE, fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                });
                            }
                        }, { name: "IntroduceText" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.color({ "id": 50331740, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Divider.strokeWidth(HomeConstants.DOCUMENT_DIVIDER_WIDTH);
                        Divider.margin({ bottom: { "id": 50331776, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Divider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 50331851, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.width({ "id": 50331783, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.height({ "id": 50331783, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Image.margin({ right: { "id": 50331782, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ top: { "id": 50331781, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IntroduceText(this, {
                                    data: HomeConstants.DOCUMENT_INTRODUCE,
                                    fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/MessageBubble.ets", line: 158, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        data: HomeConstants.DOCUMENT_INTRODUCE,
                                        fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    data: HomeConstants.DOCUMENT_INTRODUCE,
                                    fontColor: { "id": 50331670, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
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
                        Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                        Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                        Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                        Text.lineHeight({ "id": 50331766, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                        Text.fontColor({ "id": 50331738, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
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
