import { Component, OnInit } from '@angular/core';
import { Sort, PageEvent, MatPaginatorIntl } from '@angular/material';

import { InstantDataSource, InstantDatabase, Sorter, Filter, RowClickEvent } from 'instant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.scss']
})
export class DemoGridComponent implements OnInit {
  currentPage = 0;
  pageSize = 10;
  total = 0;
  sort: Sorter;
  filter: Filter;
  data: InstantDataSource<any>;

  currentIndex = 1;

  constructor(private paginatorIntl: MatPaginatorIntl, private router: Router, private route: ActivatedRoute) { }

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
        me.sort = sort; me.filter = filter;
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
      {id: 4, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 5, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 6, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 7, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 8, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 9, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 10, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 11, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 12, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 13, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 14, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 15, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 16, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 17, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 18, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 19, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 20, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 21, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 22, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 23, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 24, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 25, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 26, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 27, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 28, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 29, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 30, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 31, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 32, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 33, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 34, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 35, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
    ];
    setTimeout(() => {
      // setTimeout in order to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.total = data.length;
      this.data.db.dataChange.next(data);
    });
  }

  rowClicked(row: RowClickEvent) {
    console.log('From col: ', row.colName, row.data);
    this.router.navigate([row.colName], {relativeTo: this.route});
  }
}
