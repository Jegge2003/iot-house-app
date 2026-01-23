import { IModelDataApi, SmartDevice } from "../apis/IModelDataApi";
import { DecorateContext, Decorator, Marker } from "@itwin/core-frontend";

export class SmartDeviceDecorator implements Decorator {
    private _markers: Marker[];

    constructor () {
        // Initialize the markers
        this._markers = [];
        this.addMarkers ();
    }

    private async addMarkers() {
        // Fetch the data from the iModel
        const devices: SmartDevice [] = await IModelDataApi.getSmartDevices ();

        // Create a new marker for each of the devices
        devices.forEach ((device) => {
            const marker = new Marker (
                { x: device.origin.x, y: device.origin.y, z: device.origin.z},
                { x: 50, y: 50},
            );
            marker.label = device.smartDeviceId;
            this._markers.push (marker) // within the devices array loop
        });
    }

    public decorate (context: DecorateContext): void {
        /* This is where we draw! */
        this._markers.forEach (marker => {
            marker.addDecoration (context);
        });
    } 
}