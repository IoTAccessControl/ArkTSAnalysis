if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeTopSearch_Params {
    currentBreakpoint?: string;
    title?: Resource;
}
import { BaseConstants, BreakpointConstants, StandardIcon } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import deviceInfo from "@ohos:deviceInfo";
export class HomeTopSearch extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__title = new SynchedPropertyObjectOneWayPU(params.title, this, "title");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeTopSearch_Params) {
    }
    updateStateVars(params: HomeTopSearch_Params) {
        this.__title.reset(params.title);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
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
    private __title: SynchedPropertySimpleOneWayPU<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
            Flex.width(BaseConstants.FULL_WIDTH);
            Flex.height(BaseConstants.FULL_HEIGHT);
            Flex.backgroundColor(Color.White);
            Flex.padding({ left: { "id": 50331825, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.flexBasis(HomeConstants.SEARCH_TEXT_FLEX_BASIS);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
            Text.fontSize(BaseConstants.FONT_SIZE_TWENTY_FOUR);
            Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
            Text.width(BaseConstants.FULL_WIDTH);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.flexBasis(HomeConstants.FLEX_BASIS_AUTO);
                        Column.margin({ right: { "id": 50331697, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, Column);
                    this.searchBar.bind(this)();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ right: { "id": 50331826, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StandardIcon(this, { icon: { "id": 50331870, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/common/HomeTopSearch.ets", line: 44, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        icon: { "id": 50331870, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    icon: { "id": 50331870, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                });
                            }
                        }, { name: "StandardIcon" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ right: { "id": 50331826, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.flexBasis(HomeConstants.FLEX_BASIS_AUTO);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StandardIcon(this, { icon: { "id": 50331853, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/views/common/HomeTopSearch.ets", line: 48, col: 9 });
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
        __Common__.pop();
        Column.pop();
        Flex.pop();
    }
    searchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.width(BaseConstants.FULL_WIDTH);
            Row.height(BaseConstants.FULL_HEIGHT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.alignSelf(ItemAlign.Center);
            Stack.layoutWeight(BaseConstants.LAYOUT_WEIGHT_ONE);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: HomeConstants.SEARCH_TEXT_INPUT });
            TextInput.placeholderFont({
                size: { "id": 50331832, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                weight: FontWeight.Normal
            });
            TextInput.placeholderColor({ "id": 50331745, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextInput.height({ "id": 50331833, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextInput.fontSize(BaseConstants.FONT_SIZE_SIXTEEN);
            TextInput.padding({
                left: { "id": 50331834, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331835, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            TextInput.width(BaseConstants.FULL_WIDTH);
            TextInput.enableKeyboardOnFocus(HomeConstants.ENABLE_KEY_BOARD_ON_FOCUS);
            TextInput.backgroundColor({ "id": 50331743, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            TextInput.caretColor({ "id": 50331744, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 50331870, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.width({ "id": 50331830, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.height({ "id": 50331829, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.margin({ left: { "id": 50331746, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Image);
        Stack.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
