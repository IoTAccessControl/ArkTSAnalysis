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
 * @kit MDMKit
 */
import type Want from './@ohos.app.ability.Want';
import adminManager from './@ohos.enterprise.adminManager';
/**
 * This module provides the capability to manage the telephony of the enterprise devices.
 *
 * @namespace telephonyManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @stagemodelonly
 * @since 20
 */
declare namespace telephonyManager {
    /**
     * Disable sim slot
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } slotId - Indicates the card slot index number,
     *                         ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function setSimDisabled(admin: Want, slotId: number): void;
    /**
     * Enable sim slot
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } slotId - Indicates the card slot index number,
     *                         ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function setSimEnabled(admin: Want, slotId: number): void;
    /**
     * Get the state of the sim slot
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } slotId - Indicates the card slot index number,
     *                         ranging from {@code 0} to the maximum card slot index number supported by the device.
     * @returns { boolean } the result of sim slot policy, ture means slotid is disableed.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function isSimDisabled(admin: Want, slotId: number): boolean;
    /**
     * Add phone number to outgoing call number list.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { adminManager.Policy } policy - policy flag.
     * @param { Array<string> } numbers - phone numbers will add to the trust/block list.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200010 - A conflict policy has been configured.
     * @throws { BusinessError } 9200012 - Parameter verification failed.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 203 - This function is prohibited by enterprise management policies.
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 20
     */
    function addOutgoingCallPolicyNumbers(admin: Want, policy: adminManager.Policy, numbers: Array<string>): void;
    /**
    * Remove phone number from outgoing call number list.
    * This function can be called by a super administrator.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { adminManager.Policy } policy - policy flag.
    * @param { Array<string> } numbers - phone numbers will remove from the trust/block list.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 9200012 - Parameter verification failed.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @throws { BusinessError } 203 - This function is prohibited by enterprise management policies.
    * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function removeOutgoingCallPolicyNumbers(admin: Want, policy: adminManager.Policy, numbers: Array<string>): void;
    /**
    * Get outgoing call number list.
    * This function can be called by a super administrator.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { adminManager.Policy } policy - policy flag.
    * @returns { Array<string> } phone numbers in the trust/block list.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function getOutgoingCallPolicyNumbers(admin: Want, policy: adminManager.Policy): Array<string>;
    /**
    * Add phone number to incoming call policy number list.
    * This function can be called by a super administrator.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { adminManager.Policy } policy - policy flag.
    * @param { Array<string> } numbers - phone numbers will add to the trust/block list.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 9200010 - A conflict policy has been configured.
    * @throws { BusinessError } 9200012 - Parameter verification failed.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @throws { BusinessError } 203 - This function is prohibited by enterprise management policies.
    * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function addIncomingCallPolicyNumbers(admin: Want, policy: adminManager.Policy, numbers: Array<string>): void;
    /**
    * Remove phone number from incoming call pplicy number list.
    * This function can be called by a super administrator.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { adminManager.Policy } policy - policy flag.
    * @param { Array<string> } numbers - phone numbers will remove from the trust/block list.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 9200012 - Parameter verification failed.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @throws { BusinessError } 203 - This function is prohibited by enterprise management policies.
    * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function removeIncomingCallPolicyNumbers(admin: Want, policy: adminManager.Policy, numbers: Array<string>): void;
    /**
    * Get incoming call policy number list.
    * This function can be called by a super administrator.
    *
    * @permission ohos.permission.ENTERPRISE_MANAGE_TELEPHONY
    * @param { Want } admin - admin indicates the enterprise admin extension ability information.
    *                         The admin must have the corresponding permission.
    * @param { adminManager.Policy } policy - policy flag.
    * @returns { Array<string> } phone numbers in the trust/block list.
    * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
    * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
    * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
    * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
    * @syscap SystemCapability.Customization.EnterpriseDeviceManager
    * @stagemodelonly
    * @since 20
    */
    function getIncomingCallPolicyNumbers(admin: Want, policy: adminManager.Policy): Array<string>;
}
export default telephonyManager;
