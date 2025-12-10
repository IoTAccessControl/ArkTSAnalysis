/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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
 * @kit BackgroundTasksKit
 */
/**
 * Declares the BackgroundProcessManager interfaces.
 *
 * @namespace backgroundProcessManager
 * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
 * @since 17
 */
declare namespace backgroundProcessManager {
    /**
     * Describes the level of BackgroundProcessManager priority.
     *
     * @enum { number }
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 17
     */
    export enum ProcessPriority {
        /**
         * Means the process has stopped working and in the background
         *
         * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
         * @since 17
         */
        PROCESS_BACKGROUND = 1,
        /**
         * Means the process is working in the background
         *
         * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
         * @since 17
         */
        PROCESS_INACTIVE = 2
    }
    /**
     * Describes the status of the power saving mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 20
     */
    export enum PowerSaveMode {
        /**
         * Means the process request not to entry power saving mode
         * This setting may be overridden by settings in Task Manager
         *
         * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
         * @since 20
         */
        EFFICIENCY_MODE = 1,
        /**
         * Means the process operating mode follows the system and may entry power saving mode
         *
         * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
         * @since 20
         */
        DEFAULT_MODE = 2
    }
    /**
     * Set the priority of process.
     *
     * @param { number } pid - Indicates the pid of the process to be set.
     * @param { ProcessPriority } priority - Indicates the priority to set. Specific priority can be referenced ProcessPriority
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: priority is out of range.
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 17
     */
    function setProcessPriority(pid: number, priority: ProcessPriority): Promise<void>;
    /**
     * Reset the priority of process.
     *
     * @param { number } pid - Indicates the pid of the process to be reset.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 17
     */
    function resetProcessPriority(pid: number): Promise<void>;
    /**
     * Set the power saving mode of process. The setting may fail due to user setting reasons or
     * <br> system scheduling reasons.
     *
     * @permission ohos.permission.BACKGROUND_MANAGER_POWER_SAVE_MODE
     * @param { number } pid - Indicates the pid of the power saving mode to be set.
     * @param { PowerSaveMode } powerSaveMode - Indicates the power saving mode that needs to be set.
     * <br> For details, please refer to PowerSaveModeStatus.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 31800002 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. PowerSaveMode status is out of range.
     * @throws { BusinessError } 31800003 - Setup error, This setting is overridden by setting in Task Manager.
     * @throws { BusinessError } 31800004 - The setting failed due to system scheduling reasons.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 20
     */
    function setPowerSaveMode(pid: number, powerSaveMode: PowerSaveMode): Promise<void>;
    /**
     * Check if the process is in power saving mode.
     *
     * @permission ohos.permission.BACKGROUND_MANAGER_POWER_SAVE_MODE
     * @param { number } pid - Indicates the process to be checked is the pid of the power saving mode.
     * @returns { Promise<boolean> } The promise returns whether it is in power saving mode.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 31800002 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types;
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Resourceschedule.BackgroundProcessManager
     * @since 20
     */
    function isPowerSaveMode(pid: number): Promise<boolean>;
}
export default backgroundProcessManager;
