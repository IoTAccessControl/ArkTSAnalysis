/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import { Callback } from './@ohos.base';
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @since 7
 */
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @atomicservice
 * @since 11
 */
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace emitter {
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { InnerEvent } event - Event to subscribe to in persistent manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { InnerEvent } event - Event to subscribe to in persistent manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { InnerEvent } event - Event to subscribe to in persistent manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on(event: InnerEvent, callback: Callback<EventData>): void;
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { string } eventId - Event to subscribe to in persistent manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { string } eventId - Event to subscribe to in persistent manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on(eventId: string, callback: Callback<EventData>): void;
    /**
     * Subscribes to an event in persistent manner and executes a callback after the event is received.
     *
     * @param { string } eventId - Event to subscribe to in persistent manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<GenericEventData<T>> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { InnerEvent } event - Event to subscribe to in one-shot manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { InnerEvent } event - Event to subscribe to in one-shot manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { InnerEvent } event - Event to subscribe to in one-shot manner. The EventPriority parameter is not required and does not take effect.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function once(event: InnerEvent, callback: Callback<EventData>): void;
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { string } eventId - Event to subscribe to in one-shot manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { string } eventId - Event to subscribe to in one-shot manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function once(eventId: string, callback: Callback<EventData>): void;
    /**
     * Subscribes to an event in one-shot manner and unsubscribes from it after the event callback is executed.
     *
     * @param { string } eventId - Event to subscribe to in one-shot manner. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<GenericEventData<T>> } callback - Callback to be executed when the event is received.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function once<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Unsubscribes from all events with the specified event ID.
     *
     * @param { number } eventId - Event ID.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Unsubscribes from all events with the specified event ID.
     *
     * @param { number } eventId - Event ID.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Unsubscribes from all events with the specified event ID.
     *
     * @param { number } eventId - Event ID.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(eventId: number): void;
    /**
     * Unsubscribes from all events with the specified event ID.
     *
     * @param { string } eventId - Event ID. The value cannot be an empty string and exceed 10240 bytes.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Unsubscribes from all events with the specified event ID.
     *
     * @param { string } eventId - Event ID. The value cannot be an empty string and exceed 10240 bytes.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(eventId: string): void;
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { number } eventId - Event ID.
     * @param { Callback<EventData> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @since 10
     */
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { number } eventId - Event ID.
     * @param { Callback<EventData> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { number } eventId - Event ID.
     * @param { Callback<EventData> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(eventId: number, callback: Callback<EventData>): void;
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { string } eventId - Event ID. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { string } eventId - Event ID. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<EventData> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(eventId: string, callback: Callback<EventData>): void;
    /**
     * Unsubscribes from an event with the specified event ID and processed by the specified callback.
     * This API takes effect only when Callback<EventData> has been registered through the on or once API.
     * Otherwise, no processing is performed.
     *
     * @param { string } eventId - Event ID. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Callback<GenericEventData<T>> } callback - Callback to unregister.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Emits the specified event.
     *
     * @param { InnerEvent } event - Event to emit, where EventPriority specifies the emit priority of the event.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Emits the specified event.
     *
     * @param { InnerEvent } event - Event to emit, where EventPriority specifies the emit priority of the event.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Emits the specified event.
     *
     * @param { InnerEvent } event - Event to emit, where EventPriority specifies the emit priority of the event.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit(event: InnerEvent, data?: EventData): void;
    /**
     * Emits the specified event.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Emits the specified event.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit(eventId: string, data?: EventData): void;
    /**
     * Emits the specified event.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { GenericEventData<T> } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit<T>(eventId: string, data?: GenericEventData<T>): void;
    /**
     * Emits an event of a specified priority.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Options } options - Event emit priority.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Emits an event of a specified priority.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Options } options - Event emit priority.
     * @param { EventData } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit(eventId: string, options: Options, data?: EventData): void;
    /**
     * Emits an event of a specified priority.
     *
     * @param { string } eventId - ID of the event to emit. The value cannot be an empty string and exceed 10240 bytes.
     * @param { Options } options - Event emit priority.
     * @param { GenericEventData<T> } [data] - Data passed in the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit<T>(eventId: string, options: Options, data?: GenericEventData<T>): void;
    /**
     * Obtains the number of subscriptions to a specified event.
     *
     * @param { number | string } eventId - Event ID. The value of the string type cannot be an empty string.
     * @returns { number } Returns the number of listener count.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Obtains the number of subscriptions to a specified event.
     *
     * @param { number | string } eventId - Event ID. The value of the string type cannot be an empty string.
     * @returns { number } Returns the number of listener count.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getListenerCount(eventId: number | string): number;
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface EventData {
        /**
         * Data passed in the event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Data passed in the event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * Data passed in the event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data?: {
            [key: string]: any;
        };
    }
    /**
     * Describes an event to subscribe to or emit. The EventPriority settings do not take effect under event subscription.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Describes an event to subscribe to or emit. The EventPriority settings do not take effect under event subscription.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Describes an event to subscribe to or emit. The EventPriority settings do not take effect under event subscription.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface InnerEvent {
        /**
         * Event ID.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Event ID.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * Event ID.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        eventId: number;
        /**
         * Event priority. The default value is EventPriority.LOW.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Event priority. The default value is EventPriority.LOW.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * Event priority. The default value is EventPriority.LOW.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        priority?: EventPriority;
    }
    /**
     * Enumerates the event priorities.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Enumerates the event priorities.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Enumerates the event priorities.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum EventPriority {
        /**
         * The event will be emitted immediately.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * The event will be emitted immediately.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * The event will be emitted immediately.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        IMMEDIATE = 0,
        /**
         * The event will be emitted before low-priority events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * The event will be emitted before low-priority events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * The event will be emitted before low-priority events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        HIGH,
        /**
         * The event will be emitted before idle-priority events. By default, an event is in LOW priority.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * The event will be emitted before idle-priority events. By default, an event is in LOW priority.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * The event will be emitted before idle-priority events. By default, an event is in LOW priority.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        LOW,
        /**
         * The event will be emitted after all the other events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * The event will be emitted after all the other events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * The event will be emitted after all the other events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        IDLE
    }
    /**
     * Describes the event emit priority.
     *
     * @typedef Options
     * @syscap SystemCapability.Notification.Emitter
     * @since 11
     */
    /**
     * Describes the event emit priority.
     *
     * @typedef Options
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface Options {
        /**
         * Event priority. The default value is EventPriority.LOW.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        /**
         * Event priority. The default value is EventPriority.LOW.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        priority?: EventPriority;
    }
    /**
     * Describes the generic data passed in the event.
     *
     * @typedef GenericEventData<T>
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface GenericEventData<T> {
        /**
         * Data passed in the event. T: generic type.
         *
         * @type { ?T }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data?: T;
    }
}
export default emitter;
