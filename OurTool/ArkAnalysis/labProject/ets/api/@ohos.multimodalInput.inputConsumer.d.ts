/*
 * Copyright (C) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit InputKit
 */
import { Callback } from './@ohos.base';
import { KeyEvent } from './@ohos.multimodalInput.keyEvent';
/**
 * The inputConsumer module provides APIs for subscribing to and unsubscribing from global shortcut keys.
 *
 * @namespace inputConsumer
 * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
 * @since 14
 */
declare namespace inputConsumer {
    /**
     * Defines shortcut key options.
     *
     * @typedef HotkeyOptions
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 14
     */
    interface HotkeyOptions {
        /**
         * Modifier key set (including Ctrl, Shift, and Alt). A maximum of two modifier keys are supported.
         * There is no requirement on the sequence of modifier keys.
         * For example, in Ctrl+Shift+Esc, Ctrl and Shift are modifier keys.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 14
         */
        preKeys: Array<number>;
        /**
         * Modified key, which can be any key except the modifier keys and Meta key. For details about the keys, see Keycode.
         * For example, in Ctrl+Shift+Esc, Esc is the modified key.
         *
         * @type { number }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 14
         */
        finalKey: number;
        /**
         * Whether to report repeated key events. The value true means to report repeated key events, and the value false means the opposite.
         * The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 14
         */
        isRepeat?: boolean;
    }
    /**
     * Sets the key event consumption configuration.
     *
     * @typedef KeyPressedConfig
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 16
     */
    interface KeyPressedConfig {
        /**
         * Key value. Currently, only the KEYCODE_VOLUME_UP and KEYCODE_VOLUME_DOWN keys are supported.
         *
         * @type { number }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 16
         */
        key: number;
        /**
         * Key event type. Currently, this parameter can only be set to 1, indicating key press.
         *
         * @type { number }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 16
         */
        action: number;
        /**
         * The value true means to report repeated key events, and the value false means the opposite. The default value is true.
         *
         * @type { boolean }
         * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
         * @since 16
         */
        isRepeat: boolean;
    }
    /**
     * Obtains all system hotkeys. This API uses a promise to return the result.
     *
     * @returns { Promise<Array<HotkeyOptions>> } Promise used to return the list of all system shortcut keys.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 14
     */
    function getAllSystemHotkeys(): Promise<Array<HotkeyOptions>>;
    /**
     * Subscribes to application shortcut key change events based on the specified options.
     * This API uses an asynchronous callback to return the result.
     *
     * @param { 'hotkeyChange' } type - Event type. This parameter has a fixed value of hotkeyChange.
     * @param { HotkeyOptions } hotkeyOptions - Shortcut key options.
     * @param { Callback<HotkeyOptions> } callback - Callback used to return the application shortcut key change event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 4200002 - The hotkey has been used by the system.
     * @throws { BusinessError } 4200003 - The hotkey has been subscribed to by another.
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 14
     */
    function on(type: 'hotkeyChange', hotkeyOptions: HotkeyOptions, callback: Callback<HotkeyOptions>): void;
    /**
     * Unsubscribes from application shortcut key change events.
     *
     * @param { 'hotkeyChange' } type - Event type. This parameter has a fixed value of hotkeyChange.
     * @param { HotkeyOptions } hotkeyOptions - Shortcut key options.
     * @param { Callback<HotkeyOptions> } callback - Callback to unregister.
     * If this parameter is left unspecified, listening will be disabled for all callbacks registered for the specified shortcut key options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 14
     */
    function off(type: 'hotkeyChange', hotkeyOptions: HotkeyOptions, callback?: Callback<HotkeyOptions>): void;
    /**
     * Subscribes to key press events. This API uses an asynchronous callback to return the result.
     * If the current application is in the foreground focus window, a callback is triggered when the specified key is pressed.
     *
     * @param { 'keyPressed' } type - Event type. This parameter has a fixed value of keyPressed.
     * @param { KeyPressedConfig } options - Sets the key event consumption configuration.
     * @param { Callback<KeyEvent> } callback - Callback used to return key press events.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 16
     */
    function on(type: 'keyPressed', options: KeyPressedConfig, callback: Callback<KeyEvent>): void;
    /**
     * Unsubscribes from key press events.
     * This API uses an asynchronous callback to return the result.
     *
     * @param { 'keyPressed' } type - Event type. This parameter has a fixed value of keyPressed.
     * @param { Callback<KeyEvent> } callback - Callback to unregister.
     * If this parameter is not specified, listening will be disabled for all registered callbacks.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.MultimodalInput.Input.InputConsumer
     * @since 16
     */
    function off(type: 'keyPressed', callback?: Callback<KeyEvent>): void;
}
export default inputConsumer;
