if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsList_Params {
    newsModel?: NewsModel;
    customRefreshLoadClass?: CustomRefreshLoadLayoutClass;
    refreshLayoutClass?: CustomRefreshLoadLayoutClass;
    loadMoreLayoutClass?: CustomRefreshLoadLayoutClass;
    currentIndex?: number;
}
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { PageState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import NewsItem from "@bundle:com.example.newsdataarkts/entry/ets/view/NewsItem";
import LoadMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/LoadMoreLayout";
import RefreshLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/RefreshLayout";
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import type { NewsData } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import { listTouchEvent } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullDownRefresh";
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
import NoMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/NoMoreLayout";
import NewsModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsModel";
export default class NewsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__newsModel = new ObservedPropertyObjectPU(new NewsModel(), this, "newsModel");
        this.__customRefreshLoadClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(true, { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight), this, "customRefreshLoadClass");
        this.__refreshLayoutClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight), this, "refreshLayoutClass");
        this.__loadMoreLayoutClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight), this, "loadMoreLayoutClass");
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("newsModel", this.newCustom);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsList_Params) {
        if (params.newsModel !== undefined) {
            this.newsModel = params.newsModel;
        }
        if (params.customRefreshLoadClass !== undefined) {
            this.customRefreshLoadClass = params.customRefreshLoadClass;
        }
        if (params.refreshLayoutClass !== undefined) {
            this.refreshLayoutClass = params.refreshLayoutClass;
        }
        if (params.loadMoreLayoutClass !== undefined) {
            this.loadMoreLayoutClass = params.loadMoreLayoutClass;
        }
    }
    updateStateVars(params: NewsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsModel.purgeDependencyOnElmtId(rmElmtId);
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__loadMoreLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsModel.aboutToBeDeleted();
        this.__customRefreshLoadClass.aboutToBeDeleted();
        this.__refreshLayoutClass.aboutToBeDeleted();
        this.__loadMoreLayoutClass.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __newsModel: ObservedPropertyObjectPU<NewsModel>;
    get newsModel() {
        return this.__newsModel.get();
    }
    set newsModel(newValue: NewsModel) {
        this.__newsModel.set(newValue);
    }
    private __customRefreshLoadClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    set customRefreshLoadClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__customRefreshLoadClass.set(newValue);
    }
    private __refreshLayoutClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get refreshLayoutClass() {
        return this.__refreshLayoutClass.get();
    }
    set refreshLayoutClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__refreshLayoutClass.set(newValue);
    }
    private __loadMoreLayoutClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get loadMoreLayoutClass() {
        return this.__loadMoreLayoutClass.get();
    }
    set loadMoreLayoutClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__loadMoreLayoutClass.set(newValue);
    }
    private __currentIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    newCustom() {
        this.refreshLayoutClass =
            new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight);
        this.loadMoreLayoutClass =
            new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight);
    }
    changeCategory() {
        this.newsModel.currentPage = 1;
        NewsViewModel.getNewsList(this.newsModel.currentPage, this.newsModel.pageSize, Const.GET_NEWS_LIST)
            .then((data: NewsData[]) => {
            this.newsModel.pageState = 1;
            if (data.length === this.newsModel.pageSize) {
                this.newsModel.currentPage++;
                this.newsModel.hasMore = true;
            }
            else {
                this.newsModel.hasMore = false;
            }
            this.newsModel.newsData = data;
        })
            .catch((err: string | Resource) => {
            this.getUIContext().getPromptAction().showToast({
                message: err,
                duration: Const.ANIMATION_DURATION
            });
            this.newsModel.pageState = 2;
        });
    }
    aboutToAppear() {
        // Request news data.
        this.changeCategory();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/NewsList.ets(85:5)", "entry");
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
            Column.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    if (this.newsModel.pageState === 1) {
                        listTouchEvent(this.newsModel, event);
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.newsModel.pageState === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ListLayout.bind(this)();
                });
            }
            else if (this.newsModel.pageState === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.LoadingLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.FailLayout.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    LoadingLayout(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: this.customRefreshLoadClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 108, col: 5 });
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
    }
    ListLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/NewsList.ets(113:5)", "entry");
            List.width(Const.NewsListConstant_LIST_WIDTH);
            List.height(Const.FULL_HEIGHT);
            List.margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT });
            List.backgroundColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            List.divider({
                color: { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" },
                strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
                endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
            });
            List.edgeEffect(EdgeEffect.None);
            List.offset({ x: 0, y: `${this.newsModel.offsetY}px` });
            List.onScrollIndex((start: number, end: number) => {
                // Listen to the first index of the current list.
                this.newsModel.startIndex = start;
                this.newsModel.endIndex = end;
            });
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(114:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RefreshLayout(this, {
                                refreshLayoutClass: this.refreshLayoutClass
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 115, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    refreshLayoutClass: this.refreshLayoutClass
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLayoutClass: this.refreshLayoutClass
                            });
                        }
                    }, { name: "RefreshLayout" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            // Pull-down refresh layout
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        // Pull-down refresh layout
                        ListItem.height(Const.NewsListConstant_ITEM_HEIGHT);
                        // Pull-down refresh layout
                        ListItem.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                        // Pull-down refresh layout
                        ListItem.margin({ top: Const.NewsListConstant_ITEM_MARGIN_TOP });
                        // Pull-down refresh layout
                        ListItem.borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS);
                        ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(122:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsItem(this, { newsData: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 123, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            newsData: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsItem" });
                        }
                        // Pull-down refresh layout
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    // Pull-down refresh layout
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsModel.newsData, forEachItemGenFunction, (item: NewsData, index?: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(131:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.newsModel.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LoadMoreLayout(this, {
                                            loadMoreLayoutClass: this.loadMoreLayoutClass
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 133, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                loadMoreLayoutClass: this.loadMoreLayoutClass
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: this.loadMoreLayoutClass
                                        });
                                    }
                                }, { name: "LoadMoreLayout" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NoMoreLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 137, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "NoMoreLayout" });
                            }
                        });
                    }
                }, If);
                If.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
    }
    FailLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/NewsList.ets(162:5)", "entry");
            Image.height(Const.NewsListConstant_NONE_IMAGE_SIZE);
            Image.width(Const.NewsListConstant_NONE_IMAGE_SIZE);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/NewsList.ets(165:5)", "entry");
            Text.opacity(Const.NewsListConstant_NONE_TEXT_opacity);
            Text.fontSize(Const.NewsListConstant_NONE_TEXT_size);
            Text.fontColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.margin({ top: Const.NewsListConstant_NONE_TEXT_margin });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
