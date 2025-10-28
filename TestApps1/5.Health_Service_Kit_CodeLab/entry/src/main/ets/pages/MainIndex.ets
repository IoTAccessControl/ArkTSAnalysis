import router from '@ohos.router';

@Entry
@Component
struct MainIndex {
  build() {
    Column() {
      Button('Health Auth', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => {
          router.pushUrl({ url: 'pages/AuthIndex' });
        })
        .margin({ top: 50, bottom: 20 });

      Button('Exercise Sequence', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => {
          router.pushUrl({ url: 'pages/ExerciseSequenceIndex' });
        })
        .margin({ bottom: 20 });

      Button('Permission Test Page', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => {
          router.pushUrl({ url: 'pages/PermissionTestPage' });
        })
        .margin({ bottom: 20 });
      Button('UserInfo', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => {
          router.pushUrl({ url: 'pages/UserInfo' });
        })
        .margin({ bottom: 20 });
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center);
  }
}