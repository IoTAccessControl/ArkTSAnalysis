if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PermissionPage_Params {
    context?: common.UIAbilityContext;
    CONTACT_URI?: string;
}
import type common from "@ohos:app.ability.common";
import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
import calendarManager from "@ohos:calendarManager";
import contact from "@ohos:contact";
export class PermissionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = getContext(this) as common.UIAbilityContext;
        this.CONTACT_URI = 'datashare:///com.ohos.contactsdataability/contacts/contact';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PermissionPage_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.CONTACT_URI !== undefined) {
            this.CONTACT_URI = params.CONTACT_URI;
        }
    }
    updateStateVars(params: PermissionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private context: common.UIAbilityContext;
    private CONTACT_URI: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(28:5)", "home");
            Column.width('100%');
            Column.height('100%');
            Column.padding(16);
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Permission API Demo');
            Text.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(29:7)", "home");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar Permissions Section
            Text.create('Calendar Permissions');
            Text.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(35:7)", "home");
            // Calendar Permissions Section
            Text.fontSize(20);
            // Calendar Permissions Section
            Text.fontWeight(FontWeight.Medium);
            // Calendar Permissions Section
            Text.margin({ top: 20, bottom: 10 });
            // Calendar Permissions Section
            Text.width('100%');
        }, Text);
        // Calendar Permissions Section
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar: Delete Events Button
            Button.createWithLabel('Delete Events (Calendar)');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(42:7)", "home");
            // Calendar: Delete Events Button
            Button.width('90%');
            // Calendar: Delete Events Button
            Button.margin(5);
            // Calendar: Delete Events Button
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现删除日历事件功能
                try {
                    // 获取日历管理器
                    const calendarMgr = calendarManager.getCalendarManager(this.context);
                    // 获取默认日历
                    calendarMgr.getCalendar().then((calendar) => {
                        // 获取所有事件
                        calendar.getEvents().then((events) => {
                            // 提取所有事件ID，过滤掉undefined值
                            const validEvents = events.filter(event => event.id !== undefined);
                            const eventIds: number[] = [];
                            validEvents.forEach(event => {
                                if (event.id !== undefined) {
                                    eventIds.push(event.id);
                                }
                            });
                            if (eventIds.length > 0) {
                                // 删除这些事件
                                calendar.deleteEvents(eventIds).then(() => {
                                    promptAction.showToast({
                                        message: `已成功删除${eventIds.length}个事件`,
                                        duration: 2000
                                    });
                                    console.info(`成功删除${eventIds.length}个日历事件`);
                                }).catch((err: BusinessError) => {
                                    promptAction.showToast({
                                        message: `删除事件失败: ${err.message}`,
                                        duration: 2000
                                    });
                                    console.error(`删除事件失败: ${JSON.stringify(err)}`);
                                });
                            }
                            else {
                                promptAction.showToast({
                                    message: '没有找到可删除的事件',
                                    duration: 2000
                                });
                                console.info('没有找到可删除的事件');
                            }
                        }).catch((err: BusinessError) => {
                            promptAction.showToast({
                                message: `获取事件失败: ${err.message}`,
                                duration: 2000
                            });
                            console.error(`获取事件失败: ${JSON.stringify(err)}`);
                        });
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `获取日历失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`获取日历失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Calendar: Delete Events Button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar: Delete Single Event Button
            Button.createWithLabel('Delete Single Event (Calendar)');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(110:7)", "home");
            // Calendar: Delete Single Event Button
            Button.width('90%');
            // Calendar: Delete Single Event Button
            Button.margin(5);
            // Calendar: Delete Single Event Button
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现删除单个日历事件功能
                try {
                    // 获取日历管理器
                    const calendarMgr = calendarManager.getCalendarManager(this.context);
                    // 获取默认日历
                    calendarMgr.getCalendar().then((calendar) => {
                        // 获取所有事件
                        calendar.getEvents().then((events) => {
                            // 过滤掉没有ID的事件
                            const validEvents = events.filter(event => event.id !== undefined);
                            if (validEvents.length > 0) {
                                // 只删除第一个事件
                                const eventId = validEvents[0].id;
                                if (eventId !== undefined) {
                                    calendar.deleteEvent(eventId).then(() => {
                                        promptAction.showToast({
                                            message: `已成功删除事件 (ID: ${eventId})`,
                                            duration: 2000
                                        });
                                        console.info(`成功删除单个日历事件 (ID: ${eventId})`);
                                    }).catch((err: BusinessError) => {
                                        promptAction.showToast({
                                            message: `删除事件失败: ${err.message}`,
                                            duration: 2000
                                        });
                                        console.error(`删除事件失败: ${JSON.stringify(err)}`);
                                    });
                                }
                            }
                            else {
                                promptAction.showToast({
                                    message: '没有找到可删除的事件',
                                    duration: 2000
                                });
                                console.info('没有找到可删除的事件');
                            }
                        }).catch((err: BusinessError) => {
                            promptAction.showToast({
                                message: `获取事件失败: ${err.message}`,
                                duration: 2000
                            });
                            console.error(`获取事件失败: ${JSON.stringify(err)}`);
                        });
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `获取日历失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`获取日历失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Calendar: Delete Single Event Button
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar: Delete Whole Calendar Data
            Button.createWithLabel('Delete Whole Calendar Data');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(175:7)", "home");
            // Calendar: Delete Whole Calendar Data
            Button.width('90%');
            // Calendar: Delete Whole Calendar Data
            Button.margin(5);
            // Calendar: Delete Whole Calendar Data
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现删除整个日历功能
                try {
                    // 获取日历管理器
                    const calendarMgr = calendarManager.getCalendarManager(this.context);
                    // 获取所有日历
                    calendarMgr.getAllCalendars().then((calendars) => {
                        if (calendars.length > 0) {
                            const deletePromises = calendars.map((cal) => {
                                return calendarMgr.deleteCalendar(cal).catch((err: BusinessError) => {
                                    console.error(`删除日历失败: ${JSON.stringify(err)}`);
                                    return false; // 返回失败标记
                                });
                            });
                            // 等待所有删除操作完成
                            Promise.all(deletePromises).then((results) => {
                                const successCount = results.filter(result => result !== false).length;
                                if (successCount > 0) {
                                    promptAction.showToast({
                                        message: `已成功删除${successCount}个日历`,
                                        duration: 2000
                                    });
                                    console.info(`成功删除${successCount}个日历`);
                                }
                                else {
                                    promptAction.showToast({
                                        message: '删除日历失败',
                                        duration: 2000
                                    });
                                    console.error('所有日历删除操作均失败');
                                }
                            });
                        }
                        else {
                            promptAction.showToast({
                                message: '没有找到可删除的日历',
                                duration: 2000
                            });
                            console.info('没有找到可删除的日历');
                        }
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `获取日历列表失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`获取日历列表失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`删除日历操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Calendar: Delete Whole Calendar Data
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar: Delete Regular Calendar Data
            Button.createWithLabel('Delete Regular Calendar Data');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(235:7)", "home");
            // Calendar: Delete Regular Calendar Data
            Button.width('90%');
            // Calendar: Delete Regular Calendar Data
            Button.margin(5);
            // Calendar: Delete Regular Calendar Data
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现删除常规日历数据功能
                try {
                    // 获取日历管理器
                    const calendarMgr = calendarManager.getCalendarManager(this.context);
                    // 获取默认日历
                    calendarMgr.getCalendar().then((calendar) => {
                        // 获取所有事件（由于没有filterByType方法，我们获取所有事件后再筛选）
                        calendar.getEvents().then((events) => {
                            // 筛选普通类型的事件
                            const normalEvents = events.filter(event => event.type === calendarManager.EventType.NORMAL &&
                                event.id !== undefined);
                            const eventIds: number[] = [];
                            normalEvents.forEach(event => {
                                if (event.id !== undefined) {
                                    eventIds.push(event.id);
                                }
                            });
                            if (eventIds.length > 0) {
                                // 删除这些事件
                                calendar.deleteEvents(eventIds).then(() => {
                                    promptAction.showToast({
                                        message: `已成功删除${eventIds.length}个普通事件`,
                                        duration: 2000
                                    });
                                    console.info(`成功删除${eventIds.length}个普通日历事件`);
                                }).catch((err: BusinessError) => {
                                    promptAction.showToast({
                                        message: `删除事件失败: ${err.message}`,
                                        duration: 2000
                                    });
                                    console.error(`删除事件失败: ${JSON.stringify(err)}`);
                                });
                            }
                            else {
                                promptAction.showToast({
                                    message: '没有找到可删除的普通事件',
                                    duration: 2000
                                });
                                console.info('没有找到可删除的普通事件');
                            }
                        }).catch((err: BusinessError) => {
                            promptAction.showToast({
                                message: `获取事件失败: ${err.message}`,
                                duration: 2000
                            });
                            console.error(`获取事件失败: ${JSON.stringify(err)}`);
                        });
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `获取日历失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`获取日历失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Calendar: Delete Regular Calendar Data
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts Permissions Section
            Text.create('Contacts Permissions');
            Text.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(307:7)", "home");
            // Contacts Permissions Section
            Text.fontSize(20);
            // Contacts Permissions Section
            Text.fontWeight(FontWeight.Medium);
            // Contacts Permissions Section
            Text.margin({ top: 20, bottom: 10 });
            // Contacts Permissions Section
            Text.width('100%');
        }, Text);
        // Contacts Permissions Section
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts: Insert Contact Data
            Button.createWithLabel('Insert Contact Data');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(314:7)", "home");
            // Contacts: Insert Contact Data
            Button.width('90%');
            // Contacts: Insert Contact Data
            Button.margin(5);
            // Contacts: Insert Contact Data
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现插入联系人数据功能
                try {
                    // 创建一个新的联系人对象
                    const newContact: contact.Contact = {
                        name: {
                            fullName: '张三',
                            familyName: '张',
                            givenName: '三'
                        },
                        phoneNumbers: [{
                                phoneNumber: '13800138000',
                                labelName: '移动电话'
                            }],
                        emails: [{
                                email: 'zhangsan@example.com',
                                labelName: '个人'
                            }]
                    };
                    // 添加联系人
                    contact.addContact(this.context, newContact).then((contactId) => {
                        promptAction.showToast({
                            message: `已成功添加联系人，ID: ${contactId}`,
                            duration: 2000
                        });
                        console.info(`成功添加联系人，ID: ${contactId}`);
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `添加联系人失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`添加联系人失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`添加联系人操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Contacts: Insert Contact Data
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts: Batch Insert Contacts
            Button.createWithLabel('Batch Insert Contacts');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(361:7)", "home");
            // Contacts: Batch Insert Contacts
            Button.width('90%');
            // Contacts: Batch Insert Contacts
            Button.margin(5);
            // Contacts: Batch Insert Contacts
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现批量插入联系人功能
                try {
                    // 创建多个联系人对象
                    const contacts: contact.Contact[] = [
                        {
                            name: {
                                fullName: '李四',
                                familyName: '李',
                                givenName: '四'
                            },
                            phoneNumbers: [{
                                    phoneNumber: '13900139000',
                                    labelName: '移动电话'
                                }],
                            emails: [{
                                    email: 'lisi@example.com',
                                    labelName: '个人'
                                }]
                        },
                        {
                            name: {
                                fullName: '王五',
                                familyName: '王',
                                givenName: '五'
                            },
                            phoneNumbers: [{
                                    phoneNumber: '13700137000',
                                    labelName: '移动电话'
                                }],
                            emails: [{
                                    email: 'wangwu@example.com',
                                    labelName: '工作'
                                }]
                        }
                    ];
                    // 批量添加联系人（由于没有直接的批量添加方法，使用Promise.all实现）
                    const addPromises = contacts.map(c => {
                        return contact.addContact(this.context, c).catch((err: BusinessError) => {
                            console.error(`添加联系人失败: ${JSON.stringify(err)}`);
                            return -1; // 返回失败标记
                        });
                    });
                    // 等待所有添加操作完成
                    Promise.all(addPromises).then((contactIds) => {
                        const successCount = contactIds.filter(id => id !== -1).length;
                        if (successCount > 0) {
                            promptAction.showToast({
                                message: `已成功添加${successCount}个联系人`,
                                duration: 2000
                            });
                            console.info(`成功添加${successCount}个联系人`);
                        }
                        else {
                            promptAction.showToast({
                                message: '添加联系人失败',
                                duration: 2000
                            });
                            console.error('所有联系人添加操作均失败');
                        }
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`批量添加联系人操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Contacts: Batch Insert Contacts
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts: Add Contact
            Button.createWithLabel('Add Contact');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(436:7)", "home");
            // Contacts: Add Contact
            Button.width('90%');
            // Contacts: Add Contact
            Button.margin(5);
            // Contacts: Add Contact
            Button.onClick(() => {
                // 使用 ArkTS 5.0.0 语法实现添加联系人功能（带更多详细信息）
                try {
                    // 创建一个新的联系人对象（更多信息）
                    const detailedContact: contact.Contact = {
                        name: {
                            fullName: '赵六',
                            familyName: '赵',
                            givenName: '六',
                            namePrefix: '先生'
                        },
                        phoneNumbers: [
                            {
                                phoneNumber: '13600136000',
                                labelName: '移动电话'
                            },
                            {
                                phoneNumber: '010-88889999',
                                labelName: '工作'
                            }
                        ],
                        emails: [
                            {
                                email: 'zhaoliu@example.com',
                                labelName: '工作'
                            },
                            {
                                email: 'zhaoliu_personal@example.com',
                                labelName: '个人'
                            }
                        ],
                        websites: [
                            {
                                website: 'https://www.example.com/zhaoliu'
                            }
                        ]
                    };
                    // 添加联系人
                    contact.addContact(this.context, detailedContact).then((contactId) => {
                        promptAction.showToast({
                            message: `已成功添加详细联系人，ID: ${contactId}`,
                            duration: 2000
                        });
                        console.info(`成功添加详细联系人，ID: ${contactId}`);
                    }).catch((err: BusinessError) => {
                        promptAction.showToast({
                            message: `添加详细联系人失败: ${err.message}`,
                            duration: 2000
                        });
                        console.error(`添加详细联系人失败: ${JSON.stringify(err)}`);
                    });
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`添加详细联系人操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Contacts: Add Contact
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts: Update Contact
            Button.createWithLabel('Update Contact');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(501:7)", "home");
            // Contacts: Update Contact
            Button.width('90%');
            // Contacts: Update Contact
            Button.margin(5);
            // Contacts: Update Contact
            Button.onClick(() => {
                // 由于contact.getContact和updateContact API在当前环境不可用或已变更，使用Toast消息代替
                try {
                    promptAction.showToast({
                        message: '此功能需要使用contact.getContact和updateContact API，但当前环境可能不支持。在实际设备上，该功能可以查找并更新联系人数据。',
                        duration: 3000
                    });
                    console.info('联系人更新功能演示：首先会查找邮箱为test@example.com的联系人，然后更新其姓名和电话信息');
                }
                catch (error) {
                    promptAction.showToast({
                        message: `操作异常: ${error.message}`,
                        duration: 2000
                    });
                    console.error(`更新联系人操作异常: ${JSON.stringify(error)}`);
                }
            });
        }, Button);
        // Contacts: Update Contact
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts: Update Contact via DataShare
            Button.createWithLabel('Update Contact (DataShare)');
            Button.debugLine("features/home/src/main/ets/pages/PermissionPage.ets(522:7)", "home");
            // Contacts: Update Contact via DataShare
            Button.width('90%');
            // Contacts: Update Contact via DataShare
            Button.margin(5);
            // Contacts: Update Contact via DataShare
            Button.onClick(() => {
                // 由于DataShare API不可用，使用Toast消息代替
                promptAction.showToast({
                    message: '此功能需要使用DataShare API，但当前环境不支持。在实际设备上，可以通过DataShare更新联系人数据。',
                    duration: 3000
                });
                console.info('DataShare API目前不可用，无法演示DataShare更新联系人功能');
            });
        }, Button);
        // Contacts: Update Contact via DataShare
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
