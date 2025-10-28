import { atomicService } from '@kit.ScenarioFusionKit'
import router from '@ohos.router'

@Entry
@Component
struct FunctionalAPIPage {
  @State systemInfo: string = 'GetSystemInfo';
  @State systemInfoSync: string = 'GetSystemInfoSync';
  @State systemSettings: string = 'GetSystemSettings';

  build() {
    Column() {
      Button(this.systemInfo)
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          let arr: Array<atomicService.SystemInfoType> = ['windowWidth'];
          atomicService.getSystemInfo(arr).then((result) => {
            this.systemInfo = String(result.windowWidth);
          })
        })

      Button(this.systemInfoSync)
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          let arr: Array<atomicService.SystemInfoType> = ['brand'];
          let result = atomicService.getSystemInfoSync(arr);
          this.systemInfoSync = String(result.brand);
        })

      Button(this.systemSettings)
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          let arr: Array<atomicService.SystemSettingType> = ['deviceOrientation'];
          let result = atomicService.getSystemSetting(arr);
          this.systemSettings = String(result.deviceOrientation);
        })

      Button('Go to Permissions Demo')
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          try {
            router.pushUrl({
              url: 'pages/PermissionsDemo'
            });
          } catch (e) {
            console.error(`Failed to push page: ${e}`);
          }
        })
      Button('Go to UserInfo Demo')
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          try {
            router.pushUrl({
              url: 'pages/UserInfo'
            });
          } catch (e) {
            console.error(`Failed to push page: ${e}`);
          }
        })
      Button('Go to UserInfo Demo')
        .type(ButtonType.Capsule)
        .margin(20)
        .backgroundColor('#ff3888be')
        .width('40%')
        .onClick(() => {
          try {
            router.pushUrl({
              url: 'pages/UserInfo'
            });
          } catch (e) {
            console.error(`Failed to push page: ${e}`);
          }
        })
    }
    .justifyContent(FlexAlign.Center)
    .width('100%')
    .height('100%')
  }
}