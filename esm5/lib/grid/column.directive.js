/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
/**
 *
 * @record
 */
export function ColumnFilter() { }
if (false) {
    /** @type {?} */
    ColumnFilter.prototype.active;
    /** @type {?} */
    ColumnFilter.prototype.filter;
}
/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
var ColumnDirective = /** @class */ (function () {
    /**
     *
     */
    function ColumnDirective() {
        // Defaults to the identifier of column
        this.filterable = true;
        this.sortable = true;
        this.sticky = false;
        this.instantStyle = {};
        this.filter = new ReplaySubject();
    }
    /**
     * @return {?}
     */
    ColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.label == null) {
            this.label = this.name;
        }
    };
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param obj The filter as received from the filter template
     */
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    ColumnDirective.prototype.setFilter = /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    function (obj, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if (obj !== this.oldFilter) {
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: obj });
            }
            this.filterValue = obj;
            this.oldFilter = obj;
        }
        this.filterOpen = false;
    };
    /**
     * @return {?}
     */
    ColumnDirective.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        this.setFilter(null);
    };
    ColumnDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'instant-column'
                },] }
    ];
    /** @nocollapse */
    ColumnDirective.ctorParameters = function () { return []; };
    ColumnDirective.propDecorators = {
        name: [{ type: Input }],
        label: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        sticky: [{ type: Input }],
        instantStyle: [{ type: Input, args: ['instant-style',] }],
        filterRef: [{ type: ContentChild, args: ['filter',] }],
        cellRef: [{ type: ContentChild, args: ['cell',] }]
    };
    return ColumnDirective;
}());
export { ColumnDirective };
if (false) {
    /** @type {?} */
    ColumnDirective.prototype.name;
    /** @type {?} */
    ColumnDirective.prototype.label;
    /** @type {?} */
    ColumnDirective.prototype.filterable;
    /** @type {?} */
    ColumnDirective.prototype.sortable;
    /** @type {?} */
    ColumnDirective.prototype.sticky;
    /** @type {?} */
    ColumnDirective.prototype.instantStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUtyQyxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsOEJBQVk7Ozs7OztBQU9kO0lBd0JFOztPQUVHO0lBQ0g7O1FBbkJTLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ0EsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFTMUMsV0FBTSxHQUFHLElBQUksYUFBYSxFQUFnQixDQUFDO0lBTzNCLENBQUM7Ozs7SUFFakIsa0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7O0lBQ0gsbUNBQVM7Ozs7Ozs7OztJQUFULFVBQVUsR0FBUSxFQUFFLE1BQXVCO1FBQXZCLHVCQUFBLEVBQUEsY0FBdUI7UUFDekMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7YUFDcEQ7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxzQ0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7O2dCQXZERixTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7Ozt1QkFHRSxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7K0JBQ0wsS0FBSyxTQUFDLGVBQWU7NEJBR3JCLFlBQVksU0FBQyxRQUFROzBCQUNyQixZQUFZLFNBQUMsTUFBTTs7SUF5Q3RCLHNCQUFDO0NBQUEsQUF4REQsSUF3REM7U0FwRFksZUFBZTs7O0lBRTFCLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2QixxQ0FBMkI7O0lBQzNCLG1DQUF5Qjs7SUFDekIsaUNBQXdCOztJQUN4Qix1Q0FBMEM7O0lBRzFDLG9DQUFvRDs7SUFDcEQsa0NBQWdEOztJQUloRCxxQ0FBb0I7O0lBQ3BCLGlDQUEyQzs7SUFDM0Msc0NBQWlCOztJQUNqQixvQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xuICBhY3RpdmU6IHN0cmluZztcbiAgZmlsdGVyOiBhbnk7XG59XG5cbi8qKlxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIElucHV0c1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcbiAgQElucHV0KCdpbnN0YW50LXN0eWxlJykgaW5zdGFudFN0eWxlID0ge307XG5cbiAgLy8gVGVtcGxhdGUgcmVmc1xuICBAQ29udGVudENoaWxkKCdmaWx0ZXInKSBmaWx0ZXJSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgLy8gRmlsdGVyIHByb3BlcnRpZXNcbiAgZmlsdGVyT3BlbjogYm9vbGVhbjtcbiAgZmlsdGVyID0gbmV3IFJlcGxheVN1YmplY3Q8Q29sdW1uRmlsdGVyPigpO1xuICBmaWx0ZXJWYWx1ZTogYW55O1xuICBvbGRGaWx0ZXI6IGFueTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBkaXJlY3RseSBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGUuXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICovXG4gIHNldEZpbHRlcihvYmo6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAob2JqICE9PSB0aGlzLm9sZEZpbHRlcikge1xuICAgICAgaWYgKCFub0VtaXQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogb2JqfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gb2JqO1xuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBvYmo7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcmVtb3ZlRmlsdGVyKCkge1xuICAgIHRoaXMuc2V0RmlsdGVyKG51bGwpO1xuICB9XG59XG5cblxuIl19