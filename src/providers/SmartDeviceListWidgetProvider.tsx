import React, { useEffect, useState } from "react";
import {
  UiItemsProvider,
  StagePanelLocation,
  StagePanelSection,
  WidgetState,
  Widget
} from "@itwin/appui-react";
import { IModelDataApi, SmartDevice } from "../apis/IModelDataApi"; // method from previous lesson
import { IModelApp, StandardViewId } from "@itwin/core-frontend";

export const SmartDeviceListWidget = () => {
  const [smartDevices, setSmartDevices] = useState<SmartDevice[]>([]); // variable for storing Smart Device list

  useEffect(() => {
    IModelDataApi.getSmartDevices().then((devices: SmartDevice[]) => {
      setSmartDevices(devices);
    });
  }, []); // dependency array | empty to ensure this hook is called only once.

  const handleClick = (id: string) => {
    IModelApp.viewManager.selectedView?.zoomToElements(id, {
      animateFrustumChange: true,
      standardViewId: StandardViewId.RightIso
    });
  }

  return <table className="smart-table">
    <tbody>
      <tr>
        <th>SmartDeviceId</th>
        <th>SmartDeviceType</th>
      </tr>
      {
        smartDevices.map(smartDevice => <tr key={smartDevice.id} className="clickable" onClick={() => handleClick(smartDevice.id)}>
          <td>{smartDevice.smartDeviceId}</td>
          <td>{smartDevice.smartDeviceType}</td>
        </tr>)
      }
    </tbody>
  </table>;
}


export class SmartDeviceListWidgetProvider implements UiItemsProvider {
  public readonly id = "SmartDeviceUiProvider";

  public provideWidgets(
    _stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    _section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = []; // An empty widget array!

    if (location === StagePanelLocation.Right) {
      widgets.push({
        id: "smartDeviceListWidget",                // required id
        label: "Smart Devices",                     // label that shows on the widget tab
        defaultState: WidgetState.Open,             // default state of widget (on screen) 
        content: <SmartDeviceListWidget />,           // contents of widget
      });
    }

    return widgets;
  }
}
