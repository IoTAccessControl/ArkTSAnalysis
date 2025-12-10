/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit CoreFileKit
 */
/**
 * Provides the capabilities to manage the state and data of cloud file synchronization.
 *
 * @namespace cloudSyncManager
 * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
 * @since 10
 */
declare namespace cloudSyncManager {
    /**
     * Describes the reason why the download task stop.
     * @enum { number } DownloadStopReason
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
     * @since 20
     */
    enum DownloadStopReason {
        /**
         * download task is not stopped.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        NO_STOP = 0,
        /**
         * Network is unavailable.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        NETWORK_UNAVAILABLE = 1,
        /**
         * The local storage space is full.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        LOCAL_STORAGE_FULL = 2,
        /**
         * Temperature control Limits.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        TEMPERATURE_LIMIT = 3,
        /**
         * User stopped the download task.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        USER_STOPPED = 4,
        /**
         * The local application has been unloaded.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        APP_UNLOAD = 5,
        /**
         * Other reasons of some internal error.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        OTHER_REASON = 6
    }
    /**
     * Describes the state type of downgrade download.
     * @enum { number } DownloadState
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
     * @since 20
     */
    enum DownloadState {
        /**
         * Indicates that the download task in process now.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        RUNNING = 0,
        /**
         * Indicates that the download task finished.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        COMPLETED = 1,
        /**
         * Indicates that the download task stopped.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        STOPPED = 2
    }
    /**
     * Defines the CloudFileInfo data structure.
     * @typedef CloudFileInfo
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
     * @since 20
     */
    interface CloudFileInfo {
        /**
         * Total number of files located in the cloud.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        cloudFileCount: number;
        /**
         * Total size of files located in the cloud, in units of bytes.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        cloudFileTotalSize: number;
        /**
         * Total number of files located locally.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        localFileCount: number;
        /**
         * Total size of files located locally, in units of bytes.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        localFileTotalSize: number;
        /**
         * Total number of files located both locally and in the cloud.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        bothFileCount: number;
        /**
         * Total size of files located both locally and in the cloud, in units of bytes.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        bothFileTotalSize: number;
    }
    /**
     * Defines DownloadProgress object.
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
     * @since 20
     */
    class DownloadProgress {
        /**
         * The current download task state.
         * @type { DownloadState }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        state: DownloadState;
        /**
         * The number of files that downloaded successfully
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        successfulCount: number;
        /**
         * The number of files that fail to be downloaded.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        failedCount: number;
        /**
         * Total number of all files to be downloaded.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        totalCount: number;
        /**
         * Total size of downloaded files.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        downloadedSize: number;
        /**
         * Total size of all files to be downloaded.
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        totalSize: number;
        /**
         * The reason for stopping the download task.
         * @type { DownloadStopReason }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSyncManager
         * @since 20
         */
        stopReason: DownloadStopReason;
    }
}
export default cloudSyncManager;
