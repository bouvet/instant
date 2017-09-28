import { Http } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Sort, MdSort } from '@angular/material';
import { Observable, Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
/**
 *
 */
export interface FilterOption {
  active: string;
  filter: any;
}

export interface ChangeEvent {
  [event: string]: {
    active: string,
    direction?: 'asc' | 'desc' | '',
    filter?: any
  };
}

/**
 * This is the object the MD Table actually uses.
 * It holds an `InstantDatabase` object, and deliveres
 * living data from this object to the grid.
 */
export class InstantDataSource<T> extends DataSource<T> {
  constructor(public db: InstantDatabase<T>) {
    super();
  }
  connect(): Observable<T[]> {
    return this.db.dataChange;
  }
  disconnect() {}
}

/**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 */
export abstract class InstantDatabase<T> {
  sortChange: EventEmitter<Sort>;
  filterChange: Observable<FilterOption> = new BehaviorSubject(null);

  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  onInit() {
    this.onRead();
  }
  onRead(sort?: Sort, filter?: FilterOption) {}

  _configure(args: Partial<InstantDatabase<T>>) {
    Object.assign(this, args);

    // On any changes, read data
    let sort; let filter;
    this.onClientChange().subscribe(result => {
      sort   = result.sort   || sort;   // Cache previous value
      filter = result.filter || filter; // Cache previous value
      this.onRead(sort, filter);
    });

    // Attached to a grid. Run init
    if (this.onInit) { this.onInit(); }
  }


  onClientChange(): Observable<ChangeEvent> {
    return Observable.merge(
      this.sortChange.distinctUntilChanged().map(s => ({sort: s})),
      this.filterChange.distinctUntilChanged().map(f => ({filter: f}))
    );
  }
}

