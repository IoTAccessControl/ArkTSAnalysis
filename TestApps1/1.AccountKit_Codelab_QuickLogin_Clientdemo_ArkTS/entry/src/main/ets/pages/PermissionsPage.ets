/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2025. All rights reserved.
 */
import media from '@ohos.multimedia.media';
import audio from '@ohos.multimedia.audio';
import prompt from '@ohos.promptAction';
import common from '@ohos.app.ability.common';
import commonEventManager from '@ohos.commonEventManager';
import fs from '@ohos.file.fs';
import window from '@ohos.window';
//import image from '@ohos.multimedia.image';
import screenshot from '@ohos.screenshot';
import type { BusinessError } from '@kit.BasicServicesKit';
import { camera as cameraKit, cameraPicker } from '@kit.CameraKit';
import { fileIo, fileUri } from '@kit.CoreFileKit';
import { image } from '@kit.ImageKit';
import { camera, cameraPicker as picker } from '@kit.CameraKit';

interface ShootingResources {
  cameraInput?: camera.CameraInput;
  previewOutput?: camera.PreviewOutput;
  photoOutput?: camera.PhotoOutput;
  photoSession?: camera.PhotoSession;
}

const resources: ShootingResources = {};

@Component
export struct PermissionsPage {
  logTag: string = 'PermissionsPage';
  domainId: number = 0x0000;
  private audioRecorder: media.AudioRecorder | null = null;
  private avRecorder: media.AVRecorder | null = null;
  private audioCapturer: audio.AudioCapturer | null = null;
  private cameraManager: camera.CameraManager | null = null;
  private cameraInput: camera.CameraInput | null = null;
  private photoOutput: camera.PhotoOutput | null = null;
  @State isRecording: boolean = false;
  @State isAVRecording: boolean = false;
  @State isAudioCapturing: boolean = false;
  @State isScreenRecording: boolean = false;
  @State isCameraOpened: boolean = false;
  context: common.UIAbilityContext | null = null;
  @State imageUri: string = '';
  @State imgSrc: string = '';
  @State videoSrc: string = '';
  xComponentController: XComponentController = new XComponentController();
  aboutToAppear() {
    // 获取上下文
    this.context = getContext(this) as common.UIAbilityContext;

  }

  // Show toast message
  showToast(message: string) {
    prompt.showToast({
      message: message,
      duration: 2000
    });
  }

  // 本地录音 - AudioRecorder
  startAudioRecording() {
    try {
      // 如果已经在录音，先停止
      if (this.isRecording && this.audioRecorder) {
        this.stopAudioRecording();
        return;
      }

      if (!this.context) {
        this.showToast('无法获取上下文');
        return;
      }

      // 创建录音文件路径
      let cacheDir = this.context.cacheDir;
      let audioFile = cacheDir + '/audio_record_' + new Date().getTime() + '.m4a';

      // 创建AudioRecorder实例
      this.audioRecorder = media.createAudioRecorder();
      console.info(`${this.logTag}: AudioRecorder created`);

      // 创建录音配置
      const audioConfig: media.AudioRecorderConfig = {
        audioEncoderMime: media.CodecMimeType.AUDIO_AAC,
        audioSampleRate: 44100,
        fileFormat: media.ContainerFormatType.CFT_MPEG_4,
        uri: 'file://' + audioFile
      };

      // 准备录音
      this.audioRecorder.prepare(audioConfig);

      // 开始录音
      this.audioRecorder.start();

      this.isRecording = true;
      this.showToast('开始录音，录音文件将保存到：' + audioFile);
      console.info(`${this.logTag}: Recording started. File: ${audioFile}`);
    } catch (err) {
      console.error(`${this.logTag}: Error in AudioRecorder: ${JSON.stringify(err)}`);
      this.showToast('AudioRecorder 错误: ' + JSON.stringify(err));
    }
  }

  // 停止录音
  stopAudioRecording() {
    if (!this.audioRecorder || !this.isRecording) {
      return;
    }

    try {
      // 停止录音
      this.audioRecorder.stop();

      this.showToast('录音已停止并保存');
      console.info(`${this.logTag}: Recording stopped`);

      this.isRecording = false;

      // 释放资源
      this.audioRecorder.release();
      this.audioRecorder = null;
    } catch (err) {
      console.error(`${this.logTag}: Error stopping AudioRecorder: ${JSON.stringify(err)}`);
      this.showToast('停止录音错误: ' + JSON.stringify(err));
    }
  }

  // 本地录音 - AVRecorder
  startAVRecording() {
    try {
      // 如果已经在录制，先停止
      if (this.isAVRecording && this.avRecorder) {
        this.stopAVRecording();
        return;
      }

      if (!this.context) {
        this.showToast('无法获取上下文');
        return;
      }

      // 创建录制文件路径
      let cacheDir = this.context.cacheDir;
      let videoFile = cacheDir + '/av_record_' + new Date().getTime() + '.mp4';

      // 创建AVRecorder实例
      const avRecorderPromise = media.createAVRecorder();
      avRecorderPromise.then((recorder) => {
        this.avRecorder = recorder;
        console.info(`${this.logTag}: AVRecorder created`);

        // 创建AVRecorder配置
        const avProfile: media.AVRecorderProfile = {
          audioBitrate: 48000,
          audioChannels: 2,
          audioSampleRate: 44100,
          videoFrameRate: 30,
          videoFrameWidth: 640,
          videoFrameHeight: 480,
          fileFormat: media.ContainerFormatType.CFT_MPEG_4
        };

        // 创建录制配置
        const avConfig: media.AVRecorderConfig = {
          audioSourceType: media.AudioSourceType.AUDIO_SOURCE_TYPE_MIC,
          videoSourceType: media.VideoSourceType.VIDEO_SOURCE_TYPE_SURFACE_YUV,
          profile: avProfile,
          url: 'file://' + videoFile
        };

        // 准备录制
        this.avRecorder.prepare(avConfig);

        // 开始录制
        this.avRecorder.start();

        this.isAVRecording = true;
        this.showToast('开始录制音视频，文件将保存到：' + videoFile);
        console.info(`${this.logTag}: AVRecording started. File: ${videoFile}`);
      }).catch((err: Error) => {
        console.error(`${this.logTag}: Failed to create AVRecorder: ${err.message}`);
        this.showToast('创建AVRecorder失败: ' + err.message);
      });
    } catch (err) {
      console.error(`${this.logTag}: Error in AVRecorder: ${JSON.stringify(err)}`);
      this.showToast('AVRecorder 错误: ' + JSON.stringify(err));
    }
  }

  // 停止AVRecorder录制
  stopAVRecording() {
    if (!this.avRecorder || !this.isAVRecording) {
      return;
    }

    try {
      // 停止录制
      this.avRecorder.stop();

      this.showToast('录制已停止并保存');
      console.info(`${this.logTag}: AVRecording stopped`);

      this.isAVRecording = false;

      // 释放资源
      this.avRecorder.release();
      this.avRecorder = null;
    } catch (err) {
      console.error(`${this.logTag}: Error stopping AVRecorder: ${JSON.stringify(err)}`);
      this.showToast('停止录制错误: ' + JSON.stringify(err));
    }
  }

  // 本地录音 - AudioCapturer
  startAudioCapturing() {
    try {
      // 如果已经在采集，先停止
      if (this.isAudioCapturing && this.audioCapturer) {
        this.stopAudioCapturing();
        return;
      }

      // 创建音频采集配置
      const audioCapturerOptions: audio.AudioCapturerOptions = {
        streamInfo: {
          samplingRate: audio.AudioSamplingRate.SAMPLE_RATE_44100,
          channels: audio.AudioChannel.CHANNEL_2,
          sampleFormat: audio.AudioSampleFormat.SAMPLE_FORMAT_S16LE,
          encodingType: audio.AudioEncodingType.ENCODING_TYPE_RAW
        },
        capturerInfo: {
          source: audio.SourceType.SOURCE_TYPE_MIC,
          capturerFlags: 0
        }
      };

      // 创建AudioCapturer实例
      const audioCapturerPromise = audio.createAudioCapturer(audioCapturerOptions);
      audioCapturerPromise.then((capturer) => {
        this.audioCapturer = capturer;
        console.info(`${this.logTag}: AudioCapturer created`);

        // 开始采集
        this.audioCapturer.start();

        this.isAudioCapturing = true;
        this.showToast('开始音频采集');
        console.info(`${this.logTag}: AudioCapturing started`);

        // 监听采集状态
        this.audioCapturer.on('stateChange', (state: audio.AudioState) => {
          console.info(`${this.logTag}: AudioCapturer state changed: ${state}`);
        });
      }).catch((err: Error) => {
        console.error(`${this.logTag}: Failed to create AudioCapturer: ${err.message}`);
        this.showToast('创建音频采集器失败: ' + err.message);
      });
    } catch (err) {
      console.error(`${this.logTag}: Error in AudioCapturer: ${JSON.stringify(err)}`);
      this.showToast('AudioCapturer 错误: ' + JSON.stringify(err));
    }
  }

  // 停止AudioCapturer采集
  stopAudioCapturing() {
    if (!this.audioCapturer || !this.isAudioCapturing) {
      return;
    }

    try {
      // 停止采集
      this.audioCapturer.stop();

      this.showToast('音频采集已停止');
      console.info(`${this.logTag}: AudioCapturing stopped`);

      this.isAudioCapturing = false;

      // 释放资源
      this.audioCapturer.release();
      this.audioCapturer = null;
    } catch (err) {
      console.error(`${this.logTag}: Error stopping AudioCapturer: ${JSON.stringify(err)}`);
      this.showToast('停止音频采集错误: ' + JSON.stringify(err));
    }
  }

  /*
    // 接收短信
    subscribeSMS() {
      try {
        if (!this.context) {
          this.showToast('无法获取上下文');
          return;
        }

        // 1. 设置订阅信息
        const subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
          events: ['usual.event.SMS_RECEIVE']
        };

        // 2. 创建订阅者
        commonEventManager.createSubscriber(subscribeInfo, (err, subscriber) => {
          if (err) {
            console.error(`${this.logTag}: Failed to create subscriber: ${JSON.stringify(err)}`);
            this.showToast(`创建订阅者失败: ${err.code}, ${err.message}`);
            return;
          }

          // 3. 订阅事件
          commonEventManager.subscribe(subscriber, (err, data) => {
            if (err) {
              console.error(`${this.logTag}: Failed to subscribe to SMS event: ${JSON.stringify(err)}`);
              this.showToast(`订阅短信失败: ${err.code}, ${err.message}`);
            } else {
              const message = data.data;
              console.info(`${this.logTag}: SMS received: ${message}`);
              this.showToast(`收到短信: ${message}`);
            }
          });
        this.showToast('正在监听短信接收事件...');
          console.info(`${this.logTag}: SMS subscription successful.`);
        });
      } catch (err) {
        console.error(`${this.logTag}: Error in SMS subscription: ${JSON.stringify(err)}`);
        this.showToast('短信订阅错误: ' + JSON.stringify(err));
      }
    }
  */
  //截屏
  async takeScreenshot() {
    let captureOption: screenshot.CaptureOption = {
      "displayId": 0
    };
    try {
      let promise = screenshot.capture(captureOption);
      promise.then((pixelMap: image.PixelMap) => {
        console.log('Succeeded in saving screenshot. Pixel bytes number: ' + pixelMap.getPixelBytesNumber());
        pixelMap.release(); // PixelMap使用完后及时释放内存
      }).catch((err: BusinessError) => {
        console.log('Failed to save screenshot. Code: ' + JSON.stringify(err));
      });
    } catch (exception) {
      console.error('Failed to save screenshot. Code: ' + JSON.stringify(exception));
    }
    ;
  }

  /**
   async takeScreenshot() {
   let screenshotOptions: screenshot.ScreenshotOptions = {
   "screenRect": ({
   "left": 200,
   "top": 100,
   "width": 200,
   "height": 200
   } as GeneratedObjectLiteralInterface_1),
   "imageSize": ({
   "width": 300,
   "height": 300
   } as GeneratedObjectLiteralInterface_2),
   "rotation": 0,
   "displayId": 0,
   "isNotificationNeeded": true,
   "isCaptureFullOfScreen": true
   };
   try {
   let promise = screenshot.save(screenshotOptions);
   promise.then((pixelMap: image.PixelMap) => {
   console.log('Succeeded in saving screenshot. Pixel bytes number: ' + pixelMap.getPixelBytesNumber());
   pixelMap.release(); // Release the memory in time after the PixelMap is used.
   }).catch((err: BusinessError) => {
   console.log('Failed to save screenshot. Code: ' + JSON.stringify(err));
   });
   } catch (exception) {
   console.error('Failed to save screenshot. Code: ' + JSON.stringify(exception));
   };
   }
   */

  // 录屏
  startScreenRecording() {
    try {
      // 如果已经在录制，先停止
      if (this.isScreenRecording && this.avRecorder) {
        this.stopScreenRecording();
        return;
      }

      if (!this.context) {
        this.showToast('无法获取上下文');
        return;
      }

      // 创建录制文件路径
      let cacheDir = this.context.cacheDir;
      let videoFile = cacheDir + '/screen_record_' + new Date().getTime() + '.mp4';

      // 创建AVRecorder实例
      const avRecorderPromise = media.createAVRecorder();
      avRecorderPromise.then((recorder) => {
        this.avRecorder = recorder;
        console.info(`${this.logTag}: AVRecorder created for screen recording`);

        // 创建AVRecorder配置
        const avProfile: media.AVRecorderProfile = {
          audioBitrate: 48000,
          audioChannels: 2,
          audioSampleRate: 44100,
          videoFrameRate: 30,
          videoFrameWidth: 1280,
          videoFrameHeight: 720,
          fileFormat: media.ContainerFormatType.CFT_MPEG_4
        };

        // 创建录制配置 - 注意这里使用SURFACE_YUV作为视频源类型进行屏幕录制
        const avConfig: media.AVRecorderConfig = {
          audioSourceType: media.AudioSourceType.AUDIO_SOURCE_TYPE_MIC,
          videoSourceType: media.VideoSourceType.VIDEO_SOURCE_TYPE_SURFACE_YUV,
          profile: avProfile,
          url: 'file://' + videoFile
        };

        // 准备录制
        this.avRecorder.prepare(avConfig);

        // 开始录制
        this.avRecorder.start();

        this.isScreenRecording = true;
        this.showToast('开始录屏，录屏文件将保存到：' + videoFile);
        console.info(`${this.logTag}: Screen recording started. File: ${videoFile}`);
      }).catch((err: Error) => {
        console.error(`${this.logTag}: Failed to create AVRecorder for screen: ${err.message}`);
        this.showToast('创建录屏器失败: ' + err.message);
      });
    } catch (err) {
      console.error(`${this.logTag}: Error in screen recording: ${JSON.stringify(err)}`);
      this.showToast('录屏错误: ' + JSON.stringify(err));
    }
  }

  // 停止录屏
  stopScreenRecording() {
    if (!this.avRecorder || !this.isScreenRecording) {
      return;
    }

    try {
      // 停止录制
      this.avRecorder.stop();

      this.showToast('录屏已停止并保存');
      console.info(`${this.logTag}: Screen recording stopped`);

      this.isScreenRecording = false;

      // 释放资源
      this.avRecorder.release();
      this.avRecorder = null;
    } catch (err) {
      console.error(`${this.logTag}: Error stopping screen recording: ${JSON.stringify(err)}`);
      this.showToast('停止录屏错误: ' + JSON.stringify(err));
    }
  }

  createPickerProfile(context: Context): picker.PickerProfile {
    let pathDir = context.filesDir;
    let fileName = `${new Date().getTime()}`;
    let filePath = pathDir + `/${fileName}.tmp`;
    fileIo.createRandomAccessFileSync(filePath, fileIo.OpenMode.CREATE);

    let uri = fileUri.getUriFromPath(filePath);
    let pickerProfile: picker.PickerProfile = {
      cameraPosition: camera.CameraPosition.CAMERA_POSITION_BACK,
      saveUri: uri
    };
    return pickerProfile;
  }

  async getPickerResult(context: Context, pickerProfile: picker.PickerProfile): Promise<picker.PickerResult> {
    let result: picker.PickerResult =
      await picker.pick(context, [picker.PickerMediaType.PHOTO, picker.PickerMediaType.VIDEO],
        pickerProfile);
    console.info(`picker resultCode: ${result.resultCode},resultUri: ${result.resultUri},mediaType: ${result.mediaType}`);
    return result;
  }

  getContext(): Context | undefined {
    let uiContext: UIContext = this.getUIContext();
    let context: Context | undefined = uiContext.getHostContext();
    return context;
  }

  // 相机功能 - 打开相机
  async openCamera() {
    let context = this.getContext();
    if (context === undefined) {
      return;
    }
    let pickerProfile = this.createPickerProfile(context);
    let result = await this.getPickerResult(context, pickerProfile);
    if (result.resultCode == 0) {
      if (result.mediaType === picker.PickerMediaType.PHOTO) {
        this.imgSrc = result.resultUri;
      } else {
        this.videoSrc = result.resultUri;
      }
    }
  }

  // 相机功能 - 拍照
  // async takePhoto() {
  //   try {
  //     if (!this.context) {
  //       this.showToast('无法获取上下文');
  //       return;
  //     }
  //
  //     let pathDir = this.context.filesDir;
  //     let fileName = `${new Date().getTime()}`;
  //     let filePath = pathDir + `/${fileName}.tmp`;
  //     fileIo.createRandomAccessFile(filePath, fileIo.OpenMode.CREATE);
  //
  //     let uri = fileUri.getUriFromPath(filePath);
  //     let pickerProfile: cameraPicker.PickerProfile = {
  //       cameraPosition: cameraKit.CameraPosition.CAMERA_POSITION_BACK,
  //       saveUri: uri
  //     };
  //
  //     let result: cameraPicker.PickerResult =
  //       await cameraPicker.pick(this.context, [cameraPicker.PickerMediaType.PHOTO], pickerProfile);
  //     console.info(`${this.logTag}: picker resultCode: ${result.resultCode},resultUri: ${result.resultUri},mediaType: ${result.mediaType}`);
  //     if (result.resultCode == 0) {
  //       if (result.mediaType === cameraPicker.PickerMediaType.PHOTO) {
  //         this.imageUri = result.resultUri;
  //         this.showToast('拍照成功，照片已保存');
  //       }
  //     }
  //   } catch (err) {
  //     console.error(`${this.logTag}: Error in taking photo: ${JSON.stringify(err)}`);
  //     this.showToast('拍照错误: ' + JSON.stringify(err));
  //   }
  // }

  setPhotoOutputCb(photoOutput: camera.PhotoOutput): void {
    if (!photoOutput) {
      console.error('photoOutput is null');
      return;
    }
    //设置回调之后，调用photoOutput的capture方法，就会将拍照的buffer回传到回调中。
    photoOutput?.on('photoAvailable', (err: BusinessError, photo: camera.Photo): void => {
      console.info('getPhoto start');
      console.error(`err: ${err}`);
      if (err && err.code != 0) {
        console.error('getPhoto failed');
        return;
      }
      if (!photo || !photo.main) {
        console.error('photo is null');
        return;
      }
      let imageObj = photo.main;
      imageObj.getComponent(image.ComponentType.JPEG, (errCode: BusinessError, component: image.Component): void => {
        console.info('getComponent start');
        if (errCode && errCode.code != 0) {
          console.error('getComponent failed');
          imageObj.release();
          return;
        }
        let buffer: ArrayBuffer;
        if (component && component.byteBuffer) {
          buffer = component.byteBuffer;
        } else {
          console.error('byteBuffer is null');
          imageObj.release();
          return;
        }
        // 如需要在图库中看到所保存的图片、视频资源，请使用用户无感的安全控件创建媒体资源。

        // buffer处理结束后需要释放该资源，如果未正确释放资源会导致后续拍照获取不到buffer。
        imageObj.release();
      });
    });
  }

  async takePhoto(surfaceId: string): Promise<void> {
    try {
      // 创建CameraManager对象。
      let cameraManager: camera.CameraManager = camera.getCameraManager(this.context);
      if (!cameraManager) {
        console.error("camera.getCameraManager error");
        return;
      }
      // 监听相机状态变化。
      cameraManager.on('cameraStatus', (err: BusinessError, cameraStatusInfo: camera.CameraStatusInfo) => {
        if (err !== undefined && err.code !== 0) {
          console.error('cameraStatus with errorCode = ' + err.code);
          return;
        }
        console.info(`camera : ${cameraStatusInfo.camera.cameraId}`);
        console.info(`status: ${cameraStatusInfo.status}`);
      });

      // 获取相机列表。
      let cameraArray: Array<camera.CameraDevice> = cameraManager.getSupportedCameras();
      if (!cameraArray || cameraArray.length <= 0) {
        console.error("cameraManager.getSupportedCameras error");
        return;
      }

      for (let index = 0; index < cameraArray.length; index++) {
        console.info('cameraId : ' + cameraArray[index].cameraId); // 获取相机ID。
        console.info('cameraPosition : ' + cameraArray[index].cameraPosition); // 获取相机位置。
        console.info('cameraType : ' + cameraArray[index].cameraType); // 获取相机类型。
        console.info('connectionType : ' + cameraArray[index].connectionType); // 获取相机连接类型。
      }

      // 创建相机输入流。
      resources.cameraInput = cameraManager.createCameraInput(cameraArray[0]);
      if (!resources.cameraInput) {
        console.error('cameraInput is null');
        return;
      }

      // 监听cameraInput错误信息。
      let cameraDevice: camera.CameraDevice = cameraArray[0];
      resources.cameraInput.on('error', cameraDevice, (error: BusinessError) => {
        console.error(`Camera input error code: ${error.code}`);
      })

      // 打开相机。
      await resources.cameraInput.open();

      // 获取支持的模式类型。
      let sceneModes: Array<camera.SceneMode> = cameraManager.getSupportedSceneModes(cameraArray[0]);
      let isSupportPhotoMode: boolean = sceneModes.indexOf(camera.SceneMode.NORMAL_PHOTO) >= 0;
      if (!isSupportPhotoMode) {
        console.error('photo mode not support');
        this.releaseResources();
        return;
      }
      // 获取相机设备支持的输出流能力。
      let cameraOutputCap: camera.CameraOutputCapability =
        cameraManager.getSupportedOutputCapability(cameraArray[0], camera.SceneMode.NORMAL_PHOTO);
      if (!cameraOutputCap) {
        console.error("cameraManager.getSupportedOutputCapability error");
        return;
      }
      console.info("outputCapability: " + JSON.stringify(cameraOutputCap));

      let previewProfilesArray: Array<camera.Profile> = cameraOutputCap.previewProfiles;
      if (!previewProfilesArray || previewProfilesArray.length <= 0) {
        console.error("previewProfilesArray is null or []");
        this.releaseResources();
        return;
      }

      let photoProfilesArray: Array<camera.Profile> = cameraOutputCap.photoProfiles;
      if (!photoProfilesArray || photoProfilesArray.length <= 0) {
        console.error("photoProfilesArray is null or []");
        this.releaseResources();
        return;
      }

      // 创建预览输出流,其中参数 surfaceId 参考上文 XComponent 组件，预览流为XComponent组件提供的surface。
      resources.previewOutput = cameraManager.createPreviewOutput(previewProfilesArray[0], surfaceId);
      if (!resources.previewOutput) {
        console.error('previewOutput is null');
        this.releaseResources();
        return;
      }
      try {
        // 监听预览输出错误信息。
        resources.previewOutput.on('error', (error: BusinessError) => {
          console.error(`Preview output error code: ${error.code}`);
        });
      } catch (e) {
        console.error(`previewOutput.on call failed, error: ${JSON.stringify(e)}`);
      }

      // 创建拍照输出流。
      resources.photoOutput = cameraManager.createPhotoOutput(photoProfilesArray[0]);
      if (!resources.photoOutput) {
        console.error('photoOutput is null');
        this.releaseResources();
        return;
      }

      //调用上面的回调函数来保存图片。
      this.setPhotoOutputCb(resources.photoOutput);

      //创建会话。
      let photoSession = cameraManager.createSession(camera.SceneMode.NORMAL_PHOTO);
      if (!photoSession) {
        console.error('photoSession is null');
        this.releaseResources();
        return;
      }
      resources.photoSession = photoSession as camera.PhotoSession;
      try {
        // 监听session错误信息。
        resources.photoSession.on('error', (error: BusinessError) => {
          console.error(`Capture session error code: ${error.code}`);
        });
      } catch (e) {
        console.error(`photoSession.on call failed, error: ${JSON.stringify(e)}`);
      }

      // 开始配置会话。
      resources.photoSession.beginConfig();

      // 向会话中添加相机输入流。
      resources.photoSession.addInput(resources.cameraInput);

      // 向会话中添加预览输出流。
      resources.photoSession.addOutput(resources.previewOutput);

      // 向会话中添加拍照输出流。
      resources.photoSession.addOutput(resources.photoOutput);

      // 提交会话配置。
      await resources.photoSession.commitConfig();

      // 启动会话。
      await resources.photoSession.start()
      // 判断设备是否支持闪光灯。
      let flashStatus: boolean = false;
      flashStatus = resources.photoSession.hasFlash();
      console.info('Returned with the flash light support status:' + flashStatus);

      if (flashStatus) {
        // 判断是否支持自动闪光灯模式。
        let flashModeStatus: boolean = resources.photoSession.isFlashModeSupported(camera.FlashMode.FLASH_MODE_AUTO);
        if (flashModeStatus) {
          // 设置自动闪光灯模式。
          resources.photoSession.setFlashMode(camera.FlashMode.FLASH_MODE_AUTO);
        }
      }

      // 判断是否支持连续自动变焦模式。
      let focusModeStatus: boolean =
        resources.photoSession.isFocusModeSupported(camera.FocusMode.FOCUS_MODE_CONTINUOUS_AUTO);

      if (focusModeStatus) {
        // 设置连续自动变焦模式。
        resources.photoSession.setFocusMode(camera.FocusMode.FOCUS_MODE_CONTINUOUS_AUTO);
      }

      // 获取相机支持的可变焦距比范围。
      let zoomRatioRange: Array<number> = [];
      try {
        zoomRatioRange = resources.photoSession.getZoomRatioRange();
      } catch (error) {
        let err = error as BusinessError;
        console.error('Failed to get the zoom ratio range. errorCode = ' + err.code);
      }
      if (zoomRatioRange.length > 0) {
        // 设置可变焦距比。
        try {
          resources.photoSession.setZoomRatio(zoomRatioRange[0]);
        } catch (error) {
          let err = error as BusinessError;
          console.error('Failed to set the zoom ratio value. errorCode = ' + err.code);
        }
      }

      let photoCaptureSetting: camera.PhotoCaptureSetting = {
        quality: camera.QualityLevel.QUALITY_LEVEL_HIGH, // 设置图片质量高。
        rotation: camera.ImageRotation.ROTATION_0 // 设置图片旋转角度0。
      }
      // 使用当前拍照设置进行拍照。
      try {
        await resources.photoOutput.capture(photoCaptureSetting);
      } catch (error) {
        let err = error as BusinessError;
        console.error(`capture call failed, err: ${JSON.stringify(err)}`);
      }

      // 需要在拍照结束之后调用以下关闭相机和释放会话流程，避免拍照未结束就将会话释放。


      // 会话置空。
      resources.photoSession = undefined;
    } catch (error) {
      console.error(`cameraShootingCase call failed, error: ${JSON.stringify(error)}`);
      this.releaseResources();
    }
  }

  async releaseResources(): Promise<void> {
    // 停止当前会话。
    await resources.photoSession?.stop().catch((e: BusinessError) => {
      console.error('停止会话失败:', e)
    });

    // 释放相机输入流。
    await resources.cameraInput?.close().catch((e: BusinessError) => {
      console.error('关闭相机失败:', e)
    });

    // 释放预览输出流。
    await resources.previewOutput?.release().catch((e: BusinessError) => {
      console.error('停止预览流失败:', e)
    });

    // 释放拍照输出流。
    await resources.photoOutput?.release().catch((e: BusinessError) => {
      console.error('停止拍照流失败:', e)
    });

    // 释放会话。
    await resources.photoSession?.release().catch((e: BusinessError) => {
      console.error('释放会话失败:', e)
    });
  }

  build() {
    NavDestination() {
      Scroll() {
        Column() {
          Text('权限功能测试')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 20, bottom: 20 })
            .width('100%')
            .textAlign(TextAlign.Center)

          // 本地录音按钮组
          Column() {
            Text('本地录音')
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .margin({ top: 10, bottom: 10 })
              .width('100%')

            Button(this.isRecording ? '停止录音' : '录音 AudioRecorder')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor(this.isRecording ? '#FF5252' : '#007DFF')
              .onClick(() => {
                this.startAudioRecording();
              })

            Button(this.isAVRecording ? '停止录制' : '录音 AVRecorder')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor(this.isAVRecording ? '#FF5252' : '#007DFF')
              .onClick(() => {
                this.startAVRecording();
              })

            Button(this.isAudioCapturing ? '停止采集' : '录音 AudioCapturer')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor(this.isAudioCapturing ? '#FF5252' : '#007DFF')
              .onClick(() => {
                this.startAudioCapturing();
              })
          }
          .width('100%')
          .backgroundColor('#F1F3F5')
          .padding(10)
          .margin({ top: 5, bottom: 15 })
          .borderRadius(10)

          // 接收短信按钮
          /*
          Button('接收短信')
            .width('90%')
            .height(50)
            .margin({ top: 5, bottom: 5 })
            .backgroundColor('#4CAF50')
            .onClick(() => {
              this.subscribeSMS();
            })
          */

          // 截屏/录屏按钮组
          Column() {
            Text('屏幕捕获')
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .margin({ top: 10, bottom: 10 })
              .width('100%')

            Button('截屏')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor('#9C27B0')
              .onClick(() => {
                this.takeScreenshot();
              })

            Button(this.isScreenRecording ? '停止录屏' : '录屏')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor(this.isScreenRecording ? '#FF5252' : '#9C27B0')
              .onClick(() => {
                this.startScreenRecording();
              })
          }
          .width('100%')
          .backgroundColor('#F1F3F5')
          .padding(10)
          .margin({ top: 5, bottom: 15 })
          .borderRadius(10)

          // 相机功能按钮组
          Column() {
            Text('相机功能')
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .margin({ top: 10, bottom: 10 })
              .width('100%')

            Button('打开相机')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor('#FF9800')
              .onClick(() => {
                this.openCamera();
              })

            Button('拍照')
              .width('90%')
              .height(50)
              .margin({ top: 5, bottom: 5 })
              .backgroundColor('#FF9800')
              .onClick(() => {
                this.takePhoto(this.xComponentController.getXComponentSurfaceId());
              })

            if (this.imageUri) {
              Image(this.imageUri)
                .width('90%')
                .height(200)
                .margin({ top: 10 })
                .objectFit(ImageFit.Contain)
            }
          }
          .width('100%')
          .backgroundColor('#F1F3F5')
          .padding(10)
          .margin({ top: 5, bottom: 15 })
          .borderRadius(10)
        }
        .width('100%')
        .padding(15)
      }
      .scrollBar(BarState.Auto)
    }
    .backgroundColor('#FFFFFF')
    .title('权限测试')
  }
}