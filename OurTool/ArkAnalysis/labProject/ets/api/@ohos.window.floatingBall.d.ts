/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
import type BaseContext from './application/BaseContext';
import type image from './@ohos.multimedia.image';
import type Want from './@ohos.app.ability.Want';
import type { Callback } from './@ohos.base';
/**
 * Floating ball
 *
 * @namespace floatingBall
 * @syscap SystemCapability.Window.SessionManager
 * @since 20
 */
declare namespace floatingBall {
    /**
     * If floating ball enabled in current device.
     *
     * @returns { boolean } true if floating ball enabled, otherwise false.
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    function isFloatingBallEnabled(): boolean;
    /**
     * Create floating ball controller
     *
     * @param { FloatingBallConfiguration } config - Params for floating ball controller creation.
     *     The config must be valid, the context in config should not be null.
     * @returns { Promise<FloatingBallController> } - The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported.
     *     Failed to call the API due to limited device capabilities.
     * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
     * @throws { BusinessError } 1300023 - Floating ball internal error.
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    function create(config: FloatingBallConfiguration): Promise<FloatingBallController>;
    /**
     * FloatingBallConfiguration
     *
     * @interface FloatingBallConfiguration
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    interface FloatingBallConfiguration {
        /**
         * Indicates window context.
         *
         * @type { BaseContext }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        context: BaseContext;
    }
    /**
     * FloatingBallController
     *
     * @interface FloatingBallController
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    interface FloatingBallController {
        /**
         * Start floating ball
         *
         * @permission ohos.permission.USE_FLOAT_BALL
         * @param { FloatingBallParams } params - Params for floating ball start.
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 201 - Permission verification failed, usually returned by VerifyAccessToken.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300020 - Failed to create the floating ball window.
         * @throws { BusinessError } 1300021 - Failed to start multiple floating ball windows.
         * @throws { BusinessError } 1300022 - Repeated floating ball operation.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @throws { BusinessError } 1300025 - The floating ball state does not support this operation.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        startFloatingBall(params: FloatingBallParams): Promise<void>;
        /**
         * Update floating ball
         *
         * @param { FloatingBallParams } params - Params for floating ball update.
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 1300002 - This window state is abnormal.
         * @throws { BusinessError } 1300003 - This window manager service works abnormally.
         * @throws { BusinessError } 1300004 - Unauthorized operation.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @throws { BusinessError } 1300025 - The floating ball state does not support this operation.
         * @throws { BusinessError } 1300027 - When updating the floating ball, the template type cannot be changed.
         * @throws { BusinessError } 1300028 - Updating static template-based floating balls is not supported.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        updateFloatingBall(params: FloatingBallParams): Promise<void>;
        /**
         * Stop floating ball.
         *
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 1300022 - Repeated floating ball operation.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        stopFloatingBall(): Promise<void>;
        /**
         * Register floating ball lifecycle event listener.
         *
         * @param { 'stateChange' } type - Registration type, floating ball lifecycle state change, 'stateChange'.
         * @param { Callback<FloatingBallState> } callback - Used to handle {'stateChange'} command.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300022 - Repeated floating ball operation.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        on(type: 'stateChange', callback: Callback<FloatingBallState>): void;
        /**
         * Unregister floating ball lifecycle event listener.
         *
         * @param { 'stateChange' } type - Used to unregister listener for {'stateChange'} command.
         * @param { Callback<FloatingBallState> } [callback] - Indicates the callback function.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        off(type: 'stateChange', callback?: Callback<FloatingBallState>): void;
        /**
         * Register floating ball click event listener.
         *
         * @param { 'click' } type - Registration type, user click event, 'click'.
         * @param { Callback<void> } callback - Used to handle {'click'} command.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300022 - Repeated floating ball operation.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        on(type: 'click', callback: Callback<void>): void;
        /**
         * Unregister floating ball click event listener.
         *
         * @param { 'click' } type - Used to unregister listener for {'click'} command.
         * @param { Callback<void> } [callback] - Indicates the callback function.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        off(type: 'click', callback?: Callback<void>): void;
        /**
         * Get the info of floating ball window.
         *
         * @returns { Promise<FloatingBallWindowInfo> } - The promise used to return the floating ball window info.
         * @throws { BusinessError } 1300002 - This window state is abnormal.
         * @throws { BusinessError } 1300003 - This window manager service works abnormally.
         * @throws { BusinessError } 1300004 - Unauthorized operation.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @throws { BusinessError } 1300025 - The floating ball state does not support this operation.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        getFloatingBallWindowInfo(): Promise<FloatingBallWindowInfo>;
        /**
         * Restore main window for floating ball creatorBundle.
         *
         * @permission ohos.permission.USE_FLOAT_BALL
         * @param { Want } want - Params for floating ball restoration.
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 201 - Permission verification failed, usually returned by VerifyAccessToken.
         * @throws { BusinessError } 1300002 - This window state is abnormal.
         * @throws { BusinessError } 1300003 - This window manager service works abnormally.
         * @throws { BusinessError } 1300004 - Unauthorized operation.
         * @throws { BusinessError } 1300019 - Wrong parameters for operating the floating ball.
         * @throws { BusinessError } 1300023 - Floating ball internal error.
         * @throws { BusinessError } 1300024 - The floating ball window state is abnormal.
         * @throws { BusinessError } 1300025 - The floating ball state does not support this operation.
         * @throws { BusinessError } 1300026 - Failed to restore the main window.
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        restoreMainWindow(want: Want): Promise<void>;
    }
    /**
     * The option of floating ball
     *
     * @interface FloatingBallParams
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    interface FloatingBallParams {
        /**
         * The template of floating ball.
         *
         * @type { FloatingBallTemplate }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        template: FloatingBallTemplate;
        /**
         * The title of floating ball.
         *
         * @type { string }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        title: string;
        /**
         * The content of floating ball.
         *
         * @type { ?string }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        content?: string;
        /**
         * The backgroundColor of floating ball.
         *
         * @type { ?string }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        backgroundColor?: string;
        /**
         * The icon of floating ball.
         *
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        icon?: image.PixelMap;
    }
    /**
     * Enum for FloatingBall state type.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    enum FloatingBallState {
        /**
         * FloatingBall window started.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        STARTED = 1,
        /**
         * FloatingBall window stopped.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        STOPPED = 2
    }
    /**
     * Enum for FloatingBall template type.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    enum FloatingBallTemplate {
        /**
         * Static layout, support icon and title.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        STATIC = 1,
        /**
         * Normal layout, support title and content.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        NORMAL = 2,
        /**
         * Emphatic layout, support icon, title, and content.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        EMPHATIC = 3,
        /**
         * Simple layout, support title with 2-lines display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        SIMPLE = 4
    }
    /**
     * The info of floating ball window.
     *
     * @interface FloatingBallWindowInfo
     * @syscap SystemCapability.Window.SessionManager
     * @since 20
     */
    interface FloatingBallWindowInfo {
        /**
         * Indicates target window id.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Window.SessionManager
         * @since 20
         */
        readonly windowId: number;
    }
}
export default floatingBall;
