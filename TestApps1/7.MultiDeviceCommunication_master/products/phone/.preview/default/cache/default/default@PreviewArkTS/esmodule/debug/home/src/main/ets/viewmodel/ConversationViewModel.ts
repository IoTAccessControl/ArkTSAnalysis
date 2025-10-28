import type Want from "@ohos:app.ability.Want";
import type common from "@ohos:app.ability.common";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { Logger } from "@bundle:com.example.multdevicecommunication/phone@base/Index";
interface ConversationDataInterface {
    name: Resource;
    msg: Resource;
    time: ResourceStr;
    icon: Resource;
}
;
const ConversationListData: ConversationDataInterface[] = [
    { name: { "id": 50331728, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: '13:55', icon: { "id": 50331713, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331729, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: '13:55', icon: { "id": 50331871, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331733, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: '12:00', icon: { "id": 50331891, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331733, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: '08:00', icon: { "id": 50331873, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331732, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331723, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331731, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331766, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331729, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331714, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331728, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331898, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331728, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331709, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331732, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331712, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331731, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331891, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
    { name: { "id": 50331743, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, msg: { "id": 50331750, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, time: { "id": 50331753, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }, icon: { "id": 50331713, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" } },
];
class ConversationViewModel {
    public startAppletAbility(uiContext: UIContext, context: common.UIAbilityContext, index: number): void {
        const want: Want = {
            bundleName: uiContext.getHostContext()!.applicationInfo.name,
            abilityName: 'AppletAbility',
            parameters: {
                position: index
            }
        };
        try {
            context.startAbility(want, (err: BusinessError) => {
                if (err.code) {
                    Logger.error(`startAbility failed, code is ${err.code}, message is ${err.message}`);
                }
            });
        }
        catch (error) {
            hilog.error(0x00004, 'ConversationViewModel', '%{public}s', error);
        }
    }
    public startDocumentAbility(uiContext: UIContext, context: common.UIAbilityContext, index: number): void {
        const want: Want = {
            bundleName: uiContext.getHostContext()!.applicationInfo.name,
            abilityName: 'DocumentAbility',
            parameters: {
                position: index
            }
        };
        try {
            context.startAbility(want, (err: BusinessError) => {
                if (err.code) {
                    Logger.error(`startAbility failed, code is ${err.code}, message is ${err.message}`);
                }
            });
        }
        catch (error) {
            Logger.error(`startAbility failed,  message is ${error}`);
        }
    }
}
export { ConversationListData, ConversationViewModel };
export type { ConversationDataInterface };
