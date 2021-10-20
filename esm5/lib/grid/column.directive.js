/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { DefaultFilterOption } from './filter-option/default-filter-option';
import { DateFilterOption } from './filter-option/date-filter-option';
/**
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
 *
 * 22.06.2019 ofsfrvor - Added support for different filter operators.
 *                       Added other input members (attribute, lookAttribute, lookupEntity, dataType, operator)
 *                       enabling control of the filter from the HTML tag.
 * 23.06.2019 ofsfrvor - Added dateFilterTemplate. Activate dateFilterTemplate by setting input member templateName.
 * 24.06.2019 ofsfrvor - If dataType is Long, Integer or BigDecimal, set input field type to number. Set default dataType to String.
 *                       Using moment to convert dateString to date object.
 *
 * TODO Automatically force cursor to input field when template is opened
 * TODO Need to implement language translation for the operator labels.
 * TODO List filter options are not unchecked when list type filter is removed
 */
var ColumnDirective = /** @class */ (function () {
    /**
     *
     */
    function ColumnDirective(datePipe) {
        this.datePipe = datePipe;
        // Inputs
        this.templateName = ColumnDirective.DEFAULT_FILTER_TEMPLATE;
        // Defaults to the identifier of column
        this.filterable = true;
        this.sortable = true;
        this.sticky = false;
        this.instantStyle = {};
        this.dataType = 'String';
        this.isFilterSet = false;
        this.filter = new ReplaySubject();
        this.initialOperator = null;
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
        if (this.templateName == null) {
            this.templateName = ColumnDirective.DEFAULT_FILTER_TEMPLATE;
        }
        // Set default operator list (if not already set)
        switch (this.templateName) {
            case ColumnDirective.DEFAULT_FILTER_TEMPLATE:
                this.operators = this.operators ? this.operators : ['CONTAINS', 'STARTS_WITH', 'ENDS_WITH', 'EQUALS', 'NOT_EQUALS', 'IS_NULL', 'IS_NOT_NULL'];
                this.operator = this.operator ? this.operator : 'CONTAINS';
                break;
            case ColumnDirective.DATE_FILTER_TEMPLATE:
                this.operators = this.operators ? this.operators : ['IS_NULL', 'IS_NOT_NULL'];
                this.operator = this.operator ? this.operator : 'EQUALS';
                break;
            default:
                this.operators = null;
        }
        this.initialOperator = this.operator;
    };
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param filter The filter as received from the filter template
     */
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} filter The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    ColumnDirective.prototype.setFilter = /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} filter The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    function (filter, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if (filter) {
            if (typeof (filter) === 'object') {
                // Filter is object => override filter attributes
                this.attribute = filter.hasOwnProperty('attribute') && filter.attribute && filter.attribute !== this.attribute ? filter.attribute : this.attribute;
                this.lookupAttribute = filter.hasOwnProperty('lookupAttribute') && filter.lookupAttribute && filter.lookupAttribute !== this.lookupAttribute ? filter.lookupAttribute : this.lookupAttribute;
                this.lookupEntity = filter.hasOwnProperty('lookupEntity') && filter.lookupEntity && filter.lookupEntity !== this.lookupEntity ? filter.lookupEntity : this.lookupEntity;
                this.operator = filter.hasOwnProperty('operator') && filter.operator && filter.operator !== this.operator ? filter.operator : this.operator;
                this.dataType = filter.hasOwnProperty('dataType') && filter.dataType && filter.dataType !== this.dataType ? filter.dataType : this.dataType;
            }
            else {
                // Filter is primitive => convert to default filter option
                filter = this.convertPrimitiveToFilter(filter);
            }
        }
        this.setFilterValue(filter, noEmit);
        // Have to do a null check on filter if the filter is to be emitted
        this.isFilterSet = noEmit === true ? filter !== null : true;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    ColumnDirective.prototype.convertPrimitiveToFilter = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var filter = new DefaultFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.key = key;
        filter.dataType = this.dataType;
        return filter;
    };
    /**
     * @param {?} filter
     * @param {?=} noEmit
     * @return {?}
     */
    ColumnDirective.prototype.setFilterValue = /**
     * @param {?} filter
     * @param {?=} noEmit
     * @return {?}
     */
    function (filter, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if ((filter !== this.oldFilter) || (filter === null)) {
            // Clone current filter to old filter
            this.oldFilter = Object.assign({}, this.filterValue);
            this.filterValue = filter;
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: filter });
            }
        }
        this.filterOpen = false;
    };
    /**
     * @param {?} days
     * @return {?}
     */
    ColumnDirective.prototype.setDays = /**
     * @param {?} days
     * @return {?}
     */
    function (days) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        var filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.days = days;
        this.setFilterValue(filter);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    ColumnDirective.prototype.setFromDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        var filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.fromDate = this.toDbDateString(date);
        this.setFilterValue(filter);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    ColumnDirective.prototype.setToDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        var filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.toDate = this.toDbDateString(date);
        this.setFilterValue(filter);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    ColumnDirective.prototype.toDbDateString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date == null) {
            return null;
        }
        /** @type {?} */
        var dateString = this.datePipe.transform(date, 'dd-MM-yyyy');
        return dateString;
    };
    /**
     * @param {?} operator
     * @return {?}
     */
    ColumnDirective.prototype.setOperator = /**
     * @param {?} operator
     * @return {?}
     */
    function (operator) {
        this.operator = operator;
        if (this.filterValue && (typeof (this.filterValue) === 'object')) {
            this.filterValue.operator = operator;
        }
        else {
            this.filterValue = this.convertPrimitiveToFilter(null);
        }
        this.setFilterValue(this.filterValue);
        this.isFilterSet = true;
    };
    /**
     * @return {?}
     */
    ColumnDirective.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        // Default operator back to CONTAINS
        this.operator = this.initialOperator ? this.initialOperator : 'CONTAINS';
        this.setFilterValue(null);
        this.isFilterSet = false;
    };
    ColumnDirective.DEFAULT_FILTER_TEMPLATE = 'defaultFilterTemplate';
    ColumnDirective.DATE_FILTER_TEMPLATE = 'dateFilterTemplate';
    ColumnDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'instant-column'
                },] }
    ];
    /** @nocollapse */
    ColumnDirective.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    ColumnDirective.propDecorators = {
        templateName: [{ type: Input }],
        name: [{ type: Input }],
        label: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        sticky: [{ type: Input }],
        instantStyle: [{ type: Input, args: ['instant-style',] }],
        operators: [{ type: Input }],
        attribute: [{ type: Input }],
        lookupAttribute: [{ type: Input }],
        lookupEntity: [{ type: Input }],
        dataType: [{ type: Input }],
        operator: [{ type: Input }],
        filterRef: [{ type: ContentChild, args: ['filter',] }],
        cellRef: [{ type: ContentChild, args: ['cell',] }]
    };
    return ColumnDirective;
}());
export { ColumnDirective };
if (false) {
    /** @type {?} */
    ColumnDirective.DEFAULT_FILTER_TEMPLATE;
    /** @type {?} */
    ColumnDirective.DATE_FILTER_TEMPLATE;
    /** @type {?} */
    ColumnDirective.prototype.templateName;
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
    ColumnDirective.prototype.operators;
    /** @type {?} */
    ColumnDirective.prototype.attribute;
    /** @type {?} */
    ColumnDirective.prototype.lookupAttribute;
    /** @type {?} */
    ColumnDirective.prototype.lookupEntity;
    /** @type {?} */
    ColumnDirective.prototype.dataType;
    /** @type {?} */
    ColumnDirective.prototype.operator;
    /** @type {?} */
    ColumnDirective.prototype.filterRef;
    /** @type {?} */
    ColumnDirective.prototype.cellRef;
    /** @type {?} */
    ColumnDirective.prototype.filterOpen;
    /** @type {?} */
    ColumnDirective.prototype.isFilterSet;
    /** @type {?} */
    ColumnDirective.prototype.filter;
    /** @type {?} */
    ColumnDirective.prototype.filterValue;
    /** @type {?} */
    ColumnDirective.prototype.oldFilter;
    /** @type {?} */
    ColumnDirective.prototype.initialOperator;
    /** @type {?} */
    ColumnDirective.prototype.datePipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUdwRSxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsOEJBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JkO0lBb0NFOztPQUVHO0lBQ0gseUJBQ1UsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7UUE5Qm5CLGlCQUFZLEdBQVcsZUFBZSxDQUFDLHVCQUF1QixDQUFDOztRQUcvRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNBLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBS2pDLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFTckMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksYUFBYSxFQUFnQixDQUFDO1FBRzNDLG9CQUFlLEdBQVcsSUFBSSxDQUFDO0lBTzNCLENBQUM7Ozs7SUFFTCxrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUks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QUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBN0JRLFFBQVE7OzsrQkFvQ2QsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7K0JBQ0wsS0FBSyxTQUFDLGVBQWU7NEJBQ3JCLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUdMLFlBQVksU0FBQyxRQUFROzBCQUNyQixZQUFZLFNBQUMsTUFBTTs7SUF3S3RCLHNCQUFDO0NBQUEsQUFsTUQsSUFrTUM7U0E5TFksZUFBZTs7O0lBRTFCLHdDQUFpRjs7SUFDakYscUNBQTJFOztJQUczRSx1Q0FBd0U7O0lBQ3hFLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2QixxQ0FBMkI7O0lBQzNCLG1DQUF5Qjs7SUFDekIsaUNBQXdCOztJQUN4Qix1Q0FBMEM7O0lBQzFDLG9DQUE2Qjs7SUFDN0Isb0NBQTJCOztJQUMzQiwwQ0FBaUM7O0lBQ2pDLHVDQUE4Qjs7SUFDOUIsbUNBQXFDOztJQUNyQyxtQ0FBMEI7O0lBRzFCLG9DQUFvRDs7SUFDcEQsa0NBQWdEOztJQUdoRCxxQ0FBb0I7O0lBQ3BCLHNDQUE2Qjs7SUFDN0IsaUNBQTJDOztJQUMzQyxzQ0FBaUI7O0lBQ2pCLG9DQUFlOztJQUNmLDBDQUErQjs7SUFNN0IsbUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RGVmYXVsdEZpbHRlck9wdGlvbn0gZnJvbSAnLi9maWx0ZXItb3B0aW9uL2RlZmF1bHQtZmlsdGVyLW9wdGlvbic7XHJcbmltcG9ydCB7RGF0ZUZpbHRlck9wdGlvbn0gZnJvbSAnLi9maWx0ZXItb3B0aW9uL2RhdGUtZmlsdGVyLW9wdGlvbic7XHJcbmltcG9ydCB7REVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9zcmMvY29tcGlsZXJfZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xyXG4gIGFjdGl2ZTogc3RyaW5nO1xyXG4gIGZpbHRlcjogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXHJcbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cclxuICpcclxuICogMjIuMDYuMjAxOSBvZnNmcnZvciAtIEFkZGVkIHN1cHBvcnQgZm9yIGRpZmZlcmVudCBmaWx0ZXIgb3BlcmF0b3JzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgQWRkZWQgb3RoZXIgaW5wdXQgbWVtYmVycyAoYXR0cmlidXRlLCBsb29rQXR0cmlidXRlLCBsb29rdXBFbnRpdHksIGRhdGFUeXBlLCBvcGVyYXRvcilcclxuICogICAgICAgICAgICAgICAgICAgICAgIGVuYWJsaW5nIGNvbnRyb2wgb2YgdGhlIGZpbHRlciBmcm9tIHRoZSBIVE1MIHRhZy5cclxuICogMjMuMDYuMjAxOSBvZnNmcnZvciAtIEFkZGVkIGRhdGVGaWx0ZXJUZW1wbGF0ZS4gQWN0aXZhdGUgZGF0ZUZpbHRlclRlbXBsYXRlIGJ5IHNldHRpbmcgaW5wdXQgbWVtYmVyIHRlbXBsYXRlTmFtZS5cclxuICogMjQuMDYuMjAxOSBvZnNmcnZvciAtIElmIGRhdGFUeXBlIGlzIExvbmcsIEludGVnZXIgb3IgQmlnRGVjaW1hbCwgc2V0IGlucHV0IGZpZWxkIHR5cGUgdG8gbnVtYmVyLiBTZXQgZGVmYXVsdCBkYXRhVHlwZSB0byBTdHJpbmcuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBVc2luZyBtb21lbnQgdG8gY29udmVydCBkYXRlU3RyaW5nIHRvIGRhdGUgb2JqZWN0LlxyXG4gKlxyXG4gKiBUT0RPIEF1dG9tYXRpY2FsbHkgZm9yY2UgY3Vyc29yIHRvIGlucHV0IGZpZWxkIHdoZW4gdGVtcGxhdGUgaXMgb3BlbmVkXHJcbiAqIFRPRE8gTmVlZCB0byBpbXBsZW1lbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gZm9yIHRoZSBvcGVyYXRvciBsYWJlbHMuXHJcbiAqIFRPRE8gTGlzdCBmaWx0ZXIgb3B0aW9ucyBhcmUgbm90IHVuY2hlY2tlZCB3aGVuIGxpc3QgdHlwZSBmaWx0ZXIgaXMgcmVtb3ZlZFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGVmYXVsdEZpbHRlclRlbXBsYXRlJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERBVEVfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGF0ZUZpbHRlclRlbXBsYXRlJztcclxuXHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgdGVtcGxhdGVOYW1lOiBzdHJpbmcgPSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU7XHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nOyAgLy8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoaXMgY29sdW1uLlxyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxyXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNvcnRhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcclxuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcclxuICBASW5wdXQoKSBvcGVyYXRvcnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEVudGl0eTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnU3RyaW5nJztcclxuICBASW5wdXQoKSBvcGVyYXRvcjogc3RyaW5nO1xyXG5cclxuICAvLyBUZW1wbGF0ZSByZWZzXHJcbiAgQENvbnRlbnRDaGlsZCgnZmlsdGVyJykgZmlsdGVyUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xyXG4gIGZpbHRlck9wZW46IGJvb2xlYW47XHJcbiAgaXNGaWx0ZXJTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XHJcbiAgZmlsdGVyVmFsdWU6IGFueTtcclxuICBvbGRGaWx0ZXI6IGFueTtcclxuICBpbml0aWFsT3BlcmF0b3I6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMudGVtcGxhdGVOYW1lID0gQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IG9wZXJhdG9yIGxpc3QgKGlmIG5vdCBhbHJlYWR5IHNldClcclxuICAgIHN3aXRjaCAodGhpcy50ZW1wbGF0ZU5hbWUpIHtcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9wZXJhdG9ycyA/IHRoaXMub3BlcmF0b3JzIDogWydDT05UQUlOUycsICdTVEFSVFNfV0lUSCcsICdFTkRTX1dJVEgnLCAnRVFVQUxTJywgJ05PVF9FUVVBTFMnLCAnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRBVEVfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vcGVyYXRvcnMgPyB0aGlzLm9wZXJhdG9ycyA6IFsnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdFUVVBTFMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxPcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cclxuICAgKiBBbnkgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgY29sdW1uIGZpbHRlciwgbXVzdCBmaXJlIHRoaXNcclxuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZmlsdGVyIFRoZSBmaWx0ZXIgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgc2V0RmlsdGVyKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKGZpbHRlcikge1xyXG4gICAgICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIG9iamVjdCA9PiBvdmVycmlkZSBmaWx0ZXIgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdhdHRyaWJ1dGUnKSAmJiBmaWx0ZXIuYXR0cmlidXRlICYmIGZpbHRlci5hdHRyaWJ1dGUgIT09IHRoaXMuYXR0cmlidXRlID8gZmlsdGVyLmF0dHJpYnV0ZSA6IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwQXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBBdHRyaWJ1dGUnKSAmJiBmaWx0ZXIubG9va3VwQXR0cmlidXRlICYmIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgIT09IHRoaXMubG9va3VwQXR0cmlidXRlID8gZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA6IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwRW50aXR5ID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBFbnRpdHknKSAmJiBmaWx0ZXIubG9va3VwRW50aXR5ICYmIGZpbHRlci5sb29rdXBFbnRpdHkgIT09IHRoaXMubG9va3VwRW50aXR5ID8gZmlsdGVyLmxvb2t1cEVudGl0eSA6IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykgJiYgZmlsdGVyLm9wZXJhdG9yICYmIGZpbHRlci5vcGVyYXRvciAhPT0gdGhpcy5vcGVyYXRvciA/IGZpbHRlci5vcGVyYXRvciA6IHRoaXMub3BlcmF0b3I7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnZGF0YVR5cGUnKSAmJiBmaWx0ZXIuZGF0YVR5cGUgJiYgZmlsdGVyLmRhdGFUeXBlICE9PSB0aGlzLmRhdGFUeXBlID8gZmlsdGVyLmRhdGFUeXBlIDogdGhpcy5kYXRhVHlwZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGaWx0ZXIgaXMgcHJpbWl0aXZlID0+IGNvbnZlcnQgdG8gZGVmYXVsdCBmaWx0ZXIgb3B0aW9uXHJcbiAgICAgICAgZmlsdGVyID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIoZmlsdGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyLCBub0VtaXQpO1xyXG5cclxuICAgIC8vIEhhdmUgdG8gZG8gYSBudWxsIGNoZWNrIG9uIGZpbHRlciBpZiB0aGUgZmlsdGVyIGlzIHRvIGJlIGVtaXR0ZWRcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSBub0VtaXQgPT09IHRydWUgPyBmaWx0ZXIgIT09IG51bGwgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlcjogRGVmYXVsdEZpbHRlck9wdGlvbiA9IG5ldyBEZWZhdWx0RmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmtleSA9IGtleTtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlclZhbHVlKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKChmaWx0ZXIgIT09IHRoaXMub2xkRmlsdGVyKSB8fCAoZmlsdGVyID09PSBudWxsKSkge1xyXG4gICAgICAvLyBDbG9uZSBjdXJyZW50IGZpbHRlciB0byBvbGQgZmlsdGVyXHJcbiAgICAgIHRoaXMub2xkRmlsdGVyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWx0ZXJWYWx1ZSk7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBmaWx0ZXI7XHJcbiAgICAgIGlmICghbm9FbWl0KSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogZmlsdGVyfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbHRlck9wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldERheXMoZGF5czogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmRheXMgPSBkYXlzO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0RnJvbURhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci5mcm9tRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBzZXRUb0RhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci50b0RhdGUgPSB0aGlzLnRvRGJEYXRlU3RyaW5nKGRhdGUpO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b0RiRGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGlmIChkYXRlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZC1NTS15eXl5Jyk7XHJcbiAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICB9XHJcblxyXG5cclxuICBzZXRPcGVyYXRvcihvcGVyYXRvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSAmJiAodHlwZW9mKHRoaXMuZmlsdGVyVmFsdWUpID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKG51bGwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZSh0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVyKCkge1xyXG4gICAgLy8gRGVmYXVsdCBvcGVyYXRvciBiYWNrIHRvIENPTlRBSU5TXHJcbiAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5pbml0aWFsT3BlcmF0b3IgPyB0aGlzLmluaXRpYWxPcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKG51bGwpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdfQ==