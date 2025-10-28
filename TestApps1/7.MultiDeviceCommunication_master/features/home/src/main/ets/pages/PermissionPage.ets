/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import common from '@ohos.app.ability.common';
import promptAction from '@ohos.promptAction';
import { BusinessError } from '@ohos.base';
import { calendarManager } from '@kit.CalendarKit';
import contact from '@ohos.contact';
import { ValuesBucket } from '@kit.ArkData';

//Api20支持
// import dataShare from '@ohos.data.dataShare'
@Component
export struct PermissionPage {
  private context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
  private CONTACT_URI: string = 'datashare:///com.ohos.contactsdataability/contacts/contact';

  build() {
    Column() {
      Text('Permission API Demo')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })
      
      // Calendar Permissions Section
      Text('Calendar Permissions')
        .fontSize(20)
        .fontWeight(FontWeight.Medium)
        .margin({ top: 20, bottom: 10 })
        .width('100%')
      
      // Calendar: Delete Events Button
      Button('Delete Events (Calendar)')
        .width('90%')
        .margin(5)
        .onClick(() => {
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
                } else {
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
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Calendar: Delete Single Event Button
      Button('Delete Single Event (Calendar)')
        .width('90%')
        .margin(5)
        .onClick(() => {
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
                } else {
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
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Calendar: Delete Whole Calendar Data
      Button('Delete Whole Calendar Data')
        .width('90%')
        .margin(5)
        .onClick(() => {
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
                  } else {
                    promptAction.showToast({
                      message: '删除日历失败',
                      duration: 2000
                    });
                    console.error('所有日历删除操作均失败');
                  }
                });
              } else {
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
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`删除日历操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Calendar: Delete Regular Calendar Data
      Button('Delete Regular Calendar Data')
        .width('90%')
        .margin(5)
        .onClick(() => {
          // 使用 ArkTS 5.0.0 语法实现删除常规日历数据功能
          try {
            // 获取日历管理器
            const calendarMgr = calendarManager.getCalendarManager(this.context);
            
            // 获取默认日历
            calendarMgr.getCalendar().then((calendar) => {
              // 获取所有事件（由于没有filterByType方法，我们获取所有事件后再筛选）
              calendar.getEvents().then((events) => {
                // 筛选普通类型的事件
                const normalEvents = events.filter(event => 
                  event.type === calendarManager.EventType.NORMAL && 
                  event.id !== undefined
                );
                
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
                } else {
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
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`删除事件操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Contacts Permissions Section
      Text('Contacts Permissions')
        .fontSize(20)
        .fontWeight(FontWeight.Medium)
        .margin({ top: 20, bottom: 10 })
        .width('100%')
      
      // Contacts: Insert Contact Data
      Button('Insert Contact Data')
        .width('90%')
        .margin(5)
        .onClick(() => {
          // 使用 ArkTS 5.0.0 语法实现插入联系人数据功能
          try {
            let uri = ("datashare:///com.ohos.contactsdataability");
            let key1: string = "name";
            let value11: string = "roe11"
            let key2: string = "age";
            let value21: number = 21;
            let key3: string = "salary";
            let value31: number = 20.5;
            let valuesBucket1: ValuesBucket = {
              key1: value11,
              key2: value21,
              key3: value31,
            }
            let vbs = new Array(valuesBucket1);
            try {

              //Api20支持
              // if (dataShareHelper != undefined) {
              //   (dataShareHelper as dataShare.DataShareHelper).batchInsert(uri, vbs, (err:Error, data:dataShare) => {
              //     if (err !== undefined) {
              //       console.error(`batchInsert error: code: ${err}, message: ${err.message} `);
              //       return;
              //     }
              //     console.info("batchInsert succeed, data : " + data);
              //   });
              // }
            } catch (err) {
              let code = (err as BusinessError).code;
              let message = (err as BusinessError).message;
              console.error(`batchInsert error: code: ${code}, message: ${message} `);
            };

          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`添加联系人操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Contacts: Batch Insert Contacts
      Button('批量插入数据')
        .width('90%')
        .margin(5)
        .onClick(() => {
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
              } else {
                promptAction.showToast({
                  message: '添加联系人失败',
                  duration: 2000
                });
                console.error('所有联系人添加操作均失败');
              }
            });
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`批量添加联系人操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Contacts: Add Contact
      Button('Add Contact')
        .width('90%')
        .margin(5)
        .onClick(() => {
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
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`添加详细联系人操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Contacts: Update Contact
      Button('Update Contact')
        .width('90%')
        .margin(5)
        .onClick(() => {
          // 由于contact.getContact和updateContact API在当前环境不可用或已变更，使用Toast消息代替
          try {
            promptAction.showToast({
              message: '此功能需要使用contact.getContact和updateContact API，但当前环境可能不支持。在实际设备上，该功能可以查找并更新联系人数据。',
              duration: 3000
            });
            console.info('联系人更新功能演示：首先会查找邮箱为test@example.com的联系人，然后更新其姓名和电话信息');
          } catch (error) {
            promptAction.showToast({
              message: `操作异常: ${error.message}`,
              duration: 2000
            });
            console.error(`更新联系人操作异常: ${JSON.stringify(error)}`);
          }
        })
      
      // Contacts: Update Contact via DataShare
      Button('Update Contact (DataShare)')
        .width('90%')
        .margin(5)
        .onClick(() => {
          // 由于DataShare API不可用，使用Toast消息代替
          promptAction.showToast({
            message: '此功能需要使用DataShare API，但当前环境不支持。在实际设备上，可以通过DataShare更新联系人数据。',
            duration: 3000
          });
          console.info('DataShare API目前不可用，无法演示DataShare更新联系人功能');
        })
    }
    .width('100%')
    .height('100%')
    .padding(16)
    .backgroundColor('#F1F3F5')
  }
} 