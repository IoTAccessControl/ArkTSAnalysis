import UIAbility from "@ohos:app.ability.UIAbility";
import hilog from "@ohos:hilog";
import display from "@ohos:display";
import type { KeyboardAvoidMode as KeyboardAvoidMode } from "@ohos:arkui.UIContext";
import type window from "@ohos:window";
import type { BusinessError as BusinessError } from "@ohos:base";
import { BaseConstants, BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
import deviceInfo from "@ohos:deviceInfo";
export default class EntryAbility extends UIAbility {
    private windowObj?: window.Window;
    onCreate(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.getMainWindow((err: BusinessError<void>, data) => {
            this.windowObj = data;
            this.updateBreakpoint(this.windowObj.getWindowProperties().windowRect.width);
            this.windowObj.on('windowSizeChange', (windowSize: window.Size) => {
                this.updateBreakpoint(windowSize.width);
            });
            if (err.code) {
                hilog.info(0x0000, 'testTag', '%{public}s', 'getMainWindow failed');
                return;
            }
            if (deviceInfo.deviceType !== BaseConstants.DEVICE_2IN1) {
                data.setWindowLayoutFullScreen(true);
            }
        });
        windowStage.loadContent('pages/Index', (err, data) => {
            let a = windowStage.getMainWindowSync().getUIContext().getKeyboardAvoidMode();
            windowStage.getMainWindowSync().getUIContext().setKeyboardAvoidMode(0);
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    private updateBreakpoint(windowWidth: number): void {
        let windowWidthVp = windowWidth / display.getDefaultDisplaySync().densityPixels;
        let curBp: string = '';
        if (windowWidthVp < BreakpointConstants.BREAKPOINT_SCOPE[2]) {
            curBp = BreakpointConstants.BREAKPOINT_SM;
        }
        else if (windowWidthVp < BreakpointConstants.BREAKPOINT_SCOPE[3]) {
            curBp = BreakpointConstants.BREAKPOINT_MD;
        }
        else {
            curBp = BreakpointConstants.BREAKPOINT_LG;
        }
        AppStorage.setOrCreate('currentBreakpoint', curBp);
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
