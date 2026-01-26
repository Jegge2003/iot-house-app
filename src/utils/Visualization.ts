// ...other imports..
import { ColorDef, DisplayStyleSettingsProps, QueryRowFormat } from "@itwin/core-common";
import { IModelConnection, ScreenViewport } from "@itwin/core-frontend";
  
export class Visualization {

    public static toggleHouseExterior = async (viewport: ScreenViewport, show: boolean) => {
        const categoryIds = await Visualization.getCategoryIds(viewport.iModel);
        viewport.changeCategoryDisplay(categoryIds, show);    // show / hide house exterior.
    }

    public static changeBackground = (viewport: ScreenViewport, bgColor: string) => {
        const displayStyleProps: DisplayStyleSettingsProps = {
            backgroundColor: ColorDef.fromString (bgColor).tbgr
        }
        viewport.overrideDisplayStyle (displayStyleProps);
    }

    public static getCategoryIds = async (iModel: IModelConnection): Promise<string[]> => {
        // List of categories for the house exterior. 
        //highlight-next-line
        const categoriesToHide = [
            "'Wall 2nd'",
            "'Wall 1st'",
            "'Dry Wall 2nd'",
            "'Dry Wall 1st'",
            "'Brick Exterior'",
            "'WINDOWS 1ST'",
            "'WINDOWS 2ND'",
            "'Ceiling 1st'",
            "'Ceiling 2nd'",
            "'Callouts'",
            "'light fixture'",
            "'Roof'",
        ];

        // highlight-start
        const query = `SELECT ECInstanceId
                        FROM Bis.SpatialCategory 
                        WHERE CodeValue IN (${categoriesToHide.toString()})`;

        const results = iModel.createQueryReader(query, undefined, {
            rowFormat: QueryRowFormat.UseJsPropertyNames,
        });
        const categoryIds = await results.toArray();
        console.log(results);

        return categoryIds.map (element => element.id);
    };

}