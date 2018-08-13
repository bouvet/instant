/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL3Rvb2xiYXIvZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU07Ozs7O0lBQ0osWUFBbUIsUUFBMEIsRUFBVSxPQUF1QjtRQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWdCO0tBQUs7Ozs7SUFFbkYsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDN0M7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBQ3BDOzs7WUFaRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjthQUNwQzs7OztZQUxtQixXQUFXO1lBQ3RCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaW5zdGFudEZvcm1BY3Rpb25zRGVmXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSB0b29sYmFyOiBUb29sYmFyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IG51bGw7XG4gIH1cbn1cbiJdfQ==