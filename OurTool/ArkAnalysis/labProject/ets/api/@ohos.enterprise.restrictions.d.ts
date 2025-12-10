/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
 * @kit MDMKit
 */
import type Want from '@ohos.app.ability.Want';
/**
 * This module provides the capability to manage restriction policy of the enterprise devices.
 *
 * @namespace restrictions
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @since 10
 */
declare namespace restrictions {
    /**
     * Disallows the specific feature of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } feature - feature indicates the specific feature to be disallowed or allowed,
     *                             the supported device features include modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb and wifi.
     * @param { boolean } disallow - true if disallow the specific feature of device, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    /**
     * Disallows the specific feature of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS or ohos.permission.PERSONAL_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } feature - feature indicates the specific feature to be disallowed or allowed,
     *                             the supported device features include modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb and wifi.
     * @param { boolean } disallow - true if disallow the specific feature of device, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 15
     */
    /**
    * Disallows the specific feature of the device.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS or ohos.permission.PERSONAL_MANAGE_RESTRICTIONS
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { string } feature - feature indicates the specific feature to be disallowed or allowed,
    *                             the supported device features are as follows:
    *                             modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb, wifi, tethering, inactiveUserFreeze, camera,
    *                             mtpClient, mtpServer, globalDrag, externalSdCard, backupAndRestore, notification, mms, sms, remoteDiagnosis, remoteDesk,
    *                             nfc, privateSpace, vpn, airplaneMode, mobileData, maintenanceMode, sambaClient, sambaServer.
    * @param { boolean } disallow - true if disallow the specific feature of device, otherwise false.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function setDisallowedPolicy(admin: Want, feature: string, disallow: boolean): void;
    /**
     * Queries whether the specific feature of the device is disallowed.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         If the admin is not empty, it must have the corresponding permission.
     * @param { string } feature - feature indicates the specific feature to be queried,
     *                             the supported device features include modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb and wifi.
     * @returns { boolean } true if the specific feature of device is disallowed, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    /**
     * Queries whether the specific feature of the device is disallowed.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS or ohos.permission.PERSONAL_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         If the admin is not empty, it must have the corresponding permission.
     * @param { string } feature - feature indicates the specific feature to be queried,
     *                             the supported device features include modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb and wifi.
     * @returns { boolean } true if the specific feature of device is disallowed, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 15
     */
    /**
    * Queries whether the specific feature of the device is disallowed.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS or ohos.permission.PERSONAL_MANAGE_RESTRICTIONS
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         If the admin is not empty, it must have the corresponding permission.
    * @param { string } feature - feature indicates the specific feature to be queried,
    *                             the supported device features are as follows:
    *                             modifyDateTime, bluetooth, printer, hdc, microphone, fingerprint, usb, wifi, tethering, inactiveUserFreeze, camera,
    *                             mtpClient, mtpServer, globalDrag, externalSdCard, backupAndRestore, notification, mms, sms, remoteDiagnosis, remoteDesk,
    *                             nfc, privateSpace, vpn, airplaneMode, mobileData, maintenanceMode, sambaClient, sambaServer.
    * @returns { boolean } true if the specific feature of device is disallowed, otherwise false.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function getDisallowedPolicy(admin: Want, feature: string): boolean;
    /**
     * Disallows the specific feature of the device for the specified account.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     * @param { string } feature - feature indicates the specific feature to be disallowed or allowed.
     * @param { boolean } disallow - true if disallow the specific feature of device, otherwise false.
     * @param { number } accountId - accountId indicates the account ID to be queried.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200010 - A conflict policy has been configured.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    /**
     * Disallows the specific feature of the device for the specified account.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     * @param { string } feature - feature indicates the specific feature to be disallowed or allowed,
     *                             the supported device features are as follows:
     *                             fingerprint, print, mtpClient, usbStorageDeviceWrite, diskRecoveryKey, sudo, distributedTransmissionOutgoing.
     * @param { boolean } disallow - true if disallow the specific feature of device, otherwise false.
     * @param { number } accountId - accountId indicates the account ID to be queried.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200010 - A conflict policy has been configured.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function setDisallowedPolicyForAccount(admin: Want, feature: string, disallow: boolean, accountId: number): void;
    /**
     * Queries whether the specific feature of the device is disallowed for the specified account.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     * @param { string } feature - feature indicates the specific feature to be queried.
     * @param { number } accountId - accountId indicates the account ID to be queried.
     * @returns { boolean } true if the specific feature of device is disallowed, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    /**
     * Queries whether the specific feature of the device is disallowed for the specified account.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want | null } admin - admin indicates the enterprise admin extension ability information.
     * @param { string } feature - feature indicates the specific feature to be queried.
     *                             the supported device features are as follows:
     *                             fingerprint, print, mtpClient, usbStorageDeviceWrite, diskRecoveryKey, sudo, distributedTransmissionOutgoing.
     * @param { number } accountId - accountId indicates the account ID to be queried.
     * @returns { boolean } true if the specific feature of device is disallowed, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function getDisallowedPolicyForAccount(admin: Want | null, feature: string, accountId: number): boolean;
    /**
     * Adds applications or bundles or other contents to the list to restrict them from using a specific feature.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } feature - feature indicates the specific feature to be disallowed.
     * @param { Array<string> } list - list of restricted applications or bundles or other contents.
     * @param { number } accountId - indicates the account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function addDisallowedListForAccount(admin: Want, feature: string, list: Array<string>, accountId: number): void;
    /**
     * Removes applications or bundles or other contents from the list to unblock them from using a specific feature.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } feature - feature indicates the specific feature to be disallowed.
     * @param { Array<string> } list - list of unblock applications or bundles or other contents.
     * @param { number } accountId - indicates the account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function removeDisallowedListForAccount(admin: Want, feature: string, list: Array<string>, accountId: number): void;
    /**
     * Gets the list of applications or bundles or other contents that are restrict from using a specific feature.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_RESTRICTIONS
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } feature - feature indicates the specific feature to be disallowed.
     * @param { number } accountId - indicates the account ID.
     * @returns { Array<string> } list - list of applications or bundles or other contents.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function getDisallowedListForAccount(admin: Want, feature: string, accountId: number): Array<string>;
    /**
     * Restricting users from changing specified settings item on the device.
     *
     * @permission ohos.permission.ENTERPRISE_SET_USER_RESTRICTION
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } settingsItem - settingsItem indicates the specific settings item to be disallowed.
     * the supported settingsItems are as follows:
     * setEthernetIp, setApn, powerKeyShutdown, setDeviceName,
     * setBiometricsAndScreenLock.
     * @param { boolean } restricted - true if restrict the specific settings item of device, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function setUserRestriction(admin: Want, settingsItem: string, restricted: boolean): void;
    /**
     * Gets whether users are restricted from changing specified settings items on the device.
     *
     * @permission ohos.permission.ENTERPRISE_SET_USER_RESTRICTION
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } settingsItem - settingsItem indicates the specific settings item to be disallowed.
     * @returns { boolean } true if restrict the specific settings item of device, otherwise false.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function getUserRestricted(admin: Want, settingsItem: string): boolean;
}
export default restrictions;
