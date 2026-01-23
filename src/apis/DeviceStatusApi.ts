export interface DeviceData{
    [index: string]: any;
}

export class DeviceStatusApi{
    public static async getData(): Promise<DeviceData> {
        // Fetch from cloud endpoint.
        const response = await fetch(
            "https://smarthomedata.z22.web.core.windows.net/",
        );

        // Return response JSON.
        return response.json();
    }

}