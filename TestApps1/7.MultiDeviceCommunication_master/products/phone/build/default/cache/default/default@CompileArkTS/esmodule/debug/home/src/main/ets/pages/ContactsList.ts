if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ContactsList_Params {
    currentBreakpoint?: string;
    currentContactUserName?: Resource;
    currentContactUserIcon?: Resource;
    currentConversationUserName?: string;
    pageInfo?: NavPathStack;
    selectedIndex?: number;
    currentIndex?: number;
    listScroller?: Scroller;
}
import { Adaptive, BaseConstants, BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import { Alphabets, ContactsListData } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/ConstactsViewModel";
import type { ContactsDataInterface } from "@bundle:com.example.multdevicecommunication/phone@home/ets/viewmodel/ConstactsViewModel";
import { ContactsItem } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/Contacts/ContactsItem";
import { HomeConstants } from "@bundle:com.example.multdevicecommunication/phone@home/ets/constants/HomeConstants";
import { HomeTopSearch } from "@bundle:com.example.multdevicecommunication/phone@home/ets/views/common/HomeTopSearch";
export class ContactsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__currentContactUserName = new SynchedPropertyObjectTwoWayPU(params.currentContactUserName, this, "currentContactUserName");
        this.__currentContactUserIcon = new SynchedPropertyObjectTwoWayPU(params.currentContactUserIcon, this, "currentContactUserIcon");
        this.__currentConversationUserName = new SynchedPropertySimpleTwoWayPU(params.currentConversationUserName, this, "currentConversationUserName");
        this.__pageInfo = this.initializeConsume('pageInfo', "pageInfo");
        this.__selectedIndex = new ObservedPropertySimplePU(HomeConstants.CONTACTS_DEFAULT_SELECTED_INDEX, this, "selectedIndex");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.listScroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ContactsList_Params) {
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.listScroller !== undefined) {
            this.listScroller = params.listScroller;
        }
    }
    updateStateVars(params: ContactsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__currentContactUserIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__currentConversationUserName.purgeDependencyOnElmtId(rmElmtId);
        this.__pageInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentContactUserName.aboutToBeDeleted();
        this.__currentContactUserIcon.aboutToBeDeleted();
        this.__currentConversationUserName.aboutToBeDeleted();
        this.__pageInfo.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
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
    private __currentContactUserName: SynchedPropertySimpleOneWayPU<Resource>;
    get currentContactUserName() {
        return this.__currentContactUserName.get();
    }
    set currentContactUserName(newValue: Resource) {
        this.__currentContactUserName.set(newValue);
    }
    private __currentContactUserIcon: SynchedPropertySimpleOneWayPU<Resource>;
    get currentContactUserIcon() {
        return this.__currentContactUserIcon.get();
    }
    set currentContactUserIcon(newValue: Resource) {
        this.__currentContactUserIcon.set(newValue);
    }
    private __currentConversationUserName: SynchedPropertySimpleTwoWayPU<string>;
    get currentConversationUserName() {
        return this.__currentConversationUserName.get();
    }
    set currentConversationUserName(newValue: string) {
        this.__currentConversationUserName.set(newValue);
    }
    private __pageInfo: ObservedPropertyAbstractPU<NavPathStack>;
    get pageInfo() {
        return this.__pageInfo.get();
    }
    set pageInfo(newValue: NavPathStack) {
        this.__pageInfo.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private listScroller: Scroller;
    /**
     * Find checked contact
     */
    findContactsItemIndex(index: number): number {
        if (index < 0)
            return 0;
        const currentIndex = ContactsListData.findIndex(item => item.en_name[0].toUpperCase() === Alphabets[index]);
        if (currentIndex === -1) {
            return this.findContactsItemIndex(index - 1);
        }
        else {
            return currentIndex;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column });
            Flex.height(BaseConstants.FULL_HEIGHT);
            Flex.width(BaseConstants.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.height('13%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomeTopSearch(this, { title: HomeConstants.CONTACTS_NAME }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsList.ets", line: 48, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: HomeConstants.CONTACTS_NAME
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: HomeConstants.CONTACTS_NAME
                    });
                }
            }, { name: "HomeTopSearch" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.End });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.listScroller });
            List.width(BaseConstants.FULL_WIDTH);
            List.height(BaseConstants.FULL_HEIGHT);
            List.onScrollIndex((firstIndex: number) => {
                this.selectedIndex = firstIndex;
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
                ListItem.height(Adaptive.ContactItemHeight(this.currentBreakpoint));
                ListItem.backgroundColor(Color.White);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ContactsItem(this, { name: HomeConstants.CONTACTS_LIST[0], icon: { "id": 50331863, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsList.ets", line: 53, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    name: HomeConstants.CONTACTS_LIST[0],
                                    icon: { "id": 50331863, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ContactsItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                ListItem.height(Adaptive.ContactItemHeight(this.currentBreakpoint));
                ListItem.backgroundColor(Color.White);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ContactsItem(this, { name: HomeConstants.CONTACTS_LIST[1], icon: { "id": 50331866, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsList.ets", line: 59, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    name: HomeConstants.CONTACTS_LIST[1],
                                    icon: { "id": 50331866, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ContactsItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
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
                        ListItem.height(Adaptive.ContactItemHeight(this.currentBreakpoint));
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.onClick(() => {
                                if (this.pageInfo.size() > 1) {
                                    this.pageInfo.pop();
                                }
                                this.pageInfo.pushPath({ name: 'ContactsDetail' });
                                this.currentContactUserName = item.name;
                                this.currentContactUserIcon = item.icon;
                                this.currentConversationUserName = '';
                                this.currentIndex = index;
                            });
                            __Common__.height(BaseConstants.FULL_HEIGHT);
                            __Common__.padding({ "id": 50331765, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" });
                            __Common__.backgroundColor(this.currentIndex === index ? { "id": 50331737, "type": 10001, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } : Color.White);
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ContactsItem(this, { name: item.name, icon: item.icon }, undefined, elmtId, () => { }, { page: "features/home/src/main/ets/pages/ContactsList.ets", line: 66, col: 15 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            name: item.name,
                                            icon: item.icon
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "ContactsItem" });
                        }
                        __Common__.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, ContactsListData, forEachItemGenFunction, (item: ContactsDataInterface, index: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            AlphabetIndexer.create({ arrayValue: Alphabets, selected: 0 });
            AlphabetIndexer.onSelect((index: number) => {
                const currentIndex = this.findContactsItemIndex(index);
                this.listScroller.scrollToIndex(currentIndex + 2);
            });
            AlphabetIndexer.margin({ right: { "id": 50331747, "type": 10002, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } });
            AlphabetIndexer.color(Color.Black);
            AlphabetIndexer.font({
                size: BaseConstants.FONT_SIZE_TWELVE,
                weight: BaseConstants.FONT_WEIGHT_FIVE,
                family: BaseConstants.FONT_FAMILY_MEDIUM
            });
        }, AlphabetIndexer);
        Stack.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
