if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StandardIcon_Params {
    icon?: Resource;
}
export class StandardIcon extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__icon = new SynchedPropertyObjectOneWayPU(params.icon, this, "icon");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StandardIcon_Params) {
    }
    updateStateVars(params: StandardIcon_Params) {
        this.__icon.reset(params.icon);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__icon.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __icon: SynchedPropertySimpleOneWayPU<Resource>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: Resource) {
        this.__icon.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.icon);
            Image.debugLine("common/base/src/main/ets/views/image/StandardIcon.ets(21:5)", "base");
            Image.width({ "id": 50331690, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.height({ "id": 50331693, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Image);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
