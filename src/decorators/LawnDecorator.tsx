import { ColorDef } from "@itwin/core-common";
import {DecorateContext, Decorator, GraphicType} from "@itwin/core-frontend";
import { Point3d } from "@itwin/core-geometry";

// A fresh Decorator.
export class LawnDecorator implements Decorator {
    public decorate(context: DecorateContext): void {
        // Pick up the brush (the builder)
        const builder = context.createGraphicBuilder (GraphicType.WorldDecoration);

        // Set color to green. The first color (line color) won't be seen because we're drawing a shape.
        // The second color refers to the fill color
        builder.setSymbology (ColorDef.blue, ColorDef.green, 10);

        //Add rectangle
        builder.addShape([
            Point3d.create (-10, -5, -1),
            Point3d.create (-10, 20, -1),
            Point3d.create (20, 20, -1),
            Point3d.create (20, -5, -1),
        ]);

        // Add, finally, add the decoration to the context so our decorator kowns to draw!
        context.addDecorationFromBuilder (builder);
    }
}