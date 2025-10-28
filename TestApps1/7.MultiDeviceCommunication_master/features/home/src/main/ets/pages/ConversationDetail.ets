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

import { Adaptive, BaseConstants, BreakpointConstants } from '@ohos/base';
import { ConversationDetailBottom } from '../views/Conversation/ConversationDetailBottom';
import ConversationDetailItem from '../views/Conversation/ConversationDetailItem';
import { ConversationDetailTopSearch } from '../views/Conversation/ConversationDetailTopSearch';
import { HomeConstants } from '../constants/HomeConstants';
import { deviceInfo } from '@kit.BasicServicesKit';

// [Start conversation_detail]
@Component
export struct ConversationDetail {
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  @Prop currentConversationUserName: string;
  @Prop currentFeatureIndex: number;
  @Consume('pageInfo') pageInfo: NavPathStack;

  build() {
    NavDestination() {
      Flex({ direction: FlexDirection.Column }) {
        ConversationDetailTopSearch({ currentConversationUserName: $currentConversationUserName, })
          .height(Adaptive.ContactItemHeight(this.currentBreakpoint))
        if (this.currentConversationUserName.length === 3) {
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: true,
            content: '芬芬邀请你喝奶茶啦',
            isAppletMsg: true,
            currentFeatureIndex: $currentFeatureIndex
          })
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: true,
            content: '请你喝奶茶，快点单吧！！速度速度，就差你了',
            currentFeatureIndex: $currentFeatureIndex
          })
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: false,
            content: '哈哈，今天有什么喜事说来听听',
            currentFeatureIndex: $currentFeatureIndex
          })
        } else {
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: true,
            content: '市场部2023年新产品宣传规划',
            isDocumentMsg: true,
            currentFeatureIndex: $currentFeatureIndex
          })
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: true,
            content: '这是明天会议的资料，请发给Jack，让他确认',
            currentFeatureIndex: $currentFeatureIndex
          })
          ConversationDetailItem({
            receivedName: $currentConversationUserName,
            isReceived: false,
            content: '好的，我明天过去',
            currentFeatureIndex: $currentFeatureIndex
          })
        }
        Blank()
        ConversationDetailBottom()
      }
      .height('100%')
      .width('100%')
      .backgroundColor($r('app.color.background_color_grey'))
      .padding({
        bottom: deviceInfo.deviceType !== '2in1' ? '28vp' : '0vp'
      })
    }
    .hideTitleBar(true)
  }
}
// [End conversation_detail]