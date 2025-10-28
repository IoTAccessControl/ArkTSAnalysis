import devCertMangerModel from '../model/DevCertManagerModel';
import common from '@ohos.app.ability.common';
import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { fileIo } from '@kit.CoreFileKit';
import { image } from '@kit.ImageKit';
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State message: string = '';
  @State devCertInfo: string = '';
  @State thumbnail: image.PixelMap | null = null;
  private context = getContext(this) as common.UIAbilityContext;


  async getPhotoAssets() {
    try {
      this.message = 'Fetching photo assets...';
      const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE;
      photoSelectOptions.maxSelectNumber = 10;
      const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      const result = await photoViewPicker.select(photoSelectOptions);
      this.message = `Successfully selected ${result.photoUris.length} assets.`;
    } catch (e) {
      const err = e as BusinessError;
      this.message = `Error: (${err.code}) ${err.message}`;
    }
  }

  async getImageReadOnly() {
    try {
      this.message = 'Selecting image...';
      const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
      photoSelectOptions.maxSelectNumber = 1;
      const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      const result = await photoViewPicker.select(photoSelectOptions);
      
      if (result.photoUris.length > 0) {
        const uri = result.photoUris[0];
        this.message = `Image selected: ${uri}\n\nOpening file...`;
        const file = await fileIo.open(uri, fileIo.OpenMode.READ_ONLY);
        this.message = `File opened successfully. FD: ${file.fd}`;
        await fileIo.close(file);
      } else {
        this.message = 'No image selected.';
      }
    } catch (e) {
      const err = e as BusinessError;
      this.message = `Error: (${err.code}) ${err.message}`;
    }
  }

  async getThumbnail() {
    try {
      this.message = 'Selecting image for thumbnail...';
      const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
      photoSelectOptions.maxSelectNumber = 1;
      const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      const selectResult = await photoViewPicker.select(photoSelectOptions);

      if (selectResult.photoUris.length > 0) {
        const uri = selectResult.photoUris[0];
        this.message = `Image selected: ${uri}\n\nCreating image source...`;
        const imageSource = image.createImageSource(uri);
        this.message = 'Image source created, decoding thumbnail...';
        const decodingOptions: image.DecodingOptions = {
          desiredSize: { width: 128, height: 128 }
        };
        const pixelMap: image.PixelMap = await imageSource.createPixelMap(decodingOptions);
        this.thumbnail = pixelMap;
        this.message = 'Thumbnail decoded successfully.';
      } else {
        this.message = 'No image selected.';
      }
    } catch (e) {
      const err = e as BusinessError;
      this.message = `Error: (${err.code}) ${err.message}`;
    }
  }

  async getAlbumImages() {
    try {
      this.message = 'Selecting album images...';
      const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
      photoSelectOptions.maxSelectNumber = 10;
      const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      const result = await photoViewPicker.select(photoSelectOptions);
      this.message = `Successfully selected ${result.photoUris.length} images from album.`;
    } catch (e) {
      const err = e as BusinessError;
      this.message = `Error: (${err.code}) ${err.message}`;
    }
  }

  async getAudio() {
    try {
      this.message = 'Selecting audio...';
      const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.VIDEO_TYPE; // Closest equivalent
      photoSelectOptions.maxSelectNumber = 5;
      const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      const result = await photoViewPicker.select(photoSelectOptions);
      this.message = `Successfully selected ${result.photoUris.length} audio files.`;
    } catch (e) {
      const err = e as BusinessError;
      this.message = `Error: (${err.code}) ${err.message}`;
    }
  }

  build() {
    Column() {
      Text($r('app.string.media_access_title'))
        .width('100%')
        .height(50)
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .textAlign(TextAlign.Center)
        .margin({ top: 10 })


      if (this.thumbnail) {
        Image(this.thumbnail)
          .width(100)
          .height(100)
          .margin(10)
      }

      Scroll() {
        Column() {
          Button('Get Photo and Video Assets')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getPhotoAssets();
            })

          Button('Get Image (ReadOnly FD)')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getImageReadOnly();
            })
            
          Button('Get Thumbnail')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getThumbnail();
            })

          Button('Get Album Images')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getAlbumImages();
            })

          Button('Get Images (userFileManager)')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getAlbumImages(); // Reusing album image selection
            })

          Button('Get Audio')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getAudio();
            })

          Button('Get Album Images (userFileManager)')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getAlbumImages(); // Reusing album image selection
            })

          Button('Get Thumbnail (privateAlbum)')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getThumbnail(); // Reusing thumbnail generation
            })

          Button('Get Thumbnail (fileAssets)')
            .width('90%')
            .height(50)
            .margin({ top: 10 })
            .onClick(() => {
              this.getThumbnail(); // Reusing thumbnail generation
            })

          Button('GetDeviceToken')
            .width('90%')
            .height(50)
            .margin({ top: 10, bottom: 10 })
          .onClick(() => {
            devCertMangerModel.displayDeviceToken((result: string) => {
              this.devCertInfo = result;
                this.message = `Device token: ${result}`;
              })
            })
          Button('UserInfo')
            .width('90%')
            .height(50)
            .margin({ top: 10, bottom: 10 })
            .onClick(() => {
              router.pushUrl({ url: './UserInfo' });
            })
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)

      Text(this.message)
        .width('90%')
        .backgroundColor(Color.White)
        .padding(10)
        .border({ width: 1, color: Color.Gray, radius: 8 })
        .margin({ top: 10, bottom: 10 })
        .textAlign(TextAlign.Start)
    }
    .height('100%')
    .backgroundColor($r('sys.color.ohos_toggle_bg'))
    .padding(16)
  }
}