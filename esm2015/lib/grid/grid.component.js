/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import '../closest-polyfill';
import { Component, Input, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { InstantDataSource } from './datasource';
import { ColumnDirective } from './column.directive';
/**
 * @record
 */
export function RowClickEvent() { }
/** @type {?} */
RowClickEvent.prototype.data;
/** @type {?} */
RowClickEvent.prototype.colName;
export class GridComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.rowClicked = new EventEmitter();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set displayedColumns(v) { this._displayedColumns = v; }
    /**
     * @return {?}
     */
    get displayedColumns() {
        return this._displayedColumns = this._displayedColumns || (this.columns ? this.columns.map(c => c.name) : null);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.columns && this.columns.length) {
            this.dataSource.db._configure({
                sortChange: this.sort.sortChange,
                filterChange: merge(...this.columns.map(c => c.filter))
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptions && this.subscriptions.length) {
            this.subscriptions.map(f => f.unsubscribe());
        }
    }
    /**
     * @param {?} row
     * @param {?} $event
     * @return {?}
     */
    onRowClicked(row, $event) {
        if ($event.target.closest('instant-grid-row-menu') === null) {
            /** @type {?} */
            const cellName = [].slice.call($event.target.closest('mat-cell').classList)
                .find(c => c.indexOf('mat-column-') > -1)
                .substr('mat-column-'.length);
            this.rowClicked.emit({ data: row, colName: cellName });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        /** @type {?} */
        const headersToClose = [].slice
            .call(this.elRef.nativeElement.querySelectorAll('mat-header-cell'))
            .filter(b => !b.contains($event.target))
            .map(b => [].slice.call(b.classList).find(c => c.indexOf('mat-column-') > -1).substr('mat-column-'.length));
        // If any columns (not including current target) is marked as open close it.
        this.columns.filter(c => headersToClose.includes(c.name)).forEach(c => c.filterOpen = false);
    }
    /**
     * @param {?} $event
     * @param {?} menuTrigger
     * @return {?}
     */
    checkClose($event, menuTrigger) {
        if ($event.key === 'Enter') {
            menuTrigger.closeMenu();
        }
    }
}
GridComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid',
                template: `<mat-table #table [dataSource]="dataSource" matSort>
  <ng-container *ngFor="let col of columns" [matColumnDef]="col.name">
    <!-- Header definition -->
    <mat-header-cell *matHeaderCellDef>
      <header>
        <div class="action" *ngIf="col.filterable != false">
          <mat-menu #appMenu="matMenu">
            <ng-container *ngIf="col.filterRef; else defaultFilterTemplate">
              <ng-container *ngTemplateOutlet="col.filterRef;context:{col:col}"></ng-container>
            </ng-container>

            <ng-template #defaultFilterTemplate>
              <mat-form-field class="no-padding">
                <input matInput placeholder="Filter" (click)="$event.stopPropagation()" (keyup)="checkClose($event, menuTrigger)"  [(ngModel)]="col.filterValue" [ngModelOptions]="{standalone:true}" (change)="col.setFilter(col.filterValue)">
                <button mat-icon-button matSuffix (click)="col.setFilter(undefined)">
                  <i class="fa far fa-times fa-fw"></i>
                </button>
              </mat-form-field>
            </ng-template>
          </mat-menu>
          <button mat-icon-button [matMenuTriggerFor]="appMenu" #menuTrigger="matMenuTrigger">
            <ng-container *ngIf="col.filterValue == null || col.filterValue == ''">
              <svg class="filter-icon no-filter-set" data-name="No filter set" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.06 24.12">
                <title>No filter set</title>
                <polygon class="cls-1" points="10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93"
                />
                <path class="cls-2" d="M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z"
                />
              </svg>
            </ng-container>
            <ng-container *ngIf="col.filterValue != null && col.filterValue != ''">
              <svg class="filter-icon filter-set" data-name="Filter set" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.06 24.12">
                <title>Filter set</title>
                <polygon class="cls-2" points="20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42"
                />
              </svg>
            </ng-container>
          </button>
        </div>
        <div mat-sort-header class="flex-col" role="heading" *ngIf="col.sortable != false">
          {{ col.label }}
        </div>
        <div class="flex-col" role="heading" *ngIf="col.sortable == false">
          {{ col.label }}
        </div>
      </header>
    </mat-header-cell>

    <!-- Cell definition -->
    <mat-cell *matCellDef="let element">
      <ng-container *ngIf="col.cellRef; else defaultCellTemplate">
        <ng-container *ngTemplateOutlet="col.cellRef;context:{row:element,col:col.name}"></ng-container>
      </ng-container>

      <ng-template #defaultCellTemplate>
        {{ element[col.name] }}
      </ng-template>
    </mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns;let index=index;"
           [ngClass]="{highlight: index === selectedIndex}"
           [attr.data-rowIndex]="index"
           (click)="onRowClicked(row, $event)"></mat-row>
</mat-table>
`,
                styles: [`[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}`]
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: ElementRef }
];
GridComponent.propDecorators = {
    dataSource: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnDirective,] }],
    rowClicked: [{ type: Output }],
    sort: [{ type: ViewChild, args: [MatSort,] }],
    displayedColumns: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    GridComponent.prototype.dataSource;
    /** @type {?} */
    GridComponent.prototype.selectedIndex;
    /** @type {?} */
    GridComponent.prototype.columns;
    /** @type {?} */
    GridComponent.prototype.rowClicked;
    /** @type {?} */
    GridComponent.prototype.sort;
    /** @type {?} */
    GridComponent.prototype._displayedColumns;
    /** @type {?} */
    GridComponent.prototype.subscriptions;
    /** @type {?} */
    GridComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBK0IsWUFBWSxFQUN2RixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBbUIsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7QUE2RXJELE1BQU07Ozs7SUFlSixZQUFtQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzBCQVhiLElBQUksWUFBWSxFQUFpQjtLQVdmOzs7OztJQVB6QyxJQUNJLGdCQUFnQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFDdkQsSUFBSSxnQkFBZ0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakg7Ozs7SUFLRCxrQkFBa0I7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMs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Q0FBQyw0c0NBQTRzQyxDQUFDO2FBQ3Z0Qzs7OztZQWxGQyxVQUFVOzs7eUJBb0ZULEtBQUs7NEJBQ0wsS0FBSztzQkFDTCxlQUFlLFNBQUMsZUFBZTt5QkFDL0IsTUFBTTttQkFDTixTQUFTLFNBQUMsT0FBTzsrQkFHakIsS0FBSztzQkFrQ0wsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbG9zZXN0LXBvbHlmaWxsJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciAgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XG4gIGRhdGE6IGFueTtcbiAgY29sTmFtZTogc3RyaW5nO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRhYmxlICN0YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCIgbWF0U29ydD5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbC5uYW1lXCI+XG4gICAgPCEtLSBIZWFkZXIgZGVmaW5pdGlvbiAtLT5cbiAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvblwiICpuZ0lmPVwiY29sLmZpbHRlcmFibGUgIT0gZmFsc2VcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2FwcE1lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmZpbHRlclJlZjsgZWxzZSBkZWZhdWx0RmlsdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5maWx0ZXJSZWY7Y29udGV4dDp7Y29sOmNvbH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwibm8tcGFkZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIkZpbHRlclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiAoa2V5dXApPVwiY2hlY2tDbG9zZSgkZXZlbnQsIG1lbnVUcmlnZ2VyKVwiICBbKG5nTW9kZWwpXT1cImNvbC5maWx0ZXJWYWx1ZVwiIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTp0cnVlfVwiIChjaGFuZ2UpPVwiY29sLnNldEZpbHRlcihjb2wuZmlsdGVyVmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZClcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmFyIGZhLXRpbWVzIGZhLWZ3XCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJhcHBNZW51XCIgI21lbnVUcmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wuZmlsdGVyVmFsdWUgPT0gbnVsbCB8fCBjb2wuZmlsdGVyVmFsdWUgPT0gJydcIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImZpbHRlci1pY29uIG5vLWZpbHRlci1zZXRcIiBkYXRhLW5hbWU9XCJObyBmaWx0ZXIgc2V0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQuMDYgMjQuMTJcIj5cbiAgICAgICAgICAgICAgICA8dGl0bGU+Tm8gZmlsdGVyIHNldDwvdGl0bGU+XG4gICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XCJjbHMtMVwiIHBvaW50cz1cIjEwLjMgMTkuOTMgMTAuMyAxMi45NCA0LjQ2IDUuODcgMTkuNDMgNS44NyAxMy41OCAxMy4wNSAxMy41OCAxOS45MyAxMC4zIDE5LjkzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE4LjQ4LDYuMzJsLTUuMTUsNi4zMi0uMi4yNXY2LjU4SDEwLjc1VjEyLjc4bC0uMjEtLjI2TDUuNDIsNi4zMkgxOC40OG0xLjktLjlIMy41TDkuODQsMTMuMXY3LjI4SDE0VjEzLjIxbDYuMzUtNy43OVpcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmZpbHRlclZhbHVlICE9IG51bGwgJiYgY29sLmZpbHRlclZhbHVlICE9ICcnXCI+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJmaWx0ZXItaWNvbiBmaWx0ZXItc2V0XCIgZGF0YS1uYW1lPVwiRmlsdGVyIHNldFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0LjA2IDI0LjEyXCI+XG4gICAgICAgICAgICAgICAgPHRpdGxlPkZpbHRlciBzZXQ8L3RpdGxlPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwiY2xzLTJcIiBwb2ludHM9XCIyMC4zIDUuNDIgMy40MiA1LjQyIDkuNzcgMTMuMSA5Ljc3IDIwLjM4IDEzLjk2IDIwLjM4IDEzLjk2IDEzLjIxIDIwLjMgNS40MlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgbWF0LXNvcnQtaGVhZGVyIGNsYXNzPVwiZmxleC1jb2xcIiByb2xlPVwiaGVhZGluZ1wiICpuZ0lmPVwiY29sLnNvcnRhYmxlICE9IGZhbHNlXCI+XG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2xcIiByb2xlPVwiaGVhZGluZ1wiICpuZ0lmPVwiY29sLnNvcnRhYmxlID09IGZhbHNlXCI+XG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgPC9tYXQtaGVhZGVyLWNlbGw+XG5cbiAgICA8IS0tIENlbGwgZGVmaW5pdGlvbiAtLT5cbiAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5jZWxsUmVmOyBlbHNlIGRlZmF1bHRDZWxsVGVtcGxhdGVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5jZWxsUmVmO2NvbnRleHQ6e3JvdzplbGVtZW50LGNvbDpjb2wubmFtZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDZWxsVGVtcGxhdGU+XG4gICAgICAgIHt7IGVsZW1lbnRbY29sLm5hbWVdIH19XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbWF0LWNlbGw+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gIDxtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO2xldCBpbmRleD1pbmRleDtcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7aGlnaGxpZ2h0OiBpbmRleCA9PT0gc2VsZWN0ZWRJbmRleH1cIlxuICAgICAgICAgICBbYXR0ci5kYXRhLXJvd0luZGV4XT1cImluZGV4XCJcbiAgICAgICAgICAgKGNsaWNrKT1cIm9uUm93Q2xpY2tlZChyb3csICRldmVudClcIj48L21hdC1yb3c+XG48L21hdC10YWJsZT5cbmAsXG4gIHN0eWxlczogW2Bbcm9sZT1jb2x1bW5oZWFkZXJdIGhlYWRlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfVtyb2xlPWNvbHVtbmhlYWRlcl06aG92ZXIgLmFjdGlvbj5idXR0b257dmlzaWJpbGl0eTp2aXNpYmxlfVtyb2xlPWNvbHVtbmhlYWRlcl0gW3JvbGU9aGVhZGluZ117ZmxleDoxfTpob3N0LnN0cmlwZWQgW3JvbGU9cm93XTpudGgtY2hpbGQoZXZlbil7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMil9OjpuZy1kZWVwIC5tYXQtdGFibGV7ZGlzcGxheTp0YWJsZSFpbXBvcnRhbnQ7d2lkdGg6MTAwJX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3csOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3d7ZGlzcGxheTp0YWJsZS1yb3c7cGFkZGluZzowO2JvcmRlcjpub25lfTo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtaGVhZGVyLWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtaGVhZGVyLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsO2hlaWdodDo0OHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4xMik7cGFkZGluZy1sZWZ0OjNweH06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbHtib3JkZXItbGVmdDoxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpfTo6bmctZGVlcCAubm8tcGFkZGluZ3ttYXgtaGVpZ2h0OjNyZW07cGFkZGluZzowIDE2cHg7b3ZlcmZsb3c6aGlkZGVufTo6bmctZGVlcCAubWF0LWNvbHVtbi1hY3Rpb25ze292ZXJmbG93OmluaXRpYWx9OjpuZy1kZWVwIC5tYXQtY29sdW1uLWFjdGlvbnMgLm1hdC1jYXJkLDo6bmctZGVlcCAubWF0LWNvbHVtbi1hY3Rpb25zIG1hdC1jYXJke3Bvc2l0aW9uOmFic29sdXRlfS5hY3Rpb24gbWF0LW1lbnV7cGFkZGluZzowfS5hY3Rpb24gbWF0LW1lbnUgbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJTtwYWRkaW5nOjA7bWFyZ2luOjB9Lm1hdC1pY29uLWJ1dHRvbnt3aWR0aDoxOHB4fS5maWx0ZXItaWNvbiAuY2xzLTF7ZmlsbDojZmZmfS5maWx0ZXItaWNvbiAuY2xzLTJ7ZmlsbDojMWQxZDFifWBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHsgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHY7IH1cbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fCAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cblxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZS5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgnbWF0LWNlbGwnKS5jbGFzc0xpc3QpXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7ZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZX0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWhlYWRlci1jZWxsJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cbiAgICAgIC5tYXAoYiA9PiBbXS5zbGljZS5jYWxsKGIuY2xhc3NMaXN0KS5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCkpO1xuXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxuICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKS5mb3JFYWNoKGMgPT4gYy5maWx0ZXJPcGVuID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==