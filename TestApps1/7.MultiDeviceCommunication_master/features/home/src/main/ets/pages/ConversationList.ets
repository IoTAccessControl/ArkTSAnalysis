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
import { ConversationDataInterface, ConversationListData } from '../viewmodel/ConversationViewModel';
import { ConversationItem } from '../views/Conversation/ConversationItem';
import { HomeTopSearch } from '../views/common/HomeTopSearch';
import { HomeConstants } from '../constants/HomeConstants';
import { deviceInfo } from '@kit.BasicServicesKit';

// [Start conversation_list_diff_device]
@Component
export struct ConversationList {
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  @Link currentConversationUserName: Resource;
  @Link currentContactUserName: string;
  @State private currentIndex: number = 0;
  @Consume('pageInfo') pageInfo: NavPathStack;

  build() {
    Flex({ direction: FlexDirection.Column }) {
      HomeTopSearch({ title: HomeConstants.CONVERSATION_TITLE })
        .height('13%')
      // [Start conversation_list]
      List() {
        ForEach(ConversationListData, (item: ConversationDataInterface, index: number) => {
          ListItem() {
            ConversationItem(item)
              .onClick(() => {
                if (this.pageInfo.size() > 1) {
                  this.pageInfo.pop();
                }
                this.pageInfo.pushPath({ name: 'ConversationDetail' });
                this.currentConversationUserName = item.name;
                this.currentContactUserName = '';
                this.currentIndex = index;
              })
              .backgroundColor(this.currentIndex === index ? '#33D8D8D8' : Color.White)
          }
          .height(Adaptive.ContactItemHeight(this.currentBreakpoint))
        }, (item: ConversationDataInterface, index: number) => index + JSON.stringify(item))
      }
      // [End conversation_list]
      .padding({
        bottom: deviceInfo.deviceType !== '2in1' && this.currentBreakpoint === 'lg' ? '28vp' : '0vp'
      })
      .backgroundColor(Color.White)
      .width('100%')
      .height('100%')
    }
    .height('100%')
    .width('100%')
  }
}
// [End conversation_list_diff_device]