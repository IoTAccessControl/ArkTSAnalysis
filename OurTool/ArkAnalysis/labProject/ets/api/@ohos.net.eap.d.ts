/*
 * Copyright (C) 2025-2025 Huawei Device Co., Ltd.
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
 * @kit NetworkKit
 */
import { Callback } from './@ohos.base';
/**
 * Provides interfaces to manage ethernet.
 * @namespace eap
 * @syscap SystemCapability.Communication.NetManager.Eap
 * @since 20
 */
declare namespace eap {
    /**
     * Customize eap packets by callback
     * @permission ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION
     * @param { number } netType Indicates net type need to customize.
     * @param { number } eapCode Indicates eap code need to customize.
     * @param { number } eapType Indicates eap type need to customize.
     * @param { Callback<EapData> } callback - the callback of eap packet customization.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 33200006 - Invalid net type
     * @throws { BusinessError } 33200007 - Invalid eap code
     * @throws { BusinessError } 33200008 - Invalid eap type
     * @throws { BusinessError } 33200009 - netmanager stop
     * @throws { BusinessError } 33200099 - internal error
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    function regCustomEapHandler(netType: number, eapCode: number, eapType: number, callback: Callback<EapData>): void;
    /**
     * unreg the callback of eap packet customization.
     * @permission ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION
     * @param { number } netType Indicates net type need to customize.
     * @param { number } eapCode Indicates eap code need to customize.
     * @param { number } eapType Indicates eap type need to customize.
     * @param { Callback<EapData> } callback - the callback of eap packet customization.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 33200006 - Invalid net type
     * @throws { BusinessError } 33200007 - Invalid eap code
     * @throws { BusinessError } 33200008 - Invalid eap type
     * @throws { BusinessError } 33200009 - netmanager stop
     * @throws { BusinessError } 33200099 - internal error
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    function unregCustomEapHandler(netType: number, eapCode: number, eapType: number, callback: Callback<EapData>): void;
    /**
     * send Customized eap packets to system
     * @permission ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION
     * @param { CustomResult } result Indicates the result of custom authentication.
     * @param { EapData } data Indicates eap packet data after customization.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 33200004 - Invalid result
     * @throws { BusinessError } 33200005 - Invalid size of eap data
     * @throws { BusinessError } 33200009 - netmanager stop
     * @throws { BusinessError } 33200099 - internal error
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    function replyCustomEapData(result: CustomResult, data: EapData): void;
    /**
     * Set the specified network interface parameters.
     * @permission ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION
     * @param { number } netId Indicates the eth network id to start EAP authentication.
     * @param { EthEapProfile } profile Indicates the eap profile.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 33200001 - Invalid netId
     * @throws { BusinessError } 33200003 - Invalid profile
     * @throws { BusinessError } 33200009 - netmanager stop
     * @throws { BusinessError } 33200010 - invalid eth state
     * @throws { BusinessError } 33200099 - internal error
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    function startEthEap(netId: number, profile: EthEapProfile): void;
    /**
     * Check whether the specified network is active.
     * @permission ohos.permission.MANAGE_ENTERPRISE_WIFI_CONNECTION
     * @param { number } netId Indicates the eth network id to log off EAP authentication.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 33200001 - Invalid netId
     * @throws { BusinessError } 33200002 - Log off fail
     * @throws { BusinessError } 33200009 - netmanager stop
     * @throws { BusinessError } 33200010 - invalid eth state
     * @throws { BusinessError } 33200099 - internal error
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    function logOffEthEap(netId: number): void;
    /**
     * Describes the EAP information.
     *
     * @typedef EapData
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    interface EapData {
        /**
         * EAP message ID.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        msgId: number;
        /**
         * EAP packet buffer.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        eapBuffer: Uint8Array;
        /**
         * EAP packet length.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        bufferLen: number;
    }
    /**
    * custom 802.1x result.
    *
    * @enum { number }
    * @syscap SystemCapability.Communication.NetManager.Eap
    * @since 20
    */
    enum CustomResult {
        /**
         * custom authentication finished and fail
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        RESULT_FAIL,
        /**
         * custom authentication success for current step, go to next step
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        RESULT_NEXT,
        /**
         * custom authentication finished and success
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        RESULT_FINISH
    }
    /**
       * 802.1x EAP method.
       *
       * @enum { number }
       * @syscap SystemCapability.Communication.NetManager.Eap
       * @since 20
       */
    enum EapMethod {
        /**
         * Not specified
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_NONE,
        /**
         * Protected extensible authentication protocol
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_PEAP,
        /**
         * Transport layer security
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_TLS,
        /**
         * Tunneled transport layer security
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_TTLS,
        /**
         * Password
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_PWD,
        /**
         * Subscriber identity module
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_SIM,
        /**
         * Authentication and key agreement
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_AKA,
        /**
         * AKA prime
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_AKA_PRIME,
        /**
         * Unauth TLS
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        EAP_UNAUTH_TLS
    }
    /**
     * 802.1x phase 2 method.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    enum Phase2Method {
        /**
         * Not specified
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_NONE,
        /**
         * Password authentication protocol
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_PAP,
        /**
         * Microsoft challenge handshake authentication protocol
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_MSCHAP,
        /**
         * Microsoft challenge handshake authentication protocol version 2
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_MSCHAPV2,
        /**
         * Generic token card
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_GTC,
        /**
         * Subscriber identity module
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_SIM,
        /**
         * Authentication and key agreement
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_AKA,
        /**
         * AKA Prime
         *
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        PHASE2_AKA_PRIME
    }
    /**
     * Eth EAP profile.
     *
     * @typedef EthEapProfile
     * @syscap SystemCapability.Communication.NetManager.Eap
     * @since 20
     */
    interface EthEapProfile {
        /**
         * EAP authentication method
         *
         * @type { EapMethod }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        eapMethod: EapMethod;
        /**
         * Phase 2 authentication method
         *
         * @type { Phase2Method }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        phase2Method: Phase2Method;
        /**
         * The identity
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        identity: string;
        /**
         * Anonymous identity
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        anonymousIdentity: string;
        /**
         * Password
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        password: string;
        /**
         * CA certificate alias
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        caCertAliases: string;
        /**
         * CA certificate path
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        caPath: string;
        /**
         * Client certificate alias
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        clientCertAliases: string;
        /**
         * content of user's certificate
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        certEntry: Uint8Array;
        /**
         * Password of user's certificate
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        certPassword: string;
        /**
         * Alternate subject match
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        altSubjectMatch: string;
        /**
         * Domain suffix match
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        domainSuffixMatch: string;
        /**
         * Realm for Passpoint credential
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        realm: string;
        /**
         * Public Land Mobile Network of the provider of Passpoint credential
         *
         * @type { string }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        plmn: string;
        /**
         * Sub ID of the SIM card
         *
         * @type { number }
         * @syscap SystemCapability.Communication.NetManager.Eap
         * @since 20
         */
        eapSubId: number;
    }
}
export default eap;
