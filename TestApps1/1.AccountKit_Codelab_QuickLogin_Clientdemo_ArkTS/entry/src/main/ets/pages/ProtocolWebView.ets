/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import { webview } from '@kit.ArkWeb';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { display } from '@kit.ArkUI';
import { showToast } from '../common/ShowToast';

@Component
export struct ProtocolWebView {
  logTag: string = 'ProtocolWebView';
  domainId: number = 0x0000;
  params?: Record<string, Object>;
  private controller: webview.WebviewController = new webview.WebviewController();
  private url: string = '';
  @State progress: number = 0;
  @State webViewWidth: string = this.getWebviewWidth();
  @Consume('pageInfos') pageInfos?: NavPathStack;

  aboutToAppear(): void {
    hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
    // Obtain the passed parameter object.
    if (this.params && this.params !== null) {
      this.url = (this.params['protocolUrl'] ?? '') as string;
    }
  }

  // Obtains the page width.
  getWebviewWidth() {
    const WEB_PAGE_MARGIN = 32;
    const UI_PAGE_MARGIN = 16;
    const displayWidth: number = this.getUIContext().px2vp(display.getDefaultDisplaySync().width);
    return ((displayWidth + (WEB_PAGE_MARGIN - UI_PAGE_MARGIN) * 2) * 100 / displayWidth).toFixed(2) + '%';
  }

  build() {
    NavDestination() {
      Column() {
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
        .margin({
          top: 36,
          bottom: $r('sys.float.ohos_id_elements_margin_horizontal_m'),
          left: 16
        })
        .id('appBackButton')
        .onClick(() => {
          if (this.pageInfos && this.pageInfos.size() > 1) {
            this.pageInfos.pop();
          }
        })

        Progress({ value: this.progress, type: ProgressType.Linear })
          .width('100%')
          .visibility(this.progress <= 99 ? Visibility.Visible : Visibility.None)

        Web({ src: this.url, controller: this.controller })
          .javaScriptAccess(true)
          .geolocationAccess(false)
          .fileAccess(false)
          .width(this.webViewWidth)
          .margin({ bottom: 60 })
          .backgroundColor(Color.Transparent)
          .onProgressChange((event) => {
            hilog.info(this.domainId, this.logTag,
              'onProgressChange: ', (event ? event.newProgress : -1));
            this.progress = event ? event.newProgress : 0;
          })
          .onAppear(async () => {
            try {
              this.controller.loadUrl(this.url);
            } catch (error) {
              hilog.error(this.domainId, this.logTag,
                `Failed to load ProtocolWebView. errCode is ${error.code}, errMessage is ${error.message}`);
              showToast(this.getUIContext(), error);
            }
          })
      }
      .width('100%')
      .height('100%')
      .padding({ bottom: 60 })
    }.hideTitleBar(true)
  }
}
