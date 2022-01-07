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
export class ColumnDirective {
    /**
     *
     * @param {?} datePipe
     */
    constructor(datePipe) {
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
    ngOnInit() {
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
    }
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} filter The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    setFilter(filter, noEmit = false) {
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
    }
    /**
     * @param {?} key
     * @return {?}
     */
    convertPrimitiveToFilter(key) {
        /** @type {?} */
        const filter = new DefaultFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.key = key;
        filter.dataType = this.dataType;
        return filter;
    }
    /**
     * @param {?} filter
     * @param {?=} noEmit
     * @return {?}
     */
    setFilterValue(filter, noEmit = false) {
        if ((filter !== this.oldFilter) || (filter === null)) {
            // Clone current filter to old filter
            this.oldFilter = Object.assign({}, this.filterValue);
            this.filterValue = filter;
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: filter });
            }
        }
        this.filterOpen = false;
    }
    /**
     * @param {?} days
     * @return {?}
     */
    setDays(days) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        const filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.days = days;
        this.setFilterValue(filter);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setFromDate(date) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        const filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.fromDate = this.toDbDateString(date);
        this.setFilterValue(filter);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setToDate(date) {
        if (this.templateName !== 'dateFilterTemplate') {
            return;
        }
        /** @type {?} */
        const filter = this.filterValue ? this.filterValue : new DateFilterOption();
        filter.attribute = this.attribute;
        filter.lookupAttribute = this.lookupAttribute;
        filter.lookupEntity = this.lookupEntity;
        filter.operator = this.operator;
        filter.dataType = this.dataType;
        filter.toDate = this.toDbDateString(date);
        this.setFilterValue(filter);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toDbDateString(date) {
        if (date == null) {
            return null;
        }
        /** @type {?} */
        const dateString = this.datePipe.transform(date, 'dd-MM-yyyy');
        return dateString;
    }
    /**
     * @param {?} operator
     * @return {?}
     */
    setOperator(operator) {
        this.operator = operator;
        if (this.filterValue && (typeof (this.filterValue) === 'object')) {
            this.filterValue.operator = operator;
        }
        else {
            this.filterValue = this.convertPrimitiveToFilter(null);
        }
        this.setFilterValue(this.filterValue);
        this.isFilterSet = true;
    }
    /**
     * @return {?}
     */
    removeFilter() {
        // Default operator back to CONTAINS
        this.operator = this.initialOperator ? this.initialOperator : 'CONTAINS';
        this.setFilterValue(null);
        this.isFilterSet = false;
    }
}
ColumnDirective.DEFAULT_FILTER_TEMPLATE = 'defaultFilterTemplate';
ColumnDirective.DATE_FILTER_TEMPLATE = 'dateFilterTemplate';
ColumnDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'instant-column'
            },] }
];
/** @nocollapse */
ColumnDirective.ctorParameters = () => [
    { type: DatePipe }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUdwRSxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsOEJBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JkLE1BQU0sT0FBTyxlQUFlOzs7OztJQW1DMUIsWUFDVSxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVOztRQTlCbkIsaUJBQVksR0FBVyxlQUFlLENBQUMsdUJBQXVCLENBQUM7O1FBRy9ELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ0EsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFLakMsYUFBUSxHQUFXLFFBQVEsQ0FBQztRQVNyQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixXQUFNLEdBQUcsSUFBSSxhQUFhLEVBQWdCLENBQUM7UUFHM0Msb0JBQWUsR0FBVyxJQUFJLENBQUM7SUFPM0IsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUks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QUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUdMLFlBQVksU0FBQyxRQUFRO3NCQUNyQixZQUFZLFNBQUMsTUFBTTs7OztJQXBCcEIsd0NBQWlGOztJQUNqRixxQ0FBMkU7O0lBRzNFLHVDQUF3RTs7SUFDeEUsK0JBQXNCOztJQUN0QixnQ0FBdUI7O0lBQ3ZCLHFDQUEyQjs7SUFDM0IsbUNBQXlCOztJQUN6QixpQ0FBd0I7O0lBQ3hCLHVDQUEwQzs7SUFDMUMsb0NBQTZCOztJQUM3QixvQ0FBMkI7O0lBQzNCLDBDQUFpQzs7SUFDakMsdUNBQThCOztJQUM5QixtQ0FBcUM7O0lBQ3JDLG1DQUEwQjs7SUFHMUIsb0NBQW9EOztJQUNwRCxrQ0FBZ0Q7O0lBR2hELHFDQUFvQjs7SUFDcEIsc0NBQTZCOztJQUM3QixpQ0FBMkM7O0lBQzNDLHNDQUFpQjs7SUFDakIsb0NBQWU7O0lBQ2YsMENBQStCOztJQU03QixtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtEZWZhdWx0RmlsdGVyT3B0aW9ufSBmcm9tICcuL2ZpbHRlci1vcHRpb24vZGVmYXVsdC1maWx0ZXItb3B0aW9uJztcclxuaW1wb3J0IHtEYXRlRmlsdGVyT3B0aW9ufSBmcm9tICcuL2ZpbHRlci1vcHRpb24vZGF0ZS1maWx0ZXItb3B0aW9uJztcclxuaW1wb3J0IHtERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9jb21waWxlcl9mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XHJcbiAgYWN0aXZlOiBzdHJpbmc7XHJcbiAgZmlsdGVyOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cclxuICogRGVmaW5lcyBhIHNldCBvZiBjZWxscyBhbmQgb3B0aW9uYWwgZmlsdGVycyBhdmFpbGFibGUgZm9yIGEgdGFibGUgY29sdW1uLlxyXG4gKlxyXG4gKiAyMi4wNi4yMDE5IG9mc2Zydm9yIC0gQWRkZWQgc3VwcG9ydCBmb3IgZGlmZmVyZW50IGZpbHRlciBvcGVyYXRvcnMuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBBZGRlZCBvdGhlciBpbnB1dCBtZW1iZXJzIChhdHRyaWJ1dGUsIGxvb2tBdHRyaWJ1dGUsIGxvb2t1cEVudGl0eSwgZGF0YVR5cGUsIG9wZXJhdG9yKVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxpbmcgY29udHJvbCBvZiB0aGUgZmlsdGVyIGZyb20gdGhlIEhUTUwgdGFnLlxyXG4gKiAyMy4wNi4yMDE5IG9mc2Zydm9yIC0gQWRkZWQgZGF0ZUZpbHRlclRlbXBsYXRlLiBBY3RpdmF0ZSBkYXRlRmlsdGVyVGVtcGxhdGUgYnkgc2V0dGluZyBpbnB1dCBtZW1iZXIgdGVtcGxhdGVOYW1lLlxyXG4gKiAyNC4wNi4yMDE5IG9mc2Zydm9yIC0gSWYgZGF0YVR5cGUgaXMgTG9uZywgSW50ZWdlciBvciBCaWdEZWNpbWFsLCBzZXQgaW5wdXQgZmllbGQgdHlwZSB0byBudW1iZXIuIFNldCBkZWZhdWx0IGRhdGFUeXBlIHRvIFN0cmluZy5cclxuICogICAgICAgICAgICAgICAgICAgICAgIFVzaW5nIG1vbWVudCB0byBjb252ZXJ0IGRhdGVTdHJpbmcgdG8gZGF0ZSBvYmplY3QuXHJcbiAqXHJcbiAqIFRPRE8gQXV0b21hdGljYWxseSBmb3JjZSBjdXJzb3IgdG8gaW5wdXQgZmllbGQgd2hlbiB0ZW1wbGF0ZSBpcyBvcGVuZWRcclxuICogVE9ETyBOZWVkIHRvIGltcGxlbWVudCBsYW5ndWFnZSB0cmFuc2xhdGlvbiBmb3IgdGhlIG9wZXJhdG9yIGxhYmVscy5cclxuICogVE9ETyBMaXN0IGZpbHRlciBvcHRpb25zIGFyZSBub3QgdW5jaGVja2VkIHdoZW4gbGlzdCB0eXBlIGZpbHRlciBpcyByZW1vdmVkXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWNvbHVtbidcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9GSUxURVJfVEVNUExBVEU6IHN0cmluZyA9ICdkZWZhdWx0RmlsdGVyVGVtcGxhdGUnO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREFURV9GSUxURVJfVEVNUExBVEU6IHN0cmluZyA9ICdkYXRlRmlsdGVyVGVtcGxhdGUnO1xyXG5cclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSB0ZW1wbGF0ZU5hbWU6IHN0cmluZyA9IENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTtcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXHJcbiAgQElucHV0KCkgZmlsdGVyYWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgnaW5zdGFudC1zdHlsZScpIGluc3RhbnRTdHlsZSA9IHt9O1xyXG4gIEBJbnB1dCgpIG9wZXJhdG9yczogc3RyaW5nW107XHJcbiAgQElucHV0KCkgYXR0cmlidXRlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9va3VwQXR0cmlidXRlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9va3VwRW50aXR5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGF0YVR5cGU6IHN0cmluZyA9ICdTdHJpbmcnO1xyXG4gIEBJbnB1dCgpIG9wZXJhdG9yOiBzdHJpbmc7XHJcblxyXG4gIC8vIFRlbXBsYXRlIHJlZnNcclxuICBAQ29udGVudENoaWxkKCdmaWx0ZXInKSBmaWx0ZXJSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8vIEZpbHRlciBwcm9wZXJ0aWVzXHJcbiAgZmlsdGVyT3BlbjogYm9vbGVhbjtcclxuICBpc0ZpbHRlclNldDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGZpbHRlciA9IG5ldyBSZXBsYXlTdWJqZWN0PENvbHVtbkZpbHRlcj4oKTtcclxuICBmaWx0ZXJWYWx1ZTogYW55O1xyXG4gIG9sZEZpbHRlcjogYW55O1xyXG4gIGluaXRpYWxPcGVyYXRvcjogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lID09IG51bGwpIHtcclxuICAgICAgdGhpcy50ZW1wbGF0ZU5hbWUgPSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGRlZmF1bHQgb3BlcmF0b3IgbGlzdCAoaWYgbm90IGFscmVhZHkgc2V0KVxyXG4gICAgc3dpdGNoICh0aGlzLnRlbXBsYXRlTmFtZSkge1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzID8gdGhpcy5vcGVyYXRvcnMgOiBbJ0NPTlRBSU5TJywgJ1NUQVJUU19XSVRIJywgJ0VORFNfV0lUSCcsICdFUVVBTFMnLCAnTk9UX0VRVUFMUycsICdNQVRDSF9XT1JEUycsICdJU19OVUxMJywgJ0lTX05PVF9OVUxMJ107XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3IgPyB0aGlzLm9wZXJhdG9yIDogJ0NPTlRBSU5TJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREFURV9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9wZXJhdG9ycyA/IHRoaXMub3BlcmF0b3JzIDogWydJU19OVUxMJywgJ0lTX05PVF9OVUxMJ107XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3IgPyB0aGlzLm9wZXJhdG9yIDogJ0VRVUFMUyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5pdGlhbE9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZGlyZWN0bHkgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlLlxyXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xyXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmaWx0ZXIgVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBzZXRGaWx0ZXIoZmlsdGVyOiBhbnksIG5vRW1pdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBGaWx0ZXIgaXMgb2JqZWN0ID0+IG92ZXJyaWRlIGZpbHRlciBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2F0dHJpYnV0ZScpICYmIGZpbHRlci5hdHRyaWJ1dGUgJiYgZmlsdGVyLmF0dHJpYnV0ZSAhPT0gdGhpcy5hdHRyaWJ1dGUgPyBmaWx0ZXIuYXR0cmlidXRlIDogdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICAgICAgdGhpcy5sb29rdXBBdHRyaWJ1dGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2xvb2t1cEF0dHJpYnV0ZScpICYmIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgJiYgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSAhPT0gdGhpcy5sb29rdXBBdHRyaWJ1dGUgPyBmaWx0ZXIubG9va3VwQXR0cmlidXRlIDogdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICAgICAgdGhpcy5sb29rdXBFbnRpdHkgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2xvb2t1cEVudGl0eScpICYmIGZpbHRlci5sb29rdXBFbnRpdHkgJiYgZmlsdGVyLmxvb2t1cEVudGl0eSAhPT0gdGhpcy5sb29rdXBFbnRpdHkgPyBmaWx0ZXIubG9va3VwRW50aXR5IDogdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSAmJiBmaWx0ZXIub3BlcmF0b3IgJiYgZmlsdGVyLm9wZXJhdG9yICE9PSB0aGlzLm9wZXJhdG9yID8gZmlsdGVyLm9wZXJhdG9yIDogdGhpcy5vcGVyYXRvcjtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdkYXRhVHlwZScpICYmIGZpbHRlci5kYXRhVHlwZSAmJiBmaWx0ZXIuZGF0YVR5cGUgIT09IHRoaXMuZGF0YVR5cGUgPyBmaWx0ZXIuZGF0YVR5cGUgOiB0aGlzLmRhdGFUeXBlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEZpbHRlciBpcyBwcmltaXRpdmUgPT4gY29udmVydCB0byBkZWZhdWx0IGZpbHRlciBvcHRpb25cclxuICAgICAgICBmaWx0ZXIgPSB0aGlzLmNvbnZlcnRQcmltaXRpdmVUb0ZpbHRlcihmaWx0ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIsIG5vRW1pdCk7XHJcblxyXG4gICAgLy8gSGF2ZSB0byBkbyBhIG51bGwgY2hlY2sgb24gZmlsdGVyIGlmIHRoZSBmaWx0ZXIgaXMgdG8gYmUgZW1pdHRlZFxyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IG5vRW1pdCA9PT0gdHJ1ZSA/IGZpbHRlciAhPT0gbnVsbCA6IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgZmlsdGVyOiBEZWZhdWx0RmlsdGVyT3B0aW9uID0gbmV3IERlZmF1bHRGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIua2V5ID0ga2V5O1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyVmFsdWUoZmlsdGVyOiBhbnksIG5vRW1pdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoKGZpbHRlciAhPT0gdGhpcy5vbGRGaWx0ZXIpIHx8IChmaWx0ZXIgPT09IG51bGwpKSB7XHJcbiAgICAgIC8vIENsb25lIGN1cnJlbnQgZmlsdGVyIHRvIG9sZCBmaWx0ZXJcclxuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGZpbHRlcjtcclxuICAgICAgaWYgKCFub0VtaXQpIHtcclxuICAgICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBmaWx0ZXJ9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF5cyhkYXlzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuZGF5cyA9IGRheXM7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBzZXRGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmZyb21EYXRlID0gdGhpcy50b0RiRGF0ZVN0cmluZyhkYXRlKTtcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHNldFRvRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLnRvRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvRGJEYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgaWYgKGRhdGUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgJ2RkLU1NLXl5eXknKTtcclxuICAgIHJldHVybiBkYXRlU3RyaW5nO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldE9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgIGlmICh0aGlzLmZpbHRlclZhbHVlICYmICh0eXBlb2YodGhpcy5maWx0ZXJWYWx1ZSkgPT09ICdvYmplY3QnKSkge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIobnVsbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWx0ZXIoKSB7XHJcbiAgICAvLyBEZWZhdWx0IG9wZXJhdG9yIGJhY2sgdG8gQ09OVEFJTlNcclxuICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLmluaXRpYWxPcGVyYXRvciA/IHRoaXMuaW5pdGlhbE9wZXJhdG9yIDogJ0NPTlRBSU5TJztcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19