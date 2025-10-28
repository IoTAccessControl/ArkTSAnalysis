/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import { hilog } from '@kit.PerformanceAnalysisKit';
import { QuickLoginPage } from './QuickLoginPage';
import { PersonalInfoPage } from './PersonalInfoPage';
import { ProtocolWebView } from './ProtocolWebView';
import { PrepareLoginPage } from './PrepareLoginPage';
import { PermissionsPage } from './PermissionsPage';
import {UserInfo} from './UserInfo';
@Entry()
@Component
struct HomePage {
  logTag: string = 'HomePage';
  domainId: number = 0x0000;
  @Provide('pageInfos') pageInfos: NavPathStack = new NavPathStack();

  aboutToAppear() {
    hilog.info(this.domainId, this.logTag, `${this.logTag} aboutToAppear`);
  }

  @Builder
  PageMap(name: string, params: Record<string, Object>) {
    if (name === 'PrepareLoginPage') {
      PrepareLoginPage();
    } else if (name === 'QuickLoginPage') {
      QuickLoginPage({ params });
    } else if (name === 'PersonalInfoPage') {
      PersonalInfoPage();
    } else if (name === 'ProtocolWebView') {
      ProtocolWebView({ params });
    } else if (name === 'PermissionsPage') {
      PermissionsPage();
    }
  }

  build() {
    Navigation(this.pageInfos) {
    }
    .onAppear(() => {
      this.pageInfos?.pushPathByName('PrepareLoginPage', null, false);
    })
    .titleMode(NavigationTitleMode.Full)
    .hideTitleBar(true)
    .hideToolBar(true)
    .mode(NavigationMode.Stack)
    .navDestination(this.PageMap)
  }
}
