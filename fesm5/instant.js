import { __extends, __spread, __values } from 'tslib';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, ReplaySubject, merge } from 'rxjs';
import { Input, Directive, TemplateRef, ContentChild, Component, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output, NgModule, Injectable, defineInjectable } from '@angular/core';
import 'element-closest';
import { MatSort, MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var debounce = function (func, wait, immediate) {
    if (wait === void 0) { wait = 300; }
    if (immediate === void 0) { immediate = false; }
    /** @type {?} */
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var context = this;
        /** @type {?} */
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        /** @type {?} */
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * This is the object the Mat Table actually uses.
 * It holds an `InstantDatabase` object, and deliveres
 * living data from this object to the grid.
 * @template T
 */
var  /**
 * This is the object the Mat Table actually uses.
 * It holds an `InstantDatabase` object, and deliveres
 * living data from this object to the grid.
 * @template T
 */
InstantDataSource = /** @class */ (function (_super) {
    __extends(InstantDataSource, _super);
    function InstantDataSource(db) {
        var _this = _super.call(this) || this;
        _this.db = db;
        return _this;
    }
    /**
     * @return {?}
     */
    InstantDataSource.prototype.connect = /**
     * @return {?}
     */
    function () {
        return this.db.dataChange;
    };
    /**
     * @return {?}
     */
    InstantDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        this.db.onDestroy();
    };
    return InstantDataSource;
}(DataSource));
/**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 * @abstract
 * @template T
 */
var  /**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 * @abstract
 * @template T
 */
InstantDatabase = /** @class */ (function () {
    function InstantDatabase() {
        this.sortCache = {};
        this.filterChange = new BehaviorSubject(null);
        this.filterCache = {};
        this.dataChange = new BehaviorSubject([]);
        this.dataReader = debounce(this.onRead, 100);
    }
    /**
     * @return {?}
     */
    InstantDatabase.prototype.onInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.onRead();
        this._dataChangeSubscriber = this.dataChange.subscribe(function (data) { return _this.dataSnapshot = data; });
    };
    /**
     * @return {?}
     */
    InstantDatabase.prototype.onDestroy = /**
     * @return {?}
     */
    function () {
        this._dataChangeSubscriber.unsubscribe();
        this._sortSubscriber.unsubscribe();
        this._filterSubscriber.unsubscribe();
    };
    /**
     * @param {?=} sort
     * @param {?=} filter
     * @return {?}
     */
    InstantDatabase.prototype.onRead = /**
     * @param {?=} sort
     * @param {?=} filter
     * @return {?}
     */
    function (sort, filter$$1) { };
    /**
     * @param {?} args
     * @return {?}
     */
    InstantDatabase.prototype._configure = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        Object.assign(this, args);
        // On any changes, read data
        this._sortSubscriber = this.sortChange.subscribe(function (sort) {
            _this.sortCache = {}; // Reset always. Multiple column sort is NOT supported
            _this.sortCache[sort.active] = sort.direction;
            _this.dataReader(_this.sortCache, _this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(function (filter$$1) {
            _this.filterCache[filter$$1.active] = filter$$1.filter;
            _this.dataReader(_this.sortCache, _this.filterCache);
        });
        // Attached to a grid. Run init
        if (this.onInit) {
            this.onInit();
        }
    };
    return InstantDatabase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
var ColumnDirective = /** @class */ (function () {
    /**
     *
     */
    function ColumnDirective() {
        // Defaults to the identifier of column
        this.filterable = true;
        this.sortable = true;
        this.sticky = false;
        this.instantStyle = {};
        this.filter = new ReplaySubject();
    }
    /**
     * @return {?}
     */
    ColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.label == null) {
            this.label = this.name;
        }
    };
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param obj The filter as received from the filter template
     */
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    ColumnDirective.prototype.setFilter = /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    function (obj, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if (obj !== this.oldFilter) {
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: obj });
            }
            this.filterValue = obj;
            this.oldFilter = obj;
        }
        this.filterOpen = false;
    };
    /**
     * @return {?}
     */
    ColumnDirective.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        this.setFilter(null);
    };
    ColumnDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'instant-column'
                },] }
    ];
    /** @nocollapse */
    ColumnDirective.ctorParameters = function () { return []; };
    ColumnDirective.propDecorators = {
        name: [{ type: Input }],
        label: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        sticky: [{ type: Input }],
        instantStyle: [{ type: Input, args: ['instant-style',] }],
        filterRef: [{ type: ContentChild, args: ['filter',] }],
        cellRef: [{ type: ContentChild, args: ['cell',] }]
    };
    return ColumnDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
                filterChange: merge.apply(void 0, __spread(this.columns.map(function (c) { return c.filter; })))
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var GridToolbarComponent = /** @class */ (function () {
    function GridToolbarComponent() {
        this.page = 0;
        this.pageChange = new EventEmitter();
        this.total = 0;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    /**
     * @return {?}
     */
    GridToolbarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    GridToolbarComponent.prototype.pageHandler = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.pageSize = $event.pageSize;
        this.page = $event.pageIndex;
        this.pageChange.emit($event);
    };
    GridToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-grid-toolbar',
                    template: "<mat-toolbar>\n  <header>\n    <ng-content></ng-content>\n  </header>\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\n</mat-toolbar>\n",
                    styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
                }] }
    ];
    /** @nocollapse */
    GridToolbarComponent.ctorParameters = function () { return []; };
    GridToolbarComponent.propDecorators = {
        page: [{ type: Input }],
        pageChange: [{ type: Output }],
        total: [{ type: Input }],
        pageSize: [{ type: Input }],
        pageSizeOptions: [{ type: Input }]
    };
    return GridToolbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var GridRowMenuComponent = /** @class */ (function () {
    function GridRowMenuComponent(grid) {
        this.grid = grid;
        this.icon = 'ellipsis-v';
        this.showMenu = false;
    }
    /**
     * @return {?}
     */
    GridRowMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} $event
     * @return {?}
     */
    GridRowMenuComponent.prototype.onClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        // Find all header cells
        [].slice.call(this.grid.elRef.nativeElement.querySelectorAll('mat-cell.mat-column-actions'))
            // Filter away current target
            .filter(function (b) { return !b.contains($event.target); })
            // If any row action (not including current target) is marked as open, close it.
            .forEach(function (cell) {
            /** @type {?} */
            var row = cell.closest('mat-row');
            /** @type {?} */
            var index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1;
            _this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
        });
    };
    GridRowMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-grid-row-menu',
                    template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                    styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                }] }
    ];
    /** @nocollapse */
    GridRowMenuComponent.ctorParameters = function () { return [
        { type: GridComponent }
    ]; };
    GridRowMenuComponent.propDecorators = {
        row: [{ type: Input }],
        icon: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return GridRowMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var GridModule = /** @class */ (function () {
    function GridModule() {
    }
    GridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatTableModule,
                        MatSortModule,
                        MatInputModule,
                        MatCardModule,
                        MatMenuModule,
                        MatButtonModule,
                        MatToolbarModule,
                        MatPaginatorModule,
                    ],
                    declarations: [GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent],
                    exports: [GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent]
                },] }
    ];
    return GridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(route, router) {
        this.route = route;
        this.router = router;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    BreadcrumbComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; })).subscribe(function (nav) {
            console.log('url changed');
            /** @type {?} */
            var root = _this.route.root;
            _this.routeMap = _this.getBreadcrumbs(root);
        }));
    };
    /**
     * @return {?}
     */
    BreadcrumbComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (s) { if (s) {
            s.unsubscribe();
        } });
    };
    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param route
     * @param url
     * @param breadcrumbs
     */
    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param {?} route
     * @param {?=} url
     * @param {?=} breadcrumbs
     * @return {?}
     */
    BreadcrumbComponent.prototype.getBreadcrumbs = /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param {?} route
     * @param {?=} url
     * @param {?=} breadcrumbs
     * @return {?}
     */
    function (route, url, breadcrumbs) {
        if (url === void 0) { url = ''; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        var e_1, _a;
        /** @type {?} */
        var ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        // get the child routes
        /** @type {?} */
        var children = route.children;
        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }
        try {
            // iterate over each children
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                // verify primary route
                if (child.outlet !== PRIMARY_OUTLET) {
                    continue;
                }
                // verify the custom data property "breadcrumb" is specified on the route
                if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                    return this.getBreadcrumbs(child, url, breadcrumbs);
                }
                // get the route's URL segment
                /** @type {?} */
                var routeURL = child.snapshot.url.map(function (segment) { return segment.path; }).join('/');
                // append route URL to URL
                url += "/" + routeURL;
                // add breadcrumb
                /** @type {?} */
                var breadcrumb = {
                    label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                    params: child.snapshot.params,
                    url: url
                };
                breadcrumbs.push(breadcrumb);
                // recursive
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    BreadcrumbComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-breadcrumb',
                    template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                    styles: [":host{flex:1}"]
                }] }
    ];
    /** @nocollapse */
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return BreadcrumbComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ToolbarService = /** @class */ (function () {
    function ToolbarService() {
    }
    ToolbarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ToolbarService.ctorParameters = function () { return []; };
    /** @nocollapse */ ToolbarService.ngInjectableDef = defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });
    return ToolbarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormActionsComponent = /** @class */ (function () {
    function FormActionsComponent(toolbarService) {
        this.toolbarService = toolbarService;
    }
    Object.defineProperty(FormActionsComponent.prototype, "actionsRef", {
        get: /**
         * @return {?}
         */
        function () { return this.toolbarService.actionTemplate; },
        enumerable: true,
        configurable: true
    });
    FormActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-form-actions',
                    template: "<ng-container *ngIf=\"actionsRef; else defaultTemplate\">\n  <ng-container *ngTemplateOutlet=\"actionsRef\"></ng-container>\n</ng-container>\n\n<ng-template #defaultTemplate></ng-template>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FormActionsComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
    return FormActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FormActionsDefDirective = /** @class */ (function () {
    function FormActionsDefDirective(template, toolbar) {
        this.template = template;
        this.toolbar = toolbar;
    }
    /**
     * @return {?}
     */
    FormActionsDefDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.toolbar.actionTemplate = this.template;
    };
    /**
     * @return {?}
     */
    FormActionsDefDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.toolbar.actionTemplate = null;
    };
    FormActionsDefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[instantFormActionsDef]'
                },] }
    ];
    /** @nocollapse */
    FormActionsDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ToolbarService }
    ]; };
    return FormActionsDefDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule
                    ],
                    declarations: [BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective],
                    exports: [BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective],
                    providers: [ToolbarService]
                },] }
    ];
    return ToolbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { GridModule, GridComponent, ColumnDirective, GridRowMenuComponent, InstantDataSource, InstantDatabase, ToolbarModule, BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective, ToolbarService, GridToolbarComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIuc2VydmljZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQgPSAzMDAsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XG4gICAgfTtcbiAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxuICB9O1xufTtcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uL3V0aWxzL2RlYm91bmNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGF0YVJlYWRlciA9IGRlYm91bmNlKHRoaXMub25SZWFkLCAxMDApO1xuXG4gIG9uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVhZCgpO1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XG4gIH1cbiAgb25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgb25SZWFkKHNvcnQ/OiBTb3J0ZXIsIGZpbHRlcj86IEZpbHRlcikge31cblxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG5cbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIgPSB0aGlzLnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgdGhpcy5zb3J0Q2FjaGUgPSB7fTsgLy8gUmVzZXQgYWx3YXlzLiBNdWx0aXBsZSBjb2x1bW4gc29ydCBpcyBOT1Qgc3VwcG9ydGVkXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJDYWNoZVtmaWx0ZXIuYWN0aXZlXSA9IGZpbHRlci5maWx0ZXI7XG4gICAgICB0aGlzLmRhdGFSZWFkZXIodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cblxuXG5cbn1cblxuIiwiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XG4gIGFjdGl2ZTogc3RyaW5nO1xuICBmaWx0ZXI6IGFueTtcbn1cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWNvbHVtbidcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gSW5wdXRzXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcblxuICAvLyBUZW1wbGF0ZSByZWZzXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XG4gIGZpbHRlclZhbHVlOiBhbnk7XG4gIG9sZEZpbHRlcjogYW55O1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cbiAgICogQW55IGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbHVtbiBmaWx0ZXIsIG11c3QgZmlyZSB0aGlzXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cbiAgICpcbiAgICogQHBhcmFtIG9iaiBUaGUgZmlsdGVyIGFzIHJlY2VpdmVkIGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZVxuICAgKi9cbiAgc2V0RmlsdGVyKG9iajogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChvYmogIT09IHRoaXMub2xkRmlsdGVyKSB7XG4gICAgICBpZiAoIW5vRW1pdCkge1xuICAgICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBvYmp9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBvYmo7XG4gICAgICB0aGlzLm9sZEZpbHRlciA9IG9iajtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICByZW1vdmVGaWx0ZXIoKSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIobnVsbCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgJ2VsZW1lbnQtY2xvc2VzdCc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFZpZXdDaGlsZCxcbiAgT25EZXN0cm95LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XG4gIGRhdGE6IGFueTtcbiAgY29sTmFtZTogc3RyaW5nO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IEluc3RhbnREYXRhU291cmNlPGFueT47XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgc3RpY2t5OiBib29sZWFuO1xuICBASW5wdXQoKSByb3dBdHRyaWJ1dGVzOiBBcnJheTxhbnk+O1xuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7XG4gICAgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHY7XG4gIH1cbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAodGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8XG4gICAgICAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKSk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cblxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZVxuICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ3RkJykuY2xhc3NMaXN0KVxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcblxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoeyBkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGgnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtblxuICAgICAgLm1hcChiID0+XG4gICAgICAgIFtdLnNsaWNlXG4gICAgICAgICAgLmNhbGwoYi5jbGFzc0xpc3QpXG4gICAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcbiAgICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKVxuICAgICAgKTtcblxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cbiAgICB0aGlzLmNvbHVtbnNcbiAgICAgIC5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKVxuICAgICAgLmZvckVhY2goYyA9PiAoYy5maWx0ZXJPcGVuID0gZmFsc2UpKTtcbiAgfVxuXG4gIGNoZWNrQ2xvc2UoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXIpIHtcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgb25GaWx0ZXJDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcbiAgICBjb2wuc2V0RmlsdGVyKCRldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgZ2V0RmlsdGVyVmFsdWUoY29sKSB7XG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZS5rZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sLmZpbHRlclZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRSb3dDbGFzc2VzKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2hpZ2hsaWdodCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ2NsYXNzJ10gJiYgYXR0cltpXVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQoYXR0cltpXVsnY2xhc3MnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldFJvd1N0eWxlcyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ3N0eWxlJ10gJiYgYXR0cltpXVsnc3R5bGUnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMuY29uY2F0KGF0dHJbaV1bJ3N0eWxlJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJlbW92ZUZpbHRlcnMoKSB7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sID0+IHtcbiAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgY29sLnNldEZpbHRlcih1bmRlZmluZWQpO1xuICAgICAgfSBlbHNlIHJldHVybjtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLXRvb2xiYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBhZ2UgPSAwO1xuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PigpO1xuICBASW5wdXQoKSB0b3RhbCA9IDA7XG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XG4gIEBJbnB1dCgpIHBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbNSwgMTAsIDI1LCAxMDBdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBwYWdlSGFuZGxlcigkZXZlbnQ6IFBhZ2VFdmVudCkge1xuICAgIHRoaXMucGFnZVNpemUgPSAkZXZlbnQucGFnZVNpemU7XG4gICAgdGhpcy5wYWdlID0gJGV2ZW50LnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCgkZXZlbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2dyaWQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXJvdy1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtcm93LW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3JpZFJvd01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByb3c7XG4gIEBJbnB1dCgpIGljb24gPSAnZWxsaXBzaXMtdic7XG5cbiAgc2hvd01lbnUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQpIHsgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCRldmVudCkge1xuICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgIFtdLnNsaWNlLmNhbGwodGhpcy5ncmlkLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWNlbGwubWF0LWNvbHVtbi1hY3Rpb25zJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gSWYgYW55IHJvdyBhY3Rpb24gKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuLCBjbG9zZSBpdC5cbiAgICAgIC5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBjZWxsLmNsb3Nlc3QoJ21hdC1yb3cnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBbXS5zbGljZS5jYWxsKHJvdy5jbG9zZXN0KCdtYXQtdGFibGUnKS5jaGlsZHJlbikuaW5kZXhPZihyb3cpIC0gMTsgLy8gLSAxIGJlY2F1c2UgaGVhZGVyIGlzIGFsc28gYSBjaGlsZC5cbiAgICAgICAgdGhpcy5ncmlkLmRhdGFTb3VyY2UuZGIuZGF0YVNuYXBzaG90W2luZGV4XS5zaG93TWVudSA9IGZhbHNlOyAvLyBGaW5kIHJvdyBvYmplY3QgaW4gZGF0YWJhc2Ugc25hcHNob3QsIGFuZCBtYXJrIGl0IGNsb3NlZC5cbiAgICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1xuICBNYXRUYWJsZU1vZHVsZSwgTWF0U29ydE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UGFnaW5hdG9yTW9kdWxlLCBNYXRNZW51TW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IEdyaWRUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZFJvd01lbnVDb21wb25lbnQgfSBmcm9tICcuL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcblxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIEdyaWRDb21wb25lbnQsIENvbHVtbkRpcmVjdGl2ZSwgR3JpZFRvb2xiYXJDb21wb25lbnQsIEdyaWRSb3dNZW51Q29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlLCBQUklNQVJZX09VVExFVCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBhcmFtczogUGFyYW1zO1xuICB1cmw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9icmVhZGNydW1iLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICByb3V0ZU1hcDogSUJyZWFkY3J1bWJbXTtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZShuYXYgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3VybCBjaGFuZ2VkJyk7XG4gICAgICBjb25zdCByb290OiBBY3RpdmF0ZWRSb3V0ZSA9IHRoaXMucm91dGUucm9vdDtcbiAgICAgIHRoaXMucm91dGVNYXAgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJvb3QpO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhcnJheSBvZiBJQnJlYWRjcnVtYiBvYmplY3RzIHRoYXQgcmVwcmVzZW50IHRoZSBicmVhZGNydW1iXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZVxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEBwYXJhbSBicmVhZGNydW1ic1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRCcmVhZGNydW1icyhyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHVybDogc3RyaW5nPSAnJywgYnJlYWRjcnVtYnM6IElCcmVhZGNydW1iW109IFtdKTogSUJyZWFkY3J1bWJbXSB7XG4gICAgY29uc3QgUk9VVEVfREFUQV9CUkVBRENSVU1CID0gJ2JyZWFkY3J1bWInO1xuXG4gICAgLy8gZ2V0IHRoZSBjaGlsZCByb3V0ZXNcbiAgICBjb25zdCBjaGlsZHJlbjogQWN0aXZhdGVkUm91dGVbXSA9IHJvdXRlLmNoaWxkcmVuO1xuXG4gICAgLy8gcmV0dXJuIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoaWxkcmVuXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNoaWxkcmVuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgLy8gdmVyaWZ5IHByaW1hcnkgcm91dGVcbiAgICAgIGlmIChjaGlsZC5vdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyB2ZXJpZnkgdGhlIGN1c3RvbSBkYXRhIHByb3BlcnR5IFwiYnJlYWRjcnVtYlwiIGlzIHNwZWNpZmllZCBvbiB0aGUgcm91dGVcbiAgICAgIGlmICghY2hpbGQuc25hcHNob3QuZGF0YS5oYXNPd25Qcm9wZXJ0eShST1VURV9EQVRBX0JSRUFEQ1JVTUIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSByb3V0ZSdzIFVSTCBzZWdtZW50XG4gICAgICBjb25zdCByb3V0ZVVSTCA9IGNoaWxkLnNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcblxuICAgICAgLy8gYXBwZW5kIHJvdXRlIFVSTCB0byBVUkxcbiAgICAgIHVybCArPSBgLyR7cm91dGVVUkx9YDtcblxuICAgICAgLy8gYWRkIGJyZWFkY3J1bWJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWI6IElCcmVhZGNydW1iID0ge1xuICAgICAgICBsYWJlbDogY2hpbGQuc25hcHNob3QuZGF0YVtST1VURV9EQVRBX0JSRUFEQ1JVTUJdLFxuICAgICAgICBwYXJhbXM6IGNoaWxkLnNuYXBzaG90LnBhcmFtcyxcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH07XG4gICAgICBicmVhZGNydW1icy5wdXNoKGJyZWFkY3J1bWIpO1xuXG4gICAgICAvLyByZWN1cnNpdmVcbiAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJTZXJ2aWNlIHtcblxuICBhY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZm9ybS1hY3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zQ29tcG9uZW50IHtcblxuICBnZXQgYWN0aW9uc1JlZigpOiBUZW1wbGF0ZVJlZjxhbnk+IHsgcmV0dXJuIHRoaXMudG9vbGJhclNlcnZpY2UuYWN0aW9uVGVtcGxhdGU7IH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvb2xiYXJTZXJ2aWNlOiBUb29sYmFyU2VydmljZSkgeyB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpbnN0YW50Rm9ybUFjdGlvbnNEZWZdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIHRvb2xiYXI6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1BY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi90b29sYmFyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbQnJlYWRjcnVtYkNvbXBvbmVudCwgRm9ybUFjdGlvbnNDb21wb25lbnQsIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbVG9vbGJhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJmaWx0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBYSxRQUFRLEdBQUcsVUFBVSxJQUFJLEVBQUUsSUFBVSxFQUFFLFNBQWlCO0lBQTdCLHFCQUFBLEVBQUEsVUFBVTtJQUFFLDBCQUFBLEVBQUEsaUJBQWlCOztRQUMvRCxPQUFPO0lBQ1gsT0FBTztRQUFTLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87OztZQUNmLE9BQU8sR0FBRyxJQUFJOztZQUNkLEtB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