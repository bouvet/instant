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
                this.operators = this.operators ? this.operators : ['CONTAINS', 'STARTS_WITH', 'ENDS_WITH', 'EQUALS', 'NOT_EQUALS', 'MATCH_WORDS', 'IS_NULL', 'IS_NOT_NULL'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUdwRSxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsOEJBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JkO0lBb0NFOztPQUVHO0lBQ0gseUJBQ1UsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7UUE5Qm5CLGlCQUFZLEdBQVcsZUFBZSxDQUFDLHVCQUF1QixDQUFDOztRQUcvRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNBLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBS2pDLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFTckMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksYUFBYSxFQUFnQixDQUFDO1FBRzNDLG9CQUFlLEdBQVcsSUFBSSxDQUFDO0lBTzNCLENBQUM7Ozs7SUFFTCxrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUks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QUVULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQTdCUSxRQUFROzs7K0JBb0NkLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUNMLEtBQUssU0FBQyxlQUFlOzRCQUNyQixLQUFLOzRCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFHTCxZQUFZLFNBQUMsUUFBUTswQkFDckIsWUFBWSxTQUFDLE1BQU07O0lBd0t0QixzQkFBQztDQUFBLEFBbE1ELElBa01DO1NBOUxZLGVBQWU7OztJQUUxQix3Q0FBaUY7O0lBQ2pGLHFDQUEyRTs7SUFHM0UsdUNBQXdFOztJQUN4RSwrQkFBc0I7O0lBQ3RCLGdDQUF1Qjs7SUFDdkIscUNBQTJCOztJQUMzQixtQ0FBeUI7O0lBQ3pCLGlDQUF3Qjs7SUFDeEIsdUNBQTBDOztJQUMxQyxvQ0FBNkI7O0lBQzdCLG9DQUEyQjs7SUFDM0IsMENBQWlDOztJQUNqQyx1Q0FBOEI7O0lBQzlCLG1DQUFxQzs7SUFDckMsbUNBQTBCOztJQUcxQixvQ0FBb0Q7O0lBQ3BELGtDQUFnRDs7SUFHaEQscUNBQW9COztJQUNwQixzQ0FBNkI7O0lBQzdCLGlDQUEyQzs7SUFDM0Msc0NBQWlCOztJQUNqQixvQ0FBZTs7SUFDZiwwQ0FBK0I7O0lBTTdCLG1DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0RlZmF1bHRGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kZWZhdWx0LWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RhdGVGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kYXRlLWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvc3JjL2NvbXBpbGVyX2ZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uRmlsdGVyIHtcclxuICBhY3RpdmU6IHN0cmluZztcclxuICBmaWx0ZXI6IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgaW5zdGFudC1ncmlkLlxyXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXHJcbiAqXHJcbiAqIDIyLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBzdXBwb3J0IGZvciBkaWZmZXJlbnQgZmlsdGVyIG9wZXJhdG9ycy5cclxuICogICAgICAgICAgICAgICAgICAgICAgIEFkZGVkIG90aGVyIGlucHV0IG1lbWJlcnMgKGF0dHJpYnV0ZSwgbG9va0F0dHJpYnV0ZSwgbG9va3VwRW50aXR5LCBkYXRhVHlwZSwgb3BlcmF0b3IpXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBlbmFibGluZyBjb250cm9sIG9mIHRoZSBmaWx0ZXIgZnJvbSB0aGUgSFRNTCB0YWcuXHJcbiAqIDIzLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBkYXRlRmlsdGVyVGVtcGxhdGUuIEFjdGl2YXRlIGRhdGVGaWx0ZXJUZW1wbGF0ZSBieSBzZXR0aW5nIGlucHV0IG1lbWJlciB0ZW1wbGF0ZU5hbWUuXHJcbiAqIDI0LjA2LjIwMTkgb2ZzZnJ2b3IgLSBJZiBkYXRhVHlwZSBpcyBMb25nLCBJbnRlZ2VyIG9yIEJpZ0RlY2ltYWwsIHNldCBpbnB1dCBmaWVsZCB0eXBlIHRvIG51bWJlci4gU2V0IGRlZmF1bHQgZGF0YVR5cGUgdG8gU3RyaW5nLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgVXNpbmcgbW9tZW50IHRvIGNvbnZlcnQgZGF0ZVN0cmluZyB0byBkYXRlIG9iamVjdC5cclxuICpcclxuICogVE9ETyBBdXRvbWF0aWNhbGx5IGZvcmNlIGN1cnNvciB0byBpbnB1dCBmaWVsZCB3aGVuIHRlbXBsYXRlIGlzIG9wZW5lZFxyXG4gKiBUT0RPIE5lZWQgdG8gaW1wbGVtZW50IGxhbmd1YWdlIHRyYW5zbGF0aW9uIGZvciB0aGUgb3BlcmF0b3IgbGFiZWxzLlxyXG4gKiBUT0RPIExpc3QgZmlsdGVyIG9wdGlvbnMgYXJlIG5vdCB1bmNoZWNrZWQgd2hlbiBsaXN0IHR5cGUgZmlsdGVyIGlzIHJlbW92ZWRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtY29sdW1uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJTFRFUl9URU1QTEFURTogc3RyaW5nID0gJ2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZSc7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBEQVRFX0ZJTFRFUl9URU1QTEFURTogc3RyaW5nID0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZSc7XHJcblxyXG4gIC8vIElucHV0c1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlTmFtZTogc3RyaW5nID0gQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFO1xyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nOyAvLyBEZWZhdWx0cyB0byB0aGUgaWRlbnRpZmllciBvZiBjb2x1bW5cclxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiAgQElucHV0KCdpbnN0YW50LXN0eWxlJykgaW5zdGFudFN0eWxlID0ge307XHJcbiAgQElucHV0KCkgb3BlcmF0b3JzOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKSBhdHRyaWJ1dGU6IHN0cmluZztcclxuICBASW5wdXQoKSBsb29rdXBBdHRyaWJ1dGU6IHN0cmluZztcclxuICBASW5wdXQoKSBsb29rdXBFbnRpdHk6IHN0cmluZztcclxuICBASW5wdXQoKSBkYXRhVHlwZTogc3RyaW5nID0gJ1N0cmluZyc7XHJcbiAgQElucHV0KCkgb3BlcmF0b3I6IHN0cmluZztcclxuXHJcbiAgLy8gVGVtcGxhdGUgcmVmc1xyXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAQ29udGVudENoaWxkKCdjZWxsJykgY2VsbFJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLy8gRmlsdGVyIHByb3BlcnRpZXNcclxuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xyXG4gIGlzRmlsdGVyU2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgZmlsdGVyID0gbmV3IFJlcGxheVN1YmplY3Q8Q29sdW1uRmlsdGVyPigpO1xyXG4gIGZpbHRlclZhbHVlOiBhbnk7XHJcbiAgb2xkRmlsdGVyOiBhbnk7XHJcbiAgaW5pdGlhbE9wZXJhdG9yOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGVcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmxhYmVsID09IG51bGwpIHtcclxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnRlbXBsYXRlTmFtZSA9IENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgZGVmYXVsdCBvcGVyYXRvciBsaXN0IChpZiBub3QgYWxyZWFkeSBzZXQpXHJcbiAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vcGVyYXRvcnMgPyB0aGlzLm9wZXJhdG9ycyA6IFsnQ09OVEFJTlMnLCAnU1RBUlRTX1dJVEgnLCAnRU5EU19XSVRIJywgJ0VRVUFMUycsICdOT1RfRVFVQUxTJywgJ01BVENIX1dPUkRTJywgJ0lTX05VTEwnLCAnSVNfTk9UX05VTEwnXTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvciA/IHRoaXMub3BlcmF0b3IgOiAnQ09OVEFJTlMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5EQVRFX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzID8gdGhpcy5vcGVyYXRvcnMgOiBbJ0lTX05VTEwnLCAnSVNfTk9UX05VTEwnXTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvciA/IHRoaXMub3BlcmF0b3IgOiAnRVFVQUxTJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbml0aWFsT3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBkaXJlY3RseSBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGUuXHJcbiAgICogQW55IGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbHVtbiBmaWx0ZXIsIG11c3QgZmlyZSB0aGlzXHJcbiAgICogbWV0aG9kIHdoZW4gdXNlciBoYXMgbWFkZSBjaG9pY2VzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGZpbHRlciBUaGUgZmlsdGVyIGFzIHJlY2VpdmVkIGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHNldEZpbHRlcihmaWx0ZXI6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIEZpbHRlciBpcyBvYmplY3QgPT4gb3ZlcnJpZGUgZmlsdGVyIGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnYXR0cmlidXRlJykgJiYgZmlsdGVyLmF0dHJpYnV0ZSAmJiBmaWx0ZXIuYXR0cmlidXRlICE9PSB0aGlzLmF0dHJpYnV0ZSA/IGZpbHRlci5hdHRyaWJ1dGUgOiB0aGlzLmF0dHJpYnV0ZTtcclxuICAgICAgICB0aGlzLmxvb2t1cEF0dHJpYnV0ZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnbG9va3VwQXR0cmlidXRlJykgJiYgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSAmJiBmaWx0ZXIubG9va3VwQXR0cmlidXRlICE9PSB0aGlzLmxvb2t1cEF0dHJpYnV0ZSA/IGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgOiB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgICAgICB0aGlzLmxvb2t1cEVudGl0eSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnbG9va3VwRW50aXR5JykgJiYgZmlsdGVyLmxvb2t1cEVudGl0eSAmJiBmaWx0ZXIubG9va3VwRW50aXR5ICE9PSB0aGlzLmxvb2t1cEVudGl0eSA/IGZpbHRlci5sb29rdXBFbnRpdHkgOiB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpICYmIGZpbHRlci5vcGVyYXRvciAmJiBmaWx0ZXIub3BlcmF0b3IgIT09IHRoaXMub3BlcmF0b3IgPyBmaWx0ZXIub3BlcmF0b3IgOiB0aGlzLm9wZXJhdG9yO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2RhdGFUeXBlJykgJiYgZmlsdGVyLmRhdGFUeXBlICYmIGZpbHRlci5kYXRhVHlwZSAhPT0gdGhpcy5kYXRhVHlwZSA/IGZpbHRlci5kYXRhVHlwZSA6IHRoaXMuZGF0YVR5cGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIHByaW1pdGl2ZSA9PiBjb252ZXJ0IHRvIGRlZmF1bHQgZmlsdGVyIG9wdGlvblxyXG4gICAgICAgIGZpbHRlciA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlciwgbm9FbWl0KTtcclxuXHJcbiAgICAvLyBIYXZlIHRvIGRvIGEgbnVsbCBjaGVjayBvbiBmaWx0ZXIgaWYgdGhlIGZpbHRlciBpcyB0byBiZSBlbWl0dGVkXHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gbm9FbWl0ID09PSB0cnVlID8gZmlsdGVyICE9PSBudWxsIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnZlcnRQcmltaXRpdmVUb0ZpbHRlcihrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCBmaWx0ZXI6IERlZmF1bHRGaWx0ZXJPcHRpb24gPSBuZXcgRGVmYXVsdEZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5rZXkgPSBrZXk7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG5cclxuICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgfVxyXG5cclxuICBzZXRGaWx0ZXJWYWx1ZShmaWx0ZXI6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICgoZmlsdGVyICE9PSB0aGlzLm9sZEZpbHRlcikgfHwgKGZpbHRlciA9PT0gbnVsbCkpIHtcclxuICAgICAgLy8gQ2xvbmUgY3VycmVudCBmaWx0ZXIgdG8gb2xkIGZpbHRlclxyXG4gICAgICB0aGlzLm9sZEZpbHRlciA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmlsdGVyVmFsdWUpO1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gZmlsdGVyO1xyXG4gICAgICBpZiAoIW5vRW1pdCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLm5leHQoe2FjdGl2ZTogdGhpcy5uYW1lLCBmaWx0ZXI6IGZpbHRlcn0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWx0ZXJPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXREYXlzKGRheXM6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci5kYXlzID0gZGF5cztcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHNldEZyb21EYXRlKGRhdGU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuZnJvbURhdGUgPSB0aGlzLnRvRGJEYXRlU3RyaW5nKGRhdGUpO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VG9EYXRlKGRhdGU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIudG9EYXRlID0gdGhpcy50b0RiRGF0ZVN0cmluZyhkYXRlKTtcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9EYkRhdGVTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCAnZGQtTU0teXl5eScpO1xyXG4gICAgcmV0dXJuIGRhdGVTdHJpbmc7XHJcbiAgfVxyXG5cclxuXHJcbiAgc2V0T3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xyXG4gICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgJiYgKHR5cGVvZih0aGlzLmZpbHRlclZhbHVlKSA9PT0gJ29iamVjdCcpKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB0aGlzLmNvbnZlcnRQcmltaXRpdmVUb0ZpbHRlcihudWxsKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUodGhpcy5maWx0ZXJWYWx1ZSk7XHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZpbHRlcigpIHtcclxuICAgIC8vIERlZmF1bHQgb3BlcmF0b3IgYmFjayB0byBDT05UQUlOU1xyXG4gICAgdGhpcy5vcGVyYXRvciA9IHRoaXMuaW5pdGlhbE9wZXJhdG9yID8gdGhpcy5pbml0aWFsT3BlcmF0b3IgOiAnQ09OVEFJTlMnO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShudWxsKTtcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iXX0=