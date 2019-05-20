/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'element-closest';
import { Component, Input, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { InstantDataSource } from './datasource';
import { ColumnDirective } from './column.directive';
/**
 * @record
 */
export function RowClickEvent() { }
if (false) {
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
            return (this._displayedColumns =
                this._displayedColumns ||
                    (this.columns ? this.columns.map(function (c) { return c.name; }) : null));
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._displayedColumns = v;
        },
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
            var cellName = [].slice
                .call($event.target.closest('td').classList)
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
            // Find all header cells
            .call(this.elRef.nativeElement.querySelectorAll('th'))
            // Filter away current target
            .filter(function (b) { return !b.contains($event.target); })
            // Get the name of the column
            .map(function (b) {
            return [].slice
                .call(b.classList)
                .find(function (c) { return c.indexOf('mat-column-') > -1; })
                .substr('mat-column-'.length);
        });
        // If any columns (not including current target) is marked as open close it.
        this.columns
            .filter(function (c) { return headersToClose.includes(c.name); })
            .forEach(function (c) { return (c.filterOpen = false); });
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
    /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    GridComponent.prototype.onFilterChange = /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    function ($event, col) {
        col.setFilter($event.target.value);
    };
    /**
     * @param {?} col
     * @return {?}
     */
    GridComponent.prototype.getFilterValue = /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        if (col.filterValue) {
            if (typeof col.filterValue === 'object') {
                return col.filterValue.key;
            }
            return col.filterValue;
        }
        return '';
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GridComponent.prototype.getRowClasses = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var classes = [];
        if (index === this.selectedIndex) {
            classes.push('highlight');
        }
        if (this.rowAttributes && this.rowAttributes.length > 0) {
            /** @type {?} */
            var attr = this.rowAttributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i]['index'] === index) {
                    if (attr[i]['class'] && attr[i]['class'].length > 0) {
                        classes = classes.concat(attr[i]['class']);
                    }
                }
            }
        }
        return classes.join(' ');
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GridComponent.prototype.getRowStyles = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var styles = [];
        if (this.rowAttributes && this.rowAttributes.length > 0) {
            /** @type {?} */
            var attr = this.rowAttributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i]['index'] === index) {
                    if (attr[i]['style'] && attr[i]['style'].length > 0) {
                        styles = styles.concat(attr[i]['style']);
                    }
                }
            }
        }
        return styles.join(' ');
    };
    /**
     * @return {?}
     */
    GridComponent.prototype.removeFilters = /**
     * @return {?}
     */
    function () {
        this.columns.forEach(function (col) {
            col.removeFilter();
        });
    };
    /**
     * @return {?}
     */
    GridComponent.prototype.reload = /**
     * @return {?}
     */
    function () {
        this.columns.forEach(function (col, index) {
            if (index === 0) {
                col.removeFilter();
            }
            else {
                return;
            }
        });
    };
    GridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-grid',
                    template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\n    <!-- Header definition -->\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <ng-container *ngIf=\"col.filterValue == null || col.filterValue == ''\">\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>No filter set</title>\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\n                />\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\n                />\n              </svg>\n            </ng-container>\n            <ng-container *ngIf=\"col.filterValue != null && col.filterValue != ''\">\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>Filter set</title>\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\n                />\n              </svg>\n            </ng-container>\n          </button>\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\n                    <span class=\"fa fa-refresh\"></span>\n                    <span>Refresh</span>\n                </button>\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\n                    <span class=\"fa fa-filter\"></span>\n                     <span>Clear filter</span>\n                </button>\n            </mat-menu>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </th>\n\n    <!-- Cell definition -->\n    <td mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </td>\n  </ng-container>\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"getRowClasses(index)\"\n           [ngStyle]=\"getRowStyles(index)\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></tr>\n</table>\n",
                    styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}"]
                }] }
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    GridComponent.propDecorators = {
        dataSource: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        sticky: [{ type: Input }],
        rowAttributes: [{ type: Input }],
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
    GridComponent.prototype.sticky;
    /** @type {?} */
    GridComponent.prototype.rowAttributes;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBR1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWtCLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUVyRCxtQ0FHQzs7O0lBRkMsNkJBQVU7O0lBQ1YsZ0NBQWdCOztBQUVsQjtJQTBCRSx1QkFBbUIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQWYxQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFlbEIsQ0FBQztJQVh4QyxzQkFDSSwyQ0FBZ0I7Ozs7UUFHcEI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtnQkFDNUIsSUFBSSxDQUFDLGlCQUFpQjtvQkFDdEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7Ozs7UUFSRCxVQUNxQixDQUFDO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7Ozs7SUFVRCwwQ0FBa0I7OztJQUFsQjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzVCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQ2hDLFlBQVksRUFBRSxLQUFLLGdDQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sRUFBUixDQUFRLENBQUMsRUFBQzthQUN4RCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxtQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzs7Ozs7SUFFRCxvQ0FBWTs7Ozs7SUFBWixVQUFhLEdBQUcsRUFBRSxNQUFNO1FBQ3RCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLEVBQUU7O2dCQUNyRCxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUs7aUJBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQzNDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTdCLENBQTZCLENBQUM7aUJBQ3hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBRS9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7O0lBR0QsK0JBQU87Ozs7SUFEUCxVQUNRLE1BQU07O1lBQ04sY0FBYyxHQUFhLEVBQUUsQ0FBQyxLQUFLO1lBQ3ZDLHdCQUF3QjthQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsNkJBQTZCO2FBQzVCLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLENBQUM7WUFDeEMsNkJBQTZCO2FBQzVCLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDSixPQUFBLEVBQUUsQ0FBQyxLQUFLO2lCQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNqQixJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUE3QixDQUE2QixDQUFDO2lCQUN4QyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUgvQixDQUcrQixDQUNoQztRQUVILDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsT0FBTzthQUNULE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUEvQixDQUErQixDQUFDO2FBQzVDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUVELGtDQUFVOzs7OztJQUFWLFVBQVcsTUFBcUIsRUFBRSxXQUEyQjtRQUMzRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQzFCLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7OztJQUVELHNDQUFjOzs7OztJQUFkLFVBQWUsTUFBTSxFQUFFLEdBQUc7UUFDeEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsc0NBQWM7Ozs7SUFBZCxVQUFlLEdBQUc7UUFDaEIsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksT0FBTyxHQUFHLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtnQkFDdkMsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQzthQUM1QjtZQUNELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN4QjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7SUFFRCxxQ0FBYTs7OztJQUFiLFVBQWMsS0FBYTs7WUFDckIsT0FBTyxHQUFhLEVBQUU7UUFFMUIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pELElBQUksR0FBRyxJQUFJLENBQUMsYUFBYTtZQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUM5QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbkQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUJBQzVDO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELG9DQUFZOzs7O0lBQVosVUFBYSxLQUFhOztZQUNwQixNQUFNLEdBQWEsRUFBRTtRQUV6QixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDakQsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhO1lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQzlCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDMUM7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxxQ0FBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDdEIsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDhCQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFDLEtBQUs7WUFDN0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxPQUFPO2FBQ1I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQWpKRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLDh3SUFBb0M7O2lCQUVyQzs7OztnQkFsQkMsVUFBVTs7OzZCQW9CVCxLQUFLO2dDQUNMLEtBQUs7eUJBQ0wsS0FBSztnQ0FDTCxLQUFLOzBCQUNMLGVBQWUsU0FBQyxlQUFlOzZCQUMvQixNQUFNO3VCQUNOLFNBQVMsU0FBQyxPQUFPO21DQUdqQixLQUFLOzBCQXVDTCxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBNEY1QyxvQkFBQztDQUFBLEFBbEpELElBa0pDO1NBN0lZLGFBQWE7OztJQUN4QixtQ0FBNEM7O0lBQzVDLHNDQUErQjs7SUFDL0IsK0JBQXlCOztJQUN6QixzQ0FBbUM7O0lBQ25DLGdDQUE2RDs7SUFDN0QsbUNBQXlEOztJQUN6RCw2QkFBa0M7O0lBRWxDLDBDQUE0Qjs7SUFVNUIsc0NBQXNDOztJQUUxQiw4QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2VsZW1lbnQtY2xvc2VzdCc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFZpZXdDaGlsZCxcbiAgT25EZXN0cm95LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XG4gIGRhdGE6IGFueTtcbiAgY29sTmFtZTogc3RyaW5nO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IEluc3RhbnREYXRhU291cmNlPGFueT47XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgc3RpY2t5OiBib29sZWFuO1xuICBASW5wdXQoKSByb3dBdHRyaWJ1dGVzOiBBcnJheTxhbnk+O1xuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7XG4gICAgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHY7XG4gIH1cbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAodGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8XG4gICAgICAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cblxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZVxuICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ3RkJykuY2xhc3NMaXN0KVxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcblxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoeyBkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGgnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtblxuICAgICAgLm1hcChiID0+XG4gICAgICAgIFtdLnNsaWNlXG4gICAgICAgICAgLmNhbGwoYi5jbGFzc0xpc3QpXG4gICAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcbiAgICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKVxuICAgICAgKTtcblxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cbiAgICB0aGlzLmNvbHVtbnNcbiAgICAgIC5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKVxuICAgICAgLmZvckVhY2goYyA9PiAoYy5maWx0ZXJPcGVuID0gZmFsc2UpKTtcbiAgfVxuXG4gIGNoZWNrQ2xvc2UoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXIpIHtcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgb25GaWx0ZXJDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcbiAgICBjb2wuc2V0RmlsdGVyKCRldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgZ2V0RmlsdGVyVmFsdWUoY29sKSB7XG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBjb2wuZmlsdGVyVmFsdWUua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0Um93Q2xhc3NlcyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdoaWdobGlnaHQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChhdHRyW2ldWydjbGFzcyddICYmIGF0dHJbaV1bJ2NsYXNzJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGF0dHJbaV1bJ2NsYXNzJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRSb3dTdHlsZXMoaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBzdHlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChhdHRyW2ldWydzdHlsZSddICYmIGF0dHJbaV1bJ3N0eWxlJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChhdHRyW2ldWydzdHlsZSddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcy5qb2luKCcgJyk7XG4gIH1cblxuICByZW1vdmVGaWx0ZXJzKCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbCxpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19