/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type unifiedDataChannel from './@ohos.data.unifiedDataChannel';
/**
 * This module allows developers to trigger a drag event.
 * @namespace dragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * This module allows developers to trigger a drag event.
 * @namespace dragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
/**
 * This module allows developers to trigger a drag event.
 * @namespace dragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18
 */
declare namespace dragController {
    /**
     * Defines the Drag Status.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Defines the Drag Status.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Defines the Drag Status.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    const enum DragStatus {
        /**
         * Drag has started.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag has started.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Drag has started.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        STARTED = 0,
        /**
         * Drag has ended.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag has ended.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Drag has ended.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        ENDED = 1
    }
    /**
     * Drag and drop information
     *
     * @interface DragAndDropInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Drag and drop information
     *
     * @interface DragAndDropInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Drag and drop information
     *
     * @interface DragAndDropInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    interface DragAndDropInfo {
        /**
         * The drag status.
         * @type { DragStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The drag status.
         * @type { DragStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * The drag status.
         * @type { DragStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        status: DragStatus;
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        event: DragEvent;
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        extraParams?: string;
    }
    /**
     * One drag action object for drag process
     *
     * @interface DragAction
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * One drag action object for drag process
     *
     * @interface DragAction
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * One drag action object for drag process
     *
     * @interface DragAction
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    interface DragAction {
        /**
         * trigger drag action
         *
         * @returns { Promise<void> } A Promise can indicate the start result.
         * @throws { BusinessError } 100001 - Internal handling failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * trigger drag action
         *
         * @returns { Promise<void> } A Promise can indicate the start result.
         * @throws { BusinessError } 100001 - Internal handling failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * trigger drag action
         *
         * @returns { Promise<void> } A Promise can indicate the start result.
         * @throws { BusinessError } 100001 - Internal handling failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        startDrag(): Promise<void>;
        /**
         * Registers a callback for listening on drag status changes.
         * This callback is triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Registers a callback for listening on drag status changes.
         * This callback is triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Registers a callback for listening on drag status changes.
         * This callback is triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        on(type: 'statusChange', callback: Callback<DragAndDropInfo>): void;
        /**
         * Deregisters a callback for listening on drag status changes.
         * This callback is not triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Deregisters a callback for listening on drag status changes.
         * This callback is not triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Deregisters a callback for listening on drag status changes.
         * This callback is not triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        off(type: 'statusChange', callback?: Callback<DragAndDropInfo>): void;
    }
    /**
     * DragInfo object description
     *
     * @interface DragInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * DragInfo object description
     *
     * @interface DragInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * DragInfo object description
     *
     * @interface DragInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    interface DragInfo {
        /**
         * A unique identifier to identify which touch point.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * A unique identifier to identify which touch point.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * A unique identifier to identify which touch point.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        pointerId: number;
        /**
        * Drag data.
        * @type { ?unifiedDataChannel.UnifiedData }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 10
        */
        /**
        * Drag data.
        * @type { ?unifiedDataChannel.UnifiedData }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @atomicservice
        * @since 12
        */
        /**
         * Drag data.
         * @type { ?unifiedDataChannel.UnifiedData }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        data?: unifiedDataChannel.UnifiedData;
        /**
        * Additional information about the drag info.
        * @type { ?string }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 10
        */
        /**
        * Additional information about the drag info.
        * @type { ?string }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @atomicservice
        * @since 12
        */
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        extraParams?: string;
        /**
         * Touch point coordinates.
         * @type { ?TouchPoint }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Touch point coordinates.
         * @type { ?TouchPoint }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Touch point coordinates.
         * @type { ?TouchPoint }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        touchPoint?: TouchPoint;
        /**
         * Drag preview options.
         * @type { ?DragPreviewOptions }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag preview options.
         * @type { ?DragPreviewOptions }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Drag preview options.
         * @type { ?DragPreviewOptions }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        previewOptions?: DragPreviewOptions;
        /**
         * Provide a data representation to the system instead of providing a complete data
         * object directly. When the user releases the drag over the target application, the system will use this data
         * representation to request the actual data from drag source. This approach significantly improves the
         * efficiency of initiating drag operations for large volumes of data and enhances the effectiveness of data
         * reception. It is recommended to use this instead of the data field.
         *
         * @type { ?unifiedDataChannel.DataLoadParams }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        dataLoadParams?: unifiedDataChannel.DataLoadParams;
    }
    /**
     * Defines the animation options for drag preview.
     *
     * @interface AnimationOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Defines the animation options for drag preview.
     *
     * @interface AnimationOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Defines the animation options for drag preview.
     *
     * @interface AnimationOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    interface AnimationOptions {
        /**
         * Animation duration, in ms.
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Animation duration, in ms.
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Animation duration, in ms.
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        duration?: number;
        /**
        * Animation curve.
        * @type { ?(Curve | ICurve) }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 11
        */
        /**
         * Animation curve.
         * @type { ?(Curve | ICurve) }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Animation curve.
         * @type { ?(Curve | ICurve) }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        curve?: Curve | ICurve;
    }
    /**
     * Provides the functions of setting color or updating animation.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Provides the functions of setting color or updating animation.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Provides the functions of setting color or updating animation.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    export class DragPreview {
        /**
         * change foreground color of preview
         * @param { ResourceColor } color - color value
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * change foreground color of preview
         * @param { ResourceColor } color - color value
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * change foreground color of preview
         * @param { ResourceColor } color - color value
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        setForegroundColor(color: ResourceColor): void;
        /**
         * update preview style with animation
         * @param { AnimationOptions } options - animation options
         * @param { function } handler - change style functions
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * update preview style with animation
         * @param { AnimationOptions } options - animation options
         * @param { function } handler - change style functions
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * update preview style with animation
         * @param { AnimationOptions } options - animation options
         * @param { function } handler - change style functions
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        animate(options: AnimationOptions, handler: () => void): void;
    }
    /**
     * Define the drag event paramters
     *
     * @interface DragEventParam
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Define the drag event paramters
     *
     * @interface DragEventParam
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     */
    interface DragEventParam {
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        event: DragEvent;
        /**
         * Additional information about the drag info.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Additional information about the drag info.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        /**
         * Additional information about the drag info.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 18
         */
        extraParams: string;
    }
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<{ event: DragEvent, extraParams: string }> } callback - Callback that contains the drag
     *     event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<DragEventParam> } callback - Callback that contains the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<DragEventParam> } callback - Callback that contains the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     * @deprecated since 18
     * @useinstead ohos.arkui.UIContext.DragController#executeDrag
     */
    function executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: DragInfo, callback: AsyncCallback<DragEventParam>): void;
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<{ event: DragEvent, extraParams: string }> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<DragEventParam> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<DragEventParam> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     * @deprecated since 18
     * @useinstead ohos.arkui.UIContext.DragController#executeDrag
     */
    function executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: DragInfo): Promise<DragEventParam>;
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring
     * the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts
     *     displayed when the objects are dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring
     * the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts
     *     displayed when the objects are dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring
     * the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts
     *     displayed when the objects are dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     <br> 1. Mandatory parameters are left unspecified.
     *     <br> 2. Incorrect parameters types.
     *     <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     * @deprecated since 18
     * @useinstead ohos.arkui.UIContext.DragController#createDragAction
     */
    function createDragAction(customArray: Array<CustomBuilder | DragItemInfo>, dragInfo: DragInfo): DragAction;
    /**
     * Get drag preview object.
     * @returns { DragPreview } An drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Get drag preview object.
     * @returns { DragPreview } An drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    /**
     * Get drag preview object.
     * @returns { DragPreview } An drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18
     * @deprecated since 18
     * @useinstead ohos.arkui.UIContext.DragController#getDragPreview
     */
    function getDragPreview(): DragPreview;
    /**
     * Define the status for the application to notify the framework whether to execute drag.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    const enum DragStartRequestStatus {
        /**
         * Notify the framework that the application is not yet ready and needs to temporarily block
         * the start of drag, only effective in onDragStart calls.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 18
         */
        WAITING = 0,
        /**
         * Notify the framework that the drag can continue to be started, but only during the start
         * of drag, and will not take effect when the drag is started.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 18
         */
        READY = 1
    }
    /**
     * Defines the drag spring loading state.
     * Under default system configuration, if no CANCEL occurs, the state reporting is as follows:
     *     Hover still--500ms-->BEGIN-->100ms-->UPDATE-->100ms-->UPDATE-->100ms-->UPDATE-->100ms-->END
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 20
     */
    const enum DragSpringLoadingState {
        /**
         * The user has remained stationary for a period, initiating the spring loading process.
         * This state allows for some preparatory operations during spring loading.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        BEGIN,
        /**
         * Already in the spring loading state. The system periodically checks the user's hover status.
         * If the user remains stationary, it triggers an UPDATE state notification at regular intervals.
         * This state allows for UI effect refreshes to emphasize the hover state.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        UPDATE,
        /**
         * The entire spring loading state ends. The application can perform cleanup operations
         * and execute navigation or view switching actions when this state occurs.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        END,
        /**
         * After entering the BEGIN state, if the user moves out of the component range, exceeds the displacement
         * threshold, lifts the finger, or switches windows (pull out), the CANCEL state is triggered.
         * The application should restore the UI style and cancel any pending navigation or view switching actions.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        CANCEL
    }
    /**
     * Defines parameters affecting spring loading detection. Typically, default system configurations suffice.
     * Customization can be done by specifying the config when binding onDragSpringLoading or dynamically modifying it
     * using the updateConfiguration method during the BEGIN state.
     *
     * @typedef { DragSpringLoadingConfiguration }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 20
     */
    interface DragSpringLoadingConfiguration {
        /**
         * Time interval to maintain a stationary state before entering spring loading. Default: 500 ms.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        stillTimeLimit?: number;
        /**
         * Interval between update notifications after entering the spring loading state. Default: 100ms.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        updateInterval?: number;
        /**
         * Maximum number of update notifications to report while in the spring loading state. Default: 3.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        updateNotifyCount?: number;
        /**
         * Maximum wait time from the last UPDATE state to the end of spring loading. Default: 100ms.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        updateToFinishInterval?: number;
    }
    /**
     * Defines drag-related information when triggering spring loading callbacks.
     * This interface provides drag data summaries and additional drag information, useful for applications
     * needing to dynamically determine whether to respond to spring loading callbacks based on drag data.
     *
     * @typedef { SpringLoadingDragInfos }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 20
     */
    interface SpringLoadingDragInfos {
        /**
         * Summary of the dragged data. This field is absent if the source application did not configure data.
         *
         * @type { ?unifiedDataChannel.Summary }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        dataSummary?: unifiedDataChannel.Summary;
        /**
         * Additional information provided by the source application when initiating the drag operation.
         * This field is absent if the source application did not configure it.
         *
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        extraInfos?: string;
    }
    /**
     * Context information for the current spring loading trigger. This object is passed to the application
     * in the spring loading callback, allowing it to obtain the current state, dynamically refresh UI effects,
     * and access drag data to determine whether to handle the drag operation.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 20
     */
    class SpringLoadingContext {
        /**
         * Current spring loading state. Refer to the DragSpringLoadingState enum for details.
         *
         * @type { DragSpringLoadingState }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        state: DragSpringLoadingState;
        /**
         * Sequence number of the current spring loading state notification. Begins at 0 for BEGIN and increments
         * with each callback.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        currentNotifySequence: number;
        /**
         * Drag-related information. Absent when the state is CANCEL.
         *
         * @type { ?SpringLoadingDragInfos }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        dragInfos?: SpringLoadingDragInfos;
        /**
         * Current spring loading configuration. Absent when the state is CANCEL.
         *
         * @type { ?DragSpringLoadingConfiguration }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        currentConfig?: DragSpringLoadingConfiguration;
        /**
         * Aborts subsequent spring loading triggers.
         * Note: Aborting does not trigger a CANCEL notification, the application must handle state cleanup when aborting.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        abort(): void;
        /**
         * Updates the spring loading configuration for the current trigger. Only effective during the BEGIN state.
         * This method does not modify the original configuration set during onDragSpringLoading binding.
         * It provides an opportunity for dynamic configuration updates during the current trigger.
         * Typically, applications should use default configurations or set them once during binding.
         * Use this method sparingly, e.g., for different drag data types requiring varied UX timing.
         *
         * @param { DragSpringLoadingConfiguration } config - The spring loading detection configuration
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 20
         */
        updateConfiguration(config: DragSpringLoadingConfiguration): void;
    }
}
export default dragController;
