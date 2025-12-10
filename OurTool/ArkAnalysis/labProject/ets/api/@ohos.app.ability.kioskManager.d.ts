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
 * @kit AbilityKit
 */
import UIAbilityContext from './application/UIAbilityContext';
import { KioskStatus as _KioskStatus } from './application/KioskStatus';
/**
 * The class of kiosk manager.
 *
 * @namespace kioskManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @since 20
 */
declare namespace kioskManager {
    /**
     * Enter kiosk mode.
     *
     * @param { UIAbilityContext } context - The context that initiates to enter kiosk mode.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000110 - Current application is not in kiosk app list, can not enter kiosk mode.
     * @throws { BusinessError } 16000111 - System is already in kiosk mode, can not enter again.
     * @throws { BusinessError } 16000113 - Current ability is not in foreground.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 20
     */
    function enterKioskMode(context: UIAbilityContext): Promise<void>;
    /**
     * Exit kiosk mode.
     *
     * @param { UIAbilityContext } context - The context that initiates to exit kiosk mode.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000110 - Current application is not in kiosk app list, can not exit kiosk mode.
     * @throws { BusinessError } 16000112 - Current application is not in kiosk mode, can not exit.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 20
     */
    function exitKioskMode(context: UIAbilityContext): Promise<void>;
    /**
     * The kiosk status data.
     *
     * @typedef { _KioskStatus }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 20
     */
    export type KioskStatus = _KioskStatus;
}
export default kioskManager;
