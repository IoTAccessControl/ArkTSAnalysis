// entry/src/main/ets/pages/PermissionTestPage.ets
import hilog from '@ohos.hilog';
import bundleManager from '@ohos.bundle.bundleManager';
import wifi from '@ohos.wifi';
import { BusinessError } from '@ohos.base';

@Entry
@Component
struct PermissionTestPage {
  @State message: string = 'Permission Test Results';

  // Get MAC Address
  async getMacAddress() {
    this.message = 'Getting MAC Address...';
    try {
     
      this.message = 'MAC address API not available in this version';
    } catch (e) {
      this.message = `Failed to get MAC address: ${JSON.stringify(e)}`;
    }
  }

  // Get installed bundle list
  async getBundleList() {
    this.message = 'Getting bundle list...';
    try {
      // 使用正确的API
      let bundleFlag = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
      let bundles = await bundleManager.getBundleInfo('com.example.myapplication', bundleFlag);
      this.message = `Bundle info: ${JSON.stringify(bundles)}`;
      hilog.info(0x0000, 'PermissionTest', `Bundle info: ${JSON.stringify(bundles)}`);
    } catch (error) {
      const err = error as BusinessError;
      this.message = `Failed to get bundle list: ${err.code}, ${err.message}`;
      hilog.error(0x0000, 'PermissionTest', `Failed to get bundle list: ${err.code}, ${err.message}`);
    }
  }


  build() {
    Column() {
      Text('Permission Tests')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 20 });
        
      Text(this.message)
        .fontSize(18)
        .margin(20);

      Button('Get MAC Address', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => this.getMacAddress())
        .margin({ bottom: 20 });

      Button('Get Installed Apps', { type: ButtonType.Capsule })
        .width('80%')
        .height(40)
        .onClick(() => this.getBundleList())
        .margin({ bottom: 20 });
    }
    .width('100%');
  }
} 