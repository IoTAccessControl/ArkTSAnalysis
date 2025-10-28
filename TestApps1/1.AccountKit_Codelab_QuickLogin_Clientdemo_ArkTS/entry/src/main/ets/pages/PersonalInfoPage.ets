/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

@Component
export struct PersonalInfoPage {
  logTag: string = 'PersonalInfoPage';
  domainId: number = 0x0000;
  // This is only a sample display. The mobile number is displayed by default.
  @StorageProp('quickLoginAnonymousPhone') anonymousPhone: string = '180******00';
  @Consume('pageInfos') pageInfos?: NavPathStack;

  aboutToAppear() {
    hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
  }

  // Sign out.
  logOut() {
    this.pageInfos?.pushPathByName('PrepareLoginPage', null, true);
    hilog.info(this.domainId, this.logTag, 'Succeeded in logging out.');
  }

  build() {
    NavDestination() {
      Column() {
        Column() {
          Row() {
            Text($r('app.string.personal_info'))
              .fontSize($r('sys.float.ohos_id_text_size_headline8'))
              .fontWeight(FontWeight.Medium)
          }
          .alignSelf(ItemAlign.Start)
          .height(56)

          Row() {
            Text($r('app.string.mobile_number'))
              .fontSize($r('sys.float.ohos_id_text_size_sub_title2'))
              .fontWeight(FontWeight.Medium)

            Text(this.anonymousPhone)
              .fontSize($r('sys.float.ohos_id_text_size_sub_title3'))
              .fontColor($r('sys.color.ohos_id_color_text_secondary'))
          }
          .width('100%')
          .height(56)
          .padding({
            left: 12,
            right: 12,
            top: 4,
            bottom: 4
          })
          .margin({ top: 12 })
          .backgroundColor(Color.White)
          .justifyContent(FlexAlign.SpaceBetween)
          .borderRadius(20)
        }

        Column() {
          Button() {
            Text($r('app.string.log_out'))
              .fontColor('#CE0E2D')
              .fontSize($r('sys.float.ohos_id_text_size_sub_title2'))
              .fontWeight(FontWeight.Medium)
          }
          .width('100%')
          .constraintSize({ maxWidth: 448 })
          .height(40)
          .backgroundColor('#E7E8EA')
          .margin({
            bottom: 44,
            top: 20
          })
          .id('logOutButton')
          .onClick(() => {
            this.logOut();
          })
        }
      }
      .padding({
        left: 16,
        right: 16,
        top: 36
      })
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.SpaceBetween)
      .backgroundColor('#F1F3F5')
      .height('100%')
      .width('100%')
    }
    .hideTitleBar(true)
    .onBackPressed(() => {
      // Directly exit the app using a gesture.
      hilog.info(this.domainId, this.logTag, 'PersonalInfoPage onBackPressed');
      try {
        (this.getUIContext().getHostContext() as common.UIAbilityContext).terminateSelf();
      } catch (error) {
        hilog.error(this.domainId, this.logTag,
          `Failed to terminateSelf. errCode is ${error.code}, errMessage is ${error.message}`);
      }
      return true;
    })
  }
}
