import { QueryRowFormat } from "@itwin/core-common";
import { IModelApp } from "@itwin/core-frontend";
import { XYZ } from "@itwin/core-geometry";

export interface SmartDevice {
  id: string;
  smartDeviceId: string;
  smartDeviceType: string;
  origin: XYZ;
}

export class IModelDataApi {
  public static async getSmartDevices(): Promise<SmartDevice[]> {
    const query = `
      SELECT
        ECInstanceId,
        SmartDeviceId,
        SmartDeviceType,
        Origin
      FROM DgnCustomItemTypes_HouseSchema.SmartDevice
      WHERE Origin IS NOT NULL
    `;

    const existingView = IModelApp.viewManager.selectedView;
    if (existingView) {
      return this.querySmartDevices(existingView.iModel, query);
    }

    return new Promise<SmartDevice[]>((resolve, reject) => {
      IModelApp.viewManager.onViewOpen.addOnce(async (viewport) => {
        try {
          const data = await this.querySmartDevices(viewport.iModel, query);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  private static async querySmartDevices(iModel: any, query: string): Promise<SmartDevice[]> {
    console.log("Running SmartDevice query...");

    const reader = iModel.createQueryReader(query, undefined, {
      rowFormat: QueryRowFormat.UseJsPropertyNames,
    });

    const rows = await reader.toArray();

    console.log("Query result:", rows);
    return rows as SmartDevice[];
  }
}
