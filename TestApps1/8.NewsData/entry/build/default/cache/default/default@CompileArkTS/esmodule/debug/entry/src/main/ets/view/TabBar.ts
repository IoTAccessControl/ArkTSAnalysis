if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    tabBarArray?: NewsTypeModel[];
    currentIndex?: number;
    currentPage?: number;
}
import NewsList from "@bundle:com.example.newsdataarkts/entry/ets/view/NewsList";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type NewsTypeModel from '../viewmodel/NewsTypeModel';
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
export default class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabBarArray = new ObservedPropertyObjectPU(NewsViewModel.getDefaultTypeList(), this, "tabBarArray");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__currentPage = new ObservedPropertySimplePU(1, this, "currentPage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.tabBarArray !== undefined) {
            this.tabBarArray = params.tabBarArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabBarArray.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabBarArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabBarArray: ObservedPropertyObjectPU<NewsTypeModel[]>;
    get tabBarArray() {
        return this.__tabBarArray.get();
    }
    set tabBarArray(newValue: NewsTypeModel[]) {
        this.__tabBarArray.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __currentPage: ObservedPropertySimplePU<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    TabBuilder(index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tabBarArray[index].name);
            Text.height(Const.FULL_HEIGHT);
            Text.padding({ left: Const.TabBars_HORIZONTAL_PADDING, right: Const.TabBars_HORIZONTAL_PADDING });
            Text.fontSize(this.currentIndex === index ? Const.TabBars_SELECT_TEXT_FONT_SIZE : Const.TabBars_UN_SELECT_TEXT_FONT_SIZE);
            Text.fontWeight(this.currentIndex === index ? Const.TabBars_SELECT_TEXT_FONT_WEIGHT : Const.TabBars_UN_SELECT_TEXT_FONT_WEIGHT);
            Text.fontColor({ "id": 16777241, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        // Request the news category.
        NewsViewModel.getNewsTypeList().then((typeList: NewsTypeModel[]) => {
            this.tabBarArray = typeList;
        }).catch((typeList: NewsTypeModel[]) => {
            this.tabBarArray = typeList;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.barHeight(Const.TabBars_BAR_HEIGHT);
            Tabs.barMode(BarMode.Scrollable);
            Tabs.barWidth(Const.TabBars_BAR_WIDTH);
            Tabs.onChange((index: number) => {
                this.currentIndex = index;
                this.currentPage = 1;
            });
            Tabs.vertical(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const tabsItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                        }, Column);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsList(this, { currentIndex: this.__currentIndex }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBar.ets", line: 55, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            currentIndex: this.currentIndex
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsList" });
                        }
                        Column.pop();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, tabsItem.id);
                        } });
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabBarArray, forEachItemGenFunction, (item: NewsTypeModel) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
