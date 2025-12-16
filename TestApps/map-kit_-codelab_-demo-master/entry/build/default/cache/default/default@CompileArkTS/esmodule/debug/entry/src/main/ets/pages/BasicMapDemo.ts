if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BasicMapDemo_Params {
    mapOptions?: mapCommon.MapOptions;
    callback?: AsyncCallback<map.MapComponentController>;
    mapController?: map.MapComponentController;
}
import { MapComponent } from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/MapComponent";
import type mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
import type map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import type { AsyncCallback } from "@ohos:base";
class BasicMapDemo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.mapOptions = undefined;
        this.callback = undefined;
        this.mapController = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BasicMapDemo_Params) {
        if (params.mapOptions !== undefined) {
            this.mapOptions = params.mapOptions;
        }
        if (params.callback !== undefined) {
            this.callback = params.callback;
        }
        if (params.mapController !== undefined) {
            this.mapController = params.mapController;
        }
    }
    updateStateVars(params: BasicMapDemo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private mapOptions?: mapCommon.MapOptions;
    private callback?: AsyncCallback<map.MapComponentController>;
    private mapController?: map.MapComponentController;
    aboutToAppear(): void {
        // Map initialization parameters used to set the coordinates of the map center point and zoom level.
        let target: mapCommon.LatLng = {
            latitude: 39.9181,
            longitude: 116.3970193
        };
        let cameraPosition: mapCommon.CameraPosition = {
            target: target,
            zoom: 15
        };
        this.mapOptions = {
            position: cameraPosition
        };
        // Map initialization callback.
        this.callback = async (err, mapController) => {
            if (!err) {
                this.mapController = mapController;
                // Marker initialization parameters.
                let markerOptions: mapCommon.MarkerOptions = {
                    position: {
                        latitude: 39.9181,
                        longitude: 116.3970193
                    }
                };
                // Create a default marker icon.
                await this.mapController?.addMarker(markerOptions);
            }
        };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Call the MapComponent component to initialize the map.
                    MapComponent(this, { mapOptions: this.mapOptions, mapCallback: this.callback }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/BasicMapDemo.ets", line: 49, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mapOptions: this.mapOptions,
                            mapCallback: this.callback
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MapComponent" });
        }
        __Common__.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BasicMapDemo";
    }
}
registerNamedRoute(() => new BasicMapDemo(undefined, {}), "", { bundleName: "xxx.xxxx.xxxxx", moduleName: "entry", pagePath: "pages/BasicMapDemo", pageFullPath: "entry/src/main/ets/pages/BasicMapDemo", integratedHsp: "false", moduleType: "followWithHap" });
