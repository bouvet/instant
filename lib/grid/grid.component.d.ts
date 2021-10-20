import 'element-closest';
import { OnDestroy, AfterContentInit, ElementRef, EventEmitter } from '@angular/core';
import { MatSort, MatMenuTrigger } from '@angular/material';
import { InstantDataSource } from './datasource';
import { ColumnDirective } from './column.directive';
export interface RowClickEvent {
    data: any;
    colName: string;
}
export declare class GridComponent implements AfterContentInit, OnDestroy {
    elRef: ElementRef;
    dataSource: InstantDataSource<any>;
    selectedIndex: number;
    sticky: boolean;
    rowAttributes: Array<any>;
    columns: ColumnDirective[];
    rowClicked: EventEmitter<RowClickEvent>;
    sort: MatSort;
    _displayedColumns: string[];
    displayedColumns: string[];
    private subscriptions;
    constructor(elRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onRowClicked(row: any, $event: any): void;
    onClick($event: any): void;
    menuOpened(col: ColumnDirective): void;
    checkClose($event: KeyboardEvent, menuTrigger: MatMenuTrigger): void;
    onFilterChange($event: any, col: any): void;
    onOperatorChange(operator: string, col: any): void;
    onFromDateChange($event: any, col: any): void;
    onToDateChange($event: any, col: any): void;
    onDaysChange($event: any, col: any): void;
    getFilterValue(col: any): any;
    toDate(dateObject: any): Date;
    toNumber(value: any): number;
    getFromDate(col: any): Date;
    getToDate(col: any): Date;
    getDays(col: any): number;
    getOperator(col: any): any;
    getRowClasses(index: number): string;
    getRowStyles(index: number): string;
    removeFilter(col: any): void;
    removeFilters(): void;
    reload(): void;
}
