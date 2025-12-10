/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit ArkData
 */
import type { AsyncCallback } from './@ohos.base';
import { ValueType } from './@ohos.data.ValuesBucket';
/**
 * This module provides the dataShare capability for consumer.
 *
 * @namespace dataShare
 * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
 * @stagemodelonly
 * @since 20
 */
declare namespace dataShare {
    /**
     * Enumerates the data change types.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    enum ChangeType {
        /**
         * Data inserted.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        INSERT = 0,
        /**
         * Data deleted.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        DELETE,
        /**
         * Data updated.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        UPDATE
    }
    /**
     * Obtains the data proxy handle, which can be used to subscribe, publish, and access globally shared data.
     *
     * @returns { Promise<DataProxyHandle> } Handle used for the data proxy operations.
     * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
     *     restarted abnormally.
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    function createDataProxyHandle(): Promise<DataProxyHandle>;
    /**
     * Specifies the proxy data structure.
     *
     * @interface ProxyData
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface ProxyData {
        /**
         * URI for proxy data that uniquely identifies a proxy data item. Maximum length 256 bytes.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        uri: string;
        /**
         * Value of the proxy data. Maximum length 4096 bytes.
         * When the proxy data is first published, if it is not filled in, it is set to an empty string by default.
         * When updating the proxy data, if it is not filled in, the value of the proxy data is not updated.
         *
         * @type { ?ValueType }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        value?: ValueType;
        /**
         * List of applications that are allowed to subscribe and read proxy data. The maximum length of the list is 256.
         * Uses appId to represent the allowed application.
         * When the proxy data is first published, if it is not filled in, it defaults to an empty array.
         * When updating the proxy data, if it is not filled in, the allowList of the proxy data is not updated.
         * An empty allowList array indicates that only the publisher can access the data.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        allowList?: string[];
    }
    /**
     * Structure that describes the info of the proxy data changed.
     *
     * @interface DataProxyChangeInfo
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface DataProxyChangeInfo {
        /**
         * Type of the data changed.
         *
         * @type { ChangeType }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        type: ChangeType;
        /**
         * URI of the data changed.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        uri: string;
        /**
         * Value of the data changed.
         *
         * @type { ValueType }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        value: ValueType;
    }
    /**
     * Enumeration of data proxy operation error codes.
     *
     * @enum { number } DataProxyErrorCode
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    enum DataProxyErrorCode {
        /**
         * Operation successful.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        SUCCESS = 0,
        /**
         * URI format is incorrect or does not exist.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        URI_NOT_EXIST = 1,
        /**
         * Do not have permission to perform this operation on this URI.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        NO_PERMISSION = 2,
        /**
         * Exceeds the upper limit of the number of data records.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        OVER_LIMIT = 3
    }
    /**
     * Structure that indicates the result of a single data proxy operation.
     *
     * @interface DataProxyResult
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface DataProxyResult {
        /**
         * URI of the data being operated on.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        uri: string;
        /**
         * Error code of the operation result.
         * @type { DataProxyErrorCode }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        result: DataProxyErrorCode;
    }
    /**
     * Structure that indicates the result of a single getting operation.
     *
     * @interface DataProxyGetResult
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface DataProxyGetResult {
        /**
         * URI of the data being operated on.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        uri: string;
        /**
         * Error code of the operation result.
         *
         * @type { DataProxyErrorCode }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        result: DataProxyErrorCode;
        /**
         * If the getting operation is successful, it is the value of the proxy data,
         * if the getting operation is failed, it is undefined.
         *
         * @type { ValueType | undefined }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        value: ValueType | undefined;
        /**
         * If the getting operation is successful, it is the allowList of the proxy data,
         * if the getting operation is failed, it is undefined.
         * Only the publisher can obtain the allowList. Other applications can only obtain the value.
         *
         * @type { string[] | undefined}
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        allowList: string[] | undefined;
    }
    /**
     * Enumeration of data proxy types.
     *
     * @enum { number } DataProxyType
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    enum DataProxyType {
        /**
         * Indicates shared configuration between applications.
         *
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        SHARED_CONFIG = 0
    }
    /**
     * Structure that indicates the configuration for data proxy operation.
     *
     * @interface DataProxyConfig
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface DataProxyConfig {
        /**
         * Type of the data proxy operation.
         *
         * @type { DataProxyType }
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        type: DataProxyType;
    }
    /**
     * Handle for data proxy operations.
     *
     * @interface DataProxyHandle
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @stagemodelonly
     * @since 20
     */
    interface DataProxyHandle {
        /**
         * Registers observers to observe proxy data change specified by the given URIs.
         *
         * @param { 'dataChange' } event - Event type must be 'sharedDataChange'.
         * @param { string[] } uris - Indicates the uris of the data to operate.
         * @param { DataProxyConfig } config - Indicates the configuration of the data proxy operation.
         * @param { AsyncCallback<DataProxyChangeInfo[]> } callback - The callback function when data changes.
         * @returns { DataProxyResult[] } : The operation result.
         * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
         *     restarted abnormally.
         * @throws { BusinessError } 15700014 - The parameter format is incorrect or the value range is invalid.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        on(event: 'dataChange', uris: string[], config: DataProxyConfig, callback: AsyncCallback<DataProxyChangeInfo[]>): DataProxyResult[];
        /**
         * Deregisters observers to observe proxy data change specified by the given URIs.
         *
         * @param { 'dataChange' } event - Event type must be 'sharedDataChange'.
         * @param { string[] } uris - Indicates the uris of the data to operate.
         * @param { DataProxyConfig } config - Indicates the configuration of the data proxy operation.
         * @param { AsyncCallback<DataProxyChangeInfo[]> } [callback] - The callback function when data changes.
         * @returns { DataProxyResult[] } : The operation result.
         * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
         *     restarted abnormally.
         * @throws { BusinessError } 15700014 - The parameter format is incorrect or the value range is invalid.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        off(event: 'dataChange', uris: string[], config: DataProxyConfig, callback?: AsyncCallback<DataProxyChangeInfo[]>): DataProxyResult[];
        /**
         * Publishes proxy data. The data that is published can be accessed by the publisher and the applications
         * specified in the allowList.
         * If the URI being published already exists, update the corresponding data.
         * Only the publisher is allowed to update the data.
         *
         * @param { ProxyData[] } data - Indicates the data to create or update.
         * @param { DataProxyConfig } config - Indicates the configuration of the data proxy operation.
         * @returns { Promise<DataProxyResult[]> } : The operation result.
         * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
         *     restarted abnormally.
         * @throws { BusinessError } 15700014 - The parameter format is incorrect or the value range is invalid.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        publish(data: ProxyData[], config: DataProxyConfig): Promise<DataProxyResult[]>;
        /**
         * Deletes the proxy data specified by the URIs.
         * Only the data publisher can delete the data.
         *
         * @param { string[] } uris - Indicates the uris of data to delete.
         * @param { DataProxyConfig } config - Indicates the configuration of the data proxy operation.
         * @returns { Promise<DataProxyResult[]> } : The operation result.
         * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
         *     restarted abnormally.
         * @throws { BusinessError } 15700014 - The parameter format is incorrect or the value range is invalid.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        delete(uris: string[], config: DataProxyConfig): Promise<DataProxyResult[]>;
        /**
         * Gets published data specified by the URIs.
         * Only the publisher itself and applications in the allowList can get the data.
         *
         * @param { string[] } uris - Indicates the uris of data to get.
         * @param { DataProxyConfig } config - Indicates the configuration of the data proxy operation.
         * @returns { Promise<DataProxyGetResult[]> } : The operation result.
         * @throws { BusinessError } 15700000 - Inner error. Possible causes: The service is not ready or is being
         *     restarted abnormally.
         * @throws { BusinessError } 15700014 - The parameter format is incorrect or the value range is invalid.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @stagemodelonly
         * @since 20
         */
        get(uris: string[], config: DataProxyConfig): Promise<DataProxyGetResult[]>;
    }
}
export default dataShare;
