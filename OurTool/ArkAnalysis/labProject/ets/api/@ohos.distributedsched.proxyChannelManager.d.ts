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
 * @kit DistributedServiceKit
 */
/**
 * The proxy channel management module provides functions for opening and closing proxy channels, sending data, as well
 * as functions for registering and unregistering, receiving data, and receiving channel status callback functions.
 *
 * @namespace proxyChannelManager
 * @syscap SystemCapability.DistributedSched.AppCollaboration
 * @since 20
 */
declare namespace proxyChannelManager {
    /**
     * According to the parameters passed by the business, open the proxy channel and return the channel identifier.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { ChannelInfo } channelInfo -  Parameters for creating proxy channel
     * @returns { Promise<number> } The Promise returned by this function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390001 - BR is disabled.
     * @throws { BusinessError } 32390002 - Device not paired.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @throws { BusinessError } 32390102 - Operation failed or Connection timed out.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function openProxyChannel(channelInfo: ChannelInfo): Promise<number>;
    /**
     * Close the proxy channel.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { number } channelId - Indicates the unique channelId.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function closeProxyChannel(channelId: number): void;
    /**
     * Send data to the peer device through proxy channel identification.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { number } channelId - Indicates the the unique channelId.
     * @param { ArrayBuffer } data - Indicatesthe message data to send.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @throws { BusinessError } 32390103 - Data too long.
     * @throws { BusinessError } 32390104 - Send failed.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function sendData(channelId: number, data: ArrayBuffer): Promise<void>;
    /**
     * Register to receive data events.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'receiveData' } type - Registration Type, 'receiveData'.
     * @param { number } channelId - Indicates the unique channelId.
     * @param { Callback<DataInfo> } callback - Used to handle ('receiveData') command.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function on(type: 'receiveData', channelId: number, callback: Callback<DataInfo>): void;
    /**
     * Unregister and receive data events.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'receiveData' } type - Registration Type, 'receiveData'.
     * @param { number } channelId - Indicates the unique channelId.
     * @param { Callback<DataInfo> } callback - Used to handle ('receiveData') command.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function off(type: 'receiveData', channelId: number, callback?: Callback<DataInfo>): void;
    /**
     * Register to receive channel status events.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'channelStateChange' } type - Registration Type, 'channelStateChange'.
     * @param { number } channelId - Indicates the unique channelId.
     * @param { Callback<ChannelStateInfo> } callback - Used to handle ('channelStateChange') command.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function on(type: 'channelStateChange', channelId: number, callback: Callback<ChannelStateInfo>): void;
    /**
     * Unregister the receiving channel status event.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'channelStateChange' } type - Registration Type, 'channelStateChange'.
     * @param { number } channelId - Indicates the unique channelId.
     * @param { Callback<ChannelStateInfo> } callback - Used to handle ('channelStateChange') command.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 32390004 - ChannelId is invalid or unavailable.
     * @throws { BusinessError } 32390006 - Parameter error.
     * @throws { BusinessError } 32390100 - Internal error.
     * @throws { BusinessError } 32390101 - Call is restricted.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    function off(type: 'channelStateChange', channelId: number, callback?: Callback<ChannelStateInfo>): void;
    /**
     * Data information structure.
     *
     * @interface DataInfo
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    interface DataInfo {
        /**
         * Data channel ID.
         * @type { number }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        channelId: number;
        /**
         * Received Data.
         * @type { ArrayBuffer }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        data: ArrayBuffer;
    }
    /**
     * Link type of proxy channel.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    enum LinkType {
        /**
         * Link type is BR.
         *
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        LINK_BR = 0
    }
    /**
     * Parameters for creating proxy channel.
     *
     * @interface ChannelInfo
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    interface ChannelInfo {
        /**
         * Link type of proxy channel.
         *
         * @type { LinkType }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        linkType: LinkType;
        /**
         * The address of the peer device that needs to be connected.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        peerDevAddr: string;
        /**
         * The profile UUID of the peer device that needs to be connected.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        peerUuid: string;
    }
    /**
     * Channel status of proxy channel.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    enum ChannelState {
        /**
         * Proxy channel disconnected, if the channel is not closed by business, it can recovery.
         *
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        CHANNEL_WAIT_RESUME = 0,
        /**
         * Proxy channel recovery.
         *
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        CHANNEL_RESUME = 1,
        /**
         * Software failure causes channel exception.
         *
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        CHANNEL_EXCEPTION_SOFTWARE_FAILED = 2,
        /**
         * BR unpairing causes proxy channel abnormal.
         *
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        CHANNEL_BR_NO_PAIRED = 3
    }
    /**
     * Channel status information of proxy channel.
     *
     * @interface ChannelStateInfo
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @since 20
     */
    interface ChannelStateInfo {
        /**
         * channel ID.
         * @type { number }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        channelId: number;
        /**
         * channel status.
         *
         * @type { ChannelState }
         * @syscap SystemCapability.DistributedSched.AppCollaboration
         * @since 20
         */
        state: ChannelState;
    }
}
export default proxyChannelManager;
