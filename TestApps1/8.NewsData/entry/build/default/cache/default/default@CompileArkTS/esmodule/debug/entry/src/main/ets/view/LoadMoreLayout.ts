if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoadMoreLayout_Params {
    loadMoreLayoutClass?: CustomRefreshLoadLayoutClass;
    customRefreshLoadClass?: CustomRefreshLoadLayoutClass;
}
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
export default class LoadMoreLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__loadMoreLayoutClass = new SynchedPropertyNesedObjectPU(params.loadMoreLayoutClass, this, "loadMoreLayoutClass");
        this.__customRefreshLoadClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue), this, "customRefreshLoadClass");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("loadMoreLayoutClass", this.newCustom);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoadMoreLayout_Params) {
        this.__loadMoreLayoutClass.set(params.loadMoreLayoutClass);
        if (params.customRefreshLoadClass !== undefined) {
            this.customRefreshLoadClass = params.customRefreshLoadClass;
        }
    }
    updateStateVars(params: LoadMoreLayout_Params) {
        this.__loadMoreLayoutClass.set(params.loadMoreLayoutClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__loadMoreLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__loadMoreLayoutClass.aboutToBeDeleted();
        this.__customRefreshLoadClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __loadMoreLayoutClass: SynchedPropertyNesedObjectPU<CustomRefreshLoadLayoutClass>;
    get loadMoreLayoutClass() {
        return this.__loadMoreLayoutClass.get();
    }
    private __customRefreshLoadClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    set customRefreshLoadClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__customRefreshLoadClass.set(newValue);
    }
    newCustom() {
        if (this.loadMoreLayoutClass.isVisible) {
            this.customRefreshLoadClass = new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue);
        }
        else {
            this.customRefreshLoadClass = new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible, this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, 0);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loadMoreLayoutClass.isVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: this.customRefreshLoadClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/LoadMoreLayout.ets", line: 42, col: 9 });
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
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: this.customRefreshLoadClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/LoadMoreLayout.ets", line: 44, col: 9 });
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
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
