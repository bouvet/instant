(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('element-closest'), require('@angular/material'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/collections'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('instant', ['exports', '@angular/core', 'rxjs', 'element-closest', '@angular/material', '@angular/common', '@angular/forms', '@angular/cdk/collections', '@angular/router', 'rxjs/operators'], factory) :
    (factory((global.instant = {}),global.ng.core,global.rxjs,null,global.ng.material,global.ng.common,global.ng.forms,global.ng.cdk.collections,global.ng.router,global.rxjs.operators));
}(this, (function (exports,i0,rxjs,elementClosest,material,common,forms,collections,router,operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            this.filter = new rxjs.ReplaySubject();
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
                if (noEmit === void 0) {
                    noEmit = false;
                }
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
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'instant-column'
                    },] }
        ];
        /** @nocollapse */
        ColumnDirective.ctorParameters = function () { return []; };
        ColumnDirective.propDecorators = {
            name: [{ type: i0.Input }],
            label: [{ type: i0.Input }],
            filterable: [{ type: i0.Input }],
            sortable: [{ type: i0.Input }],
            sticky: [{ type: i0.Input }],
            instantStyle: [{ type: i0.Input, args: ['instant-style',] }],
            filterRef: [{ type: i0.ContentChild, args: ['filter',] }],
            cellRef: [{ type: i0.ContentChild, args: ['cell',] }]
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
            this.rowClicked = new i0.EventEmitter();
        }
        Object.defineProperty(GridComponent.prototype, "displayedColumns", {
            get: /**
             * @return {?}
             */ function () {
                return this._displayedColumns = this._displayedColumns || (this.columns ? this.columns.map(function (c) { return c.name; }) : null);
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) { this._displayedColumns = v; },
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
                        filterChange: rxjs.merge.apply(void 0, __spread(this.columns.map(function (c) { return c.filter; })))
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
                    var cellName = [].slice.call($event.target.closest('td').classList)
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
            { type: i0.Component, args: [{
                        selector: 'instant-grid',
                        template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\n    <!-- Header definition -->\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\"  [(ngModel)]=\"col.filterValue\" [ngModelOptions]=\"{standalone:true}\" (change)=\"col.setFilter(col.filterValue)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <ng-container *ngIf=\"col.filterValue == null || col.filterValue == ''\">\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>No filter set</title>\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\n                />\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\n                />\n              </svg>\n            </ng-container>\n            <ng-container *ngIf=\"col.filterValue != null && col.filterValue != ''\">\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>Filter set</title>\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\n                />\n              </svg>\n            </ng-container>\n          </button>\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\n                    <span class=\"fa fa-refresh\"></span>\n                    <span>Refresh</span>\n                </button>\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\n                    <span class=\"fa fa-filter\"></span>\n                     <span>Clear filter</span>\n                </button>\n            </mat-menu>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </th>\n\n    <!-- Cell definition -->\n    <td mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </td>\n  </ng-container>\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"getRowClasses(index)\"\n           [ngStyle]=\"getRowStyles(index)\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></tr>\n</table>\n",
                        styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}"]
                    }] }
        ];
        /** @nocollapse */
        GridComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        GridComponent.propDecorators = {
            dataSource: [{ type: i0.Input }],
            selectedIndex: [{ type: i0.Input }],
            sticky: [{ type: i0.Input }],
            rowAttributes: [{ type: i0.Input }],
            columns: [{ type: i0.ContentChildren, args: [ColumnDirective,] }],
            rowClicked: [{ type: i0.Output }],
            sort: [{ type: i0.ViewChild, args: [material.MatSort,] }],
            displayedColumns: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['document:click', ['$event'],] }]
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
            this.pageChange = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'instant-grid-toolbar',
                        template: "<mat-toolbar>\n  <header>\n    <ng-content></ng-content>\n  </header>\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\n</mat-toolbar>\n",
                        styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
                    }] }
        ];
        /** @nocollapse */
        GridToolbarComponent.ctorParameters = function () { return []; };
        GridToolbarComponent.propDecorators = {
            page: [{ type: i0.Input }],
            pageChange: [{ type: i0.Output }],
            total: [{ type: i0.Input }],
            pageSize: [{ type: i0.Input }],
            pageSizeOptions: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'instant-grid-row-menu',
                        template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                        styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                    }] }
        ];
        /** @nocollapse */
        GridRowMenuComponent.ctorParameters = function () {
            return [
                { type: GridComponent }
            ];
        };
        GridRowMenuComponent.propDecorators = {
            row: [{ type: i0.Input }],
            icon: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['document:click', ['$event'],] }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            material.MatTableModule,
                            material.MatSortModule,
                            material.MatInputModule,
                            material.MatCardModule,
                            material.MatMenuModule,
                            material.MatButtonModule,
                            material.MatToolbarModule,
                            material.MatPaginatorModule,
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
    /** @type {?} */
    var debounce = function (func, wait, immediate) {
        if (wait === void 0) {
            wait = 300;
        }
        if (immediate === void 0) {
            immediate = false;
        }
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
    var /**
     * This is the object the Mat Table actually uses.
     * It holds an `InstantDatabase` object, and deliveres
     * living data from this object to the grid.
     * @template T
     */ InstantDataSource = /** @class */ (function (_super) {
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
    }(collections.DataSource));
    /**
     * An object responsible for listening for user changes in
     * the grid, and modifying the data accordingly.
     *
     * Implementors should listen for events in the `onClientChange`
     * method and delivar data to the `dataChange` Subject.
     * @abstract
     * @template T
     */
    var /**
     * An object responsible for listening for user changes in
     * the grid, and modifying the data accordingly.
     *
     * Implementors should listen for events in the `onClientChange`
     * method and delivar data to the `dataChange` Subject.
     * @abstract
     * @template T
     */ InstantDatabase = /** @class */ (function () {
        function InstantDatabase() {
            this.sortCache = {};
            this.filterChange = new rxjs.BehaviorSubject(null);
            this.filterCache = {};
            this.dataChange = new rxjs.BehaviorSubject([]);
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
            function (sort, filter) { };
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
                this._filterSubscriber = this.filterChange.subscribe(function (filter) {
                    _this.filterCache[filter.active] = filter.filter;
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var BreadcrumbComponent = /** @class */ (function () {
        function BreadcrumbComponent(route, router$$1) {
            this.route = route;
            this.router = router$$1;
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
                this.subscriptions.push(this.router.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; })).subscribe(function (nav) {
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
                this.subscriptions.forEach(function (s) {
                    if (s) {
                        s.unsubscribe();
                    }
                });
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
                if (url === void 0) {
                    url = '';
                }
                if (breadcrumbs === void 0) {
                    breadcrumbs = [];
                }
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
                        if (child.outlet !== router.PRIMARY_OUTLET) {
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (children_1_1 && !children_1_1.done && (_a = children_1.return))
                            _a.call(children_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            };
        BreadcrumbComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'instant-breadcrumb',
                        template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                        styles: [":host{flex:1}"]
                    }] }
        ];
        /** @nocollapse */
        BreadcrumbComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute },
                { type: router.Router }
            ];
        };
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ToolbarService.ctorParameters = function () { return []; };
        /** @nocollapse */ ToolbarService.ngInjectableDef = i0.defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });
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
             */ function () { return this.toolbarService.actionTemplate; },
            enumerable: true,
            configurable: true
        });
        FormActionsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'instant-form-actions',
                        template: "<ng-container *ngIf=\"actionsRef; else defaultTemplate\">\n  <ng-container *ngTemplateOutlet=\"actionsRef\"></ng-container>\n</ng-container>\n\n<ng-template #defaultTemplate></ng-template>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        FormActionsComponent.ctorParameters = function () {
            return [
                { type: ToolbarService }
            ];
        };
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
            { type: i0.Directive, args: [{
                        selector: '[instantFormActionsDef]'
                    },] }
        ];
        /** @nocollapse */
        FormActionsDefDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef },
                { type: ToolbarService }
            ];
        };
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            router.RouterModule
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

    exports.GridModule = GridModule;
    exports.GridComponent = GridComponent;
    exports.ColumnDirective = ColumnDirective;
    exports.GridRowMenuComponent = GridRowMenuComponent;
    exports.InstantDataSource = InstantDataSource;
    exports.InstantDatabase = InstantDatabase;
    exports.ToolbarModule = ToolbarModule;
    exports.BreadcrumbComponent = BreadcrumbComponent;
    exports.FormActionsComponent = FormActionsComponent;
    exports.FormActionsDefDirective = FormActionsDefDirective;
    exports.ToolbarService = ToolbarService;
    exports.ɵa = GridToolbarComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2NvbHVtbi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQubW9kdWxlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi91dGlscy9kZWJvdW5jZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9kYXRhc291cmNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5zZXJ2aWNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci90b29sYmFyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xuICBhY3RpdmU6IHN0cmluZztcbiAgZmlsdGVyOiBhbnk7XG59XG5cbi8qKlxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIElucHV0c1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcbiAgQElucHV0KCdpbnN0YW50LXN0eWxlJykgaW5zdGFudFN0eWxlID0ge307XG5cbiAgLy8gVGVtcGxhdGUgcmVmc1xuICBAQ29udGVudENoaWxkKCdmaWx0ZXInKSBmaWx0ZXJSZWY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgLy8gRmlsdGVyIHByb3BlcnRpZXNcbiAgZmlsdGVyT3BlbjogYm9vbGVhbjtcbiAgZmlsdGVyID0gbmV3IFJlcGxheVN1YmplY3Q8Q29sdW1uRmlsdGVyPigpO1xuICBmaWx0ZXJWYWx1ZTogYW55O1xuICBvbGRGaWx0ZXI6IGFueTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBkaXJlY3RseSBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGUuXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICovXG4gIHNldEZpbHRlcihvYmo6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAob2JqICE9PSB0aGlzLm9sZEZpbHRlcikge1xuICAgICAgaWYgKCFub0VtaXQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogb2JqfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gb2JqO1xuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBvYmo7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcmVtb3ZlRmlsdGVyKCkge1xuICAgIHRoaXMuc2V0RmlsdGVyKG51bGwpO1xuICB9XG59XG5cblxuIiwiaW1wb3J0ICdlbGVtZW50LWNsb3Nlc3QnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgSG9zdExpc3RlbmVyLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNvcnQsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xuICBkYXRhOiBhbnk7XG4gIGNvbE5hbWU6IHN0cmluZztcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHN0aWNreTogYm9vbGVhbjtcbiAgQElucHV0KCkgcm93QXR0cmlidXRlczogQXJyYXk8YW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpIGNvbHVtbnM6IENvbHVtbkRpcmVjdGl2ZVtdO1xuICBAT3V0cHV0KCkgcm93Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Q2xpY2tFdmVudD4oKTtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG4gIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXllZENvbHVtbnModikgeyB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjsgfVxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8ICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGIuX2NvbmZpZ3VyZSh7XG4gICAgICAgIHNvcnRDaGFuZ2U6IHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUm93Q2xpY2tlZChyb3csICRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XG4gICAgICBjb25zdCBjZWxsTmFtZSA9IFtdLnNsaWNlLmNhbGwoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCd0ZCcpLmNsYXNzTGlzdClcbiAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcbiAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMucm93Q2xpY2tlZC5lbWl0KHsgZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyc1RvQ2xvc2U6IHN0cmluZ1tdID0gW10uc2xpY2VcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cbiAgICAgIC5tYXAoYiA9PiBbXS5zbGljZS5jYWxsKGIuY2xhc3NMaXN0KS5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCkpO1xuXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxuICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKS5mb3JFYWNoKGMgPT4gYy5maWx0ZXJPcGVuID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB9XG4gIH1cblxuICBnZXRSb3dDbGFzc2VzKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2hpZ2hsaWdodCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ2NsYXNzJ10gJiYgYXR0cltpXVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQoYXR0cltpXVsnY2xhc3MnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldFJvd1N0eWxlcyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ3N0eWxlJ10gJiYgYXR0cltpXVsnc3R5bGUnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMuY29uY2F0KGF0dHJbaV1bJ3N0eWxlJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJlbW92ZUZpbHRlcnMoKSB7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sID0+IHtcbiAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sLGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICBjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZCk7XG4gICAgICB9IGVsc2UgcmV0dXJuO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcGFnZSA9IDA7XG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFs1LCAxMCwgMjUsIDEwMF07XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHBhZ2VIYW5kbGVyKCRldmVudDogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5wYWdlU2l6ZSA9ICRldmVudC5wYWdlU2l6ZTtcbiAgICB0aGlzLnBhZ2UgPSAkZXZlbnQucGFnZUluZGV4O1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZ3JpZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtcm93LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHJvdztcbiAgQElucHV0KCkgaWNvbiA9ICdlbGxpcHNpcy12JztcblxuICBzaG93TWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgW10uc2xpY2UuY2FsbCh0aGlzLmdyaWQuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtY2VsbC5tYXQtY29sdW1uLWFjdGlvbnMnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBJZiBhbnkgcm93IGFjdGlvbiAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4sIGNsb3NlIGl0LlxuICAgICAgLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGNlbGwuY2xvc2VzdCgnbWF0LXJvdycpO1xuICAgICAgICBjb25zdCBpbmRleCA9IFtdLnNsaWNlLmNhbGwocm93LmNsb3Nlc3QoJ21hdC10YWJsZScpLmNoaWxkcmVuKS5pbmRleE9mKHJvdykgLSAxOyAvLyAtIDEgYmVjYXVzZSBoZWFkZXIgaXMgYWxzbyBhIGNoaWxkLlxuICAgICAgICB0aGlzLmdyaWQuZGF0YVNvdXJjZS5kYi5kYXRhU25hcHNob3RbaW5kZXhdLnNob3dNZW51ID0gZmFsc2U7IC8vIEZpbmQgcm93IG9iamVjdCBpbiBkYXRhYmFzZSBzbmFwc2hvdCwgYW5kIG1hcmsgaXQgY2xvc2VkLlxuICAgICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7XG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdE1lbnVNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRNb2R1bGUgeyB9XG4iLCJleHBvcnQgY29uc3QgZGVib3VuY2UgPSBmdW5jdGlvbiAoZnVuYywgd2FpdCA9IDMwMCwgaW1tZWRpYXRlID0gZmFsc2UpIHtcbiAgbGV0IHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgY29uc3QgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7IH1cbiAgICB9O1xuICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICBpZiAoY2FsbE5vdykgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XG4gIH07XG59O1xuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnLi4vdXRpbHMvZGVib3VuY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcbiAgW2V2ZW50OiBzdHJpbmddOiB7XG4gICAgYWN0aXZlOiBzdHJpbmcsXG4gICAgZGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYycgfCAnJyxcbiAgICBmaWx0ZXI/OiBhbnlcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICBbY29sOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIHtcbiAgW2NvbDogc3RyaW5nXTogJ2FzYycgfCAnZGVzYycgfCAnJztcbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBvYmplY3QgdGhlIE1hdCBUYWJsZSBhY3R1YWxseSB1c2VzLlxuICogSXQgaG9sZHMgYW4gYEluc3RhbnREYXRhYmFzZWAgb2JqZWN0LCBhbmQgZGVsaXZlcmVzXG4gKiBsaXZpbmcgZGF0YSBmcm9tIHRoaXMgb2JqZWN0IHRvIHRoZSBncmlkLlxuICovXG5leHBvcnQgY2xhc3MgSW5zdGFudERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGRiOiBJbnN0YW50RGF0YWJhc2U8VD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5kYi5kYXRhQ2hhbmdlO1xuICB9XG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5kYi5vbkRlc3Ryb3koKTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIG9iamVjdCByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciB1c2VyIGNoYW5nZXMgaW5cbiAqIHRoZSBncmlkLCBhbmQgbW9kaWZ5aW5nIHRoZSBkYXRhIGFjY29yZGluZ2x5LlxuICpcbiAqIEltcGxlbWVudG9ycyBzaG91bGQgbGlzdGVuIGZvciBldmVudHMgaW4gdGhlIGBvbkNsaWVudENoYW5nZWBcbiAqIG1ldGhvZCBhbmQgZGVsaXZhciBkYXRhIHRvIHRoZSBgZGF0YUNoYW5nZWAgU3ViamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RhbnREYXRhYmFzZTxUPiB7XG4gIHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTb3J0PjtcbiAgcHJpdmF0ZSBzb3J0Q2FjaGU6IFNvcnRlciA9IHt9O1xuICBwcml2YXRlIF9zb3J0U3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuXG4gIGZpbHRlckNoYW5nZTogT2JzZXJ2YWJsZTxDb2x1bW5GaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgcHJpdmF0ZSBmaWx0ZXJDYWNoZTogRmlsdGVyID0ge307XG4gIHByaXZhdGUgX2ZpbHRlclN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8VFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG4gIGRhdGFTbmFwc2hvdDtcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZVN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkYXRhUmVhZGVyID0gZGVib3VuY2UodGhpcy5vblJlYWQsIDEwMCk7XG5cbiAgb25Jbml0KCkge1xuICAgIHRoaXMub25SZWFkKCk7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIgPSB0aGlzLmRhdGFDaGFuZ2Uuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5kYXRhU25hcHNob3QgPSBkYXRhKTtcbiAgfVxuICBvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgfVxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxuXG4gIF9jb25maWd1cmUoYXJnczogUGFydGlhbDxJbnN0YW50RGF0YWJhc2U8VD4+KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcblxuICAgIC8vIE9uIGFueSBjaGFuZ2VzLCByZWFkIGRhdGFcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcbiAgICAgIHRoaXMuc29ydENhY2hlW3NvcnQuYWN0aXZlXSA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgdGhpcy5kYXRhUmVhZGVyKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcbiAgICB9KTtcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyID0gdGhpcy5maWx0ZXJDaGFuZ2Uuc3Vic2NyaWJlKGZpbHRlciA9PiB7XG4gICAgICB0aGlzLmZpbHRlckNhY2hlW2ZpbHRlci5hY3RpdmVdID0gZmlsdGVyLmZpbHRlcjtcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBdHRhY2hlZCB0byBhIGdyaWQuIFJ1biBpbml0XG4gICAgaWYgKHRoaXMub25Jbml0KSB7IHRoaXMub25Jbml0KCk7IH1cbiAgfVxuXG5cblxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIFBhcmFtcywgQWN0aXZhdGVkUm91dGUsIFBSSU1BUllfT1VUTEVUIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGFyYW1zOiBQYXJhbXM7XG4gIHVybDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHJvdXRlTWFwOiBJQnJlYWRjcnVtYltdO1xuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKG5hdiA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndXJsIGNoYW5nZWQnKTtcbiAgICAgIGNvbnN0IHJvb3Q6IEFjdGl2YXRlZFJvdXRlID0gdGhpcy5yb3V0ZS5yb290O1xuICAgICAgdGhpcy5yb3V0ZU1hcCA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocm9vdCk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFycmF5IG9mIElCcmVhZGNydW1iIG9iamVjdHMgdGhhdCByZXByZXNlbnQgdGhlIGJyZWFkY3J1bWJcbiAgICpcbiAgICogQHBhcmFtIHJvdXRlXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIGJyZWFkY3J1bWJzXG4gICAqL1xuICBwcml2YXRlIGdldEJyZWFkY3J1bWJzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXJsOiBzdHJpbmc9ICcnLCBicmVhZGNydW1iczogSUJyZWFkY3J1bWJbXT0gW10pOiBJQnJlYWRjcnVtYltdIHtcbiAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUIgPSAnYnJlYWRjcnVtYic7XG5cbiAgICAvLyBnZXQgdGhlIGNoaWxkIHJvdXRlc1xuICAgIGNvbnN0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XG5cbiAgICAvLyByZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnJlYWRjcnVtYnM7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2hpbGRyZW5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAvLyB2ZXJpZnkgcHJpbWFyeSByb3V0ZVxuICAgICAgaWYgKGNoaWxkLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHZlcmlmeSB0aGUgY3VzdG9tIGRhdGEgcHJvcGVydHkgXCJicmVhZGNydW1iXCIgaXMgc3BlY2lmaWVkIG9uIHRoZSByb3V0ZVxuICAgICAgaWYgKCFjaGlsZC5zbmFwc2hvdC5kYXRhLmhhc093blByb3BlcnR5KFJPVVRFX0RBVEFfQlJFQURDUlVNQikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIHJvdXRlJ3MgVVJMIHNlZ21lbnRcbiAgICAgIGNvbnN0IHJvdXRlVVJMID0gY2hpbGQuc25hcHNob3QudXJsLm1hcChzZWdtZW50ID0+IHNlZ21lbnQucGF0aCkuam9pbignLycpO1xuXG4gICAgICAvLyBhcHBlbmQgcm91dGUgVVJMIHRvIFVSTFxuICAgICAgdXJsICs9IGAvJHtyb3V0ZVVSTH1gO1xuXG4gICAgICAvLyBhZGQgYnJlYWRjcnVtYlxuICAgICAgY29uc3QgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWIgPSB7XG4gICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXG4gICAgICAgIHBhcmFtczogY2hpbGQuc25hcHNob3QucGFyYW1zLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfTtcbiAgICAgIGJyZWFkY3J1bWJzLnB1c2goYnJlYWRjcnVtYik7XG5cbiAgICAgIC8vIHJlY3Vyc2l2ZVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlcnZpY2Uge1xuXG4gIGFjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1mb3JtLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNDb21wb25lbnQge1xuXG4gIGdldCBhY3Rpb25zUmVmKCk6IFRlbXBsYXRlUmVmPGFueT4geyByZXR1cm4gdGhpcy50b29sYmFyU2VydmljZS5hY3Rpb25UZW1wbGF0ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtUb29sYmFyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJSZXBsYXlTdWJqZWN0IiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJFdmVudEVtaXR0ZXIiLCJtZXJnZSIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGRyZW4iLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJNYXRTb3J0IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIk1hdFRhYmxlTW9kdWxlIiwiTWF0U29ydE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJEYXRhU291cmNlIiwiQmVoYXZpb3JTdWJqZWN0Iiwicm91dGVyIiwiZmlsdGVyIiwiTmF2aWdhdGlvbkVuZCIsInRzbGliXzEuX192YWx1ZXMiLCJQUklNQVJZX09VVExFVCIsIkFjdGl2YXRlZFJvdXRlIiwiUm91dGVyIiwiSW5qZWN0YWJsZSIsIlRlbXBsYXRlUmVmIiwiUm91dGVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsYUFBZ0IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsU0FBUyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxhQTZFZ0IsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0FBRUQsYUFBZ0IsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7Z0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLEtBQUssRUFBRTtZQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUFFO2dCQUMvQjtZQUNKLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtvQkFDTztnQkFBRSxJQUFJLENBQUM7b0JBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQUU7U0FDcEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFFRCxhQUFnQixRQUFRO1FBQ3BCLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0FDMUlEOzs7O0FBZUE7Ozs7UUEyQkU7O1lBbkJTLGVBQVUsR0FBRyxJQUFJLENBQUM7WUFDbEIsYUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ0EsaUJBQVksR0FBRyxFQUFFLENBQUM7WUFTMUMsV0FBTSxHQUFHLElBQUlBLGtCQUFhLEVBQWdCLENBQUM7U0FPMUI7Ozs7UUFFakIsa0NBQVE7OztZQUFSO2dCQUNFLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDeEI7YUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFTRCxtQ0FBUzs7Ozs7Ozs7O1lBQVQsVUFBVSxHQUFRLEVBQUUsTUFBdUI7Z0JBQXZCLHVCQUFBO29CQUFBLGNBQXVCOztnQkFDekMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO3FCQUNwRDtvQkFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7aUJBQ3RCO2dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCOzs7O1FBRUQsc0NBQVk7OztZQUFaO2dCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7O29CQXZERkMsWUFBUyxTQUFDOzt3QkFFVCxRQUFRLEVBQUUsZ0JBQWdCO3FCQUMzQjs7Ozs7MkJBR0VDLFFBQUs7NEJBQ0xBLFFBQUs7aUNBQ0xBLFFBQUs7K0JBQ0xBLFFBQUs7NkJBQ0xBLFFBQUs7bUNBQ0xBLFFBQUssU0FBQyxlQUFlO2dDQUdyQkMsZUFBWSxTQUFDLFFBQVE7OEJBQ3JCQSxlQUFZLFNBQUMsTUFBTTs7UUF5Q3RCLHNCQUFDO0tBeEREOzs7Ozs7O1FDc0JFLHVCQUFtQixLQUFpQjtZQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1lBWDFCLGVBQVUsR0FBRyxJQUFJQyxlQUFZLEVBQWlCLENBQUM7U0FXaEI7UUFQekMsc0JBQ0ksMkNBQWdCOzs7Z0JBQ3BCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksR0FBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDakg7Ozs7Z0JBSkQsVUFDcUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRTs7O1dBQUE7Ozs7UUFRdkQsMENBQWtCOzs7WUFBbEI7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQzVCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7d0JBQ2hDLFlBQVksRUFBRUMsVUFBSyx3QkFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUEsQ0FBQyxFQUFDO3FCQUN4RCxDQUFDLENBQUM7aUJBQ0o7YUFDRjs7OztRQUVELG1DQUFXOzs7WUFBWDtnQkFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFBLENBQUMsQ0FBQztpQkFDOUM7YUFDRjs7Ozs7O1FBRUQsb0NBQVk7Ozs7O1lBQVosVUFBYSxHQUFHLEVBQUUsTUFBTTtnQkFDdEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLElBQUksRUFBRTs7d0JBQ3JELFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7eUJBQ2xFLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUEsQ0FBQzt5QkFDeEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7b0JBRS9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjs7Ozs7UUFHRCwrQkFBTzs7OztZQURQLFVBQ1EsTUFBTTs7b0JBQ04sY0FBYyxHQUFhLEVBQUUsQ0FBQyxLQUFLOztxQkFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOztxQkFFckQsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBQSxDQUFDOztxQkFFdkMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUEsQ0FBQzs7Z0JBRzdHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFBLENBQUMsQ0FBQzthQUM5Rjs7Ozs7O1FBRUQsa0NBQVU7Ozs7O1lBQVYsVUFBVyxNQUFxQixFQUFFLFdBQTJCO2dCQUMzRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO29CQUMxQixXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ3pCO2FBQ0Y7Ozs7O1FBRUQscUNBQWE7Ozs7WUFBYixVQUFjLEtBQWE7O29CQUNyQixPQUFPLEdBQWEsRUFBRTtnQkFFMUIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7d0JBQ2pELElBQUksR0FBRyxJQUFJLENBQUMsYUFBYTtvQkFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3BDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTs0QkFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBQ25ELE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUM1Qzt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7Ozs7O1FBRUQsb0NBQVk7Ozs7WUFBWixVQUFhLEtBQWE7O29CQUNwQixNQUFNLEdBQWEsRUFBRTtnQkFFekIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7d0JBQ2pELElBQUksR0FBRyxJQUFJLENBQUMsYUFBYTtvQkFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3BDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTs0QkFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBQ25ELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzZCQUMxQzt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7Ozs7UUFFRCxxQ0FBYTs7O1lBQWI7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUN0QixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3BCLENBQUMsQ0FBQzthQUNKOzs7O1FBRUQsOEJBQU07OztZQUFOO2dCQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFDLEtBQUs7b0JBQzdCLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTt3QkFDZCxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMxQjs7d0JBQU0sT0FBTztpQkFDZixDQUFDLENBQUM7YUFDSjs7b0JBckhGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLHl6SUFBb0M7O3FCQUVyQzs7Ozs7d0JBaEJDQyxhQUFVOzs7O2lDQWtCVEwsUUFBSztvQ0FDTEEsUUFBSzs2QkFDTEEsUUFBSztvQ0FDTEEsUUFBSzs4QkFDTE0sa0JBQWUsU0FBQyxlQUFlO2lDQUMvQkMsU0FBTTsyQkFDTkMsWUFBUyxTQUFDQyxnQkFBTzt1Q0FHakJULFFBQUs7OEJBa0NMVSxlQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O1FBcUU1QyxvQkFBQztLQXRIRDs7Ozs7O0FDZkE7UUFlRTtZQU5TLFNBQUksR0FBRyxDQUFDLENBQUM7WUFDUixlQUFVLEdBQUcsSUFBSVIsZUFBWSxFQUFhLENBQUM7WUFDNUMsVUFBSyxHQUFHLENBQUMsQ0FBQztZQUNWLGFBQVEsR0FBRyxFQUFFLENBQUM7WUFDZCxvQkFBZSxHQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FFckM7Ozs7UUFFakIsdUNBQVE7OztZQUFSO2FBQ0M7Ozs7O1FBRUQsMENBQVc7Ozs7WUFBWCxVQUFZLE1BQWlCO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUI7O29CQXJCRkUsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxzQkFBc0I7d0JBQ2hDLHVQQUE0Qzs7cUJBRTdDOzs7OzsyQkFFRUosUUFBSztpQ0FDTE8sU0FBTTs0QkFDTlAsUUFBSzsrQkFDTEEsUUFBSztzQ0FDTEEsUUFBSzs7UUFZUiwyQkFBQztLQXRCRDs7Ozs7O0FDSEE7UUFjRSw4QkFBb0IsSUFBbUI7WUFBbkIsU0FBSSxHQUFKLElBQUksQ0FBZTtZQUo5QixTQUFJLEdBQUcsWUFBWSxDQUFDO1lBRTdCLGFBQVEsR0FBRyxLQUFLLENBQUM7U0FFMkI7Ozs7UUFFNUMsdUNBQVE7OztZQUFSLGVBQWM7Ozs7O1FBR2Qsc0NBQU87Ozs7WUFEUCxVQUNRLE1BQU07Z0JBRGQsaUJBWUM7O2dCQVRDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztxQkFFekYsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBQSxDQUFDOztxQkFFdkMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7d0JBQ0wsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOzt3QkFDN0IsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQy9FLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDOUQsQ0FBQyxDQUFDO2FBQ047O29CQTNCRkksWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSx1QkFBdUI7d0JBQ2pDLDhOQUE2Qzs7cUJBRTlDOzs7Ozt3QkFOUSxhQUFhOzs7OzBCQVFuQkosUUFBSzsyQkFDTEEsUUFBSzs4QkFRTFUsZUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOztRQWE1QywyQkFBQztLQTVCRDs7Ozs7O0FDSEE7UUFhQTtTQWlCMkI7O29CQWpCMUJDLFdBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLG1CQUFZOzRCQUNaQyxpQkFBVzs0QkFFWEMsdUJBQWM7NEJBQ2RDLHNCQUFhOzRCQUNiQyx1QkFBYzs0QkFDZEMsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyx3QkFBZTs0QkFDZkMseUJBQWdCOzRCQUNoQkMsMkJBQWtCO3lCQUNuQjt3QkFDRCxZQUFZLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO3dCQUM1RixPQUFPLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO3FCQUN4Rjs7UUFDeUIsaUJBQUM7S0FqQjNCOzs7Ozs7O0FDYkEsUUFBYSxRQUFRLEdBQUcsVUFBVSxJQUFJLEVBQUUsSUFBVSxFQUFFLFNBQWlCO1FBQTdCLHFCQUFBO1lBQUEsVUFBVTs7UUFBRSwwQkFBQTtZQUFBLGlCQUFpQjs7O1lBQy9ELE9BQU87UUFDWCxPQUFPO1lBQVMsY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLHlCQUFPOzs7Z0JBQ2YsT0FBTyxHQUFHLElBQUk7O2dCQUNkLEtBQUssR0FBRztnQkFDWixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQUU7YUFDL0M7O2dCQUNLLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxPQUFPO1lBQ3JDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLE9BQU8sRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUFFO1NBQzVDLENBQUM7SUFDSixDQUFDOzs7Ozs7Ozs7Ozs7QUNlRDs7Ozs7O1FBQTBDQyxxQ0FBYTtRQUNyRCwyQkFBbUIsRUFBc0I7WUFBekMsWUFDRSxpQkFBTyxTQUNSO1lBRmtCLFFBQUUsR0FBRixFQUFFLENBQW9COztTQUV4Qzs7OztRQUNELG1DQUFPOzs7WUFBUDtnQkFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQzNCOzs7O1FBQ0Qsc0NBQVU7OztZQUFWO2dCQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDckI7UUFDSCx3QkFBQztJQUFELENBVkEsQ0FBMENDLHNCQUFVLEdBVW5EOzs7Ozs7Ozs7O0FBU0Q7Ozs7Ozs7OztRQUFBO1lBRVUsY0FBUyxHQUFXLEVBQUUsQ0FBQztZQUcvQixpQkFBWSxHQUE2QixJQUFJQyxvQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBR2pDLGVBQVUsR0FBeUIsSUFBSUEsb0JBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztZQUd4RCxlQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FpQ2pEOzs7O1FBL0JDLGdDQUFNOzs7WUFBTjtnQkFBQSxpQkFHQztnQkFGQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDO2FBQzFGOzs7O1FBQ0QsbUNBQVM7OztZQUFUO2dCQUNFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RDOzs7Ozs7UUFDRCxnQ0FBTTs7Ozs7WUFBTixVQUFPLElBQWEsRUFBRSxNQUFlLEtBQUk7Ozs7O1FBRXpDLG9DQUFVOzs7O1lBQVYsVUFBVyxJQUFpQztnQkFBNUMsaUJBZ0JDO2dCQWZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztnQkFHMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ25ELEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUM3QyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNuRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDekQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDaEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbkQsQ0FBQyxDQUFDOztnQkFHSCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUFFO2FBQ3BDO1FBSUgsc0JBQUM7SUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7UUN2RUMsNkJBQW9CLEtBQXFCLEVBQVVDLFNBQWM7WUFBN0MsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7WUFBVSxXQUFNLEdBQU5BLFNBQU0sQ0FBUTtZQUZqRSxrQkFBYSxHQUFtQixFQUFFLENBQUM7U0FFbUM7Ozs7UUFFdEUsc0NBQVE7OztZQUFSO2dCQUFBLGlCQU1DO2dCQUxDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQ0MsZ0JBQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWUMsb0JBQWEsR0FBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUM1RyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzt3QkFDckIsSUFBSSxHQUFtQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7b0JBQzVDLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDM0MsQ0FBQyxDQUFDLENBQUM7YUFDTDs7OztRQUVELHlDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQU0sSUFBSSxDQUFDLEVBQUU7d0JBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUFFO2lCQUFFLENBQUMsQ0FBQzthQUNsRTs7Ozs7Ozs7Ozs7Ozs7OztRQVNPLDRDQUFjOzs7Ozs7OztZQUF0QixVQUF1QixLQUFxQixFQUFFLEdBQWUsRUFBRSxXQUE4QjtnQkFBL0Msb0JBQUE7b0JBQUEsUUFBZTs7Z0JBQUUsNEJBQUE7b0JBQUEsZ0JBQThCOzs7O29CQUNyRixxQkFBcUIsR0FBRyxZQUFZOzs7b0JBR3BDLFFBQVEsR0FBcUIsS0FBSyxDQUFDLFFBQVE7O2dCQUdqRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixPQUFPLFdBQVcsQ0FBQztpQkFDcEI7OztvQkFHRCxLQUFvQixJQUFBLGFBQUFDLFNBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO3dCQUF6QixJQUFNLEtBQUsscUJBQUE7O3dCQUVkLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBS0MscUJBQWMsRUFBRTs0QkFDbkMsU0FBUzt5QkFDVjs7d0JBR0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFOzRCQUM5RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzt5QkFDckQ7Ozs0QkFHSyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksR0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7d0JBRzFFLEdBQUcsSUFBSSxNQUFJLFFBQVUsQ0FBQzs7OzRCQUdoQixVQUFVLEdBQWdCOzRCQUM5QixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7NEJBQ2pELE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU07NEJBQzdCLEdBQUcsRUFBRSxHQUFHO3lCQUNUO3dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O3dCQUc3QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDckQ7Ozs7Ozs7Ozs7Ozs7OzthQUNGOztvQkF2RUZ6QixZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjt3QkFDOUIsMEtBQTBDOztxQkFFM0M7Ozs7O3dCQWR1QzBCLHFCQUFjO3dCQUE3Q0MsYUFBTTs7O1FBa0ZmLDBCQUFDO0tBeEVEOzs7Ozs7QUNYQTtRQVNFO1NBQWlCOztvQkFQbEJDLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OzZCQUpEO0tBRUE7Ozs7OztBQ0ZBO1FBYUUsOEJBQW9CLGNBQThCO1lBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtTQUFLO1FBRnZELHNCQUFJLDRDQUFVOzs7Z0JBQWQsY0FBcUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFOzs7V0FBQTs7b0JBUGxGNUIsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxzQkFBc0I7d0JBQ2hDLDBNQUE0Qzs7cUJBRTdDOzs7Ozt3QkFOUSxjQUFjOzs7UUFhdkIsMkJBQUM7S0FYRDs7Ozs7O0FDSkE7UUFPRSxpQ0FBbUIsUUFBMEIsRUFBVSxPQUF1QjtZQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUFVLFlBQU8sR0FBUCxPQUFPLENBQWdCO1NBQUs7Ozs7UUFFbkYsMENBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDN0M7Ozs7UUFFRCw2Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3BDOztvQkFaRkwsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSx5QkFBeUI7cUJBQ3BDOzs7Ozt3QkFMbUJrQyxjQUFXO3dCQUN0QixjQUFjOzs7UUFldkIsOEJBQUM7S0FiRDs7Ozs7O0FDSEE7UUFTQTtTQVM4Qjs7b0JBVDdCdEIsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1pzQixtQkFBWTt5QkFDYjt3QkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsQ0FBQzt3QkFDbEYsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsdUJBQXVCLENBQUM7d0JBQzdFLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztxQkFDNUI7O1FBQzRCLG9CQUFDO0tBVDlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==