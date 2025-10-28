if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PermissionsDemo_Params {
    resultText?: string;
    selectedFilePath?: string;
    fileName?: string;
    fileSize?: string;
    isLoading?: boolean;
    context?: common.UIAbilityContext;
}
import type common from "@ohos:app.ability.common";
import contact from "@ohos:contact";
import promptAction from "@ohos:promptAction";
import picker from "@ohos:file.picker";
import fs from "@ohos:file.fs";
class PermissionsDemo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__resultText = new ObservedPropertySimplePU('API Results will appear here', this, "resultText");
        this.__selectedFilePath = new ObservedPropertySimplePU('', this, "selectedFilePath");
        this.__fileName = new ObservedPropertySimplePU('', this, "fileName");
        this.__fileSize = new ObservedPropertySimplePU('', this, "fileSize");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PermissionsDemo_Params) {
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
        if (params.selectedFilePath !== undefined) {
            this.selectedFilePath = params.selectedFilePath;
        }
        if (params.fileName !== undefined) {
            this.fileName = params.fileName;
        }
        if (params.fileSize !== undefined) {
            this.fileSize = params.fileSize;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: PermissionsDemo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__resultText.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFilePath.purgeDependencyOnElmtId(rmElmtId);
        this.__fileName.purgeDependencyOnElmtId(rmElmtId);
        this.__fileSize.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__resultText.aboutToBeDeleted();
        this.__selectedFilePath.aboutToBeDeleted();
        this.__fileName.aboutToBeDeleted();
        this.__fileSize.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __resultText: ObservedPropertySimplePU<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    private __selectedFilePath: ObservedPropertySimplePU<string>;
    get selectedFilePath() {
        return this.__selectedFilePath.get();
    }
    set selectedFilePath(newValue: string) {
        this.__selectedFilePath.set(newValue);
    }
    private __fileName: ObservedPropertySimplePU<string>;
    get fileName() {
        return this.__fileName.get();
    }
    set fileName(newValue: string) {
        this.__fileName.set(newValue);
    }
    private __fileSize: ObservedPropertySimplePU<string>;
    get fileSize() {
        return this.__fileSize.get();
    }
    set fileSize(newValue: string) {
        this.__fileSize.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private context: common.UIAbilityContext;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Permission API Demo');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultText);
            Text.fontSize(16);
            Text.backgroundColor('#f0f0f0');
            Text.padding(10);
            Text.width('90%');
            Text.height(120);
            Text.margin({ bottom: 20 });
            Text.textAlign(TextAlign.Start);
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('70%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件选择部分
            Text.create('File Operations');
            // 文件选择部分
            Text.fontSize(20);
            // 文件选择部分
            Text.fontWeight(FontWeight.Bold);
            // 文件选择部分
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // 文件选择部分
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Select File');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.selectFile());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 显示选择的文件信息
            if (this.selectedFilePath) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`Selected File: ${this.fileName}`);
                        Text.fontSize(16);
                        Text.margin({ top: 10, bottom: 5 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`File Size: ${this.fileSize}`);
                        Text.fontSize(16);
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            // Contacts APIs
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Contacts APIs
            Text.create('Contacts Permissions');
            // Contacts APIs
            Text.fontSize(20);
            // Contacts APIs
            Text.fontWeight(FontWeight.Bold);
            // Contacts APIs
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // Contacts APIs
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Contacts (DataShare)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getContactsViaDataShare());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Contacts (queryContact)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.queryContact());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get All Contacts');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.queryAllContacts());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Contacts By Phone');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.queryContactsByPhoneNumber());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Contacts By Email');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.queryContactsByEmail());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Groups');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.queryGroups());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Call Log APIs
            Text.create('Call Log Permissions');
            // Call Log APIs
            Text.fontSize(20);
            // Call Log APIs
            Text.fontWeight(FontWeight.Bold);
            // Call Log APIs
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // Call Log APIs
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Call Logs');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getCallLogs());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // SMS APIs
            Text.create('SMS Permissions');
            // SMS APIs
            Text.fontSize(20);
            // SMS APIs
            Text.fontWeight(FontWeight.Bold);
            // SMS APIs
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // SMS APIs
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get SIM Messages');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getSimMessages());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get SMS (DataShare)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getSmsViaDataShare());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // MMS APIs
            Text.create('MMS Permissions');
            // MMS APIs
            Text.fontSize(20);
            // MMS APIs
            Text.fontWeight(FontWeight.Bold);
            // MMS APIs
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // MMS APIs
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get MMS (DataShare)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getMmsViaDataShare());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Calendar APIs
            Text.create('Calendar Permissions');
            // Calendar APIs
            Text.fontSize(20);
            // Calendar APIs
            Text.fontWeight(FontWeight.Bold);
            // Calendar APIs
            Text.margin({ top: 20, bottom: 10 });
        }, Text);
        // Calendar APIs
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Calendar (DataShare)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getCalendarViaDataShare());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Calendar Whole (DataShare)');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getCalendarWholeViaDataShare());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('Get Calendar Events');
            Button.width('80%');
            Button.margin({ bottom: 10 });
            Button.onClick(() => this.getCalendarEvents());
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    // 文件选择功能
    async selectFile() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        try {
            let documentPicker = new picker.DocumentViewPicker(this.context);
            let documentSelectOptions = new picker.DocumentSelectOptions();
            // 允许选择的最大文件数量
            documentSelectOptions.maxSelectNumber = 1;
            // 文件后缀过滤器 ['后缀描述|后缀'] (可选) 如果有多个后缀，用逗号分隔 (可选)，后缀名不能超过100字符。要选择全部文件可用：'All files(*.*)|.*';
            documentSelectOptions.fileSuffixFilters = ['Images(.png, .jpg)|.png,.jpg', 'Documents|.txt', 'Videos|.mp4', '.pdf'];
            const result = await documentPicker.select(documentSelectOptions);
            if (result && result.length > 0) {
                const fileUri = result[0];
                this.selectedFilePath = fileUri;
                // 获取文件名
                this.fileName = fileUri.split('/').pop() || 'Unknown file';
                // 获取文件大小
                try {
                    let file = fs.openSync(fileUri, fs.OpenMode.READ_ONLY);
                    const stat = fs.statSync(file.fd);
                    this.fileSize = this.formatFileSize(stat.size);
                    fs.closeSync(file);
                }
                catch (error) {
                    console.error('Failed to get file size:', error);
                    this.fileSize = 'Size unknown';
                }
                this.resultText = `File selected: ${this.fileName}`;
                promptAction.showToast({ message: 'File selection successful', duration: 2000 });
            }
        }
        catch (err) {
            console.error('Failed to select file. Cause: ' + JSON.stringify(err));
            this.resultText = `Error selecting file: ${JSON.stringify(err)}`;
            promptAction.showToast({ message: 'File selection failed', duration: 2000 });
        }
        finally {
            this.isLoading = false;
        }
    }
    // 格式化文件大小
    formatFileSize(size: number): string {
        if (size < 1024) {
            return size + ' B';
        }
        else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + ' KB';
        }
        else if (size < 1024 * 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(2) + ' MB';
        }
        else {
            return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
        }
    }
    // 联系人相关方法
    private getContactsViaDataShare() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'datashare:///com.ohos.contactsdataability')\n` +
            `Permission: ohos.permission.READ_CONTACTS\n` +
            `Function: Retrieves contacts from the device's contact database`;
    }
    private queryContact() {
        try {
            // 根据关键字查询联系人
            contact.queryContact(this.context, 'name', (err, contactInfo) => {
                if (err) {
                    this.resultText = `Error querying contact: ${JSON.stringify(err)}`;
                    return;
                }
                if (contactInfo) {
                    this.resultText = `Contact found:\nName: ${JSON.stringify(contactInfo)}`;
                }
                else {
                    this.resultText = "No contact found with the specified key";
                }
            });
        }
        catch (error) {
            promptAction.showToast({
                message: `Failed to query contact: ${error}`
            });
        }
    }
    private queryAllContacts() {
        try {
            // 查询所有联系人
            contact.queryContacts(this.context, (err, contactArray) => {
                if (err) {
                    this.resultText = `Error querying all contacts: ${JSON.stringify(err)}`;
                    return;
                }
                if (contactArray && contactArray.length > 0) {
                    let displayContent: string = `Found ${contactArray.length} contacts:\n`;
                    // 仅显示前5个联系人
                    const maxContacts: number = Math.min(contactArray.length, 5);
                    for (let i = 0; i < maxContacts; i++) {
                        const currentContact = contactArray[i];
                        displayContent += `${i + 1}. ${JSON.stringify(currentContact)}\n`;
                    }
                    if (contactArray.length > 5) {
                        displayContent += `...and ${contactArray.length - 5} more`;
                    }
                    this.resultText = displayContent;
                }
                else {
                    this.resultText = "No contacts found on device";
                }
            });
        }
        catch (error) {
            promptAction.showToast({
                message: `Failed to query all contacts: ${error}`
            });
        }
    }
    private queryContactsByPhoneNumber() {
        try {
            // 根据电话号码查询联系人
            const phoneNumber: string = "1234567890"; // 示例电话号码
            contact.queryContactsByPhoneNumber(this.context, phoneNumber, (err, contactArray) => {
                if (err) {
                    this.resultText = `Error querying contacts by phone: ${JSON.stringify(err)}`;
                    return;
                }
                if (contactArray && contactArray.length > 0) {
                    let displayContent: string = `Found ${contactArray.length} contacts with phone ${phoneNumber}:\n`;
                    // 仅显示前5个联系人
                    const maxContacts: number = Math.min(contactArray.length, 5);
                    for (let i = 0; i < maxContacts; i++) {
                        const currentContact = contactArray[i];
                        displayContent += `${i + 1}. ${JSON.stringify(currentContact)}\n`;
                    }
                    if (contactArray.length > 5) {
                        displayContent += `...and ${contactArray.length - 5} more`;
                    }
                    this.resultText = displayContent;
                }
                else {
                    this.resultText = `No contacts found with phone number ${phoneNumber}`;
                }
            });
        }
        catch (error) {
            promptAction.showToast({
                message: `Failed to query contacts by phone: ${error}`
            });
        }
    }
    private queryContactsByEmail() {
        try {
            // 根据电子邮件地址查询联系人
            const email: string = "example@email.com"; // 示例邮箱地址
            contact.queryContactsByEmail(this.context, email, (err, contactArray) => {
                if (err) {
                    this.resultText = `Error querying contacts by email: ${JSON.stringify(err)}`;
                    return;
                }
                if (contactArray && contactArray.length > 0) {
                    let displayContent: string = `Found ${contactArray.length} contacts with email ${email}:\n`;
                    // 仅显示前5个联系人
                    const maxContacts: number = Math.min(contactArray.length, 5);
                    for (let i = 0; i < maxContacts; i++) {
                        const currentContact = contactArray[i];
                        displayContent += `${i + 1}. ${JSON.stringify(currentContact)}\n`;
                    }
                    if (contactArray.length > 5) {
                        displayContent += `...and ${contactArray.length - 5} more`;
                    }
                    this.resultText = displayContent;
                }
                else {
                    this.resultText = `No contacts found with email ${email}`;
                }
            });
        }
        catch (error) {
            promptAction.showToast({
                message: `Failed to query contacts by email: ${error}`
            });
        }
    }
    private queryGroups() {
        try {
            // 查询联系人群组
            contact.queryGroups(this.context, (err, groupArray) => {
                if (err) {
                    this.resultText = `Error querying groups: ${JSON.stringify(err)}`;
                    return;
                }
                if (groupArray && groupArray.length > 0) {
                    let displayContent: string = `Found ${groupArray.length} contact groups:\n`;
                    // 仅显示前5个群组
                    const maxGroups: number = Math.min(groupArray.length, 5);
                    for (let i = 0; i < maxGroups; i++) {
                        const currentGroup = groupArray[i];
                        displayContent += `${i + 1}. ${JSON.stringify(currentGroup)}\n`;
                    }
                    if (groupArray.length > 5) {
                        displayContent += `...and ${groupArray.length - 5} more`;
                    }
                    this.resultText = displayContent;
                }
                else {
                    this.resultText = "No contact groups found";
                }
            });
        }
        catch (error) {
            promptAction.showToast({
                message: `Failed to query groups: ${error}`
            });
        }
    }
    // Call Log Methods
    private getCallLogs() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'dataability://com.ohos.calllogability')\n` +
            `Permission: ohos.permission.READ_CALL_LOG\n` +
            `Function: Retrieves call logs from the device`;
    }
    // SMS Methods
    private getSimMessages() {
        this.resultText = `API: telephony.sms.getAllSimMessages(slotId, callback)\n` +
            `Permission: ohos.permission.READ_MESSAGES\n` +
            `Function: Retrieves SMS messages stored on SIM card`;
    }
    private getSmsViaDataShare() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'datashare:///com.ohos.smsmmsability')\n` +
            `Permission: ohos.permission.READ_MESSAGES\n` +
            `Function: Retrieves SMS messages from the device`;
    }
    // MMS Methods
    private getMmsViaDataShare() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'datashare:///com.ohos.smsmmsability')\n` +
            `Permission: ohos.permission.READ_MESSAGES\n` +
            `Function: Retrieves MMS messages from the device`;
    }
    // Calendar Methods
    private getCalendarViaDataShare() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'datashare:///calendardata')\n` +
            `Permission: ohos.permission.READ_CALENDAR\n` +
            `Function: Retrieves calendar events from the device`;
    }
    private getCalendarWholeViaDataShare() {
        this.resultText = `API: dataShare.createDataShareHelper(context, 'datashare:///calendardata_whole')\n` +
            `Permission: ohos.permission.READ_CALENDAR\n` +
            `Function: Retrieves comprehensive calendar events from the device`;
    }
    private getCalendarEvents() {
        this.resultText = `API: calendarManager.Calendar.getEvents(callback)\n` +
            `Permission: ohos.permission.READ_CALENDAR\n` +
            `Function: Retrieves calendar events using Calendar API`;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PermissionsDemo";
    }
}
registerNamedRoute(() => new PermissionsDemo(undefined, {}), "", { bundleName: "com.example.scenariofusionkit_codelab_functionalapi_arkts", moduleName: "entry", pagePath: "pages/PermissionsDemo", pageFullPath: "entry/src/main/ets/pages/PermissionsDemo", integratedHsp: "false", moduleType: "followWithHap" });
