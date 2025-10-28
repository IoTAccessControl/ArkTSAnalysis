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

import { Adaptive, BaseConstants, BreakpointConstants, CurrentFeature, CurrentPage } from '@ohos/base';
import ConversationDetailNone from '../views/Conversation/ConversationDetailNone';
import { ContactsDetail } from './ContactsDetail';
import { ContactsList } from './ContactsList';
import { ConversationDetail } from './ConversationDetail';
import { ConversationList } from './ConversationList';
import { HomeConstants } from '../constants/HomeConstants';
import { HomeTab } from '../views/HomeTab';
import { SocialCircle } from '@ohos/SocialCircle';
import { deviceInfo } from '@kit.BasicServicesKit';
import { PermissionPage } from './PermissionPage';
import {UserInfo} from './UserInfo';

@Entry
@Component
export struct Index {
  @StorageProp('currentBreakpoint') @Watch('watchCurrentBreakpoint') currentBreakpoint: string = 'sm';
  // [Start navigation_diff_device]
  @Provide('pageInfo') pageInfo: NavPathStack = new NavPathStack();
  // [StartExclude navigation_diff_device]
  @State currentConversationUserName: string = '';
  @State currentContactUserName: string = '';
  @State currentContactUserIcon: Resource = HomeConstants.DEFAULT_AVATAR;
  @State currentPageIndex: number = CurrentPage.HOME;
  @State currentFeatureIndex: Number = CurrentFeature.HOME;
  @State isSplitAppletScreen: boolean = BaseConstants.SPLIT_APPLET_SCREEN;
  @State isSplitDocumentScreen: boolean = BaseConstants.SPLIT_DOCUMENT_SCREEN;

  watchCurrentBreakpoint() {
    if (this.currentBreakpoint === 'sm' &&
      this.pageInfo.getParamByName('ConversationDetailNone').length === 1 && this.pageInfo.size() === 1) {
      this.pageInfo.pop();
    }
  }
  // [EndExclude navigation_diff_device]

  @Builder
  PageMap(name: string) {
    if (name === 'ConversationDetail') {
      ConversationDetail({ currentConversationUserName: this.currentConversationUserName, currentFeatureIndex: 1 });
    } else if (name === 'ConversationDetailNone') {
      ConversationDetailNone();
    } else if (name === 'ContactsDetail') {
      ContactsDetail({
        currentContactUserName: this.currentContactUserName,
        currentContactUserIcon: this.currentContactUserIcon
      });
    } else {
      ConversationDetailNone();
    }
  }

  build() {
    Column() {
      /**
       * Home and contacts page
       */
      Flex() {
        HomeTab({ currentPageIndex: $currentPageIndex })
          .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
          .backgroundColor('#F1F3F5')
          .padding({
            top: '180vp',
            bottom: '180vp',
            left: '22vp'
          })
          .visibility(this.currentBreakpoint === 'lg' ? Visibility.Visible : Visibility.None)
        // [Start nav_path_stack]
        Navigation(this.pageInfo) {
          if (this.currentPageIndex === 0) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center }) {
              ConversationList({
                currentConversationUserName: $currentConversationUserName,
                currentContactUserName: $currentContactUserName
              })
                .flexGrow(1)
                .width('100%')
              HomeTab({ currentPageIndex: $currentPageIndex })
                .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
                .height(Adaptive.HomeTabHeight(this.currentBreakpoint))
                .visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None)
            }
            .padding({
              bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
            })
            .height('100%')
          } else if (this.currentPageIndex === 1) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center }) {
              ContactsList({
                currentContactUserName: $currentContactUserName,
                currentConversationUserName: $currentConversationUserName,
                currentContactUserIcon: $currentContactUserIcon
              })
                .flexGrow(1)
                .width('100%')
              HomeTab({ currentPageIndex: $currentPageIndex })
                .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
                .height(Adaptive.HomeTabHeight(this.currentBreakpoint))
                .visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None)
            }
            .height('100%')
            .padding({
              bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
            })
          } else if (this.currentPageIndex === 4) {
            Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center }) {
              PermissionPage()
                .flexGrow(1)
                .width('100%')
              HomeTab({ currentPageIndex: $currentPageIndex })
                .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
                .height(Adaptive.HomeTabHeight(this.currentBreakpoint))
                .visibility(this.currentBreakpoint !== 'lg' ? Visibility.Visible : Visibility.None)
            }
            .height('100%')
            .padding({
              bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint !== 'lg' ? '28vp' : '0vp'
            })
          }
        }
        // [End nav_path_stack]
        .hideTitleBar(true)
        .hideToolBar(true)
        .navBarWidth(this.currentBreakpoint === 'lg' ? '44.5%' : '50%')
        .navDestination(this.PageMap)
        .mode(this.currentBreakpoint === 'sm' ? NavigationMode.Stack : NavigationMode.Split)
        .width('100%')
      }
      .visibility(this.currentPageIndex === 0 || this.currentPageIndex === 1 || this.currentPageIndex === 4 ? Visibility.Visible : Visibility.None)

      // [StartExclude navigation_diff_device]
      /**
       * SocialCircle page
       */
      Flex({ direction: FlexDirection.Column }) {
        SocialCircle()
          .flexGrow(1)
        HomeTab({ currentPageIndex: $currentPageIndex })
          .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
          .height(Adaptive.HomeTabHeight(this.currentBreakpoint))
      }
      .width('100%')
      .height('100%')
      .visibility(this.currentPageIndex === CurrentPage.SOCIAL_CIRCLE && this.currentBreakpoint !==
      'lg' ? Visibility.Visible : Visibility.None)
      .padding({
        bottom: $r('app.float.tab_content_pb')
      })


      Row() {
        HomeTab({ currentPageIndex: $currentPageIndex })
          .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
          .backgroundColor($r('app.color.background_color_grey_two'))
          .padding({
            top: $r('app.float.home_tab_padding_top'),
            bottom: $r('app.float.home_tab_padding_bottom'),
            left: $r('app.float.home_tab_padding_left')
          })
        SocialCircle()
          .width(BaseConstants.NINETY_WIDTH_PERCENT)
      }
      .width('100%')
      .visibility(this.currentPageIndex === CurrentPage.SOCIAL_CIRCLE && this.currentBreakpoint ===
      'lg' ? Visibility.Visible : Visibility.None)

      /**
       * Me page
       */
      Flex({ direction: FlexDirection.Column }) {
        Column()
          .flexGrow(1)
        HomeTab({ currentPageIndex: $currentPageIndex })
          .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
          .height(Adaptive.HomeTabHeight(this.currentBreakpoint))
      }
      .width('100%')
      .height('100%')
      .visibility(this.currentPageIndex === CurrentPage.ME && this.currentBreakpoint !==
      'lg' ? Visibility.Visible : Visibility.None)
      .padding({
        top: deviceInfo.deviceType === '2in1' ? $r('app.float.zero') : $r('app.float.device_padding_top'),
        bottom: deviceInfo.deviceType !== '2in1'
          && this.currentBreakpoint !== 'lg' ?
        $r('app.float.tab_content_pb') : $r('app.float.zero')
      })


      Row() {
        HomeTab({ currentPageIndex: $currentPageIndex })
          .width(Adaptive.HomeTabWidth(this.currentBreakpoint))
          .backgroundColor($r('app.color.background_color_grey_two'))
          .padding({
            top: $r('app.float.home_tab_padding_top'),
            bottom: $r('app.float.home_tab_padding_bottom'),
            left: $r('app.float.home_tab_padding_left')
          })
        Column()
          .width(BaseConstants.NINETY_WIDTH_PERCENT)
          .height('100%')
      }
      .width('100%')
      .visibility(this.currentPageIndex === CurrentPage.ME && this.currentBreakpoint ===
      'lg' ? Visibility.Visible : Visibility.None)
      // [EndExclude navigation_diff_device]
    }
    // [StartExclude navigation_diff_device]
    .height('100%')
    .width('100%')
    .backgroundColor($r('app.color.background_color_grey_two'))
    // [EndExclude navigation_diff_device]
  }
  // [End navigation_diff_device]
}