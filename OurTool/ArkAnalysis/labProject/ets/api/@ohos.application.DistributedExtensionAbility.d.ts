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
import Want from './@ohos.app.ability.Want';
import AbilityConstant from './@ohos.app.ability.AbilityConstant';
import type DistributedExtensionContext from './@ohos.application.DistributedExtensionContext';
/**
 * Class to be override for distributed extension ability.
 *
 * @syscap SystemCapability.DistributedSched.AppCollaboration
 * @stagemodelonly
 * @since 20
 */
export default class DistributedExtensionAbility {
    /**
     * distributed collaborative context.
     *
     * @type { DistributedExtensionContext }
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @stagemodelonly
     * @since 20
     */
    context: DistributedExtensionContext;
    /**
     * Callback when Extension is started
     *
     * @param { Want } want Indicates the want info of ability.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @stagemodelonly
     * @since 20
     */
    onCreate(want: Want): void;
    /**
     * Callback when the distributed collaborative extension is destroyed
     *
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @stagemodelonly
     * @since 20
     */
    onDestroy(): void;
    /**
     * Callback when there is a request in distributed collaboration
     *
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.CollaborateResult } Return the result of onCollaborate.
     * @syscap SystemCapability.DistributedSched.AppCollaboration
     * @stagemodelonly
     * @since 20
     */
    onCollaborate(wantParam: Record<string, Object>): AbilityConstant.CollaborateResult;
}
