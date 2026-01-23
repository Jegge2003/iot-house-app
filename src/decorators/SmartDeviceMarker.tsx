import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { Marker } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {
    // Override the default constructor to include smart device information
    constructor(location: XYAndZ, size: XAndY, smartDeviceId: string, smartDeviceType: string) {
        // Call base class constructor
        super(location, size);

        // Move all the code from the challenge into the new class
        this.title = smartDeviceId;
        this.setImageUrl("./SmartDevice.svg");
        this.label = smartDeviceType;
        this.labelOffset = { x: 0, y: 30 };
    }
}