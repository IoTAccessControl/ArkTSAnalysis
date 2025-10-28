import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
import type { NewsData } from '../../viewmodel/NewsData';
import type NewsModel from '../../viewmodel/NewsModel';
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
export function touchMoveLoadMore(that: NewsModel, event: TouchEvent) {
    if (that.endIndex === that.newsData.length - 1 || that.endIndex === that.newsData.length) {
        that.offsetY = event.touches[0].y - that.downY;
        if (Math.abs(that.offsetY) > uiContext!.vp2px(that.pullUpLoadHeight) / 2) {
            that.isCanLoadMore = true;
            that.isVisiblePullUpLoad = true;
            that.offsetY = -uiContext!.vp2px(that.pullUpLoadHeight) + that.offsetY * Const.Y_OFF_SET_COEFFICIENT;
        }
    }
}
export function touchUpLoadMore(that: NewsModel) {
    let self = that;
    uiContext!.animateTo({
        duration: Const.ANIMATION_DURATION,
    }, () => {
        self.offsetY = 0;
    });
    if ((self.isCanLoadMore === true) && (self.hasMore === true)) {
        self.isLoading = true;
        setTimeout(() => {
            closeLoadMore(that);
            NewsViewModel.getNewsList(self.currentPage, self.pageSize, Const.GET_NEWS_LIST).then((data: NewsData[]) => {
                if (data.length === self.pageSize) {
                    self.currentPage++;
                    self.hasMore = true;
                }
                else {
                    self.hasMore = false;
                }
                self.newsData = self.newsData.concat(data);
            }).catch((err: string | Resource) => {
                uiContext!.getPromptAction().showToast({ message: err });
            });
        }, Const.DELAY_TIME);
    }
    else {
        closeLoadMore(self);
    }
}
export function closeLoadMore(that: NewsModel) {
    that.isCanLoadMore = false;
    that.isLoading = false;
    that.isVisiblePullUpLoad = false;
}
