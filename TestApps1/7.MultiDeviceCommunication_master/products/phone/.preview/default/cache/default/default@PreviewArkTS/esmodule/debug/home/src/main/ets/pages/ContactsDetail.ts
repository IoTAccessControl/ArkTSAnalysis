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
                    Stack.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(29:7)", "home");
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(30:9)", "home");
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.height(BaseConstants.FULL_HEIGHT);
                    Column.backgroundColor({ "id": 50331668, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Column.padding({
                        top: deviceInfo.deviceType === BaseConstants.DEVICE_2IN1 ? { "id": 50331860, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : { "id": 50331797, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(31:11)", "home");
                    Column.padding({ top: { "id": 50331778, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, left: { "id": 50331777, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
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
                                        let componentCall = new StandardIcon(this, { icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 33, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            icon: { "id": 50331725, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
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
                    Image.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(51:9)", "home");
                    Image.height({ "id": 50331781, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Image.margin({ top: { "id": 50331782, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Image.zIndex(HomeConstants.CONTACTS_DETAIL_AVATAR_Z_INDEX);
                    Image.border({
                        width: { "id": 50331780, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        color: Color.White,
                        radius: { "id": 50331779, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(60:9)", "home");
                    Column.margin({ top: { "id": 50331783, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(61:11)", "home");
                    Column.margin(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? {} : {
                        left: { "id": 50331826, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        right: { "id": 50331827, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                    Column.height(Adaptive.ContactDetailHeight(this.currentBreakpoint));
                    Column.borderRadius({
                        topLeft: { "id": 50331784, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
                        topRight: { "id": 50331785, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                    });
                    Column.backgroundColor(Color.White);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(62:13)", "home");
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.alignItems(HorizontalAlign.Center);
                    Column.padding({ top: { "id": 50331786, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.currentContactUserName || HomeConstants.CONTACTS_DEFAULT_SELECTED_NAME);
                    Text.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(63:15)", "home");
                    Text.fontSize(BaseConstants.FONT_SIZE_THIRTY_TWO);
                    Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
                    Text.fontColor(Color.Black);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(73:13)", "home");
                    Row.width(BaseConstants.FULL_WIDTH);
                    Row.padding({ top: { "id": 50331843, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(74:15)", "home");
                    Column.margin({ left: { "id": 50331849, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(HomeConstants.USER_PHONE);
                    Text.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(75:17)", "home");
                    Text.fontFamily(BaseConstants.FONT_FAMILY_MEDIUM);
                    Text.fontSize(BaseConstants.FONT_SIZE_SIXTEEN);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FIVE);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                    Blank.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(82:15)", "home");
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: { "id": 50331848, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331765, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 83, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331765, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331765, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: { "id": 50331848, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331767, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 85, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331767, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331767, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: { "id": 50331848, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StandardIcon(this, { icon: { "id": 50331758, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsDetail.ets", line: 87, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    icon: { "id": 50331758, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                icon: { "id": 50331758, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                            });
                        }
                    }, { name: "StandardIcon" });
                }
                __Common__.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(93:13)", "home");
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.padding({ top: { "id": 50331846, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(94:15)", "home");
                    Divider.color({ "id": 50331672, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                    Divider.width(BaseConstants.FULL_WIDTH);
                    Divider.margin({ left: { "id": 50331844, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, right: { "id": 50331845, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Divider);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(102:13)", "home");
                    Column.width(BaseConstants.FULL_WIDTH);
                    Column.padding({ left: { "id": 50331831, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: { "id": 50331832, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(HomeConstants.LAST_POST);
                    Text.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(103:15)", "home");
                    Text.fontSize(BaseConstants.FONT_SIZE_TWELVE);
                    Text.fontColor(Color.Black);
                    Text.fontWeight(BaseConstants.FONT_WEIGHT_FOUR);
                    Text.fontFamily(BaseConstants.FONT_FAMILY_NORMAL);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(113:13)", "home");
                    Column.padding({ left: { "id": 50331828, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, top: { "id": 50331829, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create({ space: HomeConstants.IMAGES_SCOPE });
                    List.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(114:15)", "home");
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
                                ListItem.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(116:19)", "home");
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(item);
                                    Image.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(117:21)", "home");
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
            NavDestination.debugLine("features/home/src/main/ets/pages/ContactsDetail.ets(28:5)", "home");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
