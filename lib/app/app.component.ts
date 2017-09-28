import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { DataSource } from '@angular/cdk/collections';
import { Sort, PageEvent, MdPaginatorIntl } from '@angular/material';

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

  constructor(private paginatorIntl: MdPaginatorIntl) {  }

  ngOnInit() {
    // Translations
    // If you use ngx-translate, this would be the perfect place to do:
    //   this.paginatorIntl.label = this.translate.instant('text');
    this.paginatorIntl.itemsPerPageLabel = 'Gjenstander per side';
    this.paginatorIntl.nextPageLabel = 'Neste';
    this.paginatorIntl.previousPageLabel = 'Forrige';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return `${page} - ${pageSize} av ${length}`;
    };

    // Data provider
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
      {id: 0, name: 'test',       type: 'SOMETHING', uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 1, name: 'tester',     type: 'ANYTHING',  uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 2, name: 'test igjen', type: 'WHAT?',     uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 3, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
    ];
    setTimeout(() => {
      // setTimeout in order to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.total = data.length;
      this.data.db.dataChange.next(data);
    });
  }
}
