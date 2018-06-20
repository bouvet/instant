/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { FormActionsDefDirective } from './form-actions/form-actions-def.directive';
import { ToolbarService } from './toolbar.service';
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule
                    ],
                    declarations: [BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective],
                    exports: [BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective],
                    providers: [ToolbarService]
                },] },
    ];
    return ToolbarModule;
}());
export { ToolbarModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O2dCQUVsRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsQ0FBQztvQkFDbEYsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsdUJBQXVCLENBQUM7b0JBQzdFLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztpQkFDNUI7O3dCQWpCRDs7U0FrQmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbVG9vbGJhclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyTW9kdWxlIHsgfVxyXG4iXX0=