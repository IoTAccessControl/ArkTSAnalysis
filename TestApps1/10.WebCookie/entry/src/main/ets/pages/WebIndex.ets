/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { webview } from '@kit.ArkWeb';
import { CommonConstants } from '../common/constants/CommonConstant';
import { LinkButton } from '../view/LinkButton';
import { showDialog } from '../common/utils/DialogUtil';
import router from '@ohos.router';

/**
 * Home page.
 */
@Entry
@Component
struct WebIndex {
  controller: webview.WebviewController = new webview.WebviewController();
  pathStack: NavPathStack = new NavPathStack();

  build() {
    Navigation(this.pathStack) {
      Text($r('app.string.navigator_name'))
        .fontSize(CommonConstants.NAVIGATOR_SIZE)
        .fontWeight(CommonConstants.FONT_WEIGHT_DEEPER)
        .fontColor($r('app.color.navigator_black'))
        .width(CommonConstants.FULL_WIDTH)
        .margin({
          top: CommonConstants.APP_TITLE_MARGIN_TOP,
          left: CommonConstants.APP_TITLE_MARGIN_LEFT
        })

      Text($r('app.string.title_name'))
        .fontSize(CommonConstants.TITLE_SIZE)
        .fontWeight(CommonConstants.FONT_WEIGHT_DEEPER)
        .fontColor($r('app.color.title_black'))
        .textAlign(TextAlign.Center)
        .width(CommonConstants.WEB_WIDTH)
        .height(CommonConstants.PAGE_TITLE_HEIGHT)
        .margin({
          top: $r('app.float.page_title_margin_top'),
          bottom: $r('app.float.page_title_margin_bottom')
        })

      Web({
        src: CommonConstants.USER_CENTER_URL,
        controller: this.controller
      })
        .domStorageAccess(true)
        .javaScriptAccess(true)
        .height(CommonConstants.WEB_HEIGHT)
        .width(CommonConstants.WEB_WIDTH)
        .margin({ bottom: CommonConstants.WEB_MARGIN_BOTTOM })
        .onErrorReceive((event) => {
          if (event?.request.isMainFrame()) {
            let message = $r('app.string.load_error');
            showDialog(message);
          }
        })

      Row() {
        LinkButton({ buttonType: CommonConstants.CookieOperation[0], isNeedDivider: true })
        LinkButton({ buttonType: CommonConstants.CookieOperation[1], isNeedDivider: true })
        LinkButton({ buttonType: CommonConstants.CookieOperation[2], isNeedDivider: true })
        LinkButton({ buttonType: CommonConstants.CookieOperation[3], isNeedDivider: false, pathStack: this.pathStack })
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .width(CommonConstants.WEB_WIDTH)

      Button('Permissions Test Page')
        .width(CommonConstants.WEB_WIDTH)
        .margin({ top: 10 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/PermissionsTest' });
        })
      Button('UserInfo')
        .width(CommonConstants.WEB_WIDTH)
        .margin({ top: 10 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/UserInfo' });
        })
    }
    .backgroundColor($r('app.color.page_background_grey'))
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .hideTitleBar(true)
    .hideToolBar(true)
  }
}