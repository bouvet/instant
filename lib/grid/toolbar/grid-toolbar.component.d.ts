import { OnInit, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
export declare class GridToolbarComponent implements OnInit {
    page: number;
    pageChange: EventEmitter<PageEvent>;
    total: number;
    pageSize: number;
    pageSizeOptions: number[];
    constructor();
    ngOnInit(): void;
    pageHandler($event: PageEvent): void;
}
