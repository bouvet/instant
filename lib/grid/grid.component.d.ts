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
    checkClose($event: KeyboardEvent, menuTrigger: MatMenuTrigger): void;
    onFilterChange($event: any, col: any): void;
    getFilterValue(col: any): any;
    getRowClasses(index: number): string;
    getRowStyles(index: number): string;
    removeFilters(): void;
    reload(): void;
}
