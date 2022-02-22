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
 * 22.02.2022 ofsfrvor - Added boolean input members ignoreCase and upperCase.
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
                this.ignoreCase = filter.hasOwnProperty('ignoreCase') && filter.ignoreCase && filter.ignoreCase !== this.ignoreCase ? filter.ignoreCase : this.ignoreCase;
                this.upperCase = filter.hasOwnProperty('upperCase') && filter.upperCase && filter.upperCase !== this.upperCase ? filter.upperCase : this.upperCase;
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
        filter.ignoreCase = this.ignoreCase;
        filter.upperCase = this.upperCase;
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
        filter.ignoreCase = this.ignoreCase;
        filter.upperCase = this.upperCase;
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
        filter.ignoreCase = this.ignoreCase;
        filter.upperCase = this.upperCase;
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
        filter.ignoreCase = this.ignoreCase;
        filter.upperCase = this.upperCase;
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
    ignoreCase: [{ type: Input }],
    upperCase: [{ type: Input }],
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
    ColumnDirective.prototype.ignoreCase;
    /** @type {?} */
    ColumnDirective.prototype.upperCase;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUdwRSxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsOEJBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCZCxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFxQzFCLFlBQ1UsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7UUFoQ25CLGlCQUFZLEdBQVcsZUFBZSxDQUFDLHVCQUF1QixDQUFDOztRQUcvRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNBLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBS2pDLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFXckMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksYUFBYSxFQUFnQixDQUFDO1FBRzNDLG9CQUFlLEdBQVcsSUFBSSxDQUFDO0lBTzNCLENBQUM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLHVCQUF1QixDQUFDO1NBQzdEO1FBRUQsaURBQWlEO1FBQ2pELFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QixLQUFLLGVBQWUsQ0FBQyx1QkFBdUI7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUMzRCxNQUFNO1lBQ1IsS0FBSyxlQUFlLENBQUMsb0JBQW9CO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM5RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDekQsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7Ozs7SUFTRCxTQUFTLENBQUMsTUFBVyxFQUFFLFNBQWtCLEtBQUs7UUFDNUMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuSixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxNQUFNLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDN0wsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN4SyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzVJLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDNUksSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUMxSixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDcEo7aUJBQU07Z0JBQ0wsMERBQTBEO2dCQUMxRCxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwQyxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUQsQ0FBQzs7Ozs7SUFFRCx3QkFBd0IsQ0FBQyxHQUFXOztjQUM1QixNQUFNLEdBQXdCLElBQUksbUJBQW1CLEVBQUU7UUFDN0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxNQUFXLEVBQUUsU0FBa0IsS0FBSztRQUNqRCxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNwRCxxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0Y7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxvQkFBb0IsRUFBRTtZQUM5QyxPQUFPO1NBQ1I7O2NBRUssTUFBTSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLEVBQUU7UUFDaEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBVTtRQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssb0JBQW9CLEVBQUU7WUFDOUMsT0FBTztTQUNSOztjQUVLLE1BQU0sR0FBUSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixFQUFFO1FBQ2hGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxJQUFVO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxvQkFBb0IsRUFBRTtZQUM5QyxPQUFPO1NBQ1I7O2NBRUssTUFBTSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLEVBQUU7UUFDaEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sY0FBYyxDQUFDLElBQVU7UUFDL0IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O2NBRUssVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUM7UUFDOUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFHRCxXQUFXLENBQUMsUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDdEM7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOztBQXZNc0IsdUNBQXVCLEdBQVcsdUJBQXVCLENBQUM7QUFDMUQsb0NBQW9CLEdBQVcsb0JBQW9CLENBQUM7O1lBUDVFLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQTlCUSxRQUFROzs7MkJBcUNkLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUssU0FBQyxlQUFlO3dCQUNyQixLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBR0wsWUFBWSxTQUFDLFFBQVE7c0JBQ3JCLFlBQVksU0FBQyxNQUFNOzs7O0lBdEJwQix3Q0FBaUY7O0lBQ2pGLHFDQUEyRTs7SUFHM0UsdUNBQXdFOztJQUN4RSwrQkFBc0I7O0lBQ3RCLGdDQUF1Qjs7SUFDdkIscUNBQTJCOztJQUMzQixtQ0FBeUI7O0lBQ3pCLGlDQUF3Qjs7SUFDeEIsdUNBQTBDOztJQUMxQyxvQ0FBNkI7O0lBQzdCLG9DQUEyQjs7SUFDM0IsMENBQWlDOztJQUNqQyx1Q0FBOEI7O0lBQzlCLG1DQUFxQzs7SUFDckMsbUNBQTBCOztJQUMxQixxQ0FBNkI7O0lBQzdCLG9DQUE0Qjs7SUFHNUIsb0NBQW9EOztJQUNwRCxrQ0FBZ0Q7O0lBR2hELHFDQUFvQjs7SUFDcEIsc0NBQTZCOztJQUM3QixpQ0FBMkM7O0lBQzNDLHNDQUFpQjs7SUFDakIsb0NBQWU7O0lBQ2YsMENBQStCOztJQU03QixtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtEZWZhdWx0RmlsdGVyT3B0aW9ufSBmcm9tICcuL2ZpbHRlci1vcHRpb24vZGVmYXVsdC1maWx0ZXItb3B0aW9uJztcclxuaW1wb3J0IHtEYXRlRmlsdGVyT3B0aW9ufSBmcm9tICcuL2ZpbHRlci1vcHRpb24vZGF0ZS1maWx0ZXItb3B0aW9uJztcclxuaW1wb3J0IHtERUZBVUxUX1BBQ0tBR0VfVVJMX1BST1ZJREVSfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9jb21waWxlcl9mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XHJcbiAgYWN0aXZlOiBzdHJpbmc7XHJcbiAgZmlsdGVyOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cclxuICogRGVmaW5lcyBhIHNldCBvZiBjZWxscyBhbmQgb3B0aW9uYWwgZmlsdGVycyBhdmFpbGFibGUgZm9yIGEgdGFibGUgY29sdW1uLlxyXG4gKlxyXG4gKiAyMi4wNi4yMDE5IG9mc2Zydm9yIC0gQWRkZWQgc3VwcG9ydCBmb3IgZGlmZmVyZW50IGZpbHRlciBvcGVyYXRvcnMuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBBZGRlZCBvdGhlciBpbnB1dCBtZW1iZXJzIChhdHRyaWJ1dGUsIGxvb2tBdHRyaWJ1dGUsIGxvb2t1cEVudGl0eSwgZGF0YVR5cGUsIG9wZXJhdG9yKVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxpbmcgY29udHJvbCBvZiB0aGUgZmlsdGVyIGZyb20gdGhlIEhUTUwgdGFnLlxyXG4gKiAyMy4wNi4yMDE5IG9mc2Zydm9yIC0gQWRkZWQgZGF0ZUZpbHRlclRlbXBsYXRlLiBBY3RpdmF0ZSBkYXRlRmlsdGVyVGVtcGxhdGUgYnkgc2V0dGluZyBpbnB1dCBtZW1iZXIgdGVtcGxhdGVOYW1lLlxyXG4gKiAyNC4wNi4yMDE5IG9mc2Zydm9yIC0gSWYgZGF0YVR5cGUgaXMgTG9uZywgSW50ZWdlciBvciBCaWdEZWNpbWFsLCBzZXQgaW5wdXQgZmllbGQgdHlwZSB0byBudW1iZXIuIFNldCBkZWZhdWx0IGRhdGFUeXBlIHRvIFN0cmluZy5cclxuICogICAgICAgICAgICAgICAgICAgICAgIFVzaW5nIG1vbWVudCB0byBjb252ZXJ0IGRhdGVTdHJpbmcgdG8gZGF0ZSBvYmplY3QuXHJcbiAqIDIyLjAyLjIwMjIgb2ZzZnJ2b3IgLSBBZGRlZCBib29sZWFuIGlucHV0IG1lbWJlcnMgaWdub3JlQ2FzZSBhbmQgdXBwZXJDYXNlLlxyXG4gKlxyXG4gKiBUT0RPIEF1dG9tYXRpY2FsbHkgZm9yY2UgY3Vyc29yIHRvIGlucHV0IGZpZWxkIHdoZW4gdGVtcGxhdGUgaXMgb3BlbmVkXHJcbiAqIFRPRE8gTmVlZCB0byBpbXBsZW1lbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gZm9yIHRoZSBvcGVyYXRvciBsYWJlbHMuXHJcbiAqIFRPRE8gTGlzdCBmaWx0ZXIgb3B0aW9ucyBhcmUgbm90IHVuY2hlY2tlZCB3aGVuIGxpc3QgdHlwZSBmaWx0ZXIgaXMgcmVtb3ZlZFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGVmYXVsdEZpbHRlclRlbXBsYXRlJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERBVEVfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGF0ZUZpbHRlclRlbXBsYXRlJztcclxuXHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgdGVtcGxhdGVOYW1lOiBzdHJpbmcgPSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU7XHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nOyAgLy8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoaXMgY29sdW1uLlxyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxyXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNvcnRhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcclxuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcclxuICBASW5wdXQoKSBvcGVyYXRvcnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEVudGl0eTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnU3RyaW5nJztcclxuICBASW5wdXQoKSBvcGVyYXRvcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGlnbm9yZUNhc2U6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdXBwZXJDYXNlOiBib29sZWFuO1xyXG5cclxuICAvLyBUZW1wbGF0ZSByZWZzXHJcbiAgQENvbnRlbnRDaGlsZCgnZmlsdGVyJykgZmlsdGVyUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xyXG4gIGZpbHRlck9wZW46IGJvb2xlYW47XHJcbiAgaXNGaWx0ZXJTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XHJcbiAgZmlsdGVyVmFsdWU6IGFueTtcclxuICBvbGRGaWx0ZXI6IGFueTtcclxuICBpbml0aWFsT3BlcmF0b3I6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMudGVtcGxhdGVOYW1lID0gQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IG9wZXJhdG9yIGxpc3QgKGlmIG5vdCBhbHJlYWR5IHNldClcclxuICAgIHN3aXRjaCAodGhpcy50ZW1wbGF0ZU5hbWUpIHtcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9wZXJhdG9ycyA/IHRoaXMub3BlcmF0b3JzIDogWydDT05UQUlOUycsICdTVEFSVFNfV0lUSCcsICdFTkRTX1dJVEgnLCAnRVFVQUxTJywgJ05PVF9FUVVBTFMnLCAnTUFUQ0hfV09SRFMnLCAnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRBVEVfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vcGVyYXRvcnMgPyB0aGlzLm9wZXJhdG9ycyA6IFsnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdFUVVBTFMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxPcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cclxuICAgKiBBbnkgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgY29sdW1uIGZpbHRlciwgbXVzdCBmaXJlIHRoaXNcclxuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZmlsdGVyIFRoZSBmaWx0ZXIgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgc2V0RmlsdGVyKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKGZpbHRlcikge1xyXG4gICAgICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIG9iamVjdCA9PiBvdmVycmlkZSBmaWx0ZXIgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdhdHRyaWJ1dGUnKSAmJiBmaWx0ZXIuYXR0cmlidXRlICYmIGZpbHRlci5hdHRyaWJ1dGUgIT09IHRoaXMuYXR0cmlidXRlID8gZmlsdGVyLmF0dHJpYnV0ZSA6IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwQXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBBdHRyaWJ1dGUnKSAmJiBmaWx0ZXIubG9va3VwQXR0cmlidXRlICYmIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgIT09IHRoaXMubG9va3VwQXR0cmlidXRlID8gZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA6IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwRW50aXR5ID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBFbnRpdHknKSAmJiBmaWx0ZXIubG9va3VwRW50aXR5ICYmIGZpbHRlci5sb29rdXBFbnRpdHkgIT09IHRoaXMubG9va3VwRW50aXR5ID8gZmlsdGVyLmxvb2t1cEVudGl0eSA6IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykgJiYgZmlsdGVyLm9wZXJhdG9yICYmIGZpbHRlci5vcGVyYXRvciAhPT0gdGhpcy5vcGVyYXRvciA/IGZpbHRlci5vcGVyYXRvciA6IHRoaXMub3BlcmF0b3I7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnZGF0YVR5cGUnKSAmJiBmaWx0ZXIuZGF0YVR5cGUgJiYgZmlsdGVyLmRhdGFUeXBlICE9PSB0aGlzLmRhdGFUeXBlID8gZmlsdGVyLmRhdGFUeXBlIDogdGhpcy5kYXRhVHlwZTtcclxuICAgICAgICB0aGlzLmlnbm9yZUNhc2UgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2lnbm9yZUNhc2UnKSAmJiBmaWx0ZXIuaWdub3JlQ2FzZSAmJiBmaWx0ZXIuaWdub3JlQ2FzZSAhPT0gdGhpcy5pZ25vcmVDYXNlID8gZmlsdGVyLmlnbm9yZUNhc2UgOiB0aGlzLmlnbm9yZUNhc2U7XHJcbiAgICAgICAgdGhpcy51cHBlckNhc2UgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ3VwcGVyQ2FzZScpICYmIGZpbHRlci51cHBlckNhc2UgJiYgZmlsdGVyLnVwcGVyQ2FzZSAhPT0gdGhpcy51cHBlckNhc2UgPyBmaWx0ZXIudXBwZXJDYXNlIDogdGhpcy51cHBlckNhc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIHByaW1pdGl2ZSA9PiBjb252ZXJ0IHRvIGRlZmF1bHQgZmlsdGVyIG9wdGlvblxyXG4gICAgICAgIGZpbHRlciA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlciwgbm9FbWl0KTtcclxuXHJcbiAgICAvLyBIYXZlIHRvIGRvIGEgbnVsbCBjaGVjayBvbiBmaWx0ZXIgaWYgdGhlIGZpbHRlciBpcyB0byBiZSBlbWl0dGVkXHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gbm9FbWl0ID09PSB0cnVlID8gZmlsdGVyICE9PSBudWxsIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnZlcnRQcmltaXRpdmVUb0ZpbHRlcihrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCBmaWx0ZXI6IERlZmF1bHRGaWx0ZXJPcHRpb24gPSBuZXcgRGVmYXVsdEZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5rZXkgPSBrZXk7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmlnbm9yZUNhc2UgPSB0aGlzLmlnbm9yZUNhc2U7XHJcbiAgICBmaWx0ZXIudXBwZXJDYXNlID0gdGhpcy51cHBlckNhc2U7XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlclZhbHVlKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKChmaWx0ZXIgIT09IHRoaXMub2xkRmlsdGVyKSB8fCAoZmlsdGVyID09PSBudWxsKSkge1xyXG4gICAgICAvLyBDbG9uZSBjdXJyZW50IGZpbHRlciB0byBvbGQgZmlsdGVyXHJcbiAgICAgIHRoaXMub2xkRmlsdGVyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWx0ZXJWYWx1ZSk7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBmaWx0ZXI7XHJcbiAgICAgIGlmICghbm9FbWl0KSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogZmlsdGVyfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbHRlck9wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldERheXMoZGF5czogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmlnbm9yZUNhc2UgPSB0aGlzLmlnbm9yZUNhc2U7XHJcbiAgICBmaWx0ZXIudXBwZXJDYXNlID0gdGhpcy51cHBlckNhc2U7XHJcbiAgICBmaWx0ZXIuZGF5cyA9IGRheXM7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBzZXRGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmlnbm9yZUNhc2UgPSB0aGlzLmlnbm9yZUNhc2U7XHJcbiAgICBmaWx0ZXIudXBwZXJDYXNlID0gdGhpcy51cHBlckNhc2U7XHJcbiAgICBmaWx0ZXIuZnJvbURhdGUgPSB0aGlzLnRvRGJEYXRlU3RyaW5nKGRhdGUpO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VG9EYXRlKGRhdGU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuaWdub3JlQ2FzZSA9IHRoaXMuaWdub3JlQ2FzZTtcclxuICAgIGZpbHRlci51cHBlckNhc2UgPSB0aGlzLnVwcGVyQ2FzZTtcclxuICAgIGZpbHRlci50b0RhdGUgPSB0aGlzLnRvRGJEYXRlU3RyaW5nKGRhdGUpO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b0RiRGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGlmIChkYXRlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZC1NTS15eXl5Jyk7XHJcbiAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICB9XHJcblxyXG5cclxuICBzZXRPcGVyYXRvcihvcGVyYXRvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSAmJiAodHlwZW9mKHRoaXMuZmlsdGVyVmFsdWUpID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKG51bGwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZSh0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVyKCkge1xyXG4gICAgLy8gRGVmYXVsdCBvcGVyYXRvciBiYWNrIHRvIENPTlRBSU5TXHJcbiAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5pbml0aWFsT3BlcmF0b3IgPyB0aGlzLmluaXRpYWxPcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKG51bGwpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdfQ==