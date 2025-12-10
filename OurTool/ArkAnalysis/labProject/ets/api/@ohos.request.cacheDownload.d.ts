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
 * @kit BasicServicesKit
 */
/**
 * Cache download capability provider.
 *
 * @namespace cacheDownload
 * @syscap SystemCapability.Request.FileTransferAgent
 * @since 18
 */
declare namespace cacheDownload {
    /**
     * Options of the cache download task.
     *
     * @typedef CacheDownloadOptions
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 18
     */
    interface CacheDownloadOptions {
        /**
         * HTTP headers added to the cache download request.
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 18
         */
        headers?: Record<string, string>;
    }
    /**
     * Resource information of historical cache downloads.
     *
     * @typedef ResourceInfo
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    interface ResourceInfo {
        /**
         * The decompressed size of the downloaded resource.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly size: number;
    }
    /**
     * Network information of historical cache downloads.
     *
     * @typedef NetworkInfo
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    interface NetworkInfo {
        /**
         * The DNS server list is used when downloading resources.
         *
         * @type { string[] }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly dnsServers: string[];
    }
    /**
     * Performance information of historical cache downloads.
     *
     * @typedef PerformanceInfo
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    interface PerformanceInfo {
        /**
         * Time taken from startup to DNS resolution completion, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly dnsTime: number;
        /**
         * Time taken from startup to TCP connection completion, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly connectTime: number;
        /**
         * Time taken from startup to TLS connection completion, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly tlsTime: number;
        /**
         * Time taken from startup to start sending the first byte, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly firstSendTime: number;
        /**
         * Time taken from startup to start receiving the first byte, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly firstReceiveTime: number;
        /**
         * Time taken from startup to the completion of the request, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly totalTime: number;
        /**
         * Time taken from startup to completion of all redirection steps, in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly redirectTime: number;
    }
    /**
     * Download information of historical cache downloads.
     *
     * @typedef DownloadInfo
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    interface DownloadInfo {
        /**
         * Resource information of historical cache downloads.
         *
         * @type { ResourceInfo }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly resource: ResourceInfo;
        /**
         * Network information of historical cache downloads.
         *
         * @type { NetworkInfo }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly network: NetworkInfo;
        /**
         * Performance information of historical cache downloads.
         *
         * @type { PerformanceInfo }
         * @readonly
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 20
         */
        readonly performance: PerformanceInfo;
    }
    /**
     * Downloads resources at the specified URL. Resources will be stored in memory cache or files cache.
     * The maximum size of the specified URL is 8192 bytes.
     * The maximum size of a single resource after decompression is 20,971,520 bytes(20 MB).
     * If the decompressed size of the downloaded resource exceeds the limit, it will not be recorded in the cache.
     *
     * @permission ohos.permission.INTERNET
     * @param { string } url - URL of the cache download target.
     * @param { CacheDownloadOptions } options - Options of the cache download task.
     * @throws { BusinessError } 201 - permission denied.
     * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 18
     */
    function download(url: string, options: CacheDownloadOptions): void;
    /**
     * Cancels an ongoing cache download task based on the target URL.
     * The maximum size of the specified URL is 8192 bytes.
     *
     * @param { string } url - URL of the cache download target.
     * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 18
     */
    function cancel(url: string): void;
    /**
     * Sets the size of the memory cache used to store downloaded content.
     * The default size is 0 bytes.
     * The maximum size is 1,073,741,824 bytes(1 GB).
     *
     * @param { number } bytes - The maximum amount of data cached in memory, in bytes.
     * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 18
     */
    function setMemoryCacheSize(bytes: number): void;
    /**
     * Sets the size of the file cache used to store downloaded content.
     * The default size is 104,857,600 bytes(100 MB).
     * The maximum size is 4,294,967,296 bytes(4 GB).
     *
     * @param { number } bytes - The maximum amount of data cached in files, in bytes.
     * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 18
     */
    function setFileCacheSize(bytes: number): void;
    /**
     * Gets download information of cache downloads based on URL.
     * These information are stored in memory and cleared when the application exits.
     * The maximum size of the specified URL is 8192 bytes.
     * If the specified URL can be found in the download information list,
     * return { @link DownloadInfo } of the most recent download.
     * If the specified URL can not be found in the download information list, return `undefined`.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { string } url - URL to be queried.
     * @returns { DownloadInfo | undefined } the information of the specified cache download or none.
     * @throws { BusinessError } 201 - permission denied.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    function getDownloadInfo(url: string): DownloadInfo | undefined;
    /**
     * Sets the maximum size of the download information list.
     * The download information list is used to store download infarmation.
     * URLs and download information correspond one to one.
     * Each download will generate a download information.
     * Under the same URL, only the latest download information will be saved.
     * The default value of the specified size is 0. It means no download information can be stored.
     * The maximum value of the specified size is 8192.
     *
     * @param { number } size - the size of the download information list.
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 20
     */
    function setDownloadInfoListSize(size: number): void;
}
export default cacheDownload;
