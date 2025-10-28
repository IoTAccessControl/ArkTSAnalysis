# Huawei Health Service Kit

## Description

This sample shows how to manage authorization and workout records using Huawei Health Service Kit.

The API to be called in the sample is **@kit.HealthServiceKit**.

## Preview

| **Home Screen**                     | **Authorization Management Screen**                        | **Workout Record Management Screen**                       |
|----------------------------------|------------------------------------|------------------------------------|
| ![avatar](./screenshots/img.png) | ![avatar](./screenshots/img_1.png) | ![avatar](./screenshots/img_2.png) |

## Configuring and Using the Sample App

### Configuring the Sample App in DevEco Studio

1. In [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html), [create a project](https://developer.huawei.com/consumer/en/doc/app/agc-help-createproject-0000001100334664) and under the project, [create an app](https://developer.huawei.com/consumer/en/doc/app/agc-help-createapp-0000001146718717).
2. [Apply for Huawei Health Service Kit](https://developer.huawei.com/consumer/en/doc/harmonyos-guides/health-apply-0000001770425225)
3. Open the sample app and replace the value of **bundleName** in the **AppScope\app.json5** file with the app package name specified in [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html).
4. Replace the value of **client_id** in the **entry\src\main\module.json5** file with the app's **client_id** configured in [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html).
5. Generate an SHA-256 signing certificate fingerprint and configure it for the app in [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html). For details about how to generate such a fingerprint, go to **Preparations** > **Configuring App Signature Information** in the *Health Service Kit Development Guide*.

#### Using the Sample App
1. Run the sample app. Touch the **Auth** button to access the authorization management screen. Touch **requestAuthorizations** to authorize or log in to the app. If you have not logged in to your device with a HUAWEI ID, the HUAWEI ID log-in screen will display. Log in to your HUAWEI ID, then the app authorization screen will display.
2. Go back to the home screen. Touch **ExerciseSequence** to start managing workout records.

## Project Directory
├─entry/src/main/ets         // Code area.  
│ ├─common  
│ │ ├─bean  
│ │ │ ├─AuthManagement.ets               // Authorization API.  
│ │ │ └─ExerciseSequenceManagement.ets  // Workout record API.  
│ │ ├─utils   
│ │ │ └─DateUtil.ets                     // Time utility class.  
│ ├─entryability                
│ │ └─EntryAbility.ets                    // Entry point class.  
│ ├─pages              
│ │ ├─MainIndex.ets                       // Home screen.  
│ │ ├─AuthIndex.ets                       // Authorization management screen.  
│ │ └─ExerciseSequenceIndex.ets           // Exercise record management screen.  
└─entry/src/main/resources                // Directory for storing resource files. 

## Implementation Details

Implement authorization-related features by referring to **AuthManagement.ets**.
* Call **AuthorizationRequest** to create an authorization request, pass the data types to read and write, and call **requestAuthorizations** to display the log-in/authorization screen.
* Call **AuthorizationRequest** to create a scope query request, pass the data types to read and write, and call **getAuthorizations** to check whether scopes are granted for reading or writing specific types of data.
* Call **cancelAuthorizations** to cancel the authorization.

Implement features related to workout record management by referring to **ExerciseSequenceManagement**.
* Construct an array with one or multiple data records and call **saveData** to save the data.
* Set data query conditions and call **readData** to read specific data.
* Set data deletion conditions and call **deleteData** to delete specific data.
* Specify an array with one or multiple data records and call **deleteData** to delete the array.

Reference
1. entry\src\main\ets\common\bean\AuthManagement.ets
2. entry\src\main\ets\common\bean\ExerciseSequenceManagement.ets

## Dependency

The device where the sample app runs must support Wi-Fi.

## Constraints

1. This sample code can only run on standard-system devices, which are Huawei phones and tablets.
2. Agree to the privacy policy in the Huawei Health app before you use the Huawei Health Service kit for the first time.
3. HarmonyOS: HarmonyOS NEXT Developer Beta1 or later
4. DevEco Studio: DevEco Studio NEXT Developer Beta1 or later
5. HarmonyOS SDK: HarmonyOS NEXT Developer Beta1 or later
