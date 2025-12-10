/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
/**
 * Provides information about a shortcut, including the shortcut ID and label.
 *
 * @typedef ShortcutInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
 * @since 20
 */
export interface ShortcutInfo {
    /**
     * Indicates the ID of the application to which this shortcut belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    id: string;
    /**
     * Indicates the name of the bundle containing the shortcut
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    bundleName: string;
    /**
     * Indicates the moduleName of the shortcut
     *
     * @type { ?string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    moduleName?: string;
    /**
     * Indicates the host ability of the shortcut
     *
     * @type { ?string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    hostAbility?: string;
    /**
     * Indicates the icon of the shortcut
     *
     * @type { ?string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    icon?: string;
    /**
     * Indicates the icon id of the shortcut
     *
     * @type { ?number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    iconId?: number;
    /**
     * Indicates the label of the shortcut
     *
     * @type { ?string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    label?: string;
    /**
     * Indicates the label id of the shortcut
     *
     * @type { ?number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    labelId?: number;
    /**
     * Indicates the wants of the shortcut
     *
     * @type { ?Array<ShortcutWant> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    wants?: Array<ShortcutWant>;
    /**
     * Indicates the index of application clone.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    appIndex: number;
    /**
     * Indicates the source type of shortcut.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    sourceType: number;
    /**
     * Display control for indicating shortcut.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    visible?: boolean;
}
/**
 * Obtains information about the ability that a shortcut will start.
 *
 * @typedef ShortcutWant
 * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
 * @since 20
 */
export interface ShortcutWant {
    /**
     * Indicates the target bundle of the shortcut want
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    targetBundle: string;
    /**
     * Indicates the target module of the shortcut want
     *
     * @type { ?string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    targetModule?: string;
    /**
     * Indicates the target ability of the shortcut want
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    targetAbility: string;
    /**
     * Indicates the parameters of the shortcut want
     *
     * @type { ?Array<ParameterItem> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    parameters?: Array<ParameterItem>;
}
/**
 * Obtains information about the ability that a shortcut will start.
 *
 * @typedef ParameterItem
 * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
 * @since 20
 */
export interface ParameterItem {
    /**
     * Indicates the key of the parameter item.
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    key: string;
    /**
     * Indicates the value of the parameter item.
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
     * @since 20
     */
    value: string;
}
