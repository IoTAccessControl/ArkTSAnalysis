if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SocialCircle_Params {
    currentBreakpoint?: string;
    socialCircleList?: PictureArrayInterface[];
}
import { BreakpointConstants, BaseConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import getSocialCircleList, { PictureConstants } from "@bundle:com.example.multdevicecommunication/phone@socialCircle/ets/constants/PictureConstants";
import type { PictureArrayInterface, PictureInterface } from '../viewmodel/CommonViewModel';
import deviceInfo from "@ohos:deviceInfo";
export class SocialCircle extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.socialCircleList = getSocialCircleList();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SocialCircle_Params) {
        if (params.socialCircleList !== undefined) {
            this.socialCircleList = params.socialCircleList;
        }
    }
    updateStateVars(params: SocialCircle_Params) {
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
    private socialCircleList: PictureArrayInterface[];
    getRowsTemplate(length: number): string {
        let rowNumber: number = length % PictureConstants.MAX_COLUMN_NUM === 0 ? length / PictureConstants.MAX_COLUMN_NUM :
            (Math.floor(length / PictureConstants.MAX_COLUMN_NUM) + 1);
        return new Array(rowNumber).fill(PictureConstants.TEMPLATE_BUSINESS).join(' ');
    }
    /**
     * get picture aspect ratio
     */
    getAspectRatio(length: number): number {
        let rowNumber: number = length % PictureConstants.MAX_COLUMN_NUM === 0 ? length / PictureConstants.MAX_COLUMN_NUM :
            (Math.floor(length / PictureConstants.MAX_COLUMN_NUM) + 1);
        return PictureConstants.MAX_COLUMN_NUM / rowNumber;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column });
            Flex.backgroundColor(Color.White);
            Flex.height(BaseConstants.FULL_HEIGHT);
            Flex.width(BaseConstants.FULL_WIDTH);
            Flex.padding({
                top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(BaseConstants.FULL_WIDTH);
            List.height(BaseConstants.FULL_HEIGHT);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.CircleItem.bind(this)(item);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.socialCircleList, forEachItemGenFunction, (item: PictureArrayInterface, index: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
    CircleItem(pictureArray: PictureArrayInterface, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create();
            Flex.padding({
                left: { "id": 50331789, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                right: { "id": 50331790, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                top: { "id": 50331791, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                bottom: { "id": 50331788, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
            });
            Flex.width(BaseConstants.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 50331880, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.height({ "id": 50331801, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.width({ "id": 50331803, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Image.margin({ right: { "id": 50331802, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
            Image.borderRadius(PictureConstants.ICON_BORDER_RADIUS);
            Image.objectFit(ImageFit.Auto);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.flexShrink(BaseConstants.FLEX_SHRINK_ONE);
            Column.width(BaseConstants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(PictureConstants.USER_NAME);
            Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
            Text.fontSize(BaseConstants.FONT_SIZE_FOURTEEN);
            Text.fontColor(Color.Black);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
            Text.margin({ bottom: { "id": 50331837, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(PictureConstants.USER_MESSAGE);
            Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
            Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
            Text.fontColor(Color.Black);
            Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
            Text.margin({ bottom: { "id": 50331836, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.rowsTemplate(this.getRowsTemplate(pictureArray.pictures.length));
            Grid.columnsTemplate(PictureConstants.COLUMNS_TEMPLATE);
            Grid.columnsGap({ "id": 50331828, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Grid.rowsGap({ "id": 50331828, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
            Grid.aspectRatio(this.getAspectRatio(pictureArray.pictures.length));
            Grid.width(BaseConstants.FULL_WIDTH);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const picture = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(picture.src);
                            Image.height(BaseConstants.FULL_HEIGHT);
                            Image.width(BaseConstants.FULL_WIDTH);
                            Image.autoResize(true);
                        }, Image);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, pictureArray.pictures, forEachItemGenFunction, (picture: PictureInterface, index: number) => index + JSON.stringify(picture), false, true);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SocialCircle";
    }
}
registerNamedRoute(() => new SocialCircle(undefined, {}), "", { bundleName: "com.example.multdevicecommunication", moduleName: "phone", pagePath: "../../../../../features/socialCircle/src/main/ets/pages/Index", pageFullPath: "features/socialCircle/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
