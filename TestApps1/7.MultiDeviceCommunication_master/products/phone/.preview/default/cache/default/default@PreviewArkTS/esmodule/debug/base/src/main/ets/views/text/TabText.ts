if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabText_Params {
    data?: string;
    resourceData?: Resource;
    fontSize?: Resource;
    fontColor?: Resource;
    fontWeight?: number;
    fontFamily?: Resource;
}
import { BaseConstants } from "@bundle:com.example.multdevicecommunication/phone@base/ets/constants/BaseConstants";
export class TabText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__data = new SynchedPropertySimpleOneWayPU(params.data, this, "data");
        this.__resourceData = new SynchedPropertyObjectOneWayPU(params.resourceData, this, "resourceData");
        this.__fontSize = new SynchedPropertyObjectOneWayPU(params.fontSize, this, "fontSize");
        this.__fontColor = new SynchedPropertyObjectOneWayPU(params.fontColor, this, "fontColor");
        this.__fontWeight = new SynchedPropertySimpleOneWayPU(params.fontWeight, this, "fontWeight");
        this.__fontFamily = new SynchedPropertyObjectOneWayPU(params.fontFamily, this, "fontFamily");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabText_Params) {
        if (params.data === undefined) {
            this.__data.set('');
        }
        if (params.fontSize === undefined) {
            this.__fontSize.set(BaseConstants.SMALL_MINI_FONT_SIZE);
        }
        if (params.fontColor === undefined) {
            this.__fontColor.set({ "id": 50331671, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }
        if (params.fontWeight === undefined) {
            this.__fontWeight.set(BaseConstants.FONT_WEIGHT_FIVE);
        }
        if (params.fontFamily === undefined) {
            this.__fontFamily.set(BaseConstants.FONT_FAMILY_MEDIUM);
        }
    }
    updateStateVars(params: TabText_Params) {
        this.__data.reset(params.data);
        this.__resourceData.reset(params.resourceData);
        this.__fontSize.reset(params.fontSize);
        this.__fontColor.reset(params.fontColor);
        this.__fontWeight.reset(params.fontWeight);
        this.__fontFamily.reset(params.fontFamily);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__data.purgeDependencyOnElmtId(rmElmtId);
        this.__resourceData.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
        this.__fontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__fontWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__fontFamily.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__resourceData.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        this.__fontColor.aboutToBeDeleted();
        this.__fontWeight.aboutToBeDeleted();
        this.__fontFamily.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __data: SynchedPropertySimpleOneWayPU<string>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: string) {
        this.__data.set(newValue);
    }
    private __resourceData: SynchedPropertySimpleOneWayPU<Resource>;
    get resourceData() {
        return this.__resourceData.get();
    }
    set resourceData(newValue: Resource) {
        this.__resourceData.set(newValue);
    }
    private __fontSize: SynchedPropertySimpleOneWayPU<Resource>;
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: Resource) {
        this.__fontSize.set(newValue);
    }
    private __fontColor: SynchedPropertySimpleOneWayPU<Resource>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: Resource) {
        this.__fontColor.set(newValue);
    }
    private __fontWeight: SynchedPropertySimpleOneWayPU<number>;
    get fontWeight() {
        return this.__fontWeight.get();
    }
    set fontWeight(newValue: number) {
        this.__fontWeight.set(newValue);
    }
    private __fontFamily: SynchedPropertySimpleOneWayPU<Resource>;
    get fontFamily() {
        return this.__fontFamily.get();
    }
    set fontFamily(newValue: Resource) {
        this.__fontFamily.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.data || this.resourceData);
            Text.debugLine("common/base/src/main/ets/views/text/TabText.ets(28:5)", "base");
            Text.fontFamily(ObservedObject.GetRawObject(this.fontFamily));
            Text.fontSize(ObservedObject.GetRawObject(this.fontSize));
            Text.fontColor(ObservedObject.GetRawObject(this.fontColor));
            Text.textAlign(TextAlign.Center);
            Text.lineHeight({ "id": 50331699, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.fontWeight(this.fontWeight);
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
