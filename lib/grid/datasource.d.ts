import { EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Sort } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { ColumnFilter } from './column.directive';
export interface ChangeEvent {
    [event: string]: {
        active: string;
        direction?: 'asc' | 'desc' | '';
        filter?: any;
    };
}
export interface Filter {
    [col: string]: any;
}
export interface Sorter {
    [col: string]: 'asc' | 'desc' | '';
}
/**
 * This is the object the Mat Table actually uses.
 * It holds an `InstantDatabase` object, and deliveres
 * living data from this object to the grid.
 */
export declare class InstantDataSource<T> extends DataSource<T> {
    db: InstantDatabase<T>;
    constructor(db: InstantDatabase<T>);
    connect(): Observable<T[]>;
    disconnect(): void;
}
/**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 */
export declare abstract class InstantDatabase<T> {
    sortChange: EventEmitter<Sort>;
    private sortCache;
    private _sortSubscriber;
    filterChange: Observable<ColumnFilter>;
    private filterCache;
    private _filterSubscriber;
    dataChange: BehaviorSubject<T[]>;
    dataSnapshot: any;
    private _dataChangeSubscriber;
    onInit(): void;
    onDestroy(): void;
    onRead(sort?: Sorter, filter?: Filter): void;
    _configure(args: Partial<InstantDatabase<T>>): void;
}
