import Logger from "@bundle:com.example.webcookie/entry/ets/common/utils/Logger";
import { CommonConstants } from "@bundle:com.example.webcookie/entry/ets/common/constants/CommonConstant";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
/**
 * Pop up a message box.
 *
 * @param message Message.
 */
export function showDialog(message: ResourceStr): void {
    let newMessage = message.toString();
    if (newMessage.length > CommonConstants.SUB_LENGTH) {
        message = newMessage.substring(0, CommonConstants.SUB_LENGTH);
    }
    uiContext?.showAlertDialog({
        title: { "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" },
        message: message,
        confirm: {
            value: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.webcookie", "moduleName": "entry" },
            action: () => {
                Logger.info('Button-clicking callback');
            }
        },
        cancel: () => {
            Logger.info('Closed callbacks');
        }
    });
}
