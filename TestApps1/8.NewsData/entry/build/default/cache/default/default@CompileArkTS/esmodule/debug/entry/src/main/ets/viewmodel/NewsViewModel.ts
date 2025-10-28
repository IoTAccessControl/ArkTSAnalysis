import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { NewsData } from './NewsData';
import type NewsTypeModel from './NewsTypeModel';
import { httpRequestGet } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/HttpUtil";
import Logger from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/Logger";
import type ResponseResult from './ResponseResult';
class NewsViewModel {
    // Obtain the news type list from the server.
    getNewsTypeList(): Promise<NewsTypeModel[]> {
        return new Promise((resolve: Function, reject: Function) => {
            let url = `${Const.SERVER}/${Const.GET_NEWS_TYPE}`;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    reject(Const.TabBars_DEFAULT_NEWS_TYPES);
                }
            }).catch(() => {
                reject(Const.TabBars_DEFAULT_NEWS_TYPES);
            });
        });
    }
    // Obtain the default news type list.
    getDefaultTypeList(): NewsTypeModel[] {
        return Const.TabBars_DEFAULT_NEWS_TYPES;
    }
    // Obtain the news list from the server.
    getNewsList(currentPage: number, pageSize: number, path: string): Promise<NewsData[]> {
        return new Promise(async (resolve: Function, reject: Function) => {
            let url = `${Const.SERVER}/${path}`;
            url += '?currentPage=' + currentPage + '&pageSize=' + pageSize;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    Logger.error('getNewsList failed', JSON.stringify(data));
                    reject({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                }
            }).catch((err: Error) => {
                Logger.error('getNewsList failed', JSON.stringify(err));
                reject({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            });
        });
    }
}
let newsViewModel = new NewsViewModel();
export default newsViewModel as NewsViewModel;
