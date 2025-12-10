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
 * @kit AssetStoreKit
 */
/**
 * This module provides the capabilities for life cycle management of sensitive user data (Asset) such as passwords
 * and tokens, including adding, removing, updating, and querying.
 *
 * @namespace asset
 * @syscap SystemCapability.Security.Asset
 * @since 11
 */
/**
 * This module provides the capabilities for life cycle management of sensitive user data (Asset) such as passwords
 * and tokens, including adding, removing, updating, and querying.
 *
 * @namespace asset
 * @syscap SystemCapability.Security.Asset
 * @atomicservice
 * @since 14
 */
declare namespace asset {
    /**
     * Add an Asset.
     * Permission ohos.permission.STORE_PERSISTENT_DATA is required when the Asset needs to be stored persistently
     *     by setting {@link Tag.IS_PERSISTENT} tag.
     *
     * @param { AssetMap } attributes - a map object containing attributes of the Asset to be added.
     * @returns { Promise<void> } the promise object returned by the function.
     * @throws { BusinessError } 201 - The caller doesn't have the permission.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000003 - The asset already exists.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000014 - The file operation failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Add an asset. This API uses a promise to return the result.
     * To set {@link Tag.IS_PERSISTENT}, the application must have the ohos.permission.STORE_PERSISTENT_DATA permission.
     *
     * @param { AssetMap } attributes - Attributes of the asset to add, including the asset plaintext,
     *     access control attributes, and custom data.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - The caller doesn't have the permission.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000003 - The asset already exists.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000014 - The file operation failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function add(attributes: AssetMap): Promise<void>;
    /**
     * Add an Asset.
     * Permission ohos.permission.STORE_PERSISTENT_DATA is required when the Asset needs to be stored persistently
     *     by setting {@link Tag.IS_PERSISTENT} tag.
     *
     * @param { AssetMap } attributes - a map object containing attributes of the Asset to be added.
     * @throws { BusinessError } 201 - The caller doesn't have the permission.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000003 - The asset already exists.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000014 - The file operation failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Add an asset. This API returns the result synchronously.
     * To set {@link Tag.IS_PERSISTENT}, the application must have the ohos.permission.STORE_PERSISTENT_DATA permission.
     *
     * @param { AssetMap } attributes - Attributes of the asset to add, including the asset plaintext,
     *     access control attributes, and custom data.
     * @throws { BusinessError } 201 - The caller doesn't have the permission.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000003 - The asset already exists.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000014 - The file operation failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function addSync(attributes: AssetMap): void;
    /**
     * Remove one or more Assets that match a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be removed.
     * @returns { Promise<void> } the promise object returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Removes one or more assets. This API uses a promise to return the result.
     *
     * @param { AssetMap } query - Attributes of the asset to remove, such as the asset alias,
     *     access control attributes, and custom data.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function remove(query: AssetMap): Promise<void>;
    /**
     * Remove one or more Assets that match a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be removed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Removes one or more assets. This API returns the result synchronously.
     *
     * @param { AssetMap } query - Attributes of the asset to remove, such as the asset alias,
     *     access control attributes, and custom data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function removeSync(query: AssetMap): void;
    /**
     * Update an Asset that matches a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be updated.
     * @param { AssetMap } attributesToUpdate - a map object containing attributes with new values.
     * @returns { Promise<void> } the promise object returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Updates an asset. This API uses a promise to return the result.
     *
     * @param { AssetMap } query - Attributes of the asset to update, such as the asset alias,
     *     access control attributes, and custom data.
     * @param { AssetMap } attributesToUpdate - New attributes of the asset, such as the asset plaintext and custom data.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function update(query: AssetMap, attributesToUpdate: AssetMap): Promise<void>;
    /**
     * Update an Asset that matches a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be updated.
     * @param { AssetMap } attributesToUpdate - a map object containing attributes with new values.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Updates an asset. This API returns the result synchronously.
     *
     * @param { AssetMap } query - Attributes of the asset to update, such as the asset alias,
     *     access control attributes, and custom data.
     * @param { AssetMap } attributesToUpdate - New attributes of the asset, such as the asset plaintext and custom data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000015 - Getting the system time failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function updateSync(query: AssetMap, attributesToUpdate: AssetMap): void;
    /**
     * Preprocessing (e.g. get challenge) for querying one or more Assets that require user authentication.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be queried.
     * @returns { Promise<Uint8Array> } the promise object returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000016 - The cache exceeds the limit.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Performs preprocessing for the asset query. This API is used when user authentication is required for
     * the access to the asset. After the user authentication is successful, call {@link query} and
     * {@link postQuery}. This API uses a promise to return the result.
     *
     * @param { AssetMap } query - Attributes of the asset to query, such as the asset alias,
     *     access control attributes, and custom data.
     * @returns { Promise<Uint8Array> } Promise used to return a challenge value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000016 - The cache exceeds the limit.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function preQuery(query: AssetMap): Promise<Uint8Array>;
    /**
     * Preprocessing (e.g. get challenge) for querying one or more Assets that require user authentication.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be queried.
     * @returns { Uint8Array } the challenge value to be used when {@link querySync} is called.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000016 - The cache exceeds the limit.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Performs preprocessing for the asset query. This API is used when user authentication is required for
     * the access to the asset. After the user authentication is successful, call {@link querySync} and
     * {@link postQuerySync}. This API returns the result synchronously.
     *
     * @param { AssetMap } query - Attributes of the asset to query, such as the asset alias,
     *     access control attributes, and custom data.
     * @returns { Uint8Array } Challenge value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000016 - The cache exceeds the limit.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function preQuerySync(query: AssetMap): Uint8Array;
    /**
     * Query one or more Assets that match a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be queried.
     * @returns { Promise<Array<AssetMap>> } the promise object returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000004 - Access denied.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Queries one or more assets. If user authentication is required for the access to the asset,
     * call {@link preQuery} before this API and call {@link postQuery} after this API.
     * For details about the development procedure, see Querying an Asset with User Authentication.
     * This API uses a promise to return the result.
     *
     * @param { AssetMap } query - Attributes of the asset to query, such as the asset alias,
     *     access control attributes, and custom data.
     * @returns { Promise<Array<AssetMap>> } Promise used to return the result obtained.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000004 - Access denied.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function query(query: AssetMap): Promise<Array<AssetMap>>;
    /**
     * Query one or more Assets that match a search query.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be queried.
     * @returns { Array<AssetMap> } the query result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000004 - Access denied.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Queries one or more assets. If user authentication is required for the access to the asset,
     * call {@link preQuerySync} before this API and call {@link postQuerySync} after this API.
     * For details about the development procedure, see Querying an Asset with User Authentication.
     * This API returns the result synchronously.
     *
     * @param { AssetMap } query - Attributes of the asset to query, such as the asset alias,
     *     access control attributes, and custom data.
     * @returns { Array<AssetMap> } Array of query results.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Incorrect parameter types.
     *     2. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000002 - The asset is not found.
     * @throws { BusinessError } 24000004 - Access denied.
     * @throws { BusinessError } 24000005 - The screen lock status does not match.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000007 - The asset is corrupted.
     * @throws { BusinessError } 24000008 - The database operation failed.
     * @throws { BusinessError } 24000009 - The cryptography operation failed.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000017 - The capability is not supported.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function querySync(query: AssetMap): Array<AssetMap>;
    /**
     * Post-processing (e.g. release cached resource) for querying multiple Assets that require user authentication.
     *
     * @param { AssetMap } handle - a map object containing the handle returned by {@link preQuery}.
     * @returns { Promise<void> } the promise object returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Performs postprocessing for the asset query. This API is used when user authentication is required for
     * the access to the asset. This API must be used with {@link preQuery} together.
     * This API uses a promise to return the result.
     *
     * @param { AssetMap } handle - Handle of the query operation,
     *     including the challenge value returned by {@link preQuery}.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function postQuery(handle: AssetMap): Promise<void>;
    /**
     * Post-processing (e.g. release cached resource) for querying multiple Assets that require user authentication.
     *
     * @param { AssetMap } handle - a map object containing the handle returned by {@link preQuerySync}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    /**
     * Performs postprocessing for the asset query. This API is used when user authentication is required for
     * the access to the asset. This API must be used with {@link preQuerySync} together.
     * This API returns the result synchronously.
     *
     * @param { AssetMap } handle - Handle of the query operation,
     *     including the challenge value returned by {@link preQuerySync}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     *     3. Parameter verification failed.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    function postQuerySync(handle: AssetMap): void;
    /**
     * The ASSET service provides the ability to synchronize Assets between devices.
     * This function is used to query the synchronization result.
     *
     * @param { AssetMap } query - a map object containing attributes of the Asset to be synchronized.
     * @returns { Promise<SyncResult> } a promise object that can be resolved into the result of asset synchronization.
     * @throws { BusinessError } 24000001 - The ASSET service is unavailable.
     * @throws { BusinessError } 24000006 - Insufficient memory.
     * @throws { BusinessError } 24000010 - IPC failed.
     * @throws { BusinessError } 24000011 - Calling the Bundle Manager service failed.
     * @throws { BusinessError } 24000012 - Calling the OS Account service failed.
     * @throws { BusinessError } 24000013 - Calling the Access Token service failed.
     * @throws { BusinessError } 24000014 - The file operation failed.
     * @throws { BusinessError } 24000018 - Parameter verification failed.
     * @syscap SystemCapability.Security.Asset
     * @since 20
     */
    function querySyncResult(query: AssetMap): Promise<SyncResult>;
    /**
     * A Map type containing tag-value pairs that describe the attributes of an Asset.
     *
     * @typedef { Map<Tag, Value> }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Represents a set of asset attributes in the form of KV pairs.
     *
     * @typedef { Map<Tag, Value> }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    type AssetMap = Map<Tag, Value>;
    /**
     * A type that indicates the secret or attribute value of an Asset tag.
     *
     * @typedef { boolean | number | Uint8Array }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Represents the value of each attribute in {@link AssetMap}.
     *
     * @typedef { boolean | number | Uint8Array }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    type Value = boolean | number | Uint8Array;
    /**
     * An enum type indicates when the Asset is accessible.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the types of access control based on the lock screen status.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum Accessibility {
        /**
         * The secret value in the Asset can only be accessed after the device is powered on.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The asset can be accessed after the device is powered on.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DEVICE_POWERED_ON = 0,
        /**
         * The secret value in the Asset can only be accessed after the device is first unlocked.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The asset can be accessed only after the device is unlocked for the first time.
         * <p><strong>NOTE</strong>:
         * If no lock screen password is set, this option is equivalent to <strong>DEVICE_POWERED_ON</strong>.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DEVICE_FIRST_UNLOCKED = 1,
        /**
         * The secret value in the Asset can only be accessed while the device is unlocked.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The asset can be accessed only when the device is unlocked.
         * <p><strong>NOTE</strong>:
         * If no lock screen password is set, this option is equivalent to <strong>DEVICE_POWERED_ON</strong>.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DEVICE_UNLOCKED = 2
    }
    /**
     * An enum type indicates the user authentication type for Asset access control.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the types of user authentication supported by an asset.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum AuthType {
        /**
         * The access to an Asset doesn't require user authentication.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * No user authentication is required before the asset is accessed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        NONE = 0x00,
        /**
         * The access to an Asset requires user authentication using either PIN/pattern/password or biometric traits.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The asset can be accessed if any user authentication (such as PIN, facial, or fingerprint authentication)
         * is successful.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ANY = 0xFF
    }
    /**
     * An enum type indicates the type of Asset synchronization.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the sync types supported by an asset.
     * <p><strong>NOTE</strong>:
     * This field is an embedded parameter. Currently, asset sync is not supported.
     * </p>
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum SyncType {
        /**
         * An Asset with this attribute value is never allowed to be transferred out.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset sync is not allowed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        NEVER = 0,
        /**
         * An Asset with this attribute value can only be restored to the device from which it was transferred out.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset sync is allowed only on the local device, for example, in data restore on the local device.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        THIS_DEVICE = 1 << 0,
        /**
         * An Asset with this attribute value can only be transferred out to a trusted device (user authorized).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset sync is allowed only between trusted devices, for example, in the case of cloning.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        TRUSTED_DEVICE = 1 << 1,
        /**
         * An Asset with this attribute value can only be transferred out to devices logged in with trusted accounts.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Asset sync is allowed only between the devices that are logged in with trusted accounts, for example,
         * in cloud sync scenarios.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        TRUSTED_ACCOUNT = 1 << 2
    }
    /**
     * An enum type indicates the type of Asset encapsulation.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 18
     */
    enum WrapType {
        /**
         * An Asset with this attribute value is never allowed to be wrapped up.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 18
         */
        NEVER = 0,
        /**
         * An Asset with this attribute value can only be wrapped or unwrapped on devices logged in with trusted accounts.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 18
         */
        TRUSTED_ACCOUNT = 1
    }
    /**
     * An enum type indicates the strategy for conflict resolution when handling duplicated Asset alias.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the policies for resolving conflicts (for example, a duplicate alias) when an asset is added.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum ConflictResolution {
        /**
         * Directly overwrite an Asset with duplicated alias when a conflict is detected.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Overwrite the original asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        OVERWRITE = 0,
        /**
         * Throw an error so that the caller can take measures when a conflict is detected.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Throw an exception for the service to perform subsequent processing.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        THROW_ERROR = 1
    }
    /**
     * An enum type indicates the return type of the queried Asset.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the type of information returned by an asset query operation.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum ReturnType {
        /**
         * Specify that the return data should contain both secret value and attributes.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The query result contains the asset plaintext and its attributes.
         * <p><strong>NOTE</strong>:
         * Use this option when you need to query the plaintext of a single asset.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ALL = 0,
        /**
         * Specify that the return data contains only attributes.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The query result contains only the asset attributes.
         * <p><strong>NOTE</strong>:
         * Use this option when you need to query attributes of multiple assets.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ATTRIBUTES = 1
    }
    /**
     * Enumerates the types of additional operation to perform.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 12
     */
    enum OperationType {
        /**
         * Sync.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        NEED_SYNC = 0,
        /**
         * Logout.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        NEED_LOGOUT = 1
    }
    /**
     * Interface of synchronization result.
     *
     * @typedef SyncResult
     * @syscap SystemCapability.Security.Asset
     * @since 20
     */
    interface SyncResult {
        /**
         * The result code of synchronization.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.Asset
         * @since 20
         */
        readonly resultCode: number;
        /**
         * The total count of synchronized Assets.
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.Security.Asset
         * @since 20
         */
        readonly totalCount?: number;
        /**
         * The count of Assets that fail to synchronize.
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.Security.Asset
         * @since 20
         */
        readonly failedCount?: number;
    }
    /**
     * An enum type containing the data type definitions for Asset attribute value.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the asset attribute types.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum TagType {
        /**
         * The data type of Asset attribute value is bool.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Boolean.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        BOOL = 0x01 << 28,
        /**
         * The data type of Asset attribute value is uint32.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Number.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        NUMBER = 0x02 << 28,
        /**
         * The data type of Asset attribute value is byte array.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Byte array.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        BYTES = 0x03 << 28
    }
    /**
     * An enum type containing the Asset attribute tags.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerate the keys of asset attributes ({@link AssetMap}), which are in key-value (KV) pairs.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum Tag {
        /**
         * A tag whose value is a byte array indicating the sensitive user data such as passwords and tokens.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset plaintext.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        SECRET = TagType.BYTES | 0x01,
        /**
         * A tag whose value is a byte array identifying an Asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset alias, which uniquely identifies an asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ALIAS = TagType.BYTES | 0x02,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating when the Asset can be accessed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Access control based on the lock screen status.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ACCESSIBILITY = TagType.NUMBER | 0x03,
        /**
         * A tag whose value is a bool indicating whether a screen lock password is required for the device.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Whether the asset is accessible only when a lock screen password is set.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        REQUIRE_PASSWORD_SET = TagType.BOOL | 0x04,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the user authentication type for Asset access control.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Type of user authentication required for accessing the asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        AUTH_TYPE = TagType.NUMBER | 0x05,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the validity period in seconds of user authentication.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Validity period of the user authentication.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        AUTH_VALIDITY_PERIOD = TagType.NUMBER | 0x06,
        /**
         * A tag whose value is a byte array indicating the authentication challenge for anti-replay protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Challenge for the user authentication.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        AUTH_CHALLENGE = TagType.BYTES | 0x07,
        /**
         * A tag whose value is a byte array indicating the authentication token after a user is verified.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Authorization token obtained after the user authentication is successful.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        AUTH_TOKEN = TagType.BYTES | 0x08,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the type of Asset synchronization.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Asset sync type.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        SYNC_TYPE = TagType.NUMBER | 0x10,
        /**
         * Whether to retain the asset when the application is uninstalled.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        IS_PERSISTENT = TagType.BOOL | 0x11,
        /**
         * A tag whose value is a byte array indicating the first user-defined Asset data label (not allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service with integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_CRITICAL_1 = TagType.BYTES | 0x20,
        /**
         * A tag whose value is a byte array indicating the second user-defined Asset data label (not allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service with integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_CRITICAL_2 = TagType.BYTES | 0x21,
        /**
         * A tag whose value is a byte array indicating the third user-defined Asset data label (not allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service with integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_CRITICAL_3 = TagType.BYTES | 0x22,
        /**
         * A tag whose value is a byte array indicating the fourth user-defined Asset data label (not allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service with integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_CRITICAL_4 = TagType.BYTES | 0x23,
        /**
         * A tag whose value is a byte array indicating the first user-defined Asset data label (allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service without integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_1 = TagType.BYTES | 0x30,
        /**
         * A tag whose value is a byte array indicating the second user-defined Asset data label (allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service without integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_2 = TagType.BYTES | 0x31,
        /**
         * A tag whose value is a byte array indicating the third user-defined Asset data label (allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service without integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_3 = TagType.BYTES | 0x32,
        /**
         * A tag whose value is a byte array indicating the fourth user-defined Asset data label (allow to update).
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Additional asset data customized by the service without integrity protection.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_4 = TagType.BYTES | 0x33,
        /**
         * A local tag whose value is a byte array indicating the first user-defined Asset data label (allow to update).
         * The information of a local tag will not be synchronized.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Local information about the asset. The value is assigned by the service without integrity protection and
         * will not be synced.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_LOCAL_1 = TagType.BYTES | 0x34,
        /**
         * A local tag whose value is a byte array indicating the second user-defined Asset data label (allow to update).
         * The information of a local tag will not be synchronized.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Local information about the asset. The value is assigned by the service without integrity protection and
         * will not be synced.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_LOCAL_2 = TagType.BYTES | 0x35,
        /**
         * A local tag whose value is a byte array indicating the third user-defined Asset data label (allow to update).
         * The information of a local tag will not be synchronized.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Local information about the asset. The value is assigned by the service without integrity protection and
         * will not be synced.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_LOCAL_3 = TagType.BYTES | 0x36,
        /**
         * A local tag whose value is a byte array indicating the fourth user-defined Asset data label (allow to update).
         * The information of a local tag will not be synchronized.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Local information about the asset. The value is assigned by the service without integrity protection and
         * will not be synced.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_LABEL_NORMAL_LOCAL_4 = TagType.BYTES | 0x37,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the return type of the queried Asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Type of the asset query result to return.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        RETURN_TYPE = TagType.NUMBER | 0x40,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the maximum number of returned Assets in one query.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Maximum number of asset records to return.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        RETURN_LIMIT = TagType.NUMBER | 0x41,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the offset of return data in batch query.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Offset of the asset query result.
         * <p><strong>NOTE</strong>:
         * This parameter specifies the starting asset record to return in batch asset query.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        RETURN_OFFSET = TagType.NUMBER | 0x42,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating how the query results are sorted.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Sorting order of the query results. Currently, the results can be sorted only by
         * <strong>ASSET_TAG_DATA_LABEL</strong>.
         * <p><strong>NOTE</strong>:
         * By default, assets are returned in the order in which they are added.
         * </p>
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        RETURN_ORDERED_BY = TagType.NUMBER | 0x43,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the strategy for resolving Asset conflicts.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * Policy for resolving the conflict (for example, a duplicate alias).
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        CONFLICT_RESOLUTION = TagType.NUMBER | 0x44,
        /**
         * A tag whose value is a byte array indicating the update time of an Asset.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        /**
         * Data update time, in timestamp.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        UPDATE_TIME = TagType.BYTES | 0x45,
        /**
         * Additional operation type.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        OPERATION_TYPE = TagType.NUMBER | 0x46,
        /**
         * Whether to encrypt the additional asset information customized by the service.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        REQUIRE_ATTR_ENCRYPTED = TagType.BOOL | 0x47,
        /**
         * Group to which the asset belongs.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 18
         */
        GROUP_ID = TagType.BYTES | 0x48,
        /**
         * A tag whose value is a 32-bit unsigned integer indicating the type of Asset encapsulation.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 18
         */
        WRAP_TYPE = TagType.NUMBER | 0x49
    }
    /**
     * An enum type containing the Asset error codes.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @since 11
     */
    /**
     * Enumerates the error codes.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Asset
     * @atomicservice
     * @since 14
     */
    enum ErrorCode {
        /**
         * The error code indicates that the caller doesn't have the permission.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        PERMISSION_DENIED = 201,
        /**
         * The error code indicates that the caller is not a system application.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 12
         */
        NOT_SYSTEM_APPLICATION = 202,
        /**
         * The error code indicates that the argument is invalid.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the argument is invalid.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        INVALID_ARGUMENT = 401,
        /**
         * The error code indicates that the ASSET service is unavailable.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the ASSET service is unavailable.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        SERVICE_UNAVAILABLE = 24000001,
        /**
         * The error code indicates that the asset is not found.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the asset is not found.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        NOT_FOUND = 24000002,
        /**
         * The error code indicates that the asset already exists.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the asset already exists.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DUPLICATED = 24000003,
        /**
         * The error code indicates that access to the asset is denied.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that access to the asset is denied.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ACCESS_DENIED = 24000004,
        /**
         * The error code indicates that the screen lock status does not match.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the screen lock status does not match.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        STATUS_MISMATCH = 24000005,
        /**
         * The error code indicates insufficient memory.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates insufficient memory.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        OUT_OF_MEMORY = 24000006,
        /**
         * The error code indicates that the asset is corrupted.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the asset is corrupted.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATA_CORRUPTED = 24000007,
        /**
         * The error code indicates that the database operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the database operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        DATABASE_ERROR = 24000008,
        /**
         * The error code indicates that the cryptography operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the cryptography operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        CRYPTO_ERROR = 24000009,
        /**
         * The error code indicates that the ipc failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the ipc failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        IPC_ERROR = 24000010,
        /**
         * The error code indicates that calling the Bundle Manager service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that calling the Bundle Manager service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        BMS_ERROR = 24000011,
        /**
         * The error code indicates that calling the OS Account service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that calling the OS Account service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ACCOUNT_ERROR = 24000012,
        /**
         * The error code indicates that calling the Access Token service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that calling the Access Token service failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        ACCESS_TOKEN_ERROR = 24000013,
        /**
         * The error code indicates that the file operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the file operation failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        FILE_OPERATION_ERROR = 24000014,
        /**
         * The error code indicates that getting the system time failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that getting the system time failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        GET_SYSTEM_TIME_ERROR = 24000015,
        /**
         * The error code indicates that the cache exceeds the limit.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the cache exceeds the limit.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        LIMIT_EXCEEDED = 24000016,
        /**
         * The error code indicates that the capability is not supported.
         *
         * @syscap SystemCapability.Security.Asset
         * @since 11
         */
        /**
         * The error code indicates that the capability is not supported.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 14
         */
        UNSUPPORTED = 24000017,
        /**
         * The error code indicates that verifying the parameter failed.
         *
         * @syscap SystemCapability.Security.Asset
         * @atomicservice
         * @since 20
         */
        PARAM_VERIFICATION_FAILED = 24000018
    }
}
export default asset;
