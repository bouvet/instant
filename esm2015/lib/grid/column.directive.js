/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
/**
 *
 * @record
 */
export function ColumnFilter() { }
function ColumnFilter_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnFilter.prototype.active;
    /** @type {?} */
    ColumnFilter.prototype.filter;
}
/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
export class ColumnDirective {
    /**
     *
     */
    constructor() {
        this.filterable = true;
        this.sortable = true;
        this.filter = new ReplaySubject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.label == null) {
            this.label = this.name;
        }
    }
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @return {?}
     */
    setFilter(obj) {
        if (obj !== this.oldFilter) {
            this.filter.next({ active: this.name, filter: obj });
            this.filterValue = obj;
            this.oldFilter = obj;
        }
        this.filterOpen = false;
    }
}
ColumnDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'instant-column'
            },] },
];
/** @nocollapse */
ColumnDirective.ctorParameters = () => [];
ColumnDirective.propDecorators = {
    name: [{ type: Input }],
    label: [{ type: Input }],
    filterable: [{ type: Input }],
    sortable: [{ type: Input }],
    filterRef: [{ type: ContentChild, args: ['filter',] }],
    cellRef: [{ type: ContentChild, args: ['cell',] }]
};
function ColumnDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnDirective.prototype.name;
    /** @type {?} */
    ColumnDirective.prototype.label;
    /** @type {?} */
    ColumnDirective.prototype.filterable;
    /** @type {?} */
    ColumnDirective.prototype.sortable;
    /** @type {?} */
    ColumnDirective.prototype.filterRef;
    /** @type {?} */
    ColumnDirective.prototype.cellRef;
    /** @type {?} */
    ColumnDirective.prototype.filterOpen;
    /** @type {?} */
    ColumnDirective.prototype.filter;
    /** @type {?} */
    ColumnDirective.prototype.filterValue;
    /** @type {?} */
    ColumnDirective.prototype.oldFilter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBa0JyQyxNQUFNOzs7O0lBcUJKOzBCQWpCc0IsSUFBSTt3QkFDTixJQUFJO3NCQVNmLElBQUksYUFBYSxFQUFnQjtLQU96Qjs7OztJQUVqQixRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QjtLQUNGOzs7Ozs7Ozs7SUFTRCxTQUFTLENBQUMsR0FBUTtRQUNoQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0tBQ3pCOzs7WUEvQ0YsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7OzttQkFHRSxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUdMLFlBQVksU0FBQyxRQUFRO3NCQUNyQixZQUFZLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xyXG4gIGFjdGl2ZTogc3RyaW5nO1xyXG4gIGZpbHRlcjogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXHJcbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtY29sdW1uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXHJcbiAgQElucHV0KCkgZmlsdGVyYWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xyXG5cclxuICAvLyBUZW1wbGF0ZSByZWZzXHJcbiAgQENvbnRlbnRDaGlsZCgnZmlsdGVyJykgZmlsdGVyUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuXHJcbiAgLy8gRmlsdGVyIHByb3BlcnRpZXNcclxuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xyXG4gIGZpbHRlciA9IG5ldyBSZXBsYXlTdWJqZWN0PENvbHVtbkZpbHRlcj4oKTtcclxuICBmaWx0ZXJWYWx1ZTogYW55O1xyXG4gIHByaXZhdGUgb2xkRmlsdGVyOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLm5hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cclxuICAgKiBBbnkgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgY29sdW1uIGZpbHRlciwgbXVzdCBmaXJlIHRoaXNcclxuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBmaWx0ZXIgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgc2V0RmlsdGVyKG9iajogYW55KSB7XHJcbiAgICBpZiAob2JqICE9PSB0aGlzLm9sZEZpbHRlcikge1xyXG4gICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBvYmp9KTtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IG9iajtcclxuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBvYmo7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpbHRlck9wZW4gPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iXX0=