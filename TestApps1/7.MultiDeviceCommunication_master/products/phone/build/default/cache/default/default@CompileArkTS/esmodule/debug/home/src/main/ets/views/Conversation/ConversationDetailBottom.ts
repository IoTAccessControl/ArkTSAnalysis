if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationDetailBottom_Params {
}
import { BaseConstants } from "@bundle:com.example.multdevicecommunication/phone@base/ets/constants/BaseConstants";
import { StandardIcon } from "@bundle:com.example.multdevicecommunication/phone@base/ets/views/image/StandardIcon";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
export class ConversationDetailBottom extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationDetailBottom_Params) {
    }
    updateStateVars(params: ConversationDetailBottom_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    CustomKeyboardBuilder(parent = null) { }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center });
            Flex.width(BaseConstants.FULL_WIDTH);
            Flex.height({ "id": 50331767, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexBasis(HomeConstants.FLEX_BASIS_AUTO);
            Column.padding({
                right: { "id": 50331768, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331768, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StandardIcon(this, { icon: { "id": 50331862, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/Conversation/ConversationDetailBottom.ets", line: 26, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            icon: { "id": 50331862, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        icon: { "id": 50331862, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }
            }, { name: "StandardIcon" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create();
            TextArea.placeholderColor({ "id": 50331745, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextArea.caretColor({ "id": 50331744, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextArea.backgroundColor({ "id": 50331743, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextArea.borderRadius(HomeConstants.CONVERSATION_DETAIL_BOTTOM_TEXT_RADIUS);
            TextArea.flexGrow(BaseConstants.FLEX_GROW_ONE);
            TextArea.padding({ right: { "id": 50331769, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
            TextArea.backgroundColor(Color.White);
            TextArea.enableKeyboardOnFocus(false);
            TextArea.customKeyboard({ builder: () => {
                    this.CustomKeyboardBuilder.call(this);
                } });
        }, TextArea);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                right: { "id": 50331768, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                left: { "id": 50331768, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StandardIcon(this, { icon: { "id": 50331853, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/Conversation/ConversationDetailBottom.ets", line: 49, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            icon: { "id": 50331853, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        icon: { "id": 50331853, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }
            }, { name: "StandardIcon" });
        }
        Column.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
