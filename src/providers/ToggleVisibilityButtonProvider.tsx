import React from "react";
import {    UiItemsProvider, 
            ToolbarUsage, 
            ToolbarOrientation, 
            ToolbarItem, 
            StageUsage,
            CommandItemDef,
            ToolbarHelper} from "@itwin/appui-react";
import { SvgVisibilityHalf } from "@itwin/itwinui-icons-react";
import { Visualization } from "../utils/Visualization";
import { IModelApp } from "@itwin/core-frontend";

export class ToggleVisibilityButtonProvider implements UiItemsProvider {
    public readonly id = "ToggleVisibilityButtonProvider";
    private _showExterior: boolean = false; // initial state is false.

    public provideToolbarItems(
        _stageId: string,
        stageUsage: string,
        toolbarUsage: ToolbarUsage,
        toolbarOrientation: ToolbarOrientation
    ): ToolbarItem[] {
        const toolbarButtonItems: ToolbarItem[] = [];

        if (
            stageUsage === StageUsage.General &&
            toolbarUsage === ToolbarUsage.ContentManipulation &&
            toolbarOrientation === ToolbarOrientation.Vertical
        ) {
            const buttonDefinition = new CommandItemDef({
                commandId: 'ToggleWalls',
                iconSpec: <SvgVisibilityHalf />,
                label: 'Toggle Walls',
                execute: () => {
                    this._showExterior = !this._showExterior;
                    Visualization.toggleHouseExterior(IModelApp.viewManager.selectedView!, this._showExterior);},
            });

            const toggleButton = ToolbarHelper.createToolbarItemFromItemDef(
                1000,
                buttonDefinition
            );

            toolbarButtonItems.push(toggleButton); // our array is no longer empty!
        }
        return toolbarButtonItems;
    }
}