/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var GridComponent = /** @class */ (function () {
    function GridComponent(elRef) {
        this.elRef = elRef;
        this.rowClicked = new EventEmitter();
    }
    Object.defineProperty(GridComponent.prototype, "displayedColumns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._displayedColumns = this._displayedColumns || (this.columns ? this.columns.map(function (c) { return c.name; }) : null);
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this._displayedColumns = v; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GridComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (this.columns && this.columns.length) {
            this.dataSource.db._configure({
                sortChange: this.sort.sortChange,
                filterChange: merge.apply(void 0, tslib_1.__spread(this.columns.map(function (c) { return c.filter; })))
            });
        }
    };
    /**
     * @return {?}
     */
    GridComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions && this.subscriptions.length) {
            this.subscriptions.map(function (f) { return f.unsubscribe(); });
        }
    };
    /**
     * @param {?} row
     * @param {?} $event
     * @return {?}
     */
    GridComponent.prototype.onRowClicked = /**
     * @param {?} row
     * @param {?} $event
     * @return {?}
     */
    function (row, $event) {
        if ($event.target.closest('instant-grid-row-menu') === null) {
            var /** @type {?} */ cellName = [].slice.call($event.target.closest('mat-cell').classList)
                .find(function (c) { return c.indexOf('mat-column-') > -1; })
                .substr('mat-column-'.length);
            this.rowClicked.emit({ data: row, colName: cellName });
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    GridComponent.prototype.onClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ headersToClose = [].slice
            .call(this.elRef.nativeElement.querySelectorAll('mat-header-cell'))
            .filter(function (b) { return !b.contains($event.target); })
            .map(function (b) { return [].slice.call(b.classList).find(function (c) { return c.indexOf('mat-column-') > -1; }).substr('mat-column-'.length); });
        // If any columns (not including current target) is marked as open close it.
        this.columns.filter(function (c) { return headersToClose.includes(c.name); }).forEach(function (c) { return c.filterOpen = false; });
    };
    /**
     * @param {?} $event
     * @param {?} menuTrigger
     * @return {?}
     */
    GridComponent.prototype.checkClose = /**
     * @param {?} $event
     * @param {?} menuTrigger
     * @return {?}
     */
    function ($event, menuTrigger) {
        if ($event.key === 'Enter') {
            menuTrigger.closeMenu();
        }
    };
    GridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-grid',
                    template: "<mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns\" [matColumnDef]=\"col.name\">\n    <!-- Header definition -->\n    <mat-header-cell *matHeaderCellDef>\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\"  [(ngModel)]=\"col.filterValue\" [ngModelOptions]=\"{standalone:true}\" (change)=\"col.setFilter(col.filterValue)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <i class=\"fa far fa-fw fa-filter\"></i>\n          </button>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </mat-header-cell>\n\n    <!-- Cell definition -->\n    <mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"{highlight: index === selectedIndex}\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></mat-row>\n</mat-table>\n",
                    styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}"]
                },] },
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    GridComponent.propDecorators = {
        dataSource: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        columns: [{ type: ContentChildren, args: [ColumnDirective,] }],
        rowClicked: [{ type: Output }],
        sort: [{ type: ViewChild, args: [MatSort,] }],
        displayedColumns: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return GridComponent;
}());
export { GridComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUErQixZQUFZLEVBQ3ZGLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUNqQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFtQixNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7OztJQTZFbkQsdUJBQW1CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7MEJBWGIsSUFBSSxZQUFZLEVBQWlCO0tBV2Y7SUFQekMsc0JBQ0ksMkNBQWdCOzs7O1FBQ3BCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pIOzs7OztRQUpELFVBQ3FCLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OztPQUFBOzs7O0lBUXZELDBDQUFrQjs7O0lBQWxCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1B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QUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSx1MkVBbURYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDYvQkFBNi9CLENBQUM7aUJBQ3hnQzs7OztnQkFuRUMsVUFBVTs7OzZCQXFFVCxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsZUFBZSxTQUFDLGVBQWU7NkJBQy9CLE1BQU07dUJBQ04sU0FBUyxTQUFDLE9BQU87bUNBR2pCLEtBQUs7MEJBa0NMLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7d0JBaEg1Qzs7U0FzRWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNvcnQsIE1hdE1lbnVUcmlnZ2VyICB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSW5zdGFudERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3dDbGlja0V2ZW50IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgY29sTmFtZTogc3RyaW5nO1xyXG59XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxtYXQtdGFibGUgI3RhYmxlIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBtYXRTb3J0PlxyXG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2wubmFtZVwiPlxyXG4gICAgPCEtLSBIZWFkZXIgZGVmaW5pdGlvbiAtLT5cclxuICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+XHJcbiAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvblwiICpuZ0lmPVwiY29sLmZpbHRlcmFibGUgIT0gZmFsc2VcIj5cclxuICAgICAgICAgIDxtYXQtbWVudSAjYXBwTWVudT1cIm1hdE1lbnVcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5maWx0ZXJSZWY7IGVsc2UgZGVmYXVsdEZpbHRlclRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5maWx0ZXJSZWY7Y29udGV4dDp7Y29sOmNvbH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJuby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGtleXVwKT1cImNoZWNrQ2xvc2UoJGV2ZW50LCBtZW51VHJpZ2dlcilcIiAgWyhuZ01vZGVsKV09XCJjb2wuZmlsdGVyVmFsdWVcIiBbbmdNb2RlbE9wdGlvbnNdPVwie3N0YW5kYWxvbmU6dHJ1ZX1cIiAoY2hhbmdlKT1cImNvbC5zZXRGaWx0ZXIoY29sLmZpbHRlclZhbHVlKVwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZClcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtdGltZXMgZmEtZndcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9tYXQtbWVudT5cclxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJhcHBNZW51XCIgI21lbnVUcmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtZncgZmEtZmlsdGVyXCI+PC9pPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBtYXQtc29ydC1oZWFkZXIgY2xhc3M9XCJmbGV4LWNvbFwiIHJvbGU9XCJoZWFkaW5nXCIgKm5nSWY9XCJjb2wuc29ydGFibGUgIT0gZmFsc2VcIj5cclxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbFwiIHJvbGU9XCJoZWFkaW5nXCIgKm5nSWY9XCJjb2wuc29ydGFibGUgPT0gZmFsc2VcIj5cclxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgIDwvbWF0LWhlYWRlci1jZWxsPlxyXG5cclxuICAgIDwhLS0gQ2VsbCBkZWZpbml0aW9uIC0tPlxyXG4gICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5jZWxsUmVmOyBlbHNlIGRlZmF1bHRDZWxsVGVtcGxhdGVcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLmNlbGxSZWY7Y29udGV4dDp7cm93OmVsZW1lbnQsY29sOmNvbC5uYW1lfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdENlbGxUZW1wbGF0ZT5cclxuICAgICAgICB7eyBlbGVtZW50W2NvbC5uYW1lXSB9fVxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9tYXQtY2VsbD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cclxuICA8bWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztsZXQgaW5kZXg9aW5kZXg7XCJcclxuICAgICAgICAgICBbbmdDbGFzc109XCJ7aGlnaGxpZ2h0OiBpbmRleCA9PT0gc2VsZWN0ZWRJbmRleH1cIlxyXG4gICAgICAgICAgIFthdHRyLmRhdGEtcm93SW5kZXhdPVwiaW5kZXhcIlxyXG4gICAgICAgICAgIChjbGljayk9XCJvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpXCI+PC9tYXQtcm93PlxyXG48L21hdC10YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgW3JvbGU9Y29sdW1uaGVhZGVyXSBoZWFkZXJ7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn1bcm9sZT1jb2x1bW5oZWFkZXJdOmhvdmVyIC5hY3Rpb24+YnV0dG9ue3Zpc2liaWxpdHk6dmlzaWJsZX1bcm9sZT1jb2x1bW5oZWFkZXJdIFtyb2xlPWhlYWRpbmdde2ZsZXg6MX06aG9zdC5zdHJpcGVkIFtyb2xlPXJvd106bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDIpfTo6bmctZGVlcCAubWF0LXRhYmxle2Rpc3BsYXk6dGFibGUhaW1wb3J0YW50O3dpZHRoOjEwMCV9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93LDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93e2Rpc3BsYXk6dGFibGUtcm93O3BhZGRpbmc6MDtib3JkZXI6bm9uZX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWhlYWRlci1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWhlYWRlci1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbDtoZWlnaHQ6NDhweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpO3BhZGRpbmctbGVmdDozcHh9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWNlbGx7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKX06Om5nLWRlZXAgLm5vLXBhZGRpbmd7bWF4LWhlaWdodDozcmVtO3BhZGRpbmc6MCAxNnB4O292ZXJmbG93OmhpZGRlbn0uYWN0aW9uIG1hdC1tZW51e3BhZGRpbmc6MH0uYWN0aW9uIG1hdC1tZW51IG1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowfS5tYXQtaWNvbi1idXR0b257d2lkdGg6MThweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcclxuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpIGNvbHVtbnM6IENvbHVtbkRpcmVjdGl2ZVtdO1xyXG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcclxuXHJcbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRpc3BsYXllZENvbHVtbnModikgeyB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjsgfVxyXG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fCAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcclxuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcclxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcclxuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2UuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ21hdC1jZWxsJykuY2xhc3NMaXN0KVxyXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXHJcbiAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCk7XHJcblxyXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7ZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxyXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1oZWFkZXItY2VsbCcpKVxyXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxyXG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXHJcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXHJcbiAgICAgIC5tYXAoYiA9PiBbXS5zbGljZS5jYWxsKGIuY2xhc3NMaXN0KS5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCkpO1xyXG5cclxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cclxuICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKS5mb3JFYWNoKGMgPT4gYy5maWx0ZXJPcGVuID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xyXG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==