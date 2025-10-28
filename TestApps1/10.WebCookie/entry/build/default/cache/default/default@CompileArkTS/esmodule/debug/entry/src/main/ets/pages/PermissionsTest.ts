if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PermissionsTest_Params {
    context?: common.Context | undefined;
}
import http from "@ohos:net.http";
import call from "@ohos:telephony.call";
import wifi from "@ohos:wifiManager";
import sms from "@ohos:telephony.sms";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import type { BusinessError } from "@ohos:base";
import bundle from "@ohos:bundle";
const TAG = 'PermissionsTest';
class PermissionsTest extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = getContext(this) as common.Context;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PermissionsTest_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: PermissionsTest_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private context: common.Context | undefined;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('API Permissions Test');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.padding(10);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 10 });
            List.width('100%');
            List.layoutWeight(1);
            List.padding(10);
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('HTTP Request (Callback)', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testHttpRequest();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('HTTP 请求（流）', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testHttpRequestInStream();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('Bluetooth SPP Write', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testSppWrite();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('拨号呼叫', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testDialCall();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('获取设备应用列表', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testGetAllApplication();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('Send Message', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testSendMessage();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('Enable Cellular Data', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.testEnableCellularData();
                    });
                }, Button);
                Button.pop();
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('Enable/Disable Wifi', { type: ButtonType.Capsule, stateEffect: true });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.toggleWifi();
                    });
                }, Button);
                Button.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        Column.pop();
    }
    testHttpRequest() {
        let httpRequest = http.createHttp();
        httpRequest.request("https://www.example.com", (err: BusinessError | null, data: http.HttpResponse) => {
            if (!err) {
                console.info(TAG, 'Request success: ' + JSON.stringify(data));
            }
            else {
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
        });
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
        }
        catch (err) {
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
            }
            else {
                await wifi.enableWifi();
                console.info(TAG, 'Wifi enabled');
            }
        }
        catch (error) {
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
        }
        catch (err) {
            const error = err as BusinessError;
            console.error(TAG, `Failed to request permissions: ${JSON.stringify(error)}`);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PermissionsTest";
    }
}
registerNamedRoute(() => new PermissionsTest(undefined, {}), "", { bundleName: "com.example.webcookie", moduleName: "entry", pagePath: "pages/PermissionsTest", pageFullPath: "entry/src/main/ets/pages/PermissionsTest", integratedHsp: "false", moduleType: "followWithHap" });
