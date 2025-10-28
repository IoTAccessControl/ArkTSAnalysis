/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */

import { hilog } from '@kit.PerformanceAnalysisKit';
import { healthStore } from '@kit.HealthServiceKit';
import { common } from '@kit.AbilityKit';

export class AuthManagement {
  public static async auth(context: common.UIAbilityContext) {
    try {
      let authorizationParameter: healthStore.AuthorizationRequest = {
        readDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE],
        writeDataTypes: [healthStore.exerciseSequenceHelper.DATA_TYPE]
      }

      let authorizationResponse: healthStore.AuthorizationResponse =
        await healthStore.requestAuthorizations(context, authorizationParameter);
      let result: string = 'Succeeded in requesting authorization.\n'
      hilog.info(0x0000, 'testTag', 'Succeeded in requesting authorization.');
      authorizationResponse.writeDataTypes.forEach(dataType => {
        result += `grantedWriteDataType is : ${dataType.name}` + '\n';
        hilog.info(0x0000, 'testTag', `grantedWriteDataType is : ${dataType.name}`);
      });
      authorizationResponse.readDataTypes.forEach(dataType => {
        result += `grantedReadDataTypes is : ${dataType.name}` + '\n';
        hilog.info(0x0000, 'testTag', `grantedReadDataTypes is : ${dataType.name}`);
      });

      return result;
    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to request authorization. Code: ${err.code}, message: ${err.message}`);
      return `Failed to request authorization. Code: ${err.code}, message: ${err.message}`;
    }
  }
}