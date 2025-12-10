/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * @kit AbilityKit
 */
import { ShortcutInfo as _ShortcutInfo, ShortcutWant as _ShortcutWant, ParameterItem as _ParameterItem } from './bundleManager/ShortcutInfo';
/**
 * Desktop shortcut bundle manager.
 *
 * @namespace shortcutManager
 * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
 * @since 20
 */
declare namespace shortcutManager {
    /**
     * Set a shortcut of current application is visible or invisible.
     *
     * @param { string } id - Indicates id of shortcut to set.
     * @param { boolean } visible - The value true means to set the shortcut visible, otherwise set the shortcut invisible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 17700070 - The specified shortcut id is illegal.
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    function setShortcutVisibleForSelf(id: string, visible: boolean): Promise<void>;
    /**
     * Obtains all shortcut info of the application.
     *
     * @returns { Promise<Array<ShortcutInfo>> } The LauncherShortcutInfo object.
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    function getAllShortcutInfoForSelf(): Promise<Array<ShortcutInfo>>;
    /**
     * Provides information about a shortcut, including the shortcut ID and label.
     *
     * @typedef { _ShortcutInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    export type ShortcutInfo = _ShortcutInfo;
    /**
     * Obtains information about the ability that a shortcut will start.
     *
     * @typedef { _ShortcutWant }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    export type ShortcutWant = _ShortcutWant;
    /**
     * Indicates the custom parameters in shortcut want.
     *
     * @typedef { _ParameterItem }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    export type ParameterItem = _ParameterItem;
}
export default shortcutManager;
