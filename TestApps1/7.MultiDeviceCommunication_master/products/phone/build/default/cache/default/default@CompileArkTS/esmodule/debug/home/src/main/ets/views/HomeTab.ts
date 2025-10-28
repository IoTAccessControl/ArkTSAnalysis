if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeTab_Params {
    currentBreakpoint?: string;
    currentPageIndex?: number;
}
import { BaseConstants, BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { ButtonInfo } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/BottomTabViewModel";
import type { TabInfoModel } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
export class HomeTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__currentPageIndex = new SynchedPropertySimpleTwoWayPU(params.currentPageIndex, this, "currentPageIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeTab_Params) {
    }
    updateStateVars(params: HomeTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPageIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentPageIndex.aboutToBeDeleted();
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
    private __currentPageIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentPageIndex() {
        return this.__currentPageIndex.get();
    }
    set currentPageIndex(newValue: number) {
        this.__currentPageIndex.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 50331671, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Column.expandSafeArea([], [SafeAreaEdge.BOTTOM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarPosition.Start : BarPosition.End
            });
            Tabs.vertical(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG);
            Tabs.height(BaseConstants.FULL_HEIGHT);
            Tabs.margin({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? '' : { "id": 50331799, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? '' : { "id": 50331793, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, ButtonInfo[HomeConstants.TAB_MESSAGE_INDEX]);
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, ButtonInfo[HomeConstants.TAB_CONTACTS_INDEX]);
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, ButtonInfo[HomeConstants.TAB_SOCIAL_CIRCLE_INDEX]);
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, ButtonInfo[HomeConstants.TAB_ME_INDEX]);
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, ButtonInfo[4]);
                } });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    BottomNavigation(button: TabInfoModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.currentPageIndex = button.index;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentPageIndex === button.index ? button.selectImg : button.img);
            Image.objectFit(ImageFit.Contain);
            Image.width(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 50331701, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331700, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.height(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 50331701, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331700, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(button.title);
            Text.fontColor(this.currentPageIndex === button.index ? { "id": 50331674, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : Color.Black);
            Text.opacity(this.currentPageIndex === button.index ? BaseConstants.FULL_OPACITY : BaseConstants.SIXTY_OPACITY);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 50331702, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.lineHeight({ "id": 50331706, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
            Text.margin({ top: { "id": 50331785, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
