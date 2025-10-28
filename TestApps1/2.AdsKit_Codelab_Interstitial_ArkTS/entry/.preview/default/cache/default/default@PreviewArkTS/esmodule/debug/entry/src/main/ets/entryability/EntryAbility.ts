import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'testTag', 'Ability onCreate');
        this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // When the main window is created, set a main page for this ability.
        hilog.info(0x0000, 'testTag', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', `Failed to load the content. Cause: ${JSON.stringify(err)}`);
                return;
            }
            hilog.info(0x0000, 'testTag', `Succeeded in loading the content. Data: ${JSON.stringify(data)}`);
        });
    }
    onWindowStageDestroy(): void {
        // When the main window is destroyed, free up UI-related resources.
        hilog.info(0x0000, 'testTag', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        // The ability has been brought to the foreground.
        hilog.info(0x0000, 'testTag', 'Ability onForeground');
    }
    onBackground(): void {
        // The ability has returned to the background.
        hilog.info(0x0000, 'testTag', 'Ability onBackground');
    }
}
