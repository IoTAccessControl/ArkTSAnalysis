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
 * @kit PerformanceAnalysisKit
 */
/**
 * This module provides the capability to monitor leakage of JS objects.
 *
 * @namespace jsLeakWatcher
 * @syscap SystemCapability.HiviewDFX.HiChecker
 * @since 12
 */
declare namespace jsLeakWatcher {
    /**
     * Enable or disable jsLeakWatcher.
     *
     * @param { boolean } isEnable - True is enable jsLeakWatcher, false is disable jsLeakWatcher.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function enable(isEnable: boolean): void;
    /**
     * Register an object that needs to be monitored.
     *
     * @param { object } obj - Object being monitored.
     * @param { string } msg - Customized object information.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function watch(obj: object, msg: string): void;
    /**
     * Check suspected leaked objects.
     *
     * @returns { string } List of suspected leaked objects in JSON format.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function check(): string;
    /**
     * Dump leak list and heap snapshot.
     *
     * @param { string } filePath - Directory for exporting files.
     * @returns { Array<string> } The array of exported results, index 0 is leakListFileName, index 1 is heapSnapShotFileName.
     * @throws { BusinessError } 401 - Parameter error. The filepath is invalid.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function dump(filePath: string): Array<string>;
    /**
     * Enables or disables jsLeakWatcher.
     *
     * This interface can detect js object memory leaks in a single call, which is more concise than the previous method
     * requiring four function (enable,watch,check dump) calls.If there is a memory leak, the leak file will be
     * returned to the developer through the callback function.
     *
     * @param { boolean } isEnabled - Whether to enable or disable jsLeankWatcher. The value true means to enable the feature, and false means the opposite.
     * @param { Array<string> } configs - Array of types of objects to watch.
     * @param { Callback<Array<string>> } callback - Callback invoked when an object-related memory leak is detected.
     * @throws { BusinessError } 10801001 - The parameter isEnabled is invalid.
     * @throws { BusinessError } 10801002 - The parameter config is invalid.
     * @throws { BusinessError } 10801003 - The parameter callback is invalid.
     * Input parameter error. Possible causes:
     *  1.Mandatory parameters are left unspecified;
     *  2.Incorrect parameter types;
     *  3.Parameter verification failed.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 20
     */
    function enableLeakWatcher(isEnabled: boolean, configs: Array<string>, callback: Callback<Array<string>>): void;
}
export default jsLeakWatcher;
