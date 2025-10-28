if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RefreshLayout_Params {
    refreshLayoutClass?: CustomRefreshLoadLayoutClass;
    customRefreshLoadClass?: CustomRefreshLoadLayoutClass;
}
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
export default class RefreshLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__refreshLayoutClass = new SynchedPropertyNesedObjectPU(params.refreshLayoutClass, this, "refreshLayoutClass");
        this.__customRefreshLoadClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue), this, "customRefreshLoadClass");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("refreshLayoutClass", this.newCustom);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RefreshLayout_Params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
        if (params.customRefreshLoadClass !== undefined) {
            this.customRefreshLoadClass = params.customRefreshLoadClass;
        }
    }
    updateStateVars(params: RefreshLayout_Params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__refreshLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__refreshLayoutClass.aboutToBeDeleted();
        this.__customRefreshLoadClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __refreshLayoutClass: SynchedPropertyNesedObjectPU<CustomRefreshLoadLayoutClass>;
    get refreshLayoutClass() {
        return this.__refreshLayoutClass.get();
    }
    private __customRefreshLoadClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    set customRefreshLoadClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__customRefreshLoadClass.set(newValue);
    }
    newCustom() {
        this.customRefreshLoadClass =
            new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/RefreshLayout.ets(38:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.refreshLayoutClass.isVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: this.customRefreshLoadClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/RefreshLayout.ets", line: 40, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        customRefreshLoadClass: this.customRefreshLoadClass
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    customRefreshLoadClass: this.customRefreshLoadClass
                                });
                            }
                        }, { name: "CustomRefreshLoadLayout" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
