/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */

import { hilog } from '@kit.PerformanceAnalysisKit';
import { DateUtil } from '../utils/DateUtils';
import { healthStore } from '@kit.HealthServiceKit';

export class ExerciseSequenceManagement {
  private static dataSourceId: string;

  public static async saveData() {
    try {
      if (!ExerciseSequenceManagement.dataSourceId) {
        await ExerciseSequenceManagement.initDataSourceId();
      }

      const startTime = 1698040800000; // 2023-10-23 14:00:00
      const endTime = 1698042600000; // 2023-10-23 14:30:00

      const runningSequence: healthStore.exerciseSequenceHelper.running.Model = {
        dataType: healthStore.exerciseSequenceHelper.DATA_TYPE,
        dataSourceId: ExerciseSequenceManagement.dataSourceId,
        startTime: startTime, // 2023-10-23 14:00:00
        endTime: endTime, // 2023-10-23 14:30:00
        localDate: DateUtil.parseYyyyMmDdToDate(DateUtil.getYyyyMmDd(1698040800000)),
        timeZone: '+0800',
        modifiedTime: new Date().getTime(),

        exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
        duration: 1800000,
        summaries: {
          distance: {
            totalDistance: 2000
          },
          calorie: {
            totalCalories: 20
          },
          speed: {
            avg: 5,
            max: 6
          }
        },
        details: {
          exerciseHeartRate: [
            {
              startTime: startTime,
              bpm: 88
            },
            {
              startTime: startTime + 5000,
              bpm: 89
            }
          ],
          speed: [
            {
              startTime: startTime,
              speed: 2.5
            },
            {
              startTime: startTime + 5000,
              speed: 2.3
            }
          ],
          altitude: [
            {
              startTime: startTime,
              altitude: 100
            },
            {
              startTime: startTime + 5000,
              altitude: 101
            }
          ]
        }
      };

      await healthStore.saveData(runningSequence);
      hilog.info(0x0000, 'testTag', 'Succeeded in saving data.');
      return 'Succeeded in saving data.';
    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to save data. Code: ${err.code}, message: ${err.message}`);
      return `Failed to save data. Code: ${err.code}, message: ${err.message}`;
    }
  }

  public static async readData(): Promise<string> {
    try {
      const startTime = 1698040800000; // 2023-10-23 14:00:00
      const endTime = 1698042600000; // 2023-10-23 14:30:00

      const sequenceReadRequest: healthStore.ExerciseSequenceReadRequest = {
        startTime: startTime,
        endTime: endTime,
        exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
        readOptions: {
          withDetails: true,
        }
      };

      const runningSequences =
        await healthStore.readData<healthStore.exerciseSequenceHelper.running.Model>(sequenceReadRequest);
      hilog.info(0x0000, 'testTag', 'Succeeded in reading data.');
      let result: string = 'Succeeded in reading data.\n';
      runningSequences.forEach((runningSequence) => {
        hilog.info(0x0000, 'testTag', `the start time is ${runningSequence.startTime}.`);
        hilog.info(0x0000, 'testTag', `the end time is ${runningSequence.endTime}.`);
        result += `the start time is ${runningSequence.startTime}.` + '\n' + `the end time is ${runningSequence.endTime}.` + '\n';
        Object.keys(runningSequence.summaries).forEach((key) => {
          Object.keys(runningSequence.summaries[key]).forEach((fieldName) => {
            result += `the summaries of ${key} field ${fieldName} is ${runningSequence.summaries[key][fieldName]}.` + '\n';
            hilog.info(0x0000, 'testTag', `the summaries of ${key} field ${fieldName} is ${runningSequence.summaries[key][fieldName]}.`);
          });
        });
      });
      return result;
    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to read data. Code: ${err.code}, message: ${err.message}`);
      return `Failed to read data. Code: ${err.code}, message: ${err.message}`;
    }
  }

  public static async deleteByRequest(): Promise<string> {
    try {
      let exerciseSequenceDeleteRequest: healthStore.ExerciseSequenceDeleteRequest= {
        exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
        startTime: 1698040800000,
        endTime: 1698042600000
      };
      await healthStore.deleteData(exerciseSequenceDeleteRequest);
      hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
      return 'Succeeded in deleting data.';
    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
      return `Failed to delete data. Code: ${err.code}, message: ${err.message}`;
    }
  }

  public static async deleteByExerciseSequence(): Promise<string> {
    try {
      if (!ExerciseSequenceManagement.dataSourceId) {
        await ExerciseSequenceManagement.initDataSourceId();
      }

      const startTime = 1698040800000; // 2023-10-23 14:00:00
      const endTime = 1698042600000; // 2023-10-23 14:30:00

      const runningSequence: healthStore.exerciseSequenceHelper.running.Model = {
        dataType: healthStore.exerciseSequenceHelper.DATA_TYPE,
        dataSourceId: ExerciseSequenceManagement.dataSourceId,
        startTime: startTime, // 2023-10-23 14:00:00
        endTime: endTime, // 2023-10-23 14:30:00
        localDate: DateUtil.parseYyyyMmDdToDate(DateUtil.getYyyyMmDd(1698040800000)),
        timeZone: '+0800',
        modifiedTime: new Date().getTime(),

        exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
        duration: 1800,
        summaries: {
          distance: {
            totalDistance: 0
          },
          calorie: {
            totalCalories: 0
          },
          speed: {
            avg: 0,
            max: 0
          }
        }
      };

      await healthStore.deleteData(runningSequence);
      hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
      return 'Succeeded in deleting data.';
    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
      return `Failed to delete data. Code: ${err.code}, message: ${err.message}`;
    }
  }

  private static async initDataSourceId(): Promise<void> {
    try {
      const request: healthStore.DataSourceReadRequest = {
        deviceUniqueId: 'deviceUuid_test'
      }
      let res: healthStore.DataSource[] = await healthStore.readDataSource(request);
      if (res) {
        ExerciseSequenceManagement.dataSourceId = res[0]?.dataSourceId;
        hilog.info(0x0000, 'testTag', `Succeeded in reading dataSource, the dataSourceId is ${ExerciseSequenceManagement.dataSourceId}.`);
      }

      if (!ExerciseSequenceManagement.dataSourceId) {
        const dataSource: healthStore.DataSourceBase = {
          deviceInfo: {
            uniqueId: 'deviceUuid_test',
            name: `testDevice`,
            category: healthStore.DeviceCategory.SMART_PHONE,
            productId: `0554`,
            model: `lotana`,
            manufacturer: `HUAWEI`,
            mac: `testDeviceMac`,
            sn: `testDeviceSn`,
            hardwareVersion: `1`,
            softwareVersion: `2`,
            firmwareVersion: `3`
          }
        }

        let res: string = await healthStore.insertDataSource(dataSource);
        ExerciseSequenceManagement.dataSourceId = res;
        hilog.info(0x0000, 'testTag', `Succeeded in inserting dataSource, the dataSourceId is ${res}.`);
      }

    } catch (err) {
      hilog.error(0x0000, 'testTag', `Failed to initDataSourceId. Code: ${err.code}, message: ${err.message}`);
    }
  }
}