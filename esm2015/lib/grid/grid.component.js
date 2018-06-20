/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { InstantDataSource } from './datasource';
import { ColumnDirective } from './column.directive';
/**
 * @record
 */
export function RowClickEvent() { }
function RowClickEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    RowClickEvent.prototype.data;
    /** @type {?} */
    RowClickEvent.prototype.colName;
}
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
            const /** @type {?} */ cellName = [].slice.call($event.target.closest('mat-cell').classList)
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
        const /** @type {?} */ headersToClose = [].slice
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
            <i class="fa far fa-fw fa-filter"></i>
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
                styles: [`[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}`]
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
function GridComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQStCLFlBQVksRUFDdkYsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ2pDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQW1CLE1BQU0sbUJBQW1CLENBQUM7QUFDN0QsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7QUE4RHJELE1BQU07Ozs7SUFlSixZQUFtQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzBCQVhiLElBQUksWUFBWSxFQUFpQjtLQVdmOzs7OztJQVB6QyxJQUNJLGdCQUFnQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFDdkQsSUFBSSxnQkFBZ0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakg7Ozs7SUFLRCxrQkFBa0I7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxD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QUFVOzs7eUJBcUVULEtBQUs7NEJBQ0wsS0FBSztzQkFDTCxlQUFlLFNBQUMsZUFBZTt5QkFDL0IsTUFBTTttQkFDTixTQUFTLFNBQUMsT0FBTzsrQkFHakIsS0FBSztzQkFrQ0wsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFZpZXdDaGlsZCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xyXG4gIGRhdGE6IGFueTtcclxuICBjb2xOYW1lOiBzdHJpbmc7XHJcbn1cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQnLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC10YWJsZSAjdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIG1hdFNvcnQ+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbC5uYW1lXCI+XHJcbiAgICA8IS0tIEhlYWRlciBkZWZpbml0aW9uIC0tPlxyXG4gICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cclxuICAgICAgPGhlYWRlcj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uXCIgKm5nSWY9XCJjb2wuZmlsdGVyYWJsZSAhPSBmYWxzZVwiPlxyXG4gICAgICAgICAgPG1hdC1tZW51ICNhcHBNZW51PVwibWF0TWVudVwiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmZpbHRlclJlZjsgZWxzZSBkZWZhdWx0RmlsdGVyVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLmZpbHRlclJlZjtjb250ZXh0Ontjb2w6Y29sfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZpbHRlclRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cIm5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIkZpbHRlclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiAoa2V5dXApPVwiY2hlY2tDbG9zZSgkZXZlbnQsIG1lbnVUcmlnZ2VyKVwiICBbKG5nTW9kZWwpXT1cImNvbC5maWx0ZXJWYWx1ZVwiIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTp0cnVlfVwiIChjaGFuZ2UpPVwiY29sLnNldEZpbHRlcihjb2wuZmlsdGVyVmFsdWUpXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cImNvbC5zZXRGaWx0ZXIodW5kZWZpbmVkKVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS10aW1lcyBmYS1md1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L21hdC1tZW51PlxyXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFwcE1lbnVcIiAjbWVudVRyaWdnZXI9XCJtYXRNZW51VHJpZ2dlclwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS1maWx0ZXJcIj48L2k+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IG1hdC1zb3J0LWhlYWRlciBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSAhPSBmYWxzZVwiPlxyXG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSA9PSBmYWxzZVwiPlxyXG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG4gICAgPC9tYXQtaGVhZGVyLWNlbGw+XHJcblxyXG4gICAgPCEtLSBDZWxsIGRlZmluaXRpb24gLS0+XHJcbiAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmNlbGxSZWY7IGVsc2UgZGVmYXVsdENlbGxUZW1wbGF0ZVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wuY2VsbFJlZjtjb250ZXh0Ontyb3c6ZWxlbWVudCxjb2w6Y29sLm5hbWV9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q2VsbFRlbXBsYXRlPlxyXG4gICAgICAgIHt7IGVsZW1lbnRbY29sLm5hbWVdIH19XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L21hdC1jZWxsPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxyXG4gIDxtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO2xldCBpbmRleD1pbmRleDtcIlxyXG4gICAgICAgICAgIFtuZ0NsYXNzXT1cIntoaWdobGlnaHQ6IGluZGV4ID09PSBzZWxlY3RlZEluZGV4fVwiXHJcbiAgICAgICAgICAgW2F0dHIuZGF0YS1yb3dJbmRleF09XCJpbmRleFwiXHJcbiAgICAgICAgICAgKGNsaWNrKT1cIm9uUm93Q2xpY2tlZChyb3csICRldmVudClcIj48L21hdC1yb3c+XHJcbjwvbWF0LXRhYmxlPlxyXG5gLFxyXG4gIHN0eWxlczogW2Bbcm9sZT1jb2x1bW5oZWFkZXJdIGhlYWRlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfVtyb2xlPWNvbHVtbmhlYWRlcl06aG92ZXIgLmFjdGlvbj5idXR0b257dmlzaWJpbGl0eTp2aXNpYmxlfVtyb2xlPWNvbHVtbmhlYWRlcl0gW3JvbGU9aGVhZGluZ117ZmxleDoxfTpob3N0LnN0cmlwZWQgW3JvbGU9cm93XTpudGgtY2hpbGQoZXZlbil7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMil9OjpuZy1kZWVwIC5tYXQtdGFibGV7ZGlzcGxheTp0YWJsZSFpbXBvcnRhbnQ7d2lkdGg6MTAwJX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3csOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3d7ZGlzcGxheTp0YWJsZS1yb3c7cGFkZGluZzowO2JvcmRlcjpub25lfTo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtaGVhZGVyLWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtaGVhZGVyLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsO2hlaWdodDo0OHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4xMik7cGFkZGluZy1sZWZ0OjNweH06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbHtib3JkZXItbGVmdDoxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpfTo6bmctZGVlcCAubm8tcGFkZGluZ3ttYXgtaGVpZ2h0OjNyZW07cGFkZGluZzowIDE2cHg7b3ZlcmZsb3c6aGlkZGVufS5hY3Rpb24gbWF0LW1lbnV7cGFkZGluZzowfS5hY3Rpb24gbWF0LW1lbnUgbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJTtwYWRkaW5nOjA7bWFyZ2luOjB9Lm1hdC1pY29uLWJ1dHRvbnt3aWR0aDoxOHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XHJcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XHJcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xyXG5cclxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XHJcbiAgQElucHV0KClcclxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2OyB9XHJcbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8ICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpO1xyXG4gIH1cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xyXG4gICAgICAgIHNvcnRDaGFuZ2U6IHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxyXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUm93Q2xpY2tlZChyb3csICRldmVudCkge1xyXG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZS5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgnbWF0LWNlbGwnKS5jbGFzc0xpc3QpXHJcbiAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcclxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcclxuXHJcbiAgICAgIHRoaXMucm93Q2xpY2tlZC5lbWl0KHtkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljaygkZXZlbnQpIHtcclxuICAgIGNvbnN0IGhlYWRlcnNUb0Nsb3NlOiBzdHJpbmdbXSA9IFtdLnNsaWNlXHJcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xyXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWhlYWRlci1jZWxsJykpXHJcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XHJcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcclxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cclxuICAgICAgLm1hcChiID0+IFtdLnNsaWNlLmNhbGwoYi5jbGFzc0xpc3QpLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSkuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKSk7XHJcblxyXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxyXG4gICAgdGhpcy5jb2x1bW5zLmZpbHRlcihjID0+IGhlYWRlcnNUb0Nsb3NlLmluY2x1ZGVzKGMubmFtZSkpLmZvckVhY2goYyA9PiBjLmZpbHRlck9wZW4gPSBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0Nsb3NlKCRldmVudDogS2V5Ym9hcmRFdmVudCwgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyKSB7XHJcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19