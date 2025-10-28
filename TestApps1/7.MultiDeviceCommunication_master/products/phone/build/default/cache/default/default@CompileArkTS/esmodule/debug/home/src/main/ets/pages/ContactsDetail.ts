if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ContactsDetail_Params {
    currentBreakpoint?: string;
    currentContactUserName?: string;
    currentContactUserIcon?: Resource;
    pageInfo?: NavPathStack;
}
import { Adaptive, BaseConstants, BreakpointConstants, StandardIcon } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import { SocialCirclePictures } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/SocialCircleViewModel";
import deviceInfo from "@ohos:deviceInfo";
export class ContactsDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__currentContactUserName = new SynchedPropertySimpleOneWayPU(params.currentContactUserName, this, "currentContactUserName");
        this.__currentContactUserIcon = new SynchedPropertyObjectOneWayPU(params.currentContactUserIcon, this, "currentContactUserIcon");
        this.__pageInfo = this.initializeConsume('pageInfo', "pageInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ContactsDetail_Params) {
    }
    updateStateVars(params: ContactsDetail_Params) {
        this.__currentContactUserName.reset(params.currentContactUserName);
        this.__currentContactUserIcon.reset(params.currentContactUserIcon);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentContactUserName.aboutToBeDeleted();
        this.__currentContactUserIcon.aboutToBeDeleted();
        this.__pageInfo.aboutToBeDeleted();
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
    private __currentContactUserName: SynchedPropertySimpleOneWayPU<string>;
    get currentContactUserName() {
        return this.__currentContactUserName.get();
    }
    set currentContactUserName(newValue: string) {
        this.__currentContactUserName.set(newValue);
    }
    private __currentContactUserIcon: SynchedPropertySimpleOneWayPU<Resource>;
    get currentContactUserIcon() {
        return this.__currentContactUserIcon.get();
    }
    set currentContactUserIcon(newValue: Resource) {
        this.__currentContactUserIcon.set(newValue);
    }
    private __pageInfo: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfo() {
        return this.__pageInfo.get();
    }
    set pageInfo(newValue: NavPathStack) {
        this.__pageInfo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.Top });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.height(BaseConstants.FULL_HEIGHT);
                    Column.backgroundColor({ "id": 50331673, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Column.padding({
                        top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331838, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331775, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({ top: { "id": 50331756, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, left: { "id": 50331755, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.width(BaseConstants.FULL_WIDTH);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.onClick(() => {
                                    this.pageInfo.clear();
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new StandardIcon(this, { icon: { "id": 50331855, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 33, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                icon: { "id": 50331855, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            icon: { "id": 50331855, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                        });
                                    }
                                }, { name: "StandardIcon" });
                            }
                            __Common__.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.currentContactUserIcon);
                    Image.height({ "id": 50331759, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Image.margin({ top: { "id": 50331760, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Image.zIndex(HomeConstants.CONTACTS_DETAIL_AVATAR_Z_INDEX);
                    Image.border({
                        width: { "id": 50331758, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        color: Color.White,
                        radius: { "id": 50331757, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin({ top: { "id": 50331761, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? {} : {
                        left: { "id": 50331804, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        right: { "id": 50331805, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                    Column.height(Adaptive.ContactDetailHeight(this.currentBreakpoint));
                    Column.borderRadius({
                        topLeft: { "id": 50331762, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        topRight: { "id": 50331763, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                    Column.backgroundColor(Color.White);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.alignItems(HorizontalAlign.Center);
                    Column.padding({ top: { "id": 50331764, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.currentContactUserName || HomeConstants.CONTACTS_DEFAULT_SELECTED_NAME);
                    Text.fontSize(BaseConstants.FONT_SIZE_THIRTY_TWO);
                    Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
                    Text.fontColor(Color.Black);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width(BaseConstants.FULL_WIDTH);
                    Row.padding({ top: { "id": 50331821, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin({ left: { "id": 50331827, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(HomeConstants.USER_PHONE);
                    Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
                    Text.fontSize(BaseConstants.FONT_SIZE_SIXTEEN);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
                }, Text);
                Text.pop();
                Column.pop();
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
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331867, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 83, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331867, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331867, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: { "id": 50331826, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331875, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 85, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331875, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331875, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: { "id": 50331826, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331858, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 87, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331858, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331858, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.padding({ top: { "id": 50331824, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.color({ "id": 50331677, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Divider.width(BaseConstants.FULL_WIDTH);
                    Divider.margin({ left: { "id": 50331822, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331823, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Divider);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.padding({ left: { "id": 50331809, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: { "id": 50331810, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(HomeConstants.LAST_POST);
                    Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                    Text.fontColor(Color.Black);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                    Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({ left: { "id": 50331806, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: { "id": 50331807, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create({ space: HomeConstants.IMAGES_SCOPE });
                    List.width(BaseConstants.FULL_WIDTH);
                    List.height(BaseConstants.FULL_HEIGHT);
                    List.listDirection(Axis.Horizontal);
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
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(item);
                                    Image.width(Adaptive.ContactPhoneWidth(this.currentBreakpoint));
                                    Image.aspectRatio(HomeConstants.IMAGE_ASPECT_RATIO);
                                }, Image);
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, SocialCirclePictures, forEachItemGenFunction, (item: Resource, index: number) => index + JSON.stringify(item), false, true);
                }, ForEach);
                ForEach.pop();
                List.pop();
                Column.pop();
                Column.pop();
                Column.pop();
                Stack.pop();
            }, { moduleName: "phone", pagePath: "features/home/src/main/ets/pages/ContactsDetail" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
