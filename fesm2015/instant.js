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
const debounce = function (func, wait = 300, immediate = false) {
    /** @type {?} */
    let timeout;
    return function (...args) {
        /** @type {?} */
        const context = this;
        /** @type {?} */
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        /** @type {?} */
        const callNow = immediate && !timeout;
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
class InstantDataSource extends DataSource {
    /**
     * @param {?} db
     */
    constructor(db) {
        super();
        this.db = db;
    }
    /**
     * @return {?}
     */
    connect() {
        return this.db.dataChange;
    }
    /**
     * @return {?}
     */
    disconnect() {
        this.db.onDestroy();
    }
}
/**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 * @abstract
 * @template T
 */
class InstantDatabase {
    constructor() {
        this.sortCache = {};
        this.filterChange = new BehaviorSubject(null);
        this.filterCache = {};
        this.dataChange = new BehaviorSubject([]);
        this.dataReader = debounce(this.onRead, 100);
    }
    /**
     * @return {?}
     */
    onInit() {
        this.onRead();
        this._dataChangeSubscriber = this.dataChange.subscribe(data => this.dataSnapshot = data);
    }
    /**
     * @return {?}
     */
    onDestroy() {
        this._dataChangeSubscriber.unsubscribe();
        this._sortSubscriber.unsubscribe();
        this._filterSubscriber.unsubscribe();
    }
    /**
     * @param {?=} sort
     * @param {?=} filter
     * @return {?}
     */
    onRead(sort, filter$$1) { }
    /**
     * @param {?} args
     * @return {?}
     */
    _configure(args) {
        Object.assign(this, args);
        // On any changes, read data
        this._sortSubscriber = this.sortChange.subscribe(sort => {
            this.sortCache = {}; // Reset always. Multiple column sort is NOT supported
            this.sortCache[sort.active] = sort.direction;
            this.dataReader(this.sortCache, this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(filter$$1 => {
            this.filterCache[filter$$1.active] = filter$$1.filter;
            this.dataReader(this.sortCache, this.filterCache);
        });
        // Attached to a grid. Run init
        if (this.onInit) {
            this.onInit();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
class ColumnDirective {
    /**
     *
     */
    constructor() {
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
    ngOnInit() {
        if (this.label == null) {
            this.label = this.name;
        }
    }
    /**
     * This method is invoked directly from the filter template.
     * Any custom implementation of a column filter, must fire this
     * method when user has made choices.
     *
     * @param {?} obj The filter as received from the filter template
     * @param {?=} noEmit
     * @return {?}
     */
    setFilter(obj, noEmit = false) {
        if ((obj !== this.oldFilter) || (obj === null)) {
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: obj });
            }
            this.filterValue = obj;
            this.oldFilter = obj;
        }
        this.filterOpen = false;
    }
    /**
     * @return {?}
     */
    removeFilter() {
        this.setFilter(null);
    }
}
ColumnDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'instant-column'
            },] }
];
/** @nocollapse */
ColumnDirective.ctorParameters = () => [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GridComponent {
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
    set displayedColumns(v) {
        this._displayedColumns = v;
    }
    /**
     * @return {?}
     */
    get displayedColumns() {
        return (this._displayedColumns =
            this._displayedColumns ||
                (this.columns ? this.columns.map(c => c.name) : null));
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
            const cellName = [].slice
                .call($event.target.closest('td').classList)
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
            // Find all header cells
            .call(this.elRef.nativeElement.querySelectorAll('th'))
            // Filter away current target
            .filter(b => !b.contains($event.target))
            // Get the name of the column
            .map(b => [].slice
            .call(b.classList)
            .find(c => c.indexOf('mat-column-') > -1)
            .substr('mat-column-'.length));
        // If any columns (not including current target) is marked as open close it.
        this.columns
            .filter(c => headersToClose.includes(c.name))
            .forEach(c => (c.filterOpen = false));
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
    /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    onFilterChange($event, col) {
        col.setFilter($event.target.value);
    }
    /**
     * @param {?} col
     * @return {?}
     */
    getFilterValue(col) {
        if (col.filterValue) {
            if (typeof col.filterValue === 'object') {
                return col.filterValue.key;
            }
            return col.filterValue;
        }
        return '';
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getRowClasses(index) {
        /** @type {?} */
        let classes = [];
        if (index === this.selectedIndex) {
            classes.push('highlight');
        }
        if (this.rowAttributes && this.rowAttributes.length > 0) {
            /** @type {?} */
            const attr = this.rowAttributes;
            for (let i = 0; i < attr.length; i++) {
                if (attr[i]['index'] === index) {
                    if (attr[i]['class'] && attr[i]['class'].length > 0) {
                        classes = classes.concat(attr[i]['class']);
                    }
                }
            }
        }
        return classes.join(' ');
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getRowStyles(index) {
        /** @type {?} */
        let styles = [];
        if (this.rowAttributes && this.rowAttributes.length > 0) {
            /** @type {?} */
            const attr = this.rowAttributes;
            for (let i = 0; i < attr.length; i++) {
                if (attr[i]['index'] === index) {
                    if (attr[i]['style'] && attr[i]['style'].length > 0) {
                        styles = styles.concat(attr[i]['style']);
                    }
                }
            }
        }
        return styles.join(' ');
    }
    /**
     * @return {?}
     */
    removeFilters() {
        this.columns.forEach(col => {
            col.removeFilter();
        });
    }
    /**
     * @return {?}
     */
    reload() {
        this.columns.forEach((col, index) => {
            if (index === 0) {
                col.removeFilter();
            }
            else {
                return;
            }
        });
    }
}
GridComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid',
                template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\n    <!-- Header definition -->\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <ng-container *ngIf=\"col.filterValue == null || col.filterValue == ''\">\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>No filter set</title>\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\n                />\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\n                />\n              </svg>\n            </ng-container>\n            <ng-container *ngIf=\"col.filterValue != null && col.filterValue != ''\">\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>Filter set</title>\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\n                />\n              </svg>\n            </ng-container>\n          </button>\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\n                    <span class=\"fa fa-refresh\"></span>\n                    <span>Refresh</span>\n                </button>\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\n                    <span class=\"fa fa-filter\"></span>\n                     <span>Clear filter</span>\n                </button>\n            </mat-menu>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </th>\n\n    <!-- Cell definition -->\n    <td mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </td>\n  </ng-container>\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"getRowClasses(index)\"\n           [ngStyle]=\"getRowStyles(index)\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></tr>\n</table>\n",
                styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}"]
            }] }
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: ElementRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GridToolbarComponent {
    constructor() {
        this.page = 0;
        this.pageChange = new EventEmitter();
        this.total = 0;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    pageHandler($event) {
        this.pageSize = $event.pageSize;
        this.page = $event.pageIndex;
        this.pageChange.emit($event);
    }
}
GridToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid-toolbar',
                template: "<mat-toolbar>\n  <header>\n    <ng-content></ng-content>\n  </header>\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\n</mat-toolbar>\n",
                styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
            }] }
];
/** @nocollapse */
GridToolbarComponent.ctorParameters = () => [];
GridToolbarComponent.propDecorators = {
    page: [{ type: Input }],
    pageChange: [{ type: Output }],
    total: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GridRowMenuComponent {
    /**
     * @param {?} grid
     */
    constructor(grid) {
        this.grid = grid;
        this.icon = 'ellipsis-v';
        this.showMenu = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        // Find all header cells
        [].slice.call(this.grid.elRef.nativeElement.querySelectorAll('mat-cell.mat-column-actions'))
            // Filter away current target
            .filter(b => !b.contains($event.target))
            // If any row action (not including current target) is marked as open, close it.
            .forEach(cell => {
            /** @type {?} */
            const row = cell.closest('mat-row');
            /** @type {?} */
            const index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1;
            this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
        });
    }
}
GridRowMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid-row-menu',
                template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
            }] }
];
/** @nocollapse */
GridRowMenuComponent.ctorParameters = () => [
    { type: GridComponent }
];
GridRowMenuComponent.propDecorators = {
    row: [{ type: Input }],
    icon: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GridModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class BreadcrumbComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(nav => {
            console.log('url changed');
            /** @type {?} */
            const root = this.route.root;
            this.routeMap = this.getBreadcrumbs(root);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(s => { if (s) {
            s.unsubscribe();
        } });
    }
    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param {?} route
     * @param {?=} url
     * @param {?=} breadcrumbs
     * @return {?}
     */
    getBreadcrumbs(route, url = '', breadcrumbs = []) {
        /** @type {?} */
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        // get the child routes
        /** @type {?} */
        const children = route.children;
        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }
        // iterate over each children
        for (const child of children) {
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
            const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            // append route URL to URL
            url += `/${routeURL}`;
            // add breadcrumb
            /** @type {?} */
            const breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };
            breadcrumbs.push(breadcrumb);
            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }
}
BreadcrumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-breadcrumb',
                template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                styles: [":host{flex:1}"]
            }] }
];
/** @nocollapse */
BreadcrumbComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ToolbarService {
    constructor() { }
}
ToolbarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ToolbarService.ctorParameters = () => [];
/** @nocollapse */ ToolbarService.ngInjectableDef = defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormActionsComponent {
    /**
     * @param {?} toolbarService
     */
    constructor(toolbarService) {
        this.toolbarService = toolbarService;
    }
    /**
     * @return {?}
     */
    get actionsRef() { return this.toolbarService.actionTemplate; }
}
FormActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-form-actions',
                template: "<ng-container *ngIf=\"actionsRef; else defaultTemplate\">\n  <ng-container *ngTemplateOutlet=\"actionsRef\"></ng-container>\n</ng-container>\n\n<ng-template #defaultTemplate></ng-template>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
FormActionsComponent.ctorParameters = () => [
    { type: ToolbarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FormActionsDefDirective {
    /**
     * @param {?} template
     * @param {?} toolbar
     */
    constructor(template, toolbar) {
        this.template = template;
        this.toolbar = toolbar;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.toolbar.actionTemplate = this.template;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.toolbar.actionTemplate = null;
    }
}
FormActionsDefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[instantFormActionsDef]'
            },] }
];
/** @nocollapse */
FormActionsDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ToolbarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class ToolbarModule {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIuc2VydmljZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQgPSAzMDAsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XG4gICAgfTtcbiAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxuICB9O1xufTtcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uL3V0aWxzL2RlYm91bmNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGF0YVJlYWRlciA9IGRlYm91bmNlKHRoaXMub25SZWFkLCAxMDApO1xuXG4gIG9uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVhZCgpO1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XG4gIH1cbiAgb25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgb25SZWFkKHNvcnQ/OiBTb3J0ZXIsIGZpbHRlcj86IEZpbHRlcikge31cblxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG5cbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIgPSB0aGlzLnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgdGhpcy5zb3J0Q2FjaGUgPSB7fTsgLy8gUmVzZXQgYWx3YXlzLiBNdWx0aXBsZSBjb2x1bW4gc29ydCBpcyBOT1Qgc3VwcG9ydGVkXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJDYWNoZVtmaWx0ZXIuYWN0aXZlXSA9IGZpbHRlci5maWx0ZXI7XG4gICAgICB0aGlzLmRhdGFSZWFkZXIodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cblxuXG5cbn1cblxuIiwiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XG4gIGFjdGl2ZTogc3RyaW5nO1xuICBmaWx0ZXI6IGFueTtcbn1cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWNvbHVtbidcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gSW5wdXRzXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcblxuICAvLyBUZW1wbGF0ZSByZWZzXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XG4gIGZpbHRlclZhbHVlOiBhbnk7XG4gIG9sZEZpbHRlcjogYW55O1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cbiAgICogQW55IGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbHVtbiBmaWx0ZXIsIG11c3QgZmlyZSB0aGlzXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cbiAgICpcbiAgICogQHBhcmFtIG9iaiBUaGUgZmlsdGVyIGFzIHJlY2VpdmVkIGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZVxuICAgKi9cbiAgc2V0RmlsdGVyKG9iajogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICgob2JqICE9PSB0aGlzLm9sZEZpbHRlcikgfHwgKG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgIGlmICghbm9FbWl0KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyLm5leHQoe2FjdGl2ZTogdGhpcy5uYW1lLCBmaWx0ZXI6IG9ian0pO1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IG9iajtcbiAgICAgIHRoaXMub2xkRmlsdGVyID0gb2JqO1xuICAgIH1cbiAgICB0aGlzLmZpbHRlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHJlbW92ZUZpbHRlcigpIHtcbiAgICB0aGlzLnNldEZpbHRlcihudWxsKTtcbiAgfVxufVxuXG5cbiIsImltcG9ydCAnZWxlbWVudC1jbG9zZXN0JztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgVmlld0NoaWxkLFxuICBPbkRlc3Ryb3ksXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSW5zdGFudERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3dDbGlja0V2ZW50IHtcbiAgZGF0YTogYW55O1xuICBjb2xOYW1lOiBzdHJpbmc7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBzdGlja3k6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvd0F0dHJpYnV0ZXM6IEFycmF5PGFueT47XG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHtcbiAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjtcbiAgfVxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuICh0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID1cbiAgICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHxcbiAgICAgICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGIuX2NvbmZpZ3VyZSh7XG4gICAgICAgIHNvcnRDaGFuZ2U6IHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxuXG4gIG9uUm93Q2xpY2tlZChyb3csICRldmVudCkge1xuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XG4gICAgICBjb25zdCBjZWxsTmFtZSA9IFtdLnNsaWNlXG4gICAgICAgIC5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgndGQnKS5jbGFzc0xpc3QpXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7IGRhdGE6IHJvdywgY29sTmFtZTogY2VsbE5hbWUgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCRldmVudCkge1xuICAgIGNvbnN0IGhlYWRlcnNUb0Nsb3NlOiBzdHJpbmdbXSA9IFtdLnNsaWNlXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcbiAgICAgIC5jYWxsKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0aCcpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXG4gICAgICAubWFwKGIgPT5cbiAgICAgICAgW10uc2xpY2VcbiAgICAgICAgICAuY2FsbChiLmNsYXNzTGlzdClcbiAgICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpXG4gICAgICApO1xuXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxuICAgIHRoaXMuY29sdW1uc1xuICAgICAgLmZpbHRlcihjID0+IGhlYWRlcnNUb0Nsb3NlLmluY2x1ZGVzKGMubmFtZSkpXG4gICAgICAuZm9yRWFjaChjID0+IChjLmZpbHRlck9wZW4gPSBmYWxzZSkpO1xuICB9XG5cbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNoYW5nZSgkZXZlbnQsIGNvbCkge1xuICAgIGNvbC5zZXRGaWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBnZXRGaWx0ZXJWYWx1ZShjb2wpIHtcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZS5rZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sLmZpbHRlclZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRSb3dDbGFzc2VzKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2hpZ2hsaWdodCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ2NsYXNzJ10gJiYgYXR0cltpXVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQoYXR0cltpXVsnY2xhc3MnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldFJvd1N0eWxlcyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ3N0eWxlJ10gJiYgYXR0cltpXVsnc3R5bGUnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMuY29uY2F0KGF0dHJbaV1bJ3N0eWxlJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJlbW92ZUZpbHRlcnMoKSB7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sID0+IHtcbiAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sLGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcGFnZSA9IDA7XG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFs1LCAxMCwgMjUsIDEwMF07XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHBhZ2VIYW5kbGVyKCRldmVudDogUGFnZUV2ZW50KSB7XG4gICAgdGhpcy5wYWdlU2l6ZSA9ICRldmVudC5wYWdlU2l6ZTtcbiAgICB0aGlzLnBhZ2UgPSAkZXZlbnQucGFnZUluZGV4O1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZ3JpZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtcm93LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHJvdztcbiAgQElucHV0KCkgaWNvbiA9ICdlbGxpcHNpcy12JztcblxuICBzaG93TWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgW10uc2xpY2UuY2FsbCh0aGlzLmdyaWQuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtY2VsbC5tYXQtY29sdW1uLWFjdGlvbnMnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBJZiBhbnkgcm93IGFjdGlvbiAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4sIGNsb3NlIGl0LlxuICAgICAgLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGNlbGwuY2xvc2VzdCgnbWF0LXJvdycpO1xuICAgICAgICBjb25zdCBpbmRleCA9IFtdLnNsaWNlLmNhbGwocm93LmNsb3Nlc3QoJ21hdC10YWJsZScpLmNoaWxkcmVuKS5pbmRleE9mKHJvdykgLSAxOyAvLyAtIDEgYmVjYXVzZSBoZWFkZXIgaXMgYWxzbyBhIGNoaWxkLlxuICAgICAgICB0aGlzLmdyaWQuZGF0YVNvdXJjZS5kYi5kYXRhU25hcHNob3RbaW5kZXhdLnNob3dNZW51ID0gZmFsc2U7IC8vIEZpbmQgcm93IG9iamVjdCBpbiBkYXRhYmFzZSBzbmFwc2hvdCwgYW5kIG1hcmsgaXQgY2xvc2VkLlxuICAgICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7XG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdE1lbnVNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR3JpZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIFBhcmFtcywgQWN0aXZhdGVkUm91dGUsIFBSSU1BUllfT1VUTEVUIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGFyYW1zOiBQYXJhbXM7XG4gIHVybDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHJvdXRlTWFwOiBJQnJlYWRjcnVtYltdO1xuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKG5hdiA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndXJsIGNoYW5nZWQnKTtcbiAgICAgIGNvbnN0IHJvb3Q6IEFjdGl2YXRlZFJvdXRlID0gdGhpcy5yb3V0ZS5yb290O1xuICAgICAgdGhpcy5yb3V0ZU1hcCA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocm9vdCk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFycmF5IG9mIElCcmVhZGNydW1iIG9iamVjdHMgdGhhdCByZXByZXNlbnQgdGhlIGJyZWFkY3J1bWJcbiAgICpcbiAgICogQHBhcmFtIHJvdXRlXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIGJyZWFkY3J1bWJzXG4gICAqL1xuICBwcml2YXRlIGdldEJyZWFkY3J1bWJzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXJsOiBzdHJpbmc9ICcnLCBicmVhZGNydW1iczogSUJyZWFkY3J1bWJbXT0gW10pOiBJQnJlYWRjcnVtYltdIHtcbiAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUIgPSAnYnJlYWRjcnVtYic7XG5cbiAgICAvLyBnZXQgdGhlIGNoaWxkIHJvdXRlc1xuICAgIGNvbnN0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XG5cbiAgICAvLyByZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnJlYWRjcnVtYnM7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2hpbGRyZW5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAvLyB2ZXJpZnkgcHJpbWFyeSByb3V0ZVxuICAgICAgaWYgKGNoaWxkLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHZlcmlmeSB0aGUgY3VzdG9tIGRhdGEgcHJvcGVydHkgXCJicmVhZGNydW1iXCIgaXMgc3BlY2lmaWVkIG9uIHRoZSByb3V0ZVxuICAgICAgaWYgKCFjaGlsZC5zbmFwc2hvdC5kYXRhLmhhc093blByb3BlcnR5KFJPVVRFX0RBVEFfQlJFQURDUlVNQikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIHJvdXRlJ3MgVVJMIHNlZ21lbnRcbiAgICAgIGNvbnN0IHJvdXRlVVJMID0gY2hpbGQuc25hcHNob3QudXJsLm1hcChzZWdtZW50ID0+IHNlZ21lbnQucGF0aCkuam9pbignLycpO1xuXG4gICAgICAvLyBhcHBlbmQgcm91dGUgVVJMIHRvIFVSTFxuICAgICAgdXJsICs9IGAvJHtyb3V0ZVVSTH1gO1xuXG4gICAgICAvLyBhZGQgYnJlYWRjcnVtYlxuICAgICAgY29uc3QgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWIgPSB7XG4gICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXG4gICAgICAgIHBhcmFtczogY2hpbGQuc25hcHNob3QucGFyYW1zLFxuICAgICAgICB1cmw6IHVybFxuICAgICAgfTtcbiAgICAgIGJyZWFkY3J1bWJzLnB1c2goYnJlYWRjcnVtYik7XG5cbiAgICAgIC8vIHJlY3Vyc2l2ZVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlcnZpY2Uge1xuXG4gIGFjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1mb3JtLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNDb21wb25lbnQge1xuXG4gIGdldCBhY3Rpb25zUmVmKCk6IFRlbXBsYXRlUmVmPGFueT4geyByZXR1cm4gdGhpcy50b29sYmFyU2VydmljZS5hY3Rpb25UZW1wbGF0ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuL3Rvb2xiYXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtUb29sYmFyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQWEsUUFBUSxHQUFHLFVBQVUsSUFBSSxFQUFFLElBQUksR0FBRyxHQUFHLEVBQUUsU0FBUyxHQUFHLEtBQUs7O1FBQy9ELE9BQU87SUFDWCxPQUFPLFVBQVMsR0FBRyxJQUFJOztjQUNmLE9BQU8sR0FBRyxJQUFJOztjQUNkLEtBQUssR0FBRztZQUNaLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMs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