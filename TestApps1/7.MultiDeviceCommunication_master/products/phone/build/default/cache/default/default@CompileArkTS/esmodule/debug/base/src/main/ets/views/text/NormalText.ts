if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NormalText_Params {
    data?: ResourceStr;
    fontSize?: Resource;
    fontColor?: Resource;
    fontWeight?: number;
    fontFamily?: Resource;
}
import { BaseConstants } from "@bundle:com.example.multdevicecommunication/phone@base/ets/constants/BaseConstants";
export class NormalText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__data = new SynchedPropertyObjectOneWayPU(params.data, this, "data");
        this.__fontSize = new SynchedPropertyObjectOneWayPU(params.fontSize, this, "fontSize");
        this.__fontColor = new SynchedPropertyObjectOneWayPU(params.fontColor, this, "fontColor");
        this.__fontWeight = new SynchedPropertySimpleOneWayPU(params.fontWeight, this, "fontWeight");
        this.__fontFamily = new SynchedPropertyObjectOneWayPU(params.fontFamily, this, "fontFamily");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NormalText_Params) {
        if (params.fontSize === undefined) {
            this.__fontSize.set(BaseConstants.FONT_SIZE_TWELVE);
        }
        if (params.fontColor === undefined) {
            this.__fontColor.set({ "id": 50331675, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }
        if (params.fontWeight === undefined) {
            this.__fontWeight.set(BaseConstants.FONT_WEIGHT_FOUR);
        }
        if (params.fontFamily === undefined) {
            this.__fontFamily.set(BaseConstants.FONT_FAMILY_NORMAL);
        }
    }
    updateStateVars(params: NormalText_Params) {
        this.__data.reset(params.data);
        this.__fontSize.reset(params.fontSize);
        this.__fontColor.reset(params.fontColor);
        this.__fontWeight.reset(params.fontWeight);
        this.__fontFamily.reset(params.fontFamily);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__data.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
        this.__fontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__fontWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__fontFamily.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        this.__fontColor.aboutToBeDeleted();
        this.__fontWeight.aboutToBeDeleted();
        this.__fontFamily.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __data: SynchedPropertySimpleOneWayPU<ResourceStr>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: ResourceStr) {
        this.__data.set(newValue);
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
            Text.create(this.data);
            Text.fontFamily(ObservedObject.GetRawObject(this.fontFamily));
            Text.fontSize(ObservedObject.GetRawObject(this.fontSize));
            Text.fontColor(ObservedObject.GetRawObject(this.fontColor));
            Text.textAlign(TextAlign.Start);
            Text.lineHeight({ "id": 50331704, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.fontWeight(this.fontWeight);
            Text.copyOption(CopyOptions.LocalDevice);
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
