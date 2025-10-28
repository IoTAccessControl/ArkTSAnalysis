if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsItem_Params {
    newsData?: NewsData;
}
import { NewsData } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import type { NewsFile } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
export default class NewsItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.newsData = new NewsData();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsItem_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    updateStateVars(params: NewsItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    public newsData: NewsData;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777251, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.width(Const.NewsTitle_IMAGE_WIDTH);
            Image.height(Const.NewsTitle_IMAGE_HEIGHT);
            Image.margin({
                top: Const.NewsTitle_IMAGE_MARGIN_TOP,
                left: Const.NewsTitle_IMAGE_MARGIN_LEFT
            });
            Image.objectFit(ImageFit.Fill);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData.title);
            Text.fontSize(Const.NewsTitle_TEXT_FONT_SIZE);
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsTitle_TEXT_HEIGHT);
            Text.width(Const.NewsTitle_TEXT_WIDTH);
            Text.maxLines(Const.NewsTitle_TEXT_MAX_LINES);
            Text.margin({ left: Const.NewsTitle_TEXT_MARGIN_LEFT, top: Const.NewsTitle_TEXT_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontWeight(Const.NewsTitle_TEXT_FONT_WEIGHT);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData.content);
            Text.fontSize(Const.NewsContent_FONT_SIZE);
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsContent_HEIGHT);
            Text.width(Const.NewsContent_WIDTH);
            Text.maxLines(Const.NewsContent_MAX_LINES);
            Text.margin({ left: Const.NewsContent_MARGIN_LEFT, top: Const.NewsContent_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr '.repeat(this.newsData.imagesUrl.length));
            Grid.columnsGap(Const.NewsGrid_COLUMNS_GAP);
            Grid.rowsTemplate(Const.NewsGrid_ROWS_TEMPLATE);
            Grid.width(Const.NewsGrid_WIDTH);
            Grid.height(Const.NewsGrid_HEIGHT);
            Grid.margin({ left: Const.NewsGrid_MARGIN_LEFT, top: Const.NewsGrid_MARGIN_TOP,
                right: Const.NewsGrid_MARGIN_RIGHT });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const itemImg = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(Const.SERVER + itemImg.url);
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius(Const.NewsGrid_IMAGE_BORDER_RADIUS);
                        }, Image);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsData.imagesUrl, forEachItemGenFunction, (itemImg: NewsFile, index?: number) => JSON.stringify(itemImg) + index, false, true);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData.source);
            Text.fontSize(Const.NewsSource_FONT_SIZE);
            Text.fontColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsSource_HEIGHT);
            Text.width(Const.NewsSource_WIDTH);
            Text.maxLines(Const.NewsSource_MAX_LINES);
            Text.margin({ left: Const.NewsSource_MARGIN_LEFT, top: Const.NewsSource_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.None });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
