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
export class HomeConstants {
    /**
     * Grid row column list.
     */
    static readonly GRID_ROW_COLUMNS: number[] = [1, 2, 3, 4, 5];
    static readonly GRID_COL_COLUMNS: number[] = [0, 1, 2, 3, 4, 5];
    static readonly TAB_MESSAGE_INDEX = 0;
    /**
     * Index of CONTACTS tab.
     */
    static readonly TAB_CONTACTS_INDEX = 1;
    /**
     * Index of SOCIAL_CIRCLE tab.
     */
    static readonly TAB_SOCIAL_CIRCLE_INDEX = 2;
    /**
     * Index of ME tab.
     */
    static readonly TAB_ME_INDEX = 3;
    static readonly CONTACTS_DETAIL_AVATAR_Z_INDEX = 2;
    /**
     * Image message
     */
    static readonly USER_PHONE = '15988880000';
    static readonly LAST_POST = { "id": 50331731, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly IMAGES_SCOPE = 2;
    static readonly IMAGE_ASPECT_RATIO = 1;
    /**
     * Contacts list detail
     */
    static readonly CONTACTS_NAME = { "id": 50331712, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly CONTACTS_LIST = [{ "id": 50331727, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, { "id": 50331723, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }];
    static readonly CONTACTS_DEFAULT_SELECTED_INDEX = 0;
    static readonly CONTACTS_DEFAULT_SELECTED_NAME = { "id": 50331710, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    /**
     * Conversation detail
     */
    static readonly CONVERSATION_LIST_APPLET = [{ "id": 50331730, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, { "id": 50331722, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, { "id": 50331728, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }];
    static readonly CONVERSATION_LIST_DOCUMENT = [{ "id": 50331734, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, { "id": 50331729, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, { "id": 50331732, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }];
    static readonly IS_APPLET_CONVERSATION = true;
    static readonly IS_DOCUMENT_CONVERSATION = true;
    static readonly IS_RECEIVED = true;
    static readonly CONVERSATION_DEFAULT_SIZE = 3;
    static readonly CONVERSATION_TITLE = { "id": 50331719, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    /**
     * Conversation top search
     */
    static readonly SEARCH_TEXT_FLEX_BASIS = 150;
    static readonly SEARCH_TEXT_INPUT = { "id": 50331735, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly ENABLE_KEY_BOARD_ON_FOCUS = false;
    static readonly FLEX_BASIS_AUTO = 'auto';
    /**
     * Conversation detail
     */
    static readonly CONVERSATION_DETAIL_BOTTOM_TEXT_RADIUS = 20;
    static readonly CONVERSATION_DETAIL_TOP_TITLE = '芬芬';
    static readonly CONVERSATION_DETAIL_MAX_LINE = 1;
    static readonly CONVERSATION_DETAIL_FILL_OPACITY = 1;
    static readonly CONVERSATION_DETAIL_STROKE_WIDTH = 1;
    static readonly PATH_BORDER_RADIUS = 8;
    /**
     * Applet detail
     */
    static readonly APPLET_TITLE = '奶茶';
    static readonly APPLET_DESCRIBE = '应用';
    /**
     * Document detail
     */
    static readonly DOCUMENT_SIZE = '24KB';
    static readonly DOCUMENT_INTRODUCE = { "id": 50331724, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly DOCUMENT_DIVIDER_WIDTH = 1;
    /**
     * Default avatar
     */
    static readonly DEFAULT_AVATAR = { "id": 50331839, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    /**
     * Navigation navBarWidth percent
     */
    static readonly NAVIGATION_NAV_BAR_WIDTH_MD = '50%';
    static readonly NAVIGATION_NAV_BAR_WIDTH_LG = '44.5%';
}
