import { OnInit } from '@angular/core';
import { GridComponent } from '../grid.component';
export declare class GridRowMenuComponent implements OnInit {
    private grid;
    row: any;
    icon: string;
    showMenu: boolean;
    constructor(grid: GridComponent);
    ngOnInit(): void;
    onClick($event: any): void;
}
