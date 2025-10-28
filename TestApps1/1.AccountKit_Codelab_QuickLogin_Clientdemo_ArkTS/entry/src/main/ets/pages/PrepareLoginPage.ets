/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import { common } from '@kit.AbilityKit';
import { authentication } from '@kit.AccountKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { showToast } from '../common/ShowToast';
import { ErrorCode } from '../common/Constants';

@Component
export struct PrepareLoginPage {
  logTag: string = 'PrepareLoginPage';
  domainId: number = 0x0000;
  @State isLogin: boolean = false;
  @Consume('pageInfos') pageInfos: NavPathStack;

  aboutToAppear() {
    hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
  }

  // Redirect to another page.
  private jumpLoginPage(quickLoginAnonymousPhone: string) {
    if (quickLoginAnonymousPhone) {
      // Obtain the anonymous mobile number, pass it, and redirect to the one-tap sign-in screen.
      const params: Record<string, Object> = { 'anonymousPhone': quickLoginAnonymousPhone };
      this.pageInfos?.pushPathByName('QuickLoginPage', params, true);
    } else {
      // If the anonymous mobile number cannot be obtained, an error message is displayed.
      const hint: string = (this.getUIContext()
        .getHostContext() as common.UIAbilityContext).resourceManager.getStringSync($r('app.string.get_mobile_number_error'));
      showToast(this.getUIContext(), hint);
    }
  }

  // Obtain the anonymous mobile number.
  getQuickLoginAnonymousPhone() {
    // Create an authorization request.
    const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
    // User information requested by the app.
    authRequest.scopes = ['quickLoginAnonymousPhone'];
    // In the one-tap sign-in scenario, forceAuthorization must be set to false.
    authRequest.forceAuthorization = false;
    const controller = new authentication.AuthenticationController();
    try {
      controller.executeRequest(authRequest).then((response: authentication.AuthorizationWithHuaweiIDResponse) => {
        // Obtain the UnionID, OpenID, and anonymous mobile number.
        const unionID = response.data?.unionID;
        const openID = response.data?.openID;
        const quickLoginAnonymousPhone = response.data?.extraInfo?.quickLoginAnonymousPhone as string;
        AppStorage.setOrCreate('quickLoginAnonymousPhone', quickLoginAnonymousPhone)
        this.jumpLoginPage(quickLoginAnonymousPhone);
        hilog.info(this.domainId, this.logTag,
          `Succeeded in authorizing. QuickLoginAnonymousPhone is ${quickLoginAnonymousPhone}`);
      }).catch((error: BusinessError) => {
        hilog.error(this.domainId, this.logTag,
          `Failed to authorize. errCode is ${error.code}, errMessage is ${error.message}`);
        this.dealAllError(error);
        showToast(this.getUIContext(), error);
      })
    } catch (error) {
      hilog.error(this.domainId, this.logTag,
        `Failed to authorize. errCode is ${error.code}, errMessage is ${error.message}`);
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
    } else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
      // Repeated request. No further action is needed.
    } else {
      // Sign-in failed. Try another sign-in option.
    }
  }

  build() {
    NavDestination() {
      Column() {
        Text($r('app.string.login'))
          .fontSize(30)
          .fontWeight(FontWeight.Medium)
          .textAlign(TextAlign.Center)
          .id('loginText')
          .onClick(() => {
            this.getQuickLoginAnonymousPhone();
          })
          
        Button('权限功能测试')
          .width('60%')
          .height(50)
          .margin({ top: 20 })
          .backgroundColor('#E64A19')
          .onClick(() => {
            this.pageInfos?.pushPathByName('PermissionsPage', null, true);
          })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    }
    .backgroundColor('#F1F3F5')
    .hideTitleBar(true)
    .onBackPressed(() => {
      // Directly exit the app using a gesture.
      hilog.info(this.domainId, this.logTag, 'PrepareLoginPage onBackPressed');
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

