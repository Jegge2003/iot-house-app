
import { XAndY, XYAndZ } from "@itwin/core-geometry"; //@ts-ignore no-unused-vars
import { BeButtonEvent, Marker, IModelApp } from "@itwin/core-frontend";
import { DeviceData } from "../apis/DeviceStatusApi";


export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _elementId: string;

  // Override the default constructor to include smart device information
  constructor(
    location: XYAndZ,
    size: XAndY,
    smartDeviceId: string,
    smartDeviceType: string,
    federatedData: DeviceData, // passing in the cloud data through the constructor
    elementId: string, 
  ) {
    // Call base class constructor
    super(location, size);

    // Move all the code from the challenge into the new class
    this._smartDeviceId = smartDeviceId;
    // this.title = smartDeviceId;
    this.setImageUrl(`${smartDeviceType}.png`);
    // this.label = smartDeviceType;
    // this.labelOffset = { x: 0, y: 30 };    
    this.title = this.populateTitle (smartDeviceId, federatedData);
    this._elementId = elementId;
  }

  private populateTitle (smartDeviceId: string, federatedData: DeviceData) {
    // Iterate through the cloud data object to create a row  for each data entry
    let smartTable = "";
    for (const [key, value] of Object.entries (federatedData)) {
      smartTable += `
          <tr>
              <td>${key}</td>
              <td>${value}</td>
          </tr>
      `;
    };

    const smartTableDiv = document.createElement ("div");
    smartTableDiv.className = "smart-table"; // Now our table will look awesome!

    // Nicely formatted HTML...
    smartTableDiv.innerHTML = `
        <h3>${smartDeviceId}</h3>
        <table>
            ${smartTable}
        </table>
    `;
    
    return smartTableDiv;
  }

  public onMouseButton (_ev: BeButtonEvent) : boolean {
    // if mouse button is down, do nothing!
    if (!_ev.isDown) return true;

    const viewport = IModelApp.viewManager.selectedView;
    if (viewport)
      viewport.zoomToElements (this._elementId);

    // our new Marker event
        return true;
  }
}