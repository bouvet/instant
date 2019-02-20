import { TemplateRef, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
/**
 *
 */
export interface ColumnFilter {
    active: string;
    filter: any;
}
/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
export declare class ColumnDirective implements OnInit {
    name: string;
    label: string;
    filterable: boolean;
    sortable: boolean;
    sticky: boolean;
    filterRef: TemplateRef<any>;
    cellRef: TemplateRef<any>;
    filterOpen: boolean;
    filter: ReplaySubject<ColumnFilter>;
    filterValue: any;
    private oldFilter;
    /**
     *
     */
    constructor();
    ngOnInit(): void;
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param obj The filter as received from the filter template
     */
    setFilter(obj: any): void;
}
