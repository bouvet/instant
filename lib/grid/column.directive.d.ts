import { TemplateRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReplaySubject } from 'rxjs';
export interface ColumnFilter {
    active: string;
    filter: any;
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
export declare class ColumnDirective implements OnInit {
    private datePipe;
    static readonly DEFAULT_FILTER_TEMPLATE: string;
    static readonly DATE_FILTER_TEMPLATE: string;
    templateName: string;
    name: string;
    label: string;
    filterable: boolean;
    sortable: boolean;
    sticky: boolean;
    instantStyle: {};
    operators: string[];
    attribute: string;
    lookupAttribute: string;
    lookupEntity: string;
    dataType: string;
    operator: string;
    filterRef: TemplateRef<any>;
    cellRef: TemplateRef<any>;
    filterOpen: boolean;
    isFilterSet: boolean;
    filter: ReplaySubject<ColumnFilter>;
    filterValue: any;
    oldFilter: any;
    initialOperator: string;
    /**
     *
     */
    constructor(datePipe: DatePipe);
    ngOnInit(): void;
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param filter The filter as received from the filter template
     */
    setFilter(filter: any, noEmit?: boolean): void;
    convertPrimitiveToFilter(key: string): any;
    setFilterValue(filter: any, noEmit?: boolean): void;
    setFromDate(date: Date): void;
    setToDate(date: Date): void;
    private toDbDateString;
    setOperator(operator: string): void;
    removeFilter(): void;
}
