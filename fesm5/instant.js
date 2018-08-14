import { __extends, __spread, __values } from 'tslib';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, ReplaySubject, merge } from 'rxjs';
import { Input, Directive, TemplateRef, ContentChild, Component, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output, NgModule, Injectable, defineInjectable } from '@angular/core';
import { MatSort, MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
if (typeof (Element) !== 'undefined') {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            /** @type {?} */
            var el = this;
            if (!document.documentElement.contains(el)) {
                return null;
            }
            do {
                if (el.matches(s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
}

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
            _this.onRead(_this.sortCache, _this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(function (filter$$1) {
            _this.filterCache[filter$$1.active] = filter$$1.filter;
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
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
var ColumnDirective = /** @class */ (function () {
    /**
     *
     */
    function ColumnDirective() {
        this.filterable = true;
        this.sortable = true;
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
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'instant-column'
                },] },
    ];
    /** @nocollapse */
    ColumnDirective.ctorParameters = function () { return []; };
    ColumnDirective.propDecorators = {
        name: [{ type: Input }],
        label: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        filterRef: [{ type: ContentChild, args: ['filter',] }],
        cellRef: [{ type: ContentChild, args: ['cell',] }]
    };
    return ColumnDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    template: "<mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns\" [matColumnDef]=\"col.name\">\n    <!-- Header definition -->\n    <mat-header-cell *matHeaderCellDef>\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\"  [(ngModel)]=\"col.filterValue\" [ngModelOptions]=\"{standalone:true}\" (change)=\"col.setFilter(col.filterValue)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <ng-container *ngIf=\"col.filterValue == null || col.filterValue == ''\">\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>No filter set</title>\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\n                />\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\n                />\n              </svg>\n            </ng-container>\n            <ng-container *ngIf=\"col.filterValue != null && col.filterValue != ''\">\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>Filter set</title>\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\n                />\n              </svg>\n            </ng-container>\n          </button>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </mat-header-cell>\n\n    <!-- Cell definition -->\n    <mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </mat-cell>\n  </ng-container>\n\n  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"{highlight: index === selectedIndex}\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></mat-row>\n</mat-table>\n",
                    styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                },] },
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        { type: Component, args: [{
                    selector: 'instant-grid-row-menu',
                    template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                    styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                },] },
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                },] },
    ];
    return GridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                if (child.outlet !== PRIMARY_OUTLET) {
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    BreadcrumbComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-breadcrumb',
                    template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                    styles: [":host{flex:1}"]
                },] },
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ToolbarService = /** @class */ (function () {
    function ToolbarService() {
    }
    ToolbarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ToolbarService.ctorParameters = function () { return []; };
    /** @nocollapse */ ToolbarService.ngInjectableDef = defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });
    return ToolbarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                },] },
    ];
    /** @nocollapse */
    FormActionsComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
    return FormActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                },] },
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

export { GridModule, GridComponent, ColumnDirective, GridRowMenuComponent, InstantDataSource, InstantDatabase, ToolbarModule, BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective, ToolbarService, GridToolbarComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvY2xvc2VzdC1wb2x5ZmlsbC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9kYXRhc291cmNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2NvbHVtbi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQubW9kdWxlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5zZXJ2aWNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci90b29sYmFyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIChFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAocykge1xyXG4gICAgICBsZXQgZWwgPSB0aGlzO1xyXG4gICAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMocykpIHtcclxuICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGU7XHJcbiAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb2x1bW5GaWx0ZXIgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcbiAgW2V2ZW50OiBzdHJpbmddOiB7XG4gICAgYWN0aXZlOiBzdHJpbmcsXG4gICAgZGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYycgfCAnJyxcbiAgICBmaWx0ZXI/OiBhbnlcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICBbY29sOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIHtcbiAgW2NvbDogc3RyaW5nXTogJ2FzYycgfCAnZGVzYycgfCAnJztcbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBvYmplY3QgdGhlIE1hdCBUYWJsZSBhY3R1YWxseSB1c2VzLlxuICogSXQgaG9sZHMgYW4gYEluc3RhbnREYXRhYmFzZWAgb2JqZWN0LCBhbmQgZGVsaXZlcmVzXG4gKiBsaXZpbmcgZGF0YSBmcm9tIHRoaXMgb2JqZWN0IHRvIHRoZSBncmlkLlxuICovXG5leHBvcnQgY2xhc3MgSW5zdGFudERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGRiOiBJbnN0YW50RGF0YWJhc2U8VD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5kYi5kYXRhQ2hhbmdlO1xuICB9XG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5kYi5vbkRlc3Ryb3koKTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIG9iamVjdCByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciB1c2VyIGNoYW5nZXMgaW5cbiAqIHRoZSBncmlkLCBhbmQgbW9kaWZ5aW5nIHRoZSBkYXRhIGFjY29yZGluZ2x5LlxuICpcbiAqIEltcGxlbWVudG9ycyBzaG91bGQgbGlzdGVuIGZvciBldmVudHMgaW4gdGhlIGBvbkNsaWVudENoYW5nZWBcbiAqIG1ldGhvZCBhbmQgZGVsaXZhciBkYXRhIHRvIHRoZSBgZGF0YUNoYW5nZWAgU3ViamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RhbnREYXRhYmFzZTxUPiB7XG4gIHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTb3J0PjtcbiAgcHJpdmF0ZSBzb3J0Q2FjaGU6IFNvcnRlciA9IHt9O1xuICBwcml2YXRlIF9zb3J0U3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuXG4gIGZpbHRlckNoYW5nZTogT2JzZXJ2YWJsZTxDb2x1bW5GaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgcHJpdmF0ZSBmaWx0ZXJDYWNoZTogRmlsdGVyID0ge307XG4gIHByaXZhdGUgX2ZpbHRlclN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8VFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG4gIGRhdGFTbmFwc2hvdDtcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZVN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBvbkluaXQoKSB7XG4gICAgdGhpcy5vblJlYWQoKTtcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlciA9IHRoaXMuZGF0YUNoYW5nZS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLmRhdGFTbmFwc2hvdCA9IGRhdGEpO1xuICB9XG4gIG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICB9XG4gIG9uUmVhZChzb3J0PzogU29ydGVyLCBmaWx0ZXI/OiBGaWx0ZXIpIHt9XG5cbiAgX2NvbmZpZ3VyZShhcmdzOiBQYXJ0aWFsPEluc3RhbnREYXRhYmFzZTxUPj4pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuXG4gICAgLy8gT24gYW55IGNoYW5nZXMsIHJlYWQgZGF0YVxuICAgIHRoaXMuX3NvcnRTdWJzY3JpYmVyID0gdGhpcy5zb3J0Q2hhbmdlLnN1YnNjcmliZShzb3J0ID0+IHtcbiAgICAgIHRoaXMuc29ydENhY2hlID0ge307IC8vIFJlc2V0IGFsd2F5cy4gTXVsdGlwbGUgY29sdW1uIHNvcnQgaXMgTk9UIHN1cHBvcnRlZFxuICAgICAgdGhpcy5zb3J0Q2FjaGVbc29ydC5hY3RpdmVdID0gc29ydC5kaXJlY3Rpb247XG4gICAgICB0aGlzLm9uUmVhZCh0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJDYWNoZVtmaWx0ZXIuYWN0aXZlXSA9IGZpbHRlci5maWx0ZXI7XG4gICAgICB0aGlzLm9uUmVhZCh0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBdHRhY2hlZCB0byBhIGdyaWQuIFJ1biBpbml0XG4gICAgaWYgKHRoaXMub25Jbml0KSB7IHRoaXMub25Jbml0KCk7IH1cbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uRmlsdGVyIHtcbiAgYWN0aXZlOiBzdHJpbmc7XG4gIGZpbHRlcjogYW55O1xufVxuXG4vKipcbiAqIENvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgaW5zdGFudC1ncmlkLlxuICogRGVmaW5lcyBhIHNldCBvZiBjZWxscyBhbmQgb3B0aW9uYWwgZmlsdGVycyBhdmFpbGFibGUgZm9yIGEgdGFibGUgY29sdW1uLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2luc3RhbnQtY29sdW1uJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyBJbnB1dHNcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nOyAgLy8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoaXMgY29sdW1uLlxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nOyAvLyBEZWZhdWx0cyB0byB0aGUgaWRlbnRpZmllciBvZiBjb2x1bW5cbiAgQElucHV0KCkgZmlsdGVyYWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIHNvcnRhYmxlID0gdHJ1ZTtcblxuICAvLyBUZW1wbGF0ZSByZWZzXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XG4gIGZpbHRlclZhbHVlOiBhbnk7XG4gIHByaXZhdGUgb2xkRmlsdGVyOiBhbnk7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxhYmVsID09IG51bGwpIHtcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLm5hbWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZGlyZWN0bHkgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlLlxuICAgKiBBbnkgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgY29sdW1uIGZpbHRlciwgbXVzdCBmaXJlIHRoaXNcbiAgICogbWV0aG9kIHdoZW4gdXNlciBoYXMgbWFkZSBjaG9pY2VzLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqIFRoZSBmaWx0ZXIgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlXG4gICAqL1xuICBzZXRGaWx0ZXIob2JqOiBhbnkpIHtcbiAgICBpZiAob2JqICE9PSB0aGlzLm9sZEZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogb2JqfSk7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gb2JqO1xuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBvYmo7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xuICB9XG59XG5cblxuIiwiaW1wb3J0ICcuLi9jbG9zZXN0LXBvbHlmaWxsJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciAgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XG4gIGRhdGE6IGFueTtcbiAgY29sTmFtZTogc3RyaW5nO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRhYmxlICN0YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCIgbWF0U29ydD5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbC5uYW1lXCI+XG4gICAgPCEtLSBIZWFkZXIgZGVmaW5pdGlvbiAtLT5cbiAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvblwiICpuZ0lmPVwiY29sLmZpbHRlcmFibGUgIT0gZmFsc2VcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2FwcE1lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmZpbHRlclJlZjsgZWxzZSBkZWZhdWx0RmlsdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5maWx0ZXJSZWY7Y29udGV4dDp7Y29sOmNvbH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwibm8tcGFkZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cIkZpbHRlclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiAoa2V5dXApPVwiY2hlY2tDbG9zZSgkZXZlbnQsIG1lbnVUcmlnZ2VyKVwiICBbKG5nTW9kZWwpXT1cImNvbC5maWx0ZXJWYWx1ZVwiIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTp0cnVlfVwiIChjaGFuZ2UpPVwiY29sLnNldEZpbHRlcihjb2wuZmlsdGVyVmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZClcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmFyIGZhLXRpbWVzIGZhLWZ3XCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJhcHBNZW51XCIgI21lbnVUcmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wuZmlsdGVyVmFsdWUgPT0gbnVsbCB8fCBjb2wuZmlsdGVyVmFsdWUgPT0gJydcIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImZpbHRlci1pY29uIG5vLWZpbHRlci1zZXRcIiBkYXRhLW5hbWU9XCJObyBmaWx0ZXIgc2V0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQuMDYgMjQuMTJcIj5cbiAgICAgICAgICAgICAgICA8dGl0bGU+Tm8gZmlsdGVyIHNldDwvdGl0bGU+XG4gICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XCJjbHMtMVwiIHBvaW50cz1cIjEwLjMgMTkuOTMgMTAuMyAxMi45NCA0LjQ2IDUuODcgMTkuNDMgNS44NyAxMy41OCAxMy4wNSAxMy41OCAxOS45MyAxMC4zIDE5LjkzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE4LjQ4LDYuMzJsLTUuMTUsNi4zMi0uMi4yNXY2LjU4SDEwLjc1VjEyLjc4bC0uMjEtLjI2TDUuNDIsNi4zMkgxOC40OG0xLjktLjlIMy41TDkuODQsMTMuMXY3LjI4SDE0VjEzLjIxbDYuMzUtNy43OVpcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sLmZpbHRlclZhbHVlICE9IG51bGwgJiYgY29sLmZpbHRlclZhbHVlICE9ICcnXCI+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJmaWx0ZXItaWNvbiBmaWx0ZXItc2V0XCIgZGF0YS1uYW1lPVwiRmlsdGVyIHNldFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0LjA2IDI0LjEyXCI+XG4gICAgICAgICAgICAgICAgPHRpdGxlPkZpbHRlciBzZXQ8L3RpdGxlPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwiY2xzLTJcIiBwb2ludHM9XCIyMC4zIDUuNDIgMy40MiA1LjQyIDkuNzcgMTMuMSA5Ljc3IDIwLjM4IDEzLjk2IDIwLjM4IDEzLjk2IDEzLjIxIDIwLjMgNS40MlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgbWF0LXNvcnQtaGVhZGVyIGNsYXNzPVwiZmxleC1jb2xcIiByb2xlPVwiaGVhZGluZ1wiICpuZ0lmPVwiY29sLnNvcnRhYmxlICE9IGZhbHNlXCI+XG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2xcIiByb2xlPVwiaGVhZGluZ1wiICpuZ0lmPVwiY29sLnNvcnRhYmxlID09IGZhbHNlXCI+XG4gICAgICAgICAge3sgY29sLmxhYmVsIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgPC9tYXQtaGVhZGVyLWNlbGw+XG5cbiAgICA8IS0tIENlbGwgZGVmaW5pdGlvbiAtLT5cbiAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5jZWxsUmVmOyBlbHNlIGRlZmF1bHRDZWxsVGVtcGxhdGVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5jZWxsUmVmO2NvbnRleHQ6e3JvdzplbGVtZW50LGNvbDpjb2wubmFtZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRDZWxsVGVtcGxhdGU+XG4gICAgICAgIHt7IGVsZW1lbnRbY29sLm5hbWVdIH19XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbWF0LWNlbGw+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gIDxtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO2xldCBpbmRleD1pbmRleDtcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7aGlnaGxpZ2h0OiBpbmRleCA9PT0gc2VsZWN0ZWRJbmRleH1cIlxuICAgICAgICAgICBbYXR0ci5kYXRhLXJvd0luZGV4XT1cImluZGV4XCJcbiAgICAgICAgICAgKGNsaWNrKT1cIm9uUm93Q2xpY2tlZChyb3csICRldmVudClcIj48L21hdC1yb3c+XG48L21hdC10YWJsZT5cbmAsXG4gIHN0eWxlczogW2Bbcm9sZT1jb2x1bW5oZWFkZXJdIGhlYWRlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfVtyb2xlPWNvbHVtbmhlYWRlcl06aG92ZXIgLmFjdGlvbj5idXR0b257dmlzaWJpbGl0eTp2aXNpYmxlfVtyb2xlPWNvbHVtbmhlYWRlcl0gW3JvbGU9aGVhZGluZ117ZmxleDoxfTpob3N0LnN0cmlwZWQgW3JvbGU9cm93XTpudGgtY2hpbGQoZXZlbil7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMil9OjpuZy1kZWVwIC5tYXQtdGFibGV7ZGlzcGxheTp0YWJsZSFpbXBvcnRhbnQ7d2lkdGg6MTAwJX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3csOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3d7ZGlzcGxheTp0YWJsZS1yb3c7cGFkZGluZzowO2JvcmRlcjpub25lfTo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtaGVhZGVyLWNlbGwsOjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtaGVhZGVyLWNlbGx7ZGlzcGxheTp0YWJsZS1jZWxsO2hlaWdodDo0OHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4xMik7cGFkZGluZy1sZWZ0OjNweH06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbHtib3JkZXItbGVmdDoxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpfTo6bmctZGVlcCAubm8tcGFkZGluZ3ttYXgtaGVpZ2h0OjNyZW07cGFkZGluZzowIDE2cHg7b3ZlcmZsb3c6aGlkZGVufTo6bmctZGVlcCAubWF0LWNvbHVtbi1hY3Rpb25ze292ZXJmbG93OmluaXRpYWx9OjpuZy1kZWVwIC5tYXQtY29sdW1uLWFjdGlvbnMgLm1hdC1jYXJkLDo6bmctZGVlcCAubWF0LWNvbHVtbi1hY3Rpb25zIG1hdC1jYXJke3Bvc2l0aW9uOmFic29sdXRlfS5hY3Rpb24gbWF0LW1lbnV7cGFkZGluZzowfS5hY3Rpb24gbWF0LW1lbnUgbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJTtwYWRkaW5nOjA7bWFyZ2luOjB9Lm1hdC1pY29uLWJ1dHRvbnt3aWR0aDoxOHB4fS5maWx0ZXItaWNvbiAuY2xzLTF7ZmlsbDojZmZmfS5maWx0ZXItaWNvbiAuY2xzLTJ7ZmlsbDojMWQxZDFifWBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHsgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHY7IH1cbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fCAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cblxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZS5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgnbWF0LWNlbGwnKS5jbGFzc0xpc3QpXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7ZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZX0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWhlYWRlci1jZWxsJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cbiAgICAgIC5tYXAoYiA9PiBbXS5zbGljZS5jYWxsKGIuY2xhc3NMaXN0KS5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCkpO1xuXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxuICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKS5mb3JFYWNoKGMgPT4gYy5maWx0ZXJPcGVuID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXRvb2xiYXInLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhcj5cbiAgPGhlYWRlcj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvaGVhZGVyPlxuICA8bWF0LXBhZ2luYXRvciBbbGVuZ3RoXT1cInRvdGFsXCIgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCIgKHBhZ2UpPVwicGFnZUhhbmRsZXIoJGV2ZW50KVwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCI+IDwvbWF0LXBhZ2luYXRvcj5cbjwvbWF0LXRvb2xiYXI+XG5gLFxuICBzdHlsZXM6IFtgbWF0LXRvb2xiYXIgaGVhZGVye2ZsZXg6MX0ubWF0LXBhZ2luYXRvcntiYWNrZ3JvdW5kOjAgMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBhZ2UgPSAwO1xuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PigpO1xuICBASW5wdXQoKSB0b3RhbCA9IDA7XG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XG4gIEBJbnB1dCgpIHBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbNSwgMTAsIDI1LCAxMDBdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBwYWdlSGFuZGxlcigkZXZlbnQ6IFBhZ2VFdmVudCkge1xuICAgIHRoaXMucGFnZVNpemUgPSAkZXZlbnQucGFnZVNpemU7XG4gICAgdGhpcy5wYWdlID0gJGV2ZW50LnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCgkZXZlbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2dyaWQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXJvdy1tZW51JyxcbiAgdGVtcGxhdGU6IGA8bWF0LW1lbnUgI3Jvd01lbnU9XCJtYXRNZW51XCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbWF0LW1lbnU+XG5cbjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwicm93TWVudVwiPlxuICA8aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS17eyBpY29uIH19XCI+PC9pPlxuPC9idXR0b24+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9bWF0LWNhcmR7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDA7cmlnaHQ6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHJvdztcbiAgQElucHV0KCkgaWNvbiA9ICdlbGxpcHNpcy12JztcblxuICBzaG93TWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgW10uc2xpY2UuY2FsbCh0aGlzLmdyaWQuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtY2VsbC5tYXQtY29sdW1uLWFjdGlvbnMnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBJZiBhbnkgcm93IGFjdGlvbiAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4sIGNsb3NlIGl0LlxuICAgICAgLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGNlbGwuY2xvc2VzdCgnbWF0LXJvdycpO1xuICAgICAgICBjb25zdCBpbmRleCA9IFtdLnNsaWNlLmNhbGwocm93LmNsb3Nlc3QoJ21hdC10YWJsZScpLmNoaWxkcmVuKS5pbmRleE9mKHJvdykgLSAxOyAvLyAtIDEgYmVjYXVzZSBoZWFkZXIgaXMgYWxzbyBhIGNoaWxkLlxuICAgICAgICB0aGlzLmdyaWQuZGF0YVNvdXJjZS5kYi5kYXRhU25hcHNob3RbaW5kZXhdLnNob3dNZW51ID0gZmFsc2U7IC8vIEZpbmQgcm93IG9iamVjdCBpbiBkYXRhYmFzZSBzbmFwc2hvdCwgYW5kIG1hcmsgaXQgY2xvc2VkLlxuICAgICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7XG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdE1lbnVNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIFBhcmFtcywgQWN0aXZhdGVkUm91dGUsIFBSSU1BUllfT1VUTEVUIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGFyYW1zOiBQYXJhbXM7XG4gIHVybDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYDxhIFtyb3V0ZXJMaW5rXT1cIlsnLyddXCI+PGkgY2xhc3M9XCJmYSBmYXIgZmEtZncgZmEtaG9tZVwiPjwvaT48L2E+XG48YSAqbmdGb3I9XCJsZXQgcm91dGUgb2Ygcm91dGVNYXBcIiBbcm91dGVyTGlua109XCJbcm91dGUudXJsXVwiPnt7IHJvdXRlLmxhYmVsIH19PC9hPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2ZsZXg6MX1gXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHJvdXRlTWFwOiBJQnJlYWRjcnVtYltdO1xuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKG5hdiA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndXJsIGNoYW5nZWQnKTtcbiAgICAgIGNvbnN0IHJvb3Q6IEFjdGl2YXRlZFJvdXRlID0gdGhpcy5yb3V0ZS5yb290O1xuICAgICAgdGhpcy5yb3V0ZU1hcCA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocm9vdCk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFycmF5IG9mIElCcmVhZGNydW1iIG9iamVjdHMgdGhhdCByZXByZXNlbnQgdGhlIGJyZWFkY3J1bWJcbiAgICpcbiAgICogQHBhcmFtIHJvdXRlXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIGJyZWFkY3J1bWJzXG4gICAqL1xuICBwcml2YXRlIGdldEJyZWFkY3J1bWJzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXJsOiBzdHJpbmc9ICcnLCBicmVhZGNydW1iczogSUJyZWFkY3J1bWJbXT0gW10pOiBJQnJlYWRjcnVtYltdIHtcbiAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUIgPSAnYnJlYWRjcnVtYic7XG5cbiAgICAvLyBnZXQgdGhlIGNoaWxkIHJvdXRlc1xuICAgIGNvbnN0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XG5cbiAgICAvLyByZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnJlYWRjcnVtYnM7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2hpbGRyZW5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAvLyB2ZXJpZnkgcHJpbWFyeSByb3V0ZVxuICAgICAgaWYgKGNoaWxkLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHZlcmlmeSB0aGUgY3VzdG9tIGRhdGEgcHJvcGVydHkgXCJicmVhZGNydW1iXCIgaXMgc3BlY2lmaWVkIG9uIHRoZSByb3V0ZVxuICAgICAgaWYgKCFjaGlsZC5zbmFwc2hvdC5kYXRhLmhhc093blByb3BlcnR5KFJPVVRFX0RBVEFfQlJFQURDUlVNQikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIHJvdXRlJ3MgVVJMIHNlZ21lbnRcbiAgICAgIGNvbnN0IHJvdXRlVVJMID0gY2hpbGQuc25hcHNob3QudXJsLm1hcChzZWdtZW50ID0+IHNlZ21lbnQucGF0aCkuam9pbignLycpO1xuXG4gICAgICAvLyBhcHBlbmQgcm91dGUgVVJMIHRvIFVSTFxuICAgICAgdXJsICs9IGAvJHtyb3V0ZVVSTH1gO1xuXG4gICAgICAvLyBhZGQgYnJlYWRjcnVtYlxuICAgICAgY29uc3QgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWIgPSB7XG4gICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXG4gICAgICAgIHBhcmFtczogY2hpbGQuc25hcHNob3QucGFyYW1zLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfTtcbiAgICAgIGJyZWFkY3J1bWJzLnB1c2goYnJlYWRjcnVtYik7XG5cbiAgICAgIC8vIHJlY3Vyc2l2ZVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlcnZpY2Uge1xuXG4gIGFjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1mb3JtLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3Rpb25zUmVmOyBlbHNlIGRlZmF1bHRUZW1wbGF0ZVwiPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYWN0aW9uc1JlZlwiPjwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNDb21wb25lbnQge1xuXG4gIGdldCBhY3Rpb25zUmVmKCk6IFRlbXBsYXRlUmVmPGFueT4geyByZXR1cm4gdGhpcy50b29sYmFyU2VydmljZS5hY3Rpb25UZW1wbGF0ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtUb29sYmFyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsImZpbHRlciIsInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRTtJQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7UUFDOUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO0tBQzVHO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFH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