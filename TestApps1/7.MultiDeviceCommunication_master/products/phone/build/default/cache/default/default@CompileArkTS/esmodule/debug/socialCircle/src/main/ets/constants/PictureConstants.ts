import { PictureArrayInterface } from "@bundle:com.example.multdevicecommunication/phone@socialCircle/ets/viewmodel/CommonViewModel";
export class PictureConstants {
    static readonly ICON_BORDER_RADIUS = 6;
    static readonly USER_NAME = { "id": 50331900, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly USER_MESSAGE = { "id": 50331899, "type": 10003, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" };
    static readonly COLUMNS_TEMPLATE = '1fr 1fr 1fr';
    static readonly TEMPLATE_BUSINESS = '1fr';
    static readonly MAX_COLUMN_NUM = 3;
}
function getSocialCircleList(): PictureArrayInterface[] {
    const pictures: Resource[] = [
        { "id": 50331890, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331891, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331892, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331893, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331894, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331895, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331896, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331897, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" },
        { "id": 50331898, "type": 20000, params: [], "bundleName": "com.example.multdevicecommunication", "moduleName": "phone" }
    ];
    const socialCircleList: PictureArrayInterface[] = new Array(9).fill(1)
        .map((item: number, index: number): PictureArrayInterface => {
        return new PictureArrayInterface(pictures.slice(0, index + 1));
    });
    return socialCircleList;
}
export default getSocialCircleList;
