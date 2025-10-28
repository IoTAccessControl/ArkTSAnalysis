if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConversationDetailNone_Params {
}
import { BaseConstants } from "@bundle:com.example.multdevicecommunication/phone@base/ets/constants/BaseConstants";
import deviceInfo from "@ohos:deviceInfo";
export default class ConversationDetailNone extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConversationDetailNone_Params) {
    }
    updateStateVars(params: ConversationDetailNone_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
                    Flex.backgroundColor({ "id": 50331739, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Flex.height(BaseConstants.FULL_HEIGHT);
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 50331852, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Image.width({ "id": 50331774, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Image.height({ "id": 50331773, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                }, Image);
                Flex.pop();
            }, { moduleName: "phone", pagePath: "features/home/src/main/ets/views/Conversation/ConversationDetailNone" });
            NavDestination.padding({
                top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
