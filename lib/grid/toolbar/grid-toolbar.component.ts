import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'instant-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.scss']
})
export class GridToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() page = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() { }

  ngOnInit() {
  }

  pageHandler($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.page = $event.pageIndex;
    this.pageChange.emit($event);
  }
}
