/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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
 * @kit FormKit
 */
import ExtensionContext from './ExtensionContext';
import Want from '../@ohos.app.ability.Want';
/**
 * The context of live form extension. It allows access to
 * liveFormExtension-specific resources.
 *
 * @extends ExtensionContext
 * @syscap SystemCapability.Ability.Form
 * @stagemodelonly
 * @atomicservice
 * @since 20
 */
declare class LiveFormExtensionContext extends ExtensionContext {
    /**
     * Start ability belongs to the application
     *
     * @param { Want } want - includes ability name, parameters and relative info sending to an ability.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported due to limited device capabilities.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501011 - The form can not support this operation
     * @syscap SystemCapability.Ability.Form
     * @stagemodelonly
     * @atomicservice
     * @since 20
     */
    startAbilityByLiveForm(want: Want): Promise<void>;
}
export default LiveFormExtensionContext;
