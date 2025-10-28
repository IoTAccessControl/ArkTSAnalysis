if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationDetailItem_Params {
    currentFeatureIndex?: number;
    receivedName?: string;
    isReceived?: boolean;
    content?: ResourceStr;
    isAppletMsg?: boolean;
    isDocumentMsg?: boolean;
}
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import { MessageBubble } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/MessageBubble";
export default class ConversationDetailItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentFeatureIndex = new SynchedPropertySimpleTwoWayPU(params.currentFeatureIndex, this, "currentFeatureIndex");
        this.__receivedName = new SynchedPropertySimpleTwoWayPU(params.receivedName, this, "receivedName");
        this.isReceived = !HomeConstants.IS_RECEIVED;
        this.content = '';
        this.isAppletMsg = undefined;
        this.isDocumentMsg = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationDetailItem_Params) {
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
    }
    updateStateVars(params: ConversationDetailItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentFeatureIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__receivedName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentFeatureIndex.aboutToBeDeleted();
        this.__receivedName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentFeatureIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentFeatureIndex() {
        return this.__currentFeatureIndex.get();
    }
    set currentFeatureIndex(newValue: number) {
        this.__currentFeatureIndex.set(newValue);
    }
    private __receivedName: SynchedPropertySimpleTwoWayPU<string>;
    get receivedName() {
        return this.__receivedName.get();
    }
    set receivedName(newValue: string) {
        this.__receivedName.set(newValue);
    }
    private isReceived: boolean;
    private content: ResourceStr;
    private isAppletMsg?: boolean;
    private isDocumentMsg?: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.End, alignItems: ItemAlign.End });
            Flex.debugLine("features/home/src/main/ets/views/Conversation/ConversationDetailItem.ets(29:5)", "home");
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MessageBubble(this, {
                        receivedName: this.__receivedName,
                        currentFeatureIndex: this.__currentFeatureIndex,
                        isReceived: this.isReceived,
                        content: this.content,
                        isAppletMsg: this.isAppletMsg,
                        isDocumentMsg: this.isDocumentMsg
                    }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/Conversation/ConversationDetailItem.ets", line: 30, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            receivedName: this.receivedName,
                            currentFeatureIndex: this.currentFeatureIndex,
                            isReceived: this.isReceived,
                            content: this.content,
                            isAppletMsg: this.isAppletMsg,
                            isDocumentMsg: this.isDocumentMsg
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MessageBubble" });
        }
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
