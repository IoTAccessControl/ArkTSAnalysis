// 导入必要模块
import common from '@ohos.app.ability.common'
import contact from '@ohos.contact'
import promptAction from '@ohos.promptAction'
import picker from '@ohos.file.picker'
import fs from '@ohos.file.fs'

@Entry
@Component
struct PermissionsDemo {
  @State resultText: string = 'API Results will appear here';
  @State selectedFilePath: string = '';
  @State fileName: string = '';
  @State fileSize: string = '';
  @State isLoading: boolean = false;
  private context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

  build() {
    Column() {
      Text('Permission API Demo')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      Text(this.resultText)
        .fontSize(16)
        .backgroundColor('#f0f0f0')
        .padding(10)
        .width('90%')
        .height(120)
        .margin({ bottom: 20 })
        .textAlign(TextAlign.Start)
        .borderRadius(8)

      Scroll() {
        Column() {
          // 文件选择部分
          Text('File Operations')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Select File')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.selectFile())

          // 显示选择的文件信息
          if (this.selectedFilePath) {
            Text(`Selected File: ${this.fileName}`)
              .fontSize(16)
              .margin({ top: 10, bottom: 5 })

            Text(`File Size: ${this.fileSize}`)
              .fontSize(16)
              .margin({ bottom: 20 })
          }

          // Contacts APIs
          Text('Contacts Permissions')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Get Contacts (DataShare)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getContactsViaDataShare())

          Button('Get Contacts (queryContact)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.queryContact())

          Button('Get All Contacts')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.queryAllContacts())

          Button('Get Contacts By Phone')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.queryContactsByPhoneNumber())

          Button('Get Contacts By Email')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.queryContactsByEmail())

          Button('Get Groups')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.queryGroups())

          // Call Log APIs
          Text('Call Log Permissions')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Get Call Logs')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getCallLogs())

          // SMS APIs
          Text('SMS Permissions')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Get SIM Messages')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getSimMessages())

          Button('Get SMS (DataShare)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getSmsViaDataShare())

          // MMS APIs
          Text('MMS Permissions')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Get MMS (DataShare)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getMmsViaDataShare())

          // Calendar APIs
          Text('Calendar Permissions')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 10 })

          Button('Get Calendar (DataShare)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getCalendarViaDataShare())

          Button('Get Calendar Whole (DataShare)')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getCalendarWholeViaDataShare())

          Button('Get Calendar Events')
            .width('80%')
            .margin({ bottom: 10 })
            .onClick(() => this.getCalendarEvents())
        }
      }
      .width('100%')
      .height('70%')
    }
    .width('100%')
    .height('100%')
    .padding(20)
  }

  // 文件选择功能
  async selectFile() {
    if (this.isLoading) return;

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
        } catch (error) {
          console.error('Failed to get file size:', error);
          this.fileSize = 'Size unknown';
        }

        this.resultText = `File selected: ${this.fileName}`;
        promptAction.showToast({ message: 'File selection successful', duration: 2000 });
      }
    } catch (err) {
      console.error('Failed to select file. Cause: ' + JSON.stringify(err));
      this.resultText = `Error selecting file: ${JSON.stringify(err)}`;
      promptAction.showToast({ message: 'File selection failed', duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }

  // 格式化文件大小
  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
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
        } else {
          this.resultText = "No contact found with the specified key";
        }
      });
    } catch (error) {
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
        } else {
          this.resultText = "No contacts found on device";
        }
      });
    } catch (error) {
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
        } else {
          this.resultText = `No contacts found with phone number ${phoneNumber}`;
        }
      });
    } catch (error) {
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
        } else {
          this.resultText = `No contacts found with email ${email}`;
        }
      });
    } catch (error) {
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
        } else {
          this.resultText = "No contact groups found";
        }
      });
    } catch (error) {
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
} 