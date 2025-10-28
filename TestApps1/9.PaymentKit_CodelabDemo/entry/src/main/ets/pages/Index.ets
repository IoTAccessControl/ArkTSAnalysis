
/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
import { paymentService } from '@kit.PaymentKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common, abilityAccessCtrl, Want, PermissionRequestResult, Permissions } from '@kit.AbilityKit';
import { calendarManager } from '@kit.CalendarKit';
import prompt from '@ohos.promptAction';

@Entry
@Component
struct Index {
  context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
  private calendarMgr: calendarManager.CalendarManager | undefined = undefined;
  private calendar: calendarManager.Calendar | undefined = undefined;
  @State paymentResult: string = '';
  @State showDialog: boolean = false;
  @State dialogTitle: string = '';
  @State dialogMessage: string = '';

  async aboutToAppear() {
    try {
      this.calendarMgr = calendarManager.getCalendarManager(this.context);
      const calendars = await this.calendarMgr.getAllCalendars();
      if (calendars && calendars.length > 0) {
        this.calendar = calendars[0];
      } else {
        const calendarAccount: calendarManager.CalendarAccount = {
          name: 'MyCalendar',
          type: calendarManager.CalendarType.LOCAL
        };
        this.calendar = await this.calendarMgr.createCalendar(calendarAccount);
      }
    } catch (error) {
      console.error(`Failed to get calendar manager. Code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
    }
  }

  async requestPermission(permissions: Array<Permissions>): Promise<boolean> {
    let atManager = abilityAccessCtrl.createAtManager();
    try {
      const result: PermissionRequestResult = await atManager.requestPermissionsFromUser(this.context, permissions);
      let isGranted = true;
      for (let i = 0; i < result.authResults.length; i++) {
        if (result.authResults[i] !== 0) {
          isGranted = false;
          break;
        }
      }
      return isGranted;
    } catch (err) {
      console.error(`Failed to request permissions. Code: ${(err as BusinessError).code}, message: ${(err as BusinessError).message}`);
      return false;
    }
  }

  async addEvent() {
    const hasPermission = await this.requestPermission(['ohos.permission.WRITE_CALENDAR']);
    if (!hasPermission || !this.calendar) {
      console.error('Permission denied or calendar not found.');
      return;
    }
    const event: calendarManager.Event = {
      title: '单次日程',
      type: calendarManager.EventType.NORMAL,
      startTime: new Date().getTime(),
      endTime: new Date().getTime() + 60 * 60 * 1000, // 1 hour later
    };
    try {
      const eventId = await this.calendar.addEvent(event);
      console.info(`Succeeded in adding event, id -> ${eventId}`);
    } catch (error) {
      console.error(`Failed to addEvent. Code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
    }
  }

  async addEvents() {
    const hasPermission = await this.requestPermission(['ohos.permission.WRITE_CALENDAR']);
    if (!hasPermission || !this.calendar) {
      console.error('Permission denied or calendar not found.');
      return;
    }
    const events: calendarManager.Event[] = [
      {
        title: '批量日程1',
        type: calendarManager.EventType.NORMAL,
        startTime: new Date().getTime(),
        endTime: new Date().getTime() + 60 * 60 * 1000, // 1 hour later
      },
      {
        title: '批量日程2',
        type: calendarManager.EventType.NORMAL,
        startTime: new Date().getTime() + 2 * 60 * 60 * 1000, // 2 hours later
        endTime: new Date().getTime() + 3 * 60 * 60 * 1000, // 3 hours later
      }
    ];
    try {
      await this.calendar.addEvents(events);
      console.info(`Succeeded in adding events`);
    } catch (error) {
      console.error(`Failed to addEvents. Code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
    }
  }

  async updateEvent() {
    const hasPermission = await this.requestPermission(['ohos.permission.WRITE_CALENDAR', 'ohos.permission.READ_CALENDAR']);
    if (!hasPermission || !this.calendar) {
      console.error('Permission denied or calendar not found.');
      return;
    }
    try {
      const events = await this.calendar.getEvents(undefined);
      if (events.length > 0) {
        const eventToUpdate = events[0];
        eventToUpdate.title = '已更新的日程';
        await this.calendar.updateEvent(eventToUpdate);
        console.info(`Succeeded in updating event`);
      } else {
        console.info(`No event to update.`);
      }
    } catch (error) {
      console.error(`Failed to updateEvent. Code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
    }
  }


  async requestPaymentPromise() {
    try {
      // 创建支付订单信息字符串
      const orderStr = `{
        "app_id": "your_app_id",
        "merc_no": "your_merchant_id",
        "prepay_id": "generated_prepay_id",
        "timestamp": "${new Date().getTime()}",
        "noncestr": "${this.generateNonceStr()}",
        "sign": "your_signature",
        "auth_id": "your_auth_id"
      }`;
      
      // 调用支付接口
      await paymentService.requestPayment(this.context, orderStr);
      
      // 支付成功
      console.info('支付成功');
      
      // 显示支付成功对话框
      this.showSuccessDialog();
    } catch (error) {
      // 支付失败
      console.error(`支付失败, 错误码: ${(error as BusinessError).code}, 错误信息: ${(error as BusinessError).message}`);
      
      // 显示支付失败对话框
      this.showFailureDialog(`支付失败: ${(error as BusinessError).message}`);
    }
  }
  
  // 显示支付成功对话框
  showSuccessDialog() {
    this.dialogTitle = '支付结果';
    this.dialogMessage = '支付成功';
    this.showDialog = true;
  }
  
  // 显示支付失败对话框
  showFailureDialog(errorMsg: string) {
    this.dialogTitle = '支付结果';
    this.dialogMessage = `支付失败: ${errorMsg}`;
    this.showDialog = true;
  }
  
  // 生成随机字符串
  generateNonceStr(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  async requestPaymentCallBack() {
    try {
      // 创建支付订单信息字符串
      const orderStr = `{
        "app_id": "your_app_id",
        "merc_no": "your_merchant_id",
        "prepay_id": "generated_prepay_id",
        "timestamp": "${new Date().getTime()}",
        "noncestr": "${this.generateNonceStr()}",
        "sign": "your_signature",
        "auth_id": "your_auth_id"
      }`;
      
      // 调用支付接口
      paymentService.requestPayment(this.context, orderStr, (error: BusinessError) => {
        if (error) {
          // 支付失败
          console.error(`支付失败, 错误码: ${error.code}, 错误信息: ${error.message}`);
          
          // 显示支付失败对话框
          this.showFailureDialog(`支付失败: ${error.message}`);
          return;
        }
        
        // 支付成功
        console.info('支付成功');
        
        // 显示支付成功对话框
        this.showSuccessDialog();
      });
    } catch (error) {
      // 处理其他错误
      console.error(`发生错误: ${(error as Error).message}`);
      
      // 显示错误对话框
      this.showFailureDialog(`发生错误: ${(error as Error).message}`);
    }
  }
  
  async requestContractPromise() {
    try {
      // 创建合约信息字符串
      const contractStr = `{
        "appId": "your_app_id",
        "preSignNo": "your_pre_sign_no"
      }`;
      
      // 调用签约接口
      await paymentService.requestContract(this.context, contractStr);
      
      // 签约成功
      console.info('签约成功');
      
      // 显示签约成功对话框
      this.showSuccessDialog();
    } catch (error) {
      // 签约失败
      console.error(`签约失败, 错误码: ${(error as BusinessError).code}, 错误信息: ${(error as BusinessError).message}`);
      
      // 显示签约失败对话框
      this.showFailureDialog(`签约失败: ${(error as BusinessError).message}`);
    }
  }
  
  async requestContractCallBack() {
    try {
      // 创建合约信息字符串
      const contractStr = `{
        "appId": "your_app_id",
        "preSignNo": "your_pre_sign_no"
      }`;
      
      // 调用签约接口
      paymentService.requestContract(this.context, contractStr, (error: BusinessError) => {
        if (error) {
          // 签约失败
          console.error(`签约失败, 错误码: ${error.code}, 错误信息: ${error.message}`);
          
          // 显示签约失败对话框
          this.showFailureDialog(`签约失败: ${error.message}`);
          return;
        }
        
        // 签约成功
        console.info('签约成功');
        
        // 显示签约成功对话框
        this.showSuccessDialog();
      });
    } catch (error) {
      // 处理其他错误
      console.error(`发生错误: ${(error as Error).message}`);
      
      // 显示错误对话框
      this.showFailureDialog(`发生错误: ${(error as Error).message}`);
    }
  }

  build() {
    Column() {
      // 显示对话框
      if (this.showDialog) {
        Column() {
          Text(this.dialogTitle)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })
          
          Text(this.dialogMessage)
            .fontSize(16)
            .margin({ bottom: 20 })
          
          Button('确定')
            .type(ButtonType.Capsule)
            .width('80%')
            .margin({ bottom: 20 })
            .onClick(() => {
              this.showDialog = false;
            })
        }
        .width('80%')
        .borderRadius(20)
        .backgroundColor(Color.White)
        .padding(10)
        .position({ x: '10%', y: '30%' })
      }

      Button('添加日程')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.addEvent();
        })
      Button('批量添加日程')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.addEvents();
        })
      Button('更新日程')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.updateEvent();
        })

      Button('requestPaymentPromise')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.requestPaymentPromise();
        })
      Button('requestPaymentCallBack')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.requestPaymentCallBack();
        })
      Button('requestContractPromise')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.requestContractPromise();
        })
      Button('requestContractCallBack')
        .type(ButtonType.Capsule)
        .width('50%')
        .margin(10)
        .onClick(() => {
          this.requestContractCallBack();
        })
      Button('UserInfo Pages')
        .width(CommonConstants.WEB_WIDTH)
        .margin({ top: 10 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/UserInfo' });
        })
    }
    .justifyContent(FlexAlign.Center)
    .width('100%')
    .height('100%')
  }
}