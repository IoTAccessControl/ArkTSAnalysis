/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import StartupConfig from './@ohos.app.appstartup.StartupConfig';
import Want from './@ohos.app.ability.Want';
/**
 * The configuration entry for running startup tasks.
 *
 * @syscap SystemCapability.Ability.AppStartup
 * @stagemodelonly
 * @since 12
 */
export default class StartupConfigEntry {
    /**
     * Called when startup initialization to configure startup mode.
     *
     * @returns { StartupConfig } The developer returns a startup configuration.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    onConfig?(): StartupConfig;
    /**
     * Called to obtain a custom match rule during application launch.
     * Depending on the parameters in the Want passed in, you can return various custom rules to match against the
     * `customization` field in `matchRules` configured for the startup task. If a match is successful, the task is
     * executed automatically.
     * This interface can be used to further refine matching rules when a startup scenario cannot be matched to
     * a startup task through URI, action, or intent name rules.
     *
     * @param { Want } want Want information of the started ability.
     * @returns { string } Custom match rule
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 20
     */
    onRequestCustomMatchRule(want: Want): string;
}
