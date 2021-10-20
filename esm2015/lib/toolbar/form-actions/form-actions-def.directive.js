/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, TemplateRef } from '@angular/core';
import { ToolbarService } from '../toolbar.service';
export class FormActionsDefDirective {
    /**
     * @param {?} template
     * @param {?} toolbar
     */
    constructor(template, toolbar) {
        this.template = template;
        this.toolbar = toolbar;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.toolbar.actionTemplate = this.template;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.toolbar.actionTemplate = null;
    }
}
FormActionsDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[instantFormActionsDef]'
            },] }
];
/** @nocollapse */
FormActionsDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ToolbarService }
];
if (false) {
    /** @type {?} */
    FormActionsDefDirective.prototype.template;
    /** @type {?} */
    FormActionsDefDirective.prototype.toolbar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL3Rvb2xiYXIvZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBQ2xDLFlBQW1CLFFBQTBCLEVBQVUsT0FBdUI7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFJLENBQUM7Ozs7SUFFbkYsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDOUMsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7YUFDcEM7Ozs7WUFMbUIsV0FBVztZQUN0QixjQUFjOzs7O0lBTVQsMkNBQWlDOztJQUFFLDBDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==