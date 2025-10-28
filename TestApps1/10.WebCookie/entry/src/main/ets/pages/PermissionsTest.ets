import router from '@ohos.router';
import http from '@ohos.net.http';
import socket from '@ohos.net.socket';
import bluetooth from '@ohos.bluetoothManager';
import call from '@ohos.telephony.call';
import wifi from '@ohos.wifiManager';
import sms from '@ohos.telephony.sms';
import data from '@ohos.telephony.data';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import type { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';
import type { BusinessError } from '@ohos.base';
import { bundle } from '@kit.AbilityKit';

const TAG = 'PermissionsTest';

@Entry
@Component
struct PermissionsTest {
  private context: common.Context | undefined = getContext(this) as common.Context;

  build() {
    Column() {
      Text('API Permissions Test')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .padding(10)

      List({ space: 10 }) {
        ListItem() {
          Button('HTTP Request (Callback)', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testHttpRequest();
            })
        }

        ListItem() {
          Button('HTTP 请求（流）', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testHttpRequestInStream();
            })
        }

        ListItem() {
          Button('Bluetooth SPP Write', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testSppWrite();
            })
        }

        ListItem() {
          Button('拨号呼叫', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testDialCall();
            })
        }
        ListItem() {
          Button('获取设备应用列表', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testGetAllApplication();
            })
        }
        ListItem() {
          Button('Send Message', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testSendMessage();
            })
        }

        ListItem() {
          Button('Enable Cellular Data', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.testEnableCellularData();
            })
        }

        ListItem() {
          Button('Enable/Disable Wifi', { type: ButtonType.Capsule, stateEffect: true })
            .width('100%')
            .onClick(() => {
              this.toggleWifi();
            })
        }
      }
      .width('100%')
      .layoutWeight(1)
      .padding(10)
    }
    .width('100%')
    .height('100%')
  }

  testHttpRequest() {
    let httpRequest = http.createHttp();
    httpRequest.request("https://www.example.com", (err: BusinessError | null, data: http.HttpResponse) => {
      if (!err) {
        console.info(TAG, 'Request success: ' + JSON.stringify(data));
      } else {
        console.error(TAG, 'Request failed: ' + JSON.stringify(err));
      }
    });
  }

  testHttpRequestInStream() {
    let httpRequest = http.createHttp();
    httpRequest.requestInStream("https://www.baidu.com")
      .then((data: http.ResponseCode) => {
        console.info(TAG, 'RequestInStream success: ' + data);
      })
      .catch((err: BusinessError) => {
        console.error(TAG, 'RequestInStream failed: ' + JSON.stringify(err));
      });
  }

  async testSppWrite() {
    await this.requestPermissions(['ohos.permission.ACCESS_BLUETOOTH']);
    console.info(TAG, 'SPP Write button clicked. Implementation requires a connected device.');
  }

  async testDialCall() {
    await this.requestPermissions(['ohos.permission.PLACE_CALL']);
    call.makeCall('10086', (err: BusinessError | null) => {
      if (err) {
        console.error(TAG, 'Dial call failed: ' + JSON.stringify(err));
        return;
      }
      console.info(TAG, 'Dial call success');
    });
  }
  async testGetAllApplication() {
    await this.requestPermissions(['ohos.permission.GET_BUNDLE_INFO_PRIVILEGED']);
    let bundleFlags: number = 8;
    let userId: number = 100;
    bundle.getAllApplicationInfo(bundleFlags, userId)
      .then((data) => {
        console.info('Operation successful. Data: ' + JSON.stringify(data));
      }).catch((error: BusinessError) => {
      console.error('Operation failed. Cause: ' + JSON.stringify(error));
    })
  }
  async testSendMessage() {
    await this.requestPermissions(['ohos.permission.SEND_MESSAGES']);
    if (this.context === undefined) {
      console.error(TAG, "context is undefined");
      return;
    }
    sms.sendMessage({
      slotId: 0,
      destinationHost: '10086',
      content: 'Test message',
      sendCallback: () => {
        console.info(TAG, 'Send message success');
      },
      deliveryCallback: () => {
        console.info(TAG, 'Message delivered');
      }
    });
  }

  async testEnableCellularData() {
    await this.requestPermissions(['ohos.permission.SET_TELEPHONY_STATE']);
    try {
      // await data.setDataRoamingEnabled(0, true);
      console.info(TAG, 'Enable data roaming success');
    } catch (err) {
      const error = err as BusinessError;
      console.error(TAG, `Enable data roaming failed: ${JSON.stringify(error)}`);
    }
  }

  async toggleWifi() {
    await this.requestPermissions(['ohos.permission.SET_WIFI_INFO', 'ohos.permission.MANAGE_WIFI_CONNECTION']);
    try {
      let enabled = wifi.isWifiActive();
      if (enabled) {
        wifi.disconnect();
        console.info(TAG, 'Wifi disabled');
      } else {
        await wifi.enableWifi();
        console.info(TAG, 'Wifi enabled');
      }
    } catch (error) {
      const err = error as BusinessError;
      console.error(TAG, `Wifi toggle failed: ${err.code}, ${err.message}`);
    }
  }

  async requestPermissions(permissions: Array<Permissions>) {
    if (this.context === undefined) {
      console.error(TAG, 'context is undefined');
      return;
    }
    let atManager = abilityAccessCtrl.createAtManager();
    try {
      await atManager.requestPermissionsFromUser(this.context, permissions);
    } catch (err) {
      const error = err as BusinessError;
      console.error(TAG, `Failed to request permissions: ${JSON.stringify(error)}`);
    }
  }
} 