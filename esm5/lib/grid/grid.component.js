/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            /** @type {?} */
            var cellName = [].slice.call($event.target.closest('mat-cell').classList)
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
        /** @type {?} */
        var headersToClose = [].slice
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
                    styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQStCLFlBQVksRUFDdkYsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ2pDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQW1CLE1BQU0sbUJBQW1CLENBQUM7QUFDN0QsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztJQTZFbkQsdUJBQW1CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7MEJBWGIsSUFBSSxZQUFZLEVBQWlCO0tBV2Y7SUFQekMsc0JBQ0ksMkNBQWdCOzs7O1FBQ3BCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pIOzs7OztRQUpELFVBQ3FCLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OztPQUFBOzs7O0lBUXZELDBDQUFrQjs7O0lBQWxCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUM1QixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUNoQyxZQUFZLEVBQUUsS0FBSyxnQ0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxDQUFDLEVBQUM7YUFDeEQsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQzlDO0tBQ0Y7Ozs7OztJQUVELG9DQUFZOzs7OztJQUFaLFVBQWEsR0FBRyxFQUFFLE1BQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUM1RCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ3hFLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTdCLENBQTZCLENBQUM7aUJBQ3hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7O0lBR0QsK0JBQU87Ozs7SUFEUCxVQUNRLE1BQU07O1FBQ1osSUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDLEtBQUs7YUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFFbEUsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQzthQUV2QyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQWhHLENBQWdHLENBQUMsQ0FBQzs7UUFHOUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUFwQixDQUFvQixDQUFDLENBQUM7S0FDOUY7Ozs7OztJQUVELGtDQUFVOzs7OztJQUFWLFVBQVcsTUFBcUIsRUFBRSxXQUEyQjtRQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQXBIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSx1MkVBbURYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDZvQ0FBNm9DLENBQUM7aUJBQ3hwQzs7OztnQkFuRUMsVUFBVTs7OzZCQXFFVCxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsZUFBZSxTQUFDLGVBQWU7NkJBQy9CLE1BQU07dUJBQ04sU0FBUyxTQUFDLE9BQU87bUNBR2pCLEtBQUs7MEJBa0NMLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7d0JBakg1Qzs7U0F1RWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vY2xvc2VzdC1wb2x5ZmlsbCc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFZpZXdDaGlsZCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xuICBkYXRhOiBhbnk7XG4gIGNvbE5hbWU6IHN0cmluZztcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPG1hdC10YWJsZSAjdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIG1hdFNvcnQ+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2wubmFtZVwiPlxuICAgIDwhLS0gSGVhZGVyIGRlZmluaXRpb24gLS0+XG4gICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgIDxoZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25cIiAqbmdJZj1cImNvbC5maWx0ZXJhYmxlICE9IGZhbHNlXCI+XG4gICAgICAgICAgPG1hdC1tZW51ICNhcHBNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5maWx0ZXJSZWY7IGVsc2UgZGVmYXVsdEZpbHRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wuZmlsdGVyUmVmO2NvbnRleHQ6e2NvbDpjb2x9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RmlsdGVyVGVtcGxhdGU+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cIm5vLXBhZGRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGtleXVwKT1cImNoZWNrQ2xvc2UoJGV2ZW50LCBtZW51VHJpZ2dlcilcIiAgWyhuZ01vZGVsKV09XCJjb2wuZmlsdGVyVmFsdWVcIiBbbmdNb2RlbE9wdGlvbnNdPVwie3N0YW5kYWxvbmU6dHJ1ZX1cIiAoY2hhbmdlKT1cImNvbC5zZXRGaWx0ZXIoY29sLmZpbHRlclZhbHVlKVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY29sLnNldEZpbHRlcih1bmRlZmluZWQpXCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS10aW1lcyBmYS1md1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiYXBwTWVudVwiICNtZW51VHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS1maWx0ZXJcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG1hdC1zb3J0LWhlYWRlciBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSAhPSBmYWxzZVwiPlxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSA9PSBmYWxzZVwiPlxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgIDwvbWF0LWhlYWRlci1jZWxsPlxuXG4gICAgPCEtLSBDZWxsIGRlZmluaXRpb24gLS0+XG4gICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wuY2VsbFJlZjsgZWxzZSBkZWZhdWx0Q2VsbFRlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wuY2VsbFJlZjtjb250ZXh0Ontyb3c6ZWxlbWVudCxjb2w6Y29sLm5hbWV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q2VsbFRlbXBsYXRlPlxuICAgICAgICB7eyBlbGVtZW50W2NvbC5uYW1lXSB9fVxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L21hdC1jZWxsPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxuICA8bWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztsZXQgaW5kZXg9aW5kZXg7XCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwie2hpZ2hsaWdodDogaW5kZXggPT09IHNlbGVjdGVkSW5kZXh9XCJcbiAgICAgICAgICAgW2F0dHIuZGF0YS1yb3dJbmRleF09XCJpbmRleFwiXG4gICAgICAgICAgIChjbGljayk9XCJvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpXCI+PC9tYXQtcm93PlxuPC9tYXQtdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgW3JvbGU9Y29sdW1uaGVhZGVyXSBoZWFkZXJ7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn1bcm9sZT1jb2x1bW5oZWFkZXJdOmhvdmVyIC5hY3Rpb24+YnV0dG9ue3Zpc2liaWxpdHk6dmlzaWJsZX1bcm9sZT1jb2x1bW5oZWFkZXJdIFtyb2xlPWhlYWRpbmdde2ZsZXg6MX06aG9zdC5zdHJpcGVkIFtyb2xlPXJvd106bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDIpfTo6bmctZGVlcCAubWF0LXRhYmxle2Rpc3BsYXk6dGFibGUhaW1wb3J0YW50O3dpZHRoOjEwMCV9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93LDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93e2Rpc3BsYXk6dGFibGUtcm93O3BhZGRpbmc6MDtib3JkZXI6bm9uZX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWhlYWRlci1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWhlYWRlci1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbDtoZWlnaHQ6NDhweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpO3BhZGRpbmctbGVmdDozcHh9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWNlbGx7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKX06Om5nLWRlZXAgLm5vLXBhZGRpbmd7bWF4LWhlaWdodDozcmVtO3BhZGRpbmc6MCAxNnB4O292ZXJmbG93OmhpZGRlbn06Om5nLWRlZXAgLm1hdC1jb2x1bW4tYWN0aW9uc3tvdmVyZmxvdzppbml0aWFsfTo6bmctZGVlcCAubWF0LWNvbHVtbi1hY3Rpb25zIC5tYXQtY2FyZCw6Om5nLWRlZXAgLm1hdC1jb2x1bW4tYWN0aW9ucyBtYXQtY2FyZHtwb3NpdGlvbjphYnNvbHV0ZX0uYWN0aW9uIG1hdC1tZW51e3BhZGRpbmc6MH0uYWN0aW9uIG1hdC1tZW51IG1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowfS5tYXQtaWNvbi1idXR0b257d2lkdGg6MThweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2OyB9XG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHwgKHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLm5hbWUpIDogbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2UuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ21hdC1jZWxsJykuY2xhc3NMaXN0KVxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcblxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoe2RhdGE6IHJvdywgY29sTmFtZTogY2VsbE5hbWV9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyc1RvQ2xvc2U6IHN0cmluZ1tdID0gW10uc2xpY2VcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1oZWFkZXItY2VsbCcpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXG4gICAgICAubWFwKGIgPT4gW10uc2xpY2UuY2FsbChiLmNsYXNzTGlzdCkuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKS5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpKTtcblxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cbiAgICB0aGlzLmNvbHVtbnMuZmlsdGVyKGMgPT4gaGVhZGVyc1RvQ2xvc2UuaW5jbHVkZXMoYy5uYW1lKSkuZm9yRWFjaChjID0+IGMuZmlsdGVyT3BlbiA9IGZhbHNlKTtcbiAgfVxuXG4gIGNoZWNrQ2xvc2UoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXIpIHtcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgfVxuICB9XG59XG4iXX0=