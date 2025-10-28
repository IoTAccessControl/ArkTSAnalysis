/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import { common } from '@kit.AbilityKit';
import { loginComponentManager, LoginWithHuaweiIDButton } from '@kit.AccountKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { buffer } from '@kit.ArkTS';
import { connection } from '@kit.NetworkKit';
import { showToast } from '../common/ShowToast';
import { ErrorCode } from '../common/Constants';

// Key value of the link to the HUAWEI ID User Authentication Agreement.
const PRIVACY_URL = 'privacy_url';

@Component
export struct QuickLoginPage {
  logTag: string = 'QuickLoginPage';
  domainId: number = 0x0000;
  // File used to configure the link to the HUAWEI ID User Authentication Agreement.
  private readonly srcPath = 'data.json';
  params?: Record<string, Object>;
  privacyText: loginComponentManager.PrivacyText[] = [{
    text: $r('app.string.read_and_agree'),
    type: loginComponentManager.TextType.PLAIN_TEXT
  }, {
    text: $r('app.string.app_user_agreement'),
    type: loginComponentManager.TextType.RICH_TEXT,
    // Change the link to that of your own privacy policy.
    // ...
    tag: ''
  }, {
    text: $r('app.string.app_privacy_policy'),
    type: loginComponentManager.TextType.RICH_TEXT,
    // Change the link to that of your own privacy policy.
    // ...
    tag: ''
  }, {
    text: $r('app.string.and'),
    type: loginComponentManager.TextType.PLAIN_TEXT
  }, {
    text: $r('app.string.huaweiId_user_authentication_protocol'),
    type: loginComponentManager.TextType.RICH_TEXT,
    tag: this.getProtocolUrl(PRIVACY_URL)
  }, {
    text: $r('app.string.end'),
    type: loginComponentManager.TextType.PLAIN_TEXT
  }];
  controller: loginComponentManager.LoginWithHuaweiIDButtonController =
    new loginComponentManager.LoginWithHuaweiIDButtonController()
    // Users need to accept relevant agreements before they can sign in wth HUAWEI IDs. Set the agreement status to NOT_ACCEPTED first. Once the user accepts the agreements, change the agreement status to ACCEPTED to complete HUAWEI ID sign-in.
      .setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED)
      .onClickLoginWithHuaweiIDButton((error: BusinessError, response: loginComponentManager.HuaweiIDCredential) => {
        // Process the logic of a tap on the one-tap sign-in button.
        this.handleLoginWithHuaweiIDButton(error, response);
        if (error) {
          this.dealAllError(error);
        }
      });
  @State quickLoginAnonymousPhone: string = '';
  // Specify whether to accept the agreements.
  @State isSelected: boolean = false;
  // Specify whether to display a message asking the user to accept the agreements.
  @State showPopUp: boolean = false;
  // Variable that determines whether the agreement and checkbox are unavailable for tapping during the sign-in process.
  @State enableStatus: boolean = true;
  @Consume('pageInfos') pageInfos?: NavPathStack;

  aboutToAppear() {
    hilog.info(this.domainId, this.logTag, 'aboutToAppear');
    // Obtain the passed parameter object.
    if (this.params && this.params !== null) {
      this.quickLoginAnonymousPhone = (this.params['anonymousPhone'] ?? '') as string;
    }
  }

  // Processing logic returned after a gesture operation is executed.
  onBackPress(): boolean | void {
    if (this.pageInfos && this.pageInfos.size() > 0) {
      this.pageInfos.pop();
      return true;
    }
  }

  // Method that processes a tap on the one-tap sign-in button.
  handleLoginWithHuaweiIDButton(error: BusinessError | undefined, response: loginComponentManager.HuaweiIDCredential) {
    this.enableStatus = false;
    if (error) {
      hilog.error(this.domainId, this.logTag,
        `Failed to login with LoginWithHuaweiIDButton. errCode is ${error.code}, errMessage is ${error.message}`);
      if (error.code === ErrorCode.ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED) {
        // If the agreements are not accepted, a pop-up message is displayed.
        this.showPopUp = true;
      } else {
        showToast(this.getUIContext(), error);
      }
      this.enableStatus = true;
      return;
    }
    try {
      if (this.isSelected) {
        if (response) {
          hilog.info(this.domainId, this.logTag, 'Succeeded in clicking LoginWithHuaweiIDButton.');
          const authCode = response.authorizationCode;
          const openID = response.openID;
          const unionID = response.unionID;
          const idToken = response.idToken;
          // After sign-in to the app is successful, process the server sign-in execution logic here.
          // After sign-in on the server is successful, the data to be displayed on the main screen is returned.
          // ...

          // In this example, after a successful sign-in, the personal information screen is displayed.
          this.pageInfos?.pushPathByName('PersonalInfoPage', null, true);
        }
      } else {
        // If the agreements are not accepted, a pop-up message is displayed.
        this.showPopUp = true;
      }
    } catch (error) {
      hilog.error(this.domainId, this.logTag,
        `Failed to login with LoginWithHuaweiIDButton. errCode is ${error.code}, errMessage is ${error.message}`);
      showToast(this.getUIContext(), error as BusinessError);
    } finally {
      this.enableStatus = true;
    }
  }

  dealAllError(error: BusinessError): void {
    // In app sign-in scenarios involving UI interactions, it is recommended to guide users with the following error code prompts:
    if (error.code === ErrorCode.ERROR_CODE_LOGIN_OUT) {
      // The user has not signed in with a HUAWEI ID. Use a HUAWEI ID to sign in and try again, or sign in to the app in another way.
    } else if (error.code === ErrorCode.ERROR_CODE_NETWORK_ERROR) {
      // Network exception. Check the current network status and try again, or sign in to the app in another way.
    } else if (error.code === ErrorCode.ERROR_CODE_INTERNAL_ERROR) {
      // Sign-in failed. Try another sign-in option.
    } else if (error.code === ErrorCode.ERROR_CODE_USER_CANCEL) {
      // The user cancels the authorization.
    } else if (error.code === ErrorCode.ERROR_CODE_SYSTEM_SERVICE) {
      // System service exception. Try again later or sign in to the app in another way.
    } else if (error.code === ErrorCode.ERROR_CODE_AGREEMENT_STATUS_NOT_ACCEPTED) {
      // The user does not accept the agreements.
    } else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
      // Repeated request. No further action is needed.
    } else {
      // Sign-in failed. Try another sign-in option.
    }
  }

  // Redirect to the HUAWEI ID User Authentication Agreement page.
  jumpToPrivacyWebView(privacyText: loginComponentManager.PrivacyText) {
    const hasNet: boolean = connection.hasDefaultNetSync();
    if (!hasNet) {
      const hint: string = (this.getUIContext()
        .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync($r('app.string.hwid_no_internet_connect'));
      showToast(this.getUIContext(), hint);
      return;
    }
    if (privacyText.tag && privacyText.tag !== '') {
      // Obtain the multi-language environment information of the system.
      const systemLanguage: string =
        (this.getUIContext().getHostContext() as common.UIExtensionContext).config.language ?? '';
      hilog.info(this.domainId, this.logTag, `systemLanguage is ${systemLanguage}`);
      const params: Record<string, Object> = { 'protocolUrl': privacyText.tag + systemLanguage };
      // Concatenate link parameters.
      this.pageInfos?.pushPathByName('ProtocolWebView', params, true);
    }
  }

  // Obtain the privacy policy address from rawfile.
  getProtocolUrl(privacyUrl: string): string {
    try {
      // Read files from /AppScope/resources/rawfile.
      const value: Uint8Array = (this.getUIContext()
        .getHostContext() as common.UIAbilityContext).resourceManager.getRawFileContentSync(this.srcPath);
      // Return the link to the HUAWEI ID User Authentication Agreement.
      return JSON.parse(buffer.from(value.buffer).toString())[privacyUrl] as string;
    } catch (error) {
      hilog.error(this.domainId, this.logTag,
        `getProtocolUrl Error. errCode is ${error.code}, errMessage is ${error.message}`);
      return '';
    }
  }

  build() {
    NavDestination() {
      Column() {
        Flex({
          direction: FlexDirection.Column,
          alignItems: ItemAlign.Center,
          justifyContent: FlexAlign.SpaceBetween
        }) {
          // Back button.
          Row() {
            Button({ type: ButtonType.Normal }) {
              Image($r('app.media.hwid_next_ic_appback'))
                .backgroundColor(Color.Transparent)
                .borderRadius(20)
                .width(40)
                .height(40)
                .draggable(false)
                .autoResize(false)
                .focusable(true)
                .fillColor($r('sys.color.ohos_id_color_titlebar_icon'))
                .matchTextDirection(true)
            }
            .alignSelf(ItemAlign.Start)
            .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
            .borderRadius(20)
            .width(40)
            .height(40)
            .id('quickLoginAppBackButton')
            .onClick(() => {
              hilog.info(this.domainId, this.logTag, `pageInfos is ${this.pageInfos?.size()}`);
              if (this.pageInfos && this.pageInfos.size() > 0) {
                this.pageInfos.pop();
              }
            })
          }
          .height(56)
          .padding({ top: 8, bottom: 8 })
          .width('100%')

          // App icon.
          Row() {
            Image($r('app.media.appmarket'))
              .width(80)
              .height(80)
              .draggable(false)
              .copyOption(CopyOptions.None)
              .borderRadius(20)
              .onComplete(() => {
                hilog.info(this.domainId, this.logTag, 'Succeeded in loading appIcon.');
              })
              .onError(() => {
                hilog.error(this.domainId, this.logTag, 'Failed to load appIcon.');
              })
          }

          // Mobile number and its description.
          Column() {
            Text(this.quickLoginAnonymousPhone)
              .fontSize(36)
              .fontColor($r('sys.color.ohos_id_color_text_primary'))
              .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
              .fontWeight(FontWeight.Bold)
              .lineHeight(48)
              .height(48)
              .textAlign(TextAlign.Center)
              .maxLines(1)
              .constraintSize({ maxWidth: '100%', minHeight: 48 })

            Text($r('app.string.bind_huaweiId_number'))
              .fontSize(12)
              .fontColor($r('sys.color.ohos_id_color_text_secondary'))
              .fontFamily($r('sys.string.ohos_id_text_font_family_regular'))
              .fontWeight(FontWeight.Regular)
              .lineHeight(16)
              .height(16)
              .textAlign(TextAlign.Center)
              .maxLines(1)
              .constraintSize({ maxWidth: '100%' })
              .margin({ top: 8 })
          }
          .margin({ bottom: -36 })
        }
        .width('100%')
        .height('40%')

        Column() {
          // One-tap sign-in.
          Column() {
            LoginWithHuaweiIDButton({
              params: {
                style: loginComponentManager.Style.BUTTON_RED,
                extraStyle: {
                  buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
                    show: true
                  })
                },
                loginType: loginComponentManager.LoginType.QUICK_LOGIN
              },
              controller: this.controller
            }).id('login_with_huaweiId_button')
          }
          .height(40)
          .width('100%')
          .constraintSize({ maxWidth: 448 })
          .margin({ top: 92 })

          Flex({
            justifyContent: FlexAlign.Center,
            alignItems: ItemAlign.Start
          }) {
            Row() {
              Checkbox({ name: 'privacyCheckbox', group: 'privacyCheckboxGroup' })
                .width(24)
                .height(24)
                .focusable(true)
                .focusOnTouch(true)
                .selectedColor('#CE0E2D')
                .select(this.isSelected)
                .enabled(this.enableStatus)
                .margin({ top: 0 })
                .onChange((value: boolean) => {
                  hilog.info(this.domainId, this.logTag, `agreementChecked: ${value}`);
                  if (value) {
                    this.isSelected = true;
                    this.showPopUp = false;
                    // Set the agreement status to ACCEPTED.
                    this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.ACCEPTED);
                  } else {
                    this.isSelected = false;
                    // Set the agreement status to NOT_ACCEPTED.
                    this.controller.setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED);
                  }
                })
            }
            .padding({ right: 12 })
            .bindPopup(this.showPopUp, {
              message: (this.getUIContext()
                .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync($r('app.string.read_and_agree_protocol')),
              onStateChange: (event) => {
                this.showPopUp = event.isVisible;
              },
              mask: false
            })

            Row() {
              Text() {
                if (this.privacyText && this.privacyText.length > 0) {
                  ForEach(this.privacyText, (item: loginComponentManager.PrivacyText) => {
                    if (item?.type === loginComponentManager.TextType.PLAIN_TEXT && item?.text) {
                      Span(item?.text)
                        .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                        .fontFamily($r('sys.string.ohos_id_text_font_family_regular'))
                        .fontWeight(FontWeight.Regular)
                        .fontSize($r('sys.float.ohos_id_text_size_body3'))
                    } else if (item?.type === loginComponentManager.TextType.RICH_TEXT && item?.text) {
                      Span(item?.text)
                        .fontColor($r('sys.color.ohos_id_color_text_primary'))
                        .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
                        .fontWeight(FontWeight.Medium)
                        .fontSize($r('sys.float.ohos_id_text_size_body3'))
                        .focusable(true)
                        .focusOnTouch(true)
                        .enabled(this.enableStatus)
                        .id('quickLoginProtocolUrlSpan')
                        .onClick(() => {
                          hilog.info(this.domainId, this.logTag, 'Click protocol url');
                          if (this.enableStatus) {
                            try {
                              this.jumpToPrivacyWebView(item);
                            } catch (error) {
                              const code: number = error.code;
                              const message: string = error.message;
                              hilog.error(this.domainId, this.logTag,
                                `Failed to jump privacy webview. errCode is ${code}, errMessage is ${message}`);
                            }
                          }
                        })
                    }
                  }, (item: loginComponentManager.PrivacyText, index: number) => `${item.text}_${index}}`)
                }
              }
            }
            .constraintSize({ minHeight: 24 })
          }
          .width('100%')
          .margin({ bottom: 16 })
        }
        .width('100%')
        .height('60%')
        .justifyContent(FlexAlign.SpaceBetween)
      }
      .padding({
        left: 16,
        right: 16,
        top: 36,
        bottom: 28
      })
      .justifyContent(FlexAlign.SpaceBetween)
      .backgroundColor('#F1F3F5')
      .width('100%')
      .height('100%')
    }
    .hideTitleBar(true)
  }
}
