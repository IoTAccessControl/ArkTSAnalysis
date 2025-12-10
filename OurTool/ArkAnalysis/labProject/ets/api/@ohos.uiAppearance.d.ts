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
/**
 * @file
 * @kit ArkUI
 */
/**
* Provide APIs to set system uiAppearance.
*
* @namespace uiAppearance
* @syscap SystemCapability.ArkUI.UiAppearance
* @since 20
*/
declare namespace uiAppearance {
    /**
     * Enumerates dark-mode.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.UiAppearance
     * @since 20
     */
    enum DarkMode {
        /**
         * Always display with dark mode.
         *
         * @syscap SystemCapability.ArkUI.UiAppearance
         * @since 20
         */
        ALWAYS_DARK = 0,
        /**
         * Always display with light mode.
         *
         * @syscap SystemCapability.ArkUI.UiAppearance
         * @since 20
         */
        ALWAYS_LIGHT = 1
    }
    /**
     * Acquire the current dark-mode.
     *
     * @returns { DarkMode } current dark-mode.
     * @throws { BusinessError } 500001 - Internal error.
     * @syscap SystemCapability.ArkUI.UiAppearance
     * @since 20
     */
    function getDarkMode(): DarkMode;
    /**
     * Acquire the current font-scale.
     *
     * @returns { number } current font-scale.
     * @throws { BusinessError } 500001 - Internal error.
     * @syscap SystemCapability.ArkUI.UiAppearance
     * @since 20
     */
    function getFontScale(): number;
    /**
     * Acquire the current font-weight-scale.
     *
     * @returns { number } current font-weight-scale.
     * @throws { BusinessError } 500001 - Internal error.
     * @syscap SystemCapability.ArkUI.UiAppearance
     * @since 20
     */
    function getFontWeightScale(): number;
}
export default uiAppearance;
