import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { DataSource } from '@angular/cdk/collections';
import { Sort, PageEvent } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { InstantDataSource, InstantDatabase, Sorter, Filter } from '../grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentPage = 0;
  pageSize = 10;
  total = 0;
  sort: Sorter;
  filter: Filter;
  data: InstantDataSource<any>;

  constructor() {  }

  ngOnInit() {
    const me = this;
    this.data = new InstantDataSource(new class extends InstantDatabase<any> {
      onRead (sort?: Sorter, filter?: Filter) {
        me.sort = sort;
        me.filter = filter;
        me.loadData();
      }
    });
  }

  onPage($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadData();
  }

  loadData() {
    // Load data
    const data = [
      {id: 0, name: 'test'},
      {id: 1, name: 'tester'},
      {id: 2, name: 'test igjen'},
      {id: 3, name: 'ny test'},
    ];
    this.data.db.dataChange.next(data);
    this.total = data.length;
  }
}
