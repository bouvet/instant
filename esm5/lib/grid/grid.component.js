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
        if (col.filterValue !== undefined) {
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
            if (index == 0) {
                col.setFilter(undefined);
            }
            else
                return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBR1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWtCLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUVyRCxtQ0FHQzs7O0lBRkMsNkJBQVU7O0lBQ1YsZ0NBQWdCOztBQUVsQjtJQTBCRSx1QkFBbUIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQWYxQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFlbEIsQ0FBQztJQVh4QyxzQkFDSSwyQ0FBZ0I7Ozs7UUFHcEI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtnQkFDNUIsSUFBSSxDQUFDLGlCQUFpQjtvQkFDdEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7Ozs7UUFSRCxVQUNxQixDQUFDO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDN0Is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RSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLO1lBQzlCLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDZCxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzFCOztnQkFBTSxPQUFPO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBL0lGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsOHdJQUFvQzs7aUJBRXJDOzs7O2dCQWxCQyxVQUFVOzs7NkJBb0JULEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsZUFBZSxTQUFDLGVBQWU7NkJBQy9CLE1BQU07dUJBQ04sU0FBUyxTQUFDLE9BQU87bUNBR2pCLEtBQUs7MEJBdUNMLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUEwRjVDLG9CQUFDO0NBQUEsQUFoSkQsSUFnSkM7U0EzSVksYUFBYTs7O0lBQ3hCLG1DQUE0Qzs7SUFDNUMsc0NBQStCOztJQUMvQiwrQkFBeUI7O0lBQ3pCLHNDQUFtQzs7SUFDbkMsZ0NBQTZEOztJQUM3RCxtQ0FBeUQ7O0lBQ3pELDZCQUFrQzs7SUFFbEMsMENBQTRCOztJQVU1QixzQ0FBc0M7O0lBRTFCLDhCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZWxlbWVudC1jbG9zZXN0JztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgVmlld0NoaWxkLFxuICBPbkRlc3Ryb3ksXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSW5zdGFudERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3dDbGlja0V2ZW50IHtcbiAgZGF0YTogYW55O1xuICBjb2xOYW1lOiBzdHJpbmc7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBzdGlja3k6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvd0F0dHJpYnV0ZXM6IEFycmF5PGFueT47XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHtcbiAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjtcbiAgfVxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuICh0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID1cbiAgICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHxcbiAgICAgICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGIuX2NvbmZpZ3VyZSh7XG4gICAgICAgIHNvcnRDaGFuZ2U6IHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUm93Q2xpY2tlZChyb3csICRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XG4gICAgICBjb25zdCBjZWxsTmFtZSA9IFtdLnNsaWNlXG4gICAgICAgIC5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgndGQnKS5jbGFzc0xpc3QpXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7IGRhdGE6IHJvdywgY29sTmFtZTogY2VsbE5hbWUgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCRldmVudCkge1xuICAgIGNvbnN0IGhlYWRlcnNUb0Nsb3NlOiBzdHJpbmdbXSA9IFtdLnNsaWNlXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcbiAgICAgIC5jYWxsKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0aCcpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXG4gICAgICAubWFwKGIgPT5cbiAgICAgICAgW10uc2xpY2VcbiAgICAgICAgICAuY2FsbChiLmNsYXNzTGlzdClcbiAgICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpXG4gICAgICApO1xuXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxuICAgIHRoaXMuY29sdW1uc1xuICAgICAgLmZpbHRlcihjID0+IGhlYWRlcnNUb0Nsb3NlLmluY2x1ZGVzKGMubmFtZSkpXG4gICAgICAuZm9yRWFjaChjID0+IChjLmZpbHRlck9wZW4gPSBmYWxzZSkpO1xuICB9XG5cbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNoYW5nZSgkZXZlbnQsIGNvbCkge1xuICAgIGNvbC5zZXRGaWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBnZXRGaWx0ZXJWYWx1ZShjb2wpIHtcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gY29sLmZpbHRlclZhbHVlLmtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2wuZmlsdGVyVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldFJvd0NsYXNzZXMoaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnaGlnaGxpZ2h0Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICBpZiAoYXR0cltpXVsnY2xhc3MnXSAmJiBhdHRyW2ldWydjbGFzcyddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChhdHRyW2ldWydjbGFzcyddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgZ2V0Um93U3R5bGVzKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICBpZiAoYXR0cltpXVsnc3R5bGUnXSAmJiBhdHRyW2ldWydzdHlsZSddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcy5jb25jYXQoYXR0cltpXVsnc3R5bGUnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXMuam9pbignICcpO1xuICB9XG5cbiAgcmVtb3ZlRmlsdGVycygpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2wsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICBjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZCk7XG4gICAgICB9IGVsc2UgcmV0dXJuO1xuICAgIH0pO1xuICB9XG59XG4iXX0=