/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */

import { MapComponent, mapCommon, map } from '@kit.MapKit';
import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
import promptAction from '@ohos.promptAction';
// 使用 HarmonyOS 5.0.0 兼容的导入
import sms from '@ohos.telephony.sms';
import bluetooth from '@ohos.bluetooth';
import nfcController from '@ohos.nfc.controller';
import common from '@ohos.app.ability.common';
import contact from '@ohos.contact';
import dataSharePredicates from '@ohos.data.dataSharePredicates';
// import dataShareHelper from '@ohos.data.dataShareHelper';
// import dataShare from '@ohos.data.dataShare'

// 添加类型定义
class MessageOptions {
  slotId: number = 0;
  destinationHost: string = "";
  content: string = "";
  serviceCenter: string = "";
}
let uri = ("datashare:///com.samples.datasharetest.DataShare");
let da = new dataSharePredicates.DataSharePredicates();
da.equalTo("name", "ZhangSan");

// let dataShareHelper: dataShare.DataShareHelper | undefined = undefined;


@Entry
@Component
struct BasicMapDemo {
  @State message: string = '';
  private context = getContext(this) as common.UIAbilityContext;

  build() {
    Column() {
      Text("权限操作测试")
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })
      
      Scroll() {
        Column({ space: 15 }) {
          // 发送短信按钮
          Button("发送短信")
            .width('80%')
            .onClick(async () => {
              try {
                let sendCallback: AsyncCallback<sms.ISendShortMessageCallback> = (err: BusinessError, data: sms.ISendShortMessageCallback) => {
                  console.log(`sendCallback: err->${JSON.stringify(err)}, data->${JSON.stringify(data)}`);
                };
                let deliveryCallback: AsyncCallback<sms.IDeliveryShortMessageCallback> = (err: BusinessError, data: sms.IDeliveryShortMessageCallback) => {
                  console.log(`deliveryCallback: err->${JSON.stringify(err)}, data->${JSON.stringify(data)}`);
                };
                let options: sms.SendMessageOptions = {
                  slotId: 0,
                  content: '短信内容',
                  destinationHost: '+8613817171717',
                  serviceCenter: '+8613818181818',
                  destinationPort: 1000,
                  sendCallback: sendCallback,
                  deliveryCallback: deliveryCallback
                };
                sms.sendShortMessage(options, (err: BusinessError) => {
                  console.log(`callback: err->${JSON.stringify(err)}`);
                });
              } catch (err) {
                this.showToast(`发送短信失败，错误码: ${err.code}, 消息: ${err.message}`);
              }
            })

          // 开启蓝牙按钮
          Button("开启蓝牙")
            .width('80%')
            .onClick(() => {
              try {
                // 1. 获取蓝牙状态
                let state = bluetooth.getState();
                if (state === bluetooth.BluetoothState.STATE_OFF) {
                  // 2. 如果蓝牙关闭，则开启
                  bluetooth.enableBluetooth();
                  this.showToast("蓝牙开启成功");
                } else {
                  this.showToast("蓝牙已处于开启状态");
                }
              } catch (err) {
                this.showToast(`操作失败，错误码: ${err.code}, 消息: ${err.message}`);
              }
            })

          // 开启NFC按钮
          Button("开启NFC")
            .width('80%')
            .onClick(() => {
              try {
                // 1. 检查NFC是否开启
                if (!nfcController.isNfcAvailable()) {
                  this.showToast("设备不支持NFC功能");
                  return;
                }
                
                let isEnabled = nfcController.isNfcOpen();
                if (!isEnabled) {
                  // 2. 如果NFC关闭，则开启
                  nfcController.enableNfc();
                  this.showToast("NFC开启成功");
                } else {
                  this.showToast("NFC已处于开启状态");
                }
              } catch (err) {
                this.showToast(`操作失败，错误码: ${err.code}, 消息: ${err.message}`);
              }
            })

          // 删除联系人按钮
          Button("删除联系人")
            .width('80%')
            .onClick(async () => {
              try {
                // 注意：这将尝试删除ID为1的联系人
                await contact.deleteContact(this.context, "1");
                this.showToast("删除联系人请求已发送");
              } catch (err) {
                this.showToast(`删除联系人失败，错误码: ${err.code}, 消息: ${err.message}`);
              }
            })

          // 删除通话记录按钮
          Button("删除通话记录")
            .width('80%')
            .onClick(() => {
              // this.showToast("删除通话记录功能暂不可用");
              try {
                // if (dataShareHelper != undefined) {
                //   (dataShareHelper as dataShare.DataShareHelper).delete(uri, da, (err: BusinessError, data: number) => {
                //     if (err !== undefined) {
                //       console.error(`delete error: code: ${err.code}, message: ${err.message} `);
                //       return;
                //     }
                //     console.info("delete succeed, data : " + data);
                //   });
                // }
              } catch (err) {
                let code = (err as BusinessError).code;
                let message = (err as BusinessError).message;
                console.error(`delete error: code: ${code}, message: ${message} `);
              };

            })

          // 删除短信按钮
          Button("删除短信")
            .width('80%')
            .onClick(async () => {
              this.showToast("删除短信功能在API 11中已不被支持");
            })
          Button('UserInfo Pages')
            .width(CommonConstants.WEB_WIDTH)
            .margin({ top: 10 })
            .onClick(() => {
              router.pushUrl({ url: 'pages/UserInfo' });
            })
        }
        .width('100%')
        .padding(20)
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }

  // 显示提示消息
  private showToast(msg: string) {
    this.message = msg;
    promptAction.showToast({
      message: msg,
      duration: 2000
    });
  }
}
