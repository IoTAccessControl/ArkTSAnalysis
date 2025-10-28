if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentBreakpoint?: string;
}
import { Home } from "@bundle:com.example.multdevicecommunication/phone@home/Index";
import { BaseConstants, BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: {
                    sm: BreakpointConstants.GRID_ROW_COLUMNS[2],
                    md: BreakpointConstants.GRID_ROW_COLUMNS[0],
                    lg: BreakpointConstants.GRID_ROW_COLUMNS[0]
                }
            });
            GridRow.onBreakpointChange((breakPoints) => {
                this.currentBreakpoint = breakPoints;
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: {
                    sm: BreakpointConstants.GRID_COLUMN_SPANS[5],
                    md: BreakpointConstants.GRID_COLUMN_SPANS[0],
                    lg: BreakpointConstants.GRID_COLUMN_SPANS[0]
                } });
            GridCol.height(BaseConstants.FULL_PERCENT);
            GridCol.width(BaseConstants.FULL_PERCENT);
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(BaseConstants.FULL_HEIGHT);
            Column.height(BaseConstants.FULL_HEIGHT);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Home(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 38, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Home" });
        }
        Column.pop();
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.multdevicecommunication", moduleName: "phone", pagePath: "pages/Index", pageFullPath: "products/phone/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
