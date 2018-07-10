(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/material'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/collections'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('instant', ['exports', '@angular/core', 'rxjs', '@angular/material', '@angular/common', '@angular/forms', '@angular/cdk/collections', '@angular/router', 'rxjs/operators'], factory) :
    (factory((global.instant = {}),global.ng.core,global.rxjs,global.ng.material,global.ng.common,global.ng.forms,global.ng.cdk.collections,global.ng.router,global.rxjs.operators));
}(this, (function (exports,i0,rxjs,material,common,forms,collections,router,operators) { 'use strict';

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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Column definition for the instant-grid.
     * Defines a set of cells and optional filters available for a table column.
     */
    var ColumnDirective = (function () {
        /**
         *
         */
        function ColumnDirective() {
            this.filterable = true;
            this.sortable = true;
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
         * @return {?}
         */
        ColumnDirective.prototype.setFilter = /**
         * This method is invoked directly from the filter template.
         * Any custom implementation of a column filter, must fire this
         * method when user has made choices.
         *
         * @param {?} obj The filter as received from the filter template
         * @return {?}
         */
            function (obj) {
                if (obj !== this.oldFilter) {
                    this.filter.next({ active: this.name, filter: obj });
                    this.filterValue = obj;
                    this.oldFilter = obj;
                }
                this.filterOpen = false;
            };
        ColumnDirective.decorators = [
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'instant-column'
                    },] },
        ];
        /** @nocollapse */
        ColumnDirective.ctorParameters = function () { return []; };
        ColumnDirective.propDecorators = {
            name: [{ type: i0.Input }],
            label: [{ type: i0.Input }],
            filterable: [{ type: i0.Input }],
            sortable: [{ type: i0.Input }],
            filterRef: [{ type: i0.ContentChild, args: ['filter',] }],
            cellRef: [{ type: i0.ContentChild, args: ['cell',] }]
        };
        return ColumnDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GridComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'instant-grid',
                        template: "<mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns\" [matColumnDef]=\"col.name\">\n    <!-- Header definition -->\n    <mat-header-cell *matHeaderCellDef>\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\"  [(ngModel)]=\"col.filterValue\" [ngModelOptions]=\"{standalone:true}\" (change)=\"col.setFilter(col.filterValue)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <i class=\"fa far fa-fw fa-filter\"></i>\n          </button>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </mat-header-cell>\n\n    <!-- Cell definition -->\n    <mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"{highlight: index === selectedIndex}\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></mat-row>\n</mat-table>\n",
                        styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}"]
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GridToolbarComponent = (function () {
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
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GridRowMenuComponent = (function () {
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
                    .filter(function (b) { return !b.contains($event.target); })
                    .forEach(function (cell) {
                    /** @type {?} */
                    var row = cell.closest('mat-row');
                    /** @type {?} */
                    var index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1; // - 1 because header is also a child.
                    _this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
                });
            };
        GridRowMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'instant-grid-row-menu',
                        template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                        styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GridModule = (function () {
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
                    },] },
        ];
        return GridModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     */ InstantDataSource = (function (_super) {
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
     */ InstantDatabase = (function () {
        function InstantDatabase() {
            this.sortCache = {};
            this.filterChange = new rxjs.BehaviorSubject(null);
            this.filterCache = {};
            this.dataChange = new rxjs.BehaviorSubject([]);
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
                    _this.onRead(_this.sortCache, _this.filterCache);
                });
                this._filterSubscriber = this.filterChange.subscribe(function (filter) {
                    _this.filterCache[filter.active] = filter.filter;
                    _this.onRead(_this.sortCache, _this.filterCache);
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BreadcrumbComponent = (function () {
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
                /** @type {?} */
                var ROUTE_DATA_BREADCRUMB = 'breadcrumb';
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
                        /** @type {?} */
                        var routeURL = child.snapshot.url.map(function (segment) { return segment.path; }).join('/');
                        // append route URL to URL
                        url += "/" + routeURL;
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
                var e_1, _a;
            };
        BreadcrumbComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'instant-breadcrumb',
                        template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                        styles: [":host{flex:1}"]
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ToolbarService = (function () {
        function ToolbarService() {
        }
        ToolbarService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ToolbarService.ctorParameters = function () { return []; };
        /** @nocollapse */ ToolbarService.ngInjectableDef = i0.defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });
        return ToolbarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FormActionsComponent = (function () {
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
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FormActionsDefDirective = (function () {
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
                    },] },
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ToolbarModule = (function () {
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
                    },] },
        ];
        return ToolbarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9kYXRhc291cmNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5zZXJ2aWNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci90b29sYmFyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xuICBhY3RpdmU6IHN0cmluZztcbiAgZmlsdGVyOiBhbnk7XG59XG5cbi8qKlxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIElucHV0c1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xuXG4gIC8vIFRlbXBsYXRlIHJlZnNcbiAgQENvbnRlbnRDaGlsZCgnZmlsdGVyJykgZmlsdGVyUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCdjZWxsJykgY2VsbFJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gIC8vIEZpbHRlciBwcm9wZXJ0aWVzXG4gIGZpbHRlck9wZW46IGJvb2xlYW47XG4gIGZpbHRlciA9IG5ldyBSZXBsYXlTdWJqZWN0PENvbHVtbkZpbHRlcj4oKTtcbiAgZmlsdGVyVmFsdWU6IGFueTtcbiAgcHJpdmF0ZSBvbGRGaWx0ZXI6IGFueTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBkaXJlY3RseSBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGUuXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICovXG4gIHNldEZpbHRlcihvYmo6IGFueSkge1xuICAgIGlmIChvYmogIT09IHRoaXMub2xkRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBvYmp9KTtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBvYmo7XG4gICAgICB0aGlzLm9sZEZpbHRlciA9IG9iajtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJPcGVuID0gZmFsc2U7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFZpZXdDaGlsZCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xuICBkYXRhOiBhbnk7XG4gIGNvbE5hbWU6IHN0cmluZztcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPG1hdC10YWJsZSAjdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIG1hdFNvcnQ+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2wubmFtZVwiPlxuICAgIDwhLS0gSGVhZGVyIGRlZmluaXRpb24gLS0+XG4gICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgIDxoZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25cIiAqbmdJZj1cImNvbC5maWx0ZXJhYmxlICE9IGZhbHNlXCI+XG4gICAgICAgICAgPG1hdC1tZW51ICNhcHBNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5maWx0ZXJSZWY7IGVsc2UgZGVmYXVsdEZpbHRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wuZmlsdGVyUmVmO2NvbnRleHQ6e2NvbDpjb2x9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RmlsdGVyVGVtcGxhdGU+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cIm5vLXBhZGRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGtleXVwKT1cImNoZWNrQ2xvc2UoJGV2ZW50LCBtZW51VHJpZ2dlcilcIiAgWyhuZ01vZGVsKV09XCJjb2wuZmlsdGVyVmFsdWVcIiBbbmdNb2RlbE9wdGlvbnNdPVwie3N0YW5kYWxvbmU6dHJ1ZX1cIiAoY2hhbmdlKT1cImNvbC5zZXRGaWx0ZXIoY29sLmZpbHRlclZhbHVlKVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY29sLnNldEZpbHRlcih1bmRlZmluZWQpXCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS10aW1lcyBmYS1md1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiYXBwTWVudVwiICNtZW51VHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS1maWx0ZXJcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG1hdC1zb3J0LWhlYWRlciBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSAhPSBmYWxzZVwiPlxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29sXCIgcm9sZT1cImhlYWRpbmdcIiAqbmdJZj1cImNvbC5zb3J0YWJsZSA9PSBmYWxzZVwiPlxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgIDwvbWF0LWhlYWRlci1jZWxsPlxuXG4gICAgPCEtLSBDZWxsIGRlZmluaXRpb24gLS0+XG4gICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wuY2VsbFJlZjsgZWxzZSBkZWZhdWx0Q2VsbFRlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wuY2VsbFJlZjtjb250ZXh0Ontyb3c6ZWxlbWVudCxjb2w6Y29sLm5hbWV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q2VsbFRlbXBsYXRlPlxuICAgICAgICB7eyBlbGVtZW50W2NvbC5uYW1lXSB9fVxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L21hdC1jZWxsPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXllZENvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxuICA8bWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztsZXQgaW5kZXg9aW5kZXg7XCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwie2hpZ2hsaWdodDogaW5kZXggPT09IHNlbGVjdGVkSW5kZXh9XCJcbiAgICAgICAgICAgW2F0dHIuZGF0YS1yb3dJbmRleF09XCJpbmRleFwiXG4gICAgICAgICAgIChjbGljayk9XCJvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpXCI+PC9tYXQtcm93PlxuPC9tYXQtdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgW3JvbGU9Y29sdW1uaGVhZGVyXSBoZWFkZXJ7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn1bcm9sZT1jb2x1bW5oZWFkZXJdOmhvdmVyIC5hY3Rpb24+YnV0dG9ue3Zpc2liaWxpdHk6dmlzaWJsZX1bcm9sZT1jb2x1bW5oZWFkZXJdIFtyb2xlPWhlYWRpbmdde2ZsZXg6MX06aG9zdC5zdHJpcGVkIFtyb2xlPXJvd106bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDIpfTo6bmctZGVlcCAubWF0LXRhYmxle2Rpc3BsYXk6dGFibGUhaW1wb3J0YW50O3dpZHRoOjEwMCV9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93LDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93e2Rpc3BsYXk6dGFibGUtcm93O3BhZGRpbmc6MDtib3JkZXI6bm9uZX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWhlYWRlci1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWhlYWRlci1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbDtoZWlnaHQ6NDhweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpO3BhZGRpbmctbGVmdDozcHh9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWNlbGx7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKX06Om5nLWRlZXAgLm5vLXBhZGRpbmd7bWF4LWhlaWdodDozcmVtO3BhZGRpbmc6MCAxNnB4O292ZXJmbG93OmhpZGRlbn0uYWN0aW9uIG1hdC1tZW51e3BhZGRpbmc6MH0uYWN0aW9uIG1hdC1tZW51IG1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowfS5tYXQtaWNvbi1idXR0b257d2lkdGg6MThweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2OyB9XG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHwgKHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLm5hbWUpIDogbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2UuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ21hdC1jZWxsJykuY2xhc3NMaXN0KVxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcblxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoe2RhdGE6IHJvdywgY29sTmFtZTogY2VsbE5hbWV9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyc1RvQ2xvc2U6IHN0cmluZ1tdID0gW10uc2xpY2VcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1oZWFkZXItY2VsbCcpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXG4gICAgICAubWFwKGIgPT4gW10uc2xpY2UuY2FsbChiLmNsYXNzTGlzdCkuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKS5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpKTtcblxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cbiAgICB0aGlzLmNvbHVtbnMuZmlsdGVyKGMgPT4gaGVhZGVyc1RvQ2xvc2UuaW5jbHVkZXMoYy5uYW1lKSkuZm9yRWFjaChjID0+IGMuZmlsdGVyT3BlbiA9IGZhbHNlKTtcbiAgfVxuXG4gIGNoZWNrQ2xvc2UoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXIpIHtcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC10b29sYmFyJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXI+XG4gIDxoZWFkZXI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2hlYWRlcj5cbiAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJ0b3RhbFwiIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiIChwYWdlKT1cInBhZ2VIYW5kbGVyKCRldmVudClcIiBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplT3B0aW9uc1wiPiA8L21hdC1wYWdpbmF0b3I+XG48L21hdC10b29sYmFyPlxuYCxcbiAgc3R5bGVzOiBbYG1hdC10b29sYmFyIGhlYWRlcntmbGV4OjF9Lm1hdC1wYWdpbmF0b3J7YmFja2dyb3VuZDowIDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYWdlID0gMDtcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2VFdmVudD4oKTtcbiAgQElucHV0KCkgdG90YWwgPSAwO1xuICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xuICBASW5wdXQoKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gWzUsIDEwLCAyNSwgMTAwXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcGFnZUhhbmRsZXIoJGV2ZW50OiBQYWdlRXZlbnQpIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gJGV2ZW50LnBhZ2VTaXplO1xuICAgIHRoaXMucGFnZSA9ICRldmVudC5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScsXG4gIHRlbXBsYXRlOiBgPG1hdC1tZW51ICNyb3dNZW51PVwibWF0TWVudVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L21hdC1tZW51PlxuXG48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cInJvd01lbnVcIj5cbiAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtZncgZmEte3sgaWNvbiB9fVwiPjwvaT5cbjwvYnV0dG9uPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfW1hdC1jYXJke3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwO3JpZ2h0OjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZFJvd01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByb3c7XG4gIEBJbnB1dCgpIGljb24gPSAnZWxsaXBzaXMtdic7XG5cbiAgc2hvd01lbnUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQpIHsgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCRldmVudCkge1xuICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgIFtdLnNsaWNlLmNhbGwodGhpcy5ncmlkLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWNlbGwubWF0LWNvbHVtbi1hY3Rpb25zJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gSWYgYW55IHJvdyBhY3Rpb24gKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuLCBjbG9zZSBpdC5cbiAgICAgIC5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBjZWxsLmNsb3Nlc3QoJ21hdC1yb3cnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBbXS5zbGljZS5jYWxsKHJvdy5jbG9zZXN0KCdtYXQtdGFibGUnKS5jaGlsZHJlbikuaW5kZXhPZihyb3cpIC0gMTsgLy8gLSAxIGJlY2F1c2UgaGVhZGVyIGlzIGFsc28gYSBjaGlsZC5cbiAgICAgICAgdGhpcy5ncmlkLmRhdGFTb3VyY2UuZGIuZGF0YVNuYXBzaG90W2luZGV4XS5zaG93TWVudSA9IGZhbHNlOyAvLyBGaW5kIHJvdyBvYmplY3QgaW4gZGF0YWJhc2Ugc25hcHNob3QsIGFuZCBtYXJrIGl0IGNsb3NlZC5cbiAgICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1xuICBNYXRUYWJsZU1vZHVsZSwgTWF0U29ydE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UGFnaW5hdG9yTW9kdWxlLCBNYXRNZW51TW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IEdyaWRUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZFJvd01lbnVDb21wb25lbnQgfSBmcm9tICcuL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcblxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIEdyaWRDb21wb25lbnQsIENvbHVtbkRpcmVjdGl2ZSwgR3JpZFRvb2xiYXJDb21wb25lbnQsIEdyaWRSb3dNZW51Q29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgb25Jbml0KCkge1xuICAgIHRoaXMub25SZWFkKCk7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIgPSB0aGlzLmRhdGFDaGFuZ2Uuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5kYXRhU25hcHNob3QgPSBkYXRhKTtcbiAgfVxuICBvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgfVxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxuXG4gIF9jb25maWd1cmUoYXJnczogUGFydGlhbDxJbnN0YW50RGF0YWJhc2U8VD4+KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcblxuICAgIC8vIE9uIGFueSBjaGFuZ2VzLCByZWFkIGRhdGFcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcbiAgICAgIHRoaXMuc29ydENhY2hlW3NvcnQuYWN0aXZlXSA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIgPSB0aGlzLmZpbHRlckNoYW5nZS5zdWJzY3JpYmUoZmlsdGVyID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyQ2FjaGVbZmlsdGVyLmFjdGl2ZV0gPSBmaWx0ZXIuZmlsdGVyO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlLCBQUklNQVJZX09VVExFVCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBhcmFtczogUGFyYW1zO1xuICB1cmw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGA8YSBbcm91dGVyTGlua109XCJbJy8nXVwiPjxpIGNsYXNzPVwiZmEgZmFyIGZhLWZ3IGZhLWhvbWVcIj48L2k+PC9hPlxuPGEgKm5nRm9yPVwibGV0IHJvdXRlIG9mIHJvdXRlTWFwXCIgW3JvdXRlckxpbmtdPVwiW3JvdXRlLnVybF1cIj57eyByb3V0ZS5sYWJlbCB9fTwvYT5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtmbGV4OjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICByb3V0ZU1hcDogSUJyZWFkY3J1bWJbXTtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZShuYXYgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3VybCBjaGFuZ2VkJyk7XG4gICAgICBjb25zdCByb290OiBBY3RpdmF0ZWRSb3V0ZSA9IHRoaXMucm91dGUucm9vdDtcbiAgICAgIHRoaXMucm91dGVNYXAgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJvb3QpO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhcnJheSBvZiBJQnJlYWRjcnVtYiBvYmplY3RzIHRoYXQgcmVwcmVzZW50IHRoZSBicmVhZGNydW1iXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZVxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEBwYXJhbSBicmVhZGNydW1ic1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRCcmVhZGNydW1icyhyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHVybDogc3RyaW5nPSAnJywgYnJlYWRjcnVtYnM6IElCcmVhZGNydW1iW109IFtdKTogSUJyZWFkY3J1bWJbXSB7XG4gICAgY29uc3QgUk9VVEVfREFUQV9CUkVBRENSVU1CID0gJ2JyZWFkY3J1bWInO1xuXG4gICAgLy8gZ2V0IHRoZSBjaGlsZCByb3V0ZXNcbiAgICBjb25zdCBjaGlsZHJlbjogQWN0aXZhdGVkUm91dGVbXSA9IHJvdXRlLmNoaWxkcmVuO1xuXG4gICAgLy8gcmV0dXJuIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoaWxkcmVuXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNoaWxkcmVuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgLy8gdmVyaWZ5IHByaW1hcnkgcm91dGVcbiAgICAgIGlmIChjaGlsZC5vdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyB2ZXJpZnkgdGhlIGN1c3RvbSBkYXRhIHByb3BlcnR5IFwiYnJlYWRjcnVtYlwiIGlzIHNwZWNpZmllZCBvbiB0aGUgcm91dGVcbiAgICAgIGlmICghY2hpbGQuc25hcHNob3QuZGF0YS5oYXNPd25Qcm9wZXJ0eShST1VURV9EQVRBX0JSRUFEQ1JVTUIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSByb3V0ZSdzIFVSTCBzZWdtZW50XG4gICAgICBjb25zdCByb3V0ZVVSTCA9IGNoaWxkLnNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcblxuICAgICAgLy8gYXBwZW5kIHJvdXRlIFVSTCB0byBVUkxcbiAgICAgIHVybCArPSBgLyR7cm91dGVVUkx9YDtcblxuICAgICAgLy8gYWRkIGJyZWFkY3J1bWJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWI6IElCcmVhZGNydW1iID0ge1xuICAgICAgICBsYWJlbDogY2hpbGQuc25hcHNob3QuZGF0YVtST1VURV9EQVRBX0JSRUFEQ1JVTUJdLFxuICAgICAgICBwYXJhbXM6IGNoaWxkLnNuYXBzaG90LnBhcmFtcyxcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH07XG4gICAgICBicmVhZGNydW1icy5wdXNoKGJyZWFkY3J1bWIpO1xuXG4gICAgICAvLyByZWN1cnNpdmVcbiAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJTZXJ2aWNlIHtcblxuICBhY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZm9ybS1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aW9uc1JlZjsgZWxzZSBkZWZhdWx0VGVtcGxhdGVcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImFjdGlvbnNSZWZcIj48L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zQ29tcG9uZW50IHtcblxuICBnZXQgYWN0aW9uc1JlZigpOiBUZW1wbGF0ZVJlZjxhbnk+IHsgcmV0dXJuIHRoaXMudG9vbGJhclNlcnZpY2UuYWN0aW9uVGVtcGxhdGU7IH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvb2xiYXJTZXJ2aWNlOiBUb29sYmFyU2VydmljZSkgeyB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpbnN0YW50Rm9ybUFjdGlvbnNEZWZdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIHRvb2xiYXI6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1BY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi90b29sYmFyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbQnJlYWRjcnVtYkNvbXBvbmVudCwgRm9ybUFjdGlvbnNDb21wb25lbnQsIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbVG9vbGJhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiUmVwbGF5U3ViamVjdCIsIkRpcmVjdGl2ZSIsIklucHV0IiwiQ29udGVudENoaWxkIiwiRXZlbnRFbWl0dGVyIiwibWVyZ2UiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiQ29udGVudENoaWxkcmVuIiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiTWF0U29ydCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJNYXRUYWJsZU1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdFBhZ2luYXRvck1vZHVsZSIsInRzbGliXzEuX19leHRlbmRzIiwiRGF0YVNvdXJjZSIsIkJlaGF2aW9yU3ViamVjdCIsInJvdXRlciIsImZpbHRlciIsIk5hdmlnYXRpb25FbmQiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiUFJJTUFSWV9PVVRMRVQiLCJBY3RpdmF0ZWRSb3V0ZSIsIlJvdXRlciIsIkluamVjdGFibGUiLCJUZW1wbGF0ZVJlZiIsIlJvdXRlck1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FB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