if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PermissionDemo_Params {
    context?: common.UIAbilityContext | undefined;
    scroller?: Scroller;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type { BusinessError } from "@ohos:base";
import call from "@ohos:telephony.call";
import prompt from "@ohos:prompt";
import type { ValuesBucket as ValuesBucket } from "@ohos:data.ValuesBucket";
import sms from "@ohos:telephony.sms";
class PermissionDemo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.context = undefined;
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PermissionDemo_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: PermissionDemo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private context: common.UIAbilityContext | undefined;
    private scroller: Scroller;
    aboutToAppear() {
        try {
            this.context = AppStorage.get<common.UIAbilityContext>('abilityContext');
        }
        catch (error) {
            const e = error as BusinessError;
            console.error(`Failed to get context: ${e.code}, ${e.message}`);
        }
    }
    // 1. 请求权限
    async requestPermissions(permissions: Array<Permissions>): Promise<boolean> {
        if (!this.context) {
            console.error('Context is not available');
            return false;
        }
        const atManager = abilityAccessCtrl.createAtManager();
        try {
            const results = await atManager.requestPermissionsFromUser(this.context, permissions);
            for (const result of results.authResults) {
                if (result !== 0) { // 0 表示授权成功
                    console.warn(`Permission denied for one of the permissions: ${permissions.toString()}`);
                    return false;
                }
            }
            console.info(`Permissions granted: ${permissions.toString()}`);
            return true;
        }
        catch (err) {
            const error = err as BusinessError;
            console.error(`Failed to request permissions: ${error.code}, ${error.message}`);
            return false;
        }
    }
    // 2. 通话记录 - 批量新增
    async batchInsertCallLog() {
        const permissions: Array<Permissions> = ['ohos.permission.PLACE_CALL'];
        const isGranted = await this.requestPermissions(permissions);
        if (isGranted && this.context) {
            try {
                let uri = ("dataability:///com.ohos.calllogability");
                let key1: string = "name";
                let value11: string = "roe11";
                let key2: string = "age";
                let value21: number = 21;
                let key3: string = "salary";
                let value31: number = 20.5;
                let valuesBucket1: ValuesBucket = {
                    key1: value11,
                    key2: value21,
                    key3: value31,
                };
                let vbs = new Array(valuesBucket1);
                try {
                    //Api20支持
                    // if (dataShareHelper != undefined) {
                    //   (dataShareHelper as dataShare.DataShareHelper).batchInsert(uri, vbs).then((data: number) => {
                    //     console.info("batchInsert succeed, data : " + data);
                    //   }).catch((err: BusinessError) => {
                    //     console.error(`batchInsert error: code: ${err.code}, message: ${err.message} `);
                    //   });
                    // }
                }
                catch (err) {
                    let code = (err as BusinessError).code;
                    let message = (err as BusinessError).message;
                    console.error(`batchInsert error: code: ${code}, message: ${message} `);
                }
                ;
            }
            catch (e) {
                const error = e as BusinessError;
                console.error(`Operation failed: ${error.code}, ${error.message}`);
                prompt.showToast({
                    message: `操作失败: ${error.message}`,
                    duration: 3000
                });
            }
        }
        else {
            prompt.showToast({
                message: '未获取到所需权限，无法进行操作',
                duration: 3000
            });
        }
    }
    // 3. 通话记录 - 单条新增
    async insertCallLog() {
        const permissions: Array<Permissions> = ['ohos.permission.PLACE_CALL'];
        const isGranted = await this.requestPermissions(permissions);
        if (isGranted && this.context) {
            try {
                const phoneNumber = '12345678901';
                await call.makeCall(phoneNumber);
                console.info(`Call initiated to ${phoneNumber}`);
                prompt.showToast({
                    message: '已成功发起通话',
                    duration: 3000
                });
            }
            catch (e) {
                const error = e as BusinessError;
                console.error(`Operation failed: ${error.code}, ${error.message}`);
                prompt.showToast({
                    message: `操作失败: ${error.message}`,
                    duration: 3000
                });
            }
        }
        else {
            prompt.showToast({
                message: '未获取到所需权限，无法进行操作',
                duration: 3000
            });
        }
    }
    // 4. 通话记录 - 修改
    async updateCallLog() {
        const permissions: Array<Permissions> = ['ohos.permission.WRITE_CALL_LOG'];
        const isGranted = await this.requestPermissions(permissions);
        if (isGranted && this.context) {
            try {
                // Since there is no direct API to update a call log,
                // I will simulate this by showing a toast message.
                console.info('Simulating update of a call log.');
                prompt.showToast({
                    message: '成功模拟修改通话记录',
                    duration: 3000
                });
            }
            catch (e) {
                const error = e as BusinessError;
                console.error(`Operation failed: ${error.code}, ${error.message}`);
                prompt.showToast({
                    message: `操作失败: ${error.message}`,
                    duration: 3000
                });
            }
        }
        else {
            prompt.showToast({
                message: '未获取到所需权限，无法进行操作',
                duration: 3000
            });
        }
    }
    //Api系统不支持
    async addSimMessage() {
        // let simMessageOptions: sms.SimMessageOptions = {
        //   slotId: 0,
        //   smsc: "test",
        //   pdu: "test",
        //   status: sms.SimMessageStatus.SIM_MESSAGE_STATUS_READ
        // };
        // sms.addSimMessage(simMessageOptions).then(() => {
        //   console.log(`addSimMessage success.`);
        // }).catch((err: BusinessError) => {
        //   console.error(`addSimMessage failed, promise: err->${JSON.stringify(err)}`);
        // });
    }
    //Api系统不支持
    async updateSimMessage() {
        // let updateSimMessageOptions: sms.UpdateSimMessageOptions = {
        //   slotId: 0,
        //   msgIndex: 1,
        //   newStatus: sms.SimMessageStatus.SIM_MESSAGE_STATUS_FREE,
        //   pdu: "xxxxxxx",
        //   smsc: "test"
        // };
        // sms.updateSimMessage(updateSimMessageOptions, (err: BusinessError) => {
        //   console.log(`callback: err->${JSON.stringify(err)}`);
        // });
    }
    // 5. 短信 - 发送短信
    async sendSms() {
        const permissions: Array<Permissions> = ['ohos.permission.SEND_MESSAGES'];
        const isGranted = await this.requestPermissions(permissions);
        if (isGranted) {
            try {
                // 检查设备是否支持发送短信
                if (!sms.hasSmsCapability()) {
                    prompt.showToast({
                        message: '当前设备不支持发送短信',
                        duration: 3000
                    });
                    return;
                }
                // 准备短信发送参数
                const phoneNumber = "10086"; // 接收方号码
                const content = "这是一条测试短信";
                await sms.sendMessage({
                    destinationHost: phoneNumber,
                    content: content,
                    slotId: 0
                });
                console.info('SMS sent successfully');
                prompt.showToast({
                    message: `短信已发送到: ${phoneNumber}`,
                    duration: 3000
                });
            }
            catch (e) {
                const error = e as BusinessError;
                console.error(`Send SMS failed: ${error.code}, ${error.message}`);
                prompt.showToast({
                    message: `短信发送失败: ${error.message}`,
                    duration: 3000
                });
            }
        }
        else {
            prompt.showToast({
                message: '未获取到所需权限，无法进行操作',
                duration: 3000
            });
        }
    }
    // 6. 短信 - 接收短信
    async receiveSms() {
        const permissions: Array<Permissions> = ['ohos.permission.RECEIVE_SMS'];
        const isGranted = await this.requestPermissions(permissions);
        if (isGranted) {
            try {
                // Since there is no direct way to trigger an SMS reception,
                // I will simulate this by showing a toast message.
                console.info('Simulating receipt of an SMS.');
                prompt.showToast({
                    message: '成功模拟接收短信',
                    duration: 3000
                });
                console.info('SMS receiver registered');
            }
            catch (e) {
                const error = e as BusinessError;
                console.error(`Register SMS receiver failed: ${error.code}, ${error.message}`);
                prompt.showToast({
                    message: `注册短信接收器失败: ${error.message}`,
                    duration: 3000
                });
            }
        }
        else {
            prompt.showToast({
                message: '未获取到所需权限，无法进行操作',
                duration: 3000
            });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.scrollBarWidth(10);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回', { type: ButtonType.Capsule, stateEffect: true });
            Button.width('90%');
            Button.height(40);
            Button.margin({ top: 20 });
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('通话记录权限');
            Text.fontSize(18);
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('批量新增通话记录');
            Button.width('90%');
            Button.onClick(() => this.batchInsertCallLog());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('新增通话记录');
            Button.width('90%');
            Button.onClick(() => this.insertCallLog());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('修改通话记录');
            Button.width('90%');
            Button.onClick(() => this.updateCallLog());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('短信权限');
            Text.fontSize(18);
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送短信');
            Button.width('90%');
            Button.onClick(() => this.sendSms());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('接收短信');
            Button.width('90%');
            Button.onClick(() => this.receiveSms());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加SIM卡信息');
            Button.width('90%');
            Button.onClick(() => this.addSimMessage());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('更新SIM卡信息');
            Button.width('90%');
            Button.onClick(() => this.updateSimMessage());
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PermissionDemo";
    }
}
registerNamedRoute(() => new PermissionDemo(undefined, {}), "", { bundleName: "com.example.newsdataarkts", moduleName: "entry", pagePath: "pages/PermissionDemo", pageFullPath: "entry/src/main/ets/pages/PermissionDemo", integratedHsp: "false", moduleType: "followWithHap" });
