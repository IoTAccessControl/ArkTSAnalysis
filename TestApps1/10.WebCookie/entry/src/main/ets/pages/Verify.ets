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
import { showDialog } from '../common/utils/DialogUtil';
import { CommonConstants } from '../common/constants/CommonConstant';

@Builder
export function VerifyPageBuilder() {
  Verify()
}

/**
 * Page use to verify login free.
 */
@Component
export struct Verify {
  pathStack: NavPathStack = new NavPathStack();
  fileAccess: boolean = true;
  controller: webview.WebviewController = new webview.WebviewController();
  isRedirect: boolean = false;

  onPageShow(): void {
    this.isRedirect = false;
  }

  build() {
    NavDestination() {
      Text($r('app.string.title_name'))
        .fontSize(CommonConstants.TITLE_SIZE)
        .fontWeight(CommonConstants.FONT_WEIGHT_DEEPER)
        .fontColor($r('app.color.title_black'))
        .width(CommonConstants.PAGE_TITLE_WIDTH)
        .height(CommonConstants.PAGE_TITLE_HEIGHT)
        .margin({
          top: $r('app.float.page_title_margin_top'),
          bottom: $r('app.float.page_title_margin_bottom')
        })

      Web({
        src: CommonConstants.USER_ABOUT_URL,
        controller: this.controller
      })
        .height(CommonConstants.WEB_HEIGHT)
        .width(CommonConstants.WEB_WIDTH)
        .fileAccess(this.fileAccess)
        .javaScriptAccess(true)
        .onPageEnd(() => {
          try {
            let originCookie = webview.WebCookieManager.fetchCookieSync(CommonConstants.USER_ABOUT_URL);
            if (originCookie === '' || this.isRedirect) {
              return;
            }
            this.isRedirect = true;
            showDialog(originCookie);
          } catch (error) {
            showDialog('Failed to load the web page.' + JSON.stringify(error));
          }
        })
    }
    .backgroundColor($r('app.color.page_background_grey'))
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .title($r('app.string.navigator_name'))
    .hideToolBar(true)
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
  }
}
