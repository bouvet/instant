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
        if (obj !== this.oldFilter) {
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
            /** @type {?} */
            const cellName = [].slice.call($event.target.closest('td').classList)
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
            if (index == 0) {
                col.setFilter(undefined);
            }
            else
                return;
        });
    }
}
GridComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid',
                template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\n    <!-- Header definition -->\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\n      <header>\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\n          <mat-menu #appMenu=\"matMenu\">\n            <ng-container *ngIf=\"col.filterRef; else defaultFilterTemplate\">\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\n            </ng-container>\n\n            <ng-template #defaultFilterTemplate>\n              <mat-form-field class=\"no-padding\">\n                <input matInput placeholder=\"Filter\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\"  [(ngModel)]=\"col.filterValue\" [ngModelOptions]=\"{standalone:true}\" (change)=\"col.setFilter(col.filterValue)\">\n                <button mat-icon-button matSuffix (click)=\"col.setFilter(undefined)\">\n                  <i class=\"fa far fa-times fa-fw\"></i>\n                </button>\n              </mat-form-field>\n            </ng-template>\n          </mat-menu>\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\">\n            <ng-container *ngIf=\"col.filterValue == null || col.filterValue == ''\">\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>No filter set</title>\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\n                />\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\n                />\n              </svg>\n            </ng-container>\n            <ng-container *ngIf=\"col.filterValue != null && col.filterValue != ''\">\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\n                <title>Filter set</title>\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\n                />\n              </svg>\n            </ng-container>\n          </button>\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\n                    <span class=\"fa fa-refresh\"></span>\n                    <span>Refresh</span>\n                </button>\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\n                    <span class=\"fa fa-filter\"></span>\n                     <span>Clear filter</span>\n                </button>\n            </mat-menu>\n        </div>\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\n          {{ col.label }}\n        </div>\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\n          {{ col.label }}\n        </div>\n      </header>\n    </th>\n\n    <!-- Cell definition -->\n    <td mat-cell *matCellDef=\"let element\">\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\n      </ng-container>\n\n      <ng-template #defaultCellTemplate>\n        {{ element[col.name] }}\n      </ng-template>\n    </td>\n  </ng-container>\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\n           [ngClass]=\"getRowClasses(index)\"\n           [ngStyle]=\"getRowStyles(index)\"\n           [attr.data-rowIndex]=\"index\"\n           (click)=\"onRowClicked(row, $event)\"></tr>\n</table>\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIuc2VydmljZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQgPSAzMDAsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XG4gICAgfTtcbiAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxuICB9O1xufTtcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uL3V0aWxzL2RlYm91bmNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGF0YVJlYWRlciA9IGRlYm91bmNlKHRoaXMub25SZWFkLCAxMDApO1xuXG4gIG9uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVhZCgpO1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XG4gIH1cbiAgb25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgb25SZWFkKHNvcnQ/OiBTb3J0ZXIsIGZpbHRlcj86IEZpbHRlcikge31cblxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG5cbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIgPSB0aGlzLnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgdGhpcy5zb3J0Q2FjaGUgPSB7fTsgLy8gUmVzZXQgYWx3YXlzLiBNdWx0aXBsZSBjb2x1bW4gc29ydCBpcyBOT1Qgc3VwcG9ydGVkXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJDYWNoZVtmaWx0ZXIuYWN0aXZlXSA9IGZpbHRlci5maWx0ZXI7XG4gICAgICB0aGlzLmRhdGFSZWFkZXIodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cblxuXG5cbn1cblxuIiwiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XG4gIGFjdGl2ZTogc3RyaW5nO1xuICBmaWx0ZXI6IGFueTtcbn1cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWNvbHVtbidcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gSW5wdXRzXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcblxuICAvLyBUZW1wbGF0ZSByZWZzXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XG4gIGZpbHRlclZhbHVlOiBhbnk7XG4gIG9sZEZpbHRlcjogYW55O1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cbiAgICogQW55IGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbHVtbiBmaWx0ZXIsIG11c3QgZmlyZSB0aGlzXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cbiAgICpcbiAgICogQHBhcmFtIG9iaiBUaGUgZmlsdGVyIGFzIHJlY2VpdmVkIGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZVxuICAgKi9cbiAgc2V0RmlsdGVyKG9iajogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChvYmogIT09IHRoaXMub2xkRmlsdGVyKSB7XG4gICAgICBpZiAoIW5vRW1pdCkge1xuICAgICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBvYmp9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBvYmo7XG4gICAgICB0aGlzLm9sZEZpbHRlciA9IG9iajtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICByZW1vdmVGaWx0ZXIoKSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIobnVsbCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgJ2VsZW1lbnQtY2xvc2VzdCc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFZpZXdDaGlsZCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XG4gIGRhdGE6IGFueTtcbiAgY29sTmFtZTogc3RyaW5nO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IEluc3RhbnREYXRhU291cmNlPGFueT47XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgc3RpY2t5OiBib29sZWFuO1xuICBASW5wdXQoKSByb3dBdHRyaWJ1dGVzOiBBcnJheTxhbnk+O1xuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2OyB9XG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHwgKHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLm5hbWUpIDogbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2UuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ3RkJykuY2xhc3NMaXN0KVxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcblxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoeyBkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGgnKSlcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXG4gICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtblxuICAgICAgLm1hcChiID0+IFtdLnNsaWNlLmNhbGwoYi5jbGFzc0xpc3QpLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSkuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKSk7XG5cbiAgICAvLyBJZiBhbnkgY29sdW1ucyAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4gY2xvc2UgaXQuXG4gICAgdGhpcy5jb2x1bW5zLmZpbHRlcihjID0+IGhlYWRlcnNUb0Nsb3NlLmluY2x1ZGVzKGMubmFtZSkpLmZvckVhY2goYyA9PiBjLmZpbHRlck9wZW4gPSBmYWxzZSk7XG4gIH1cblxuICBjaGVja0Nsb3NlKCRldmVudDogS2V5Ym9hcmRFdmVudCwgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIG1lbnVUcmlnZ2VyLmNsb3NlTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFJvd0NsYXNzZXMoaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnaGlnaGxpZ2h0Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICBpZiAoYXR0cltpXVsnY2xhc3MnXSAmJiBhdHRyW2ldWydjbGFzcyddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChhdHRyW2ldWydjbGFzcyddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgZ2V0Um93U3R5bGVzKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICBpZiAoYXR0cltpXVsnc3R5bGUnXSAmJiBhdHRyW2ldWydzdHlsZSddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcy5jb25jYXQoYXR0cltpXVsnc3R5bGUnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXMuam9pbignICcpO1xuICB9XG5cbiAgcmVtb3ZlRmlsdGVycygpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2wsaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgIGNvbC5zZXRGaWx0ZXIodW5kZWZpbmVkKTtcbiAgICAgIH0gZWxzZSByZXR1cm47XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXRvb2xiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC10b29sYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC10b29sYmFyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3JpZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYWdlID0gMDtcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2VFdmVudD4oKTtcbiAgQElucHV0KCkgdG90YWwgPSAwO1xuICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xuICBASW5wdXQoKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gWzUsIDEwLCAyNSwgMTAwXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcGFnZUhhbmRsZXIoJGV2ZW50OiBQYWdlRXZlbnQpIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gJGV2ZW50LnBhZ2VTaXplO1xuICAgIHRoaXMucGFnZSA9ICRldmVudC5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRSb3dNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcm93O1xuICBASW5wdXQoKSBpY29uID0gJ2VsbGlwc2lzLXYnO1xuXG4gIHNob3dNZW51ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkQ29tcG9uZW50KSB7IH1cblxuICBuZ09uSW5pdCgpIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcbiAgICBbXS5zbGljZS5jYWxsKHRoaXMuZ3JpZC5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1jZWxsLm1hdC1jb2x1bW4tYWN0aW9ucycpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIElmIGFueSByb3cgYWN0aW9uIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiwgY2xvc2UgaXQuXG4gICAgICAuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gY2VsbC5jbG9zZXN0KCdtYXQtcm93Jyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gW10uc2xpY2UuY2FsbChyb3cuY2xvc2VzdCgnbWF0LXRhYmxlJykuY2hpbGRyZW4pLmluZGV4T2Yocm93KSAtIDE7IC8vIC0gMSBiZWNhdXNlIGhlYWRlciBpcyBhbHNvIGEgY2hpbGQuXG4gICAgICAgIHRoaXMuZ3JpZC5kYXRhU291cmNlLmRiLmRhdGFTbmFwc2hvdFtpbmRleF0uc2hvd01lbnUgPSBmYWxzZTsgLy8gRmluZCByb3cgb2JqZWN0IGluIGRhdGFiYXNlIHNuYXBzaG90LCBhbmQgbWFyayBpdCBjbG9zZWQuXG4gICAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtcbiAgTWF0VGFibGVNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0TWVudU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHcmlkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRSb3dNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG5cbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIEdyaWRDb21wb25lbnQsIENvbHVtbkRpcmVjdGl2ZSwgR3JpZFRvb2xiYXJDb21wb25lbnQsIEdyaWRSb3dNZW51Q29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgUGFyYW1zLCBBY3RpdmF0ZWRSb3V0ZSwgUFJJTUFSWV9PVVRMRVQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWIge1xuICBsYWJlbDogc3RyaW5nO1xuICBwYXJhbXM6IFBhcmFtcztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtYnJlYWRjcnVtYicsXG4gIHRlbXBsYXRlVXJsOiAnLi9icmVhZGNydW1iLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcm91dGVNYXA6IElCcmVhZGNydW1iW107XG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMucm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKS5zdWJzY3JpYmUobmF2ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cmwgY2hhbmdlZCcpO1xuICAgICAgY29uc3Qgcm9vdDogQWN0aXZhdGVkUm91dGUgPSB0aGlzLnJvdXRlLnJvb3Q7XG4gICAgICB0aGlzLnJvdXRlTWFwID0gdGhpcy5nZXRCcmVhZGNydW1icyhyb290KTtcbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYXJyYXkgb2YgSUJyZWFkY3J1bWIgb2JqZWN0cyB0aGF0IHJlcHJlc2VudCB0aGUgYnJlYWRjcnVtYlxuICAgKlxuICAgKiBAcGFyYW0gcm91dGVcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcGFyYW0gYnJlYWRjcnVtYnNcbiAgICovXG4gIHByaXZhdGUgZ2V0QnJlYWRjcnVtYnMocm91dGU6IEFjdGl2YXRlZFJvdXRlLCB1cmw6IHN0cmluZz0gJycsIGJyZWFkY3J1bWJzOiBJQnJlYWRjcnVtYltdPSBbXSk6IElCcmVhZGNydW1iW10ge1xuICAgIGNvbnN0IFJPVVRFX0RBVEFfQlJFQURDUlVNQiA9ICdicmVhZGNydW1iJztcblxuICAgIC8vIGdldCB0aGUgY2hpbGQgcm91dGVzXG4gICAgY29uc3QgY2hpbGRyZW46IEFjdGl2YXRlZFJvdXRlW10gPSByb3V0ZS5jaGlsZHJlbjtcblxuICAgIC8vIHJldHVybiBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjaGlsZHJlblxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBicmVhZGNydW1icztcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjaGlsZHJlblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIC8vIHZlcmlmeSBwcmltYXJ5IHJvdXRlXG4gICAgICBpZiAoY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdmVyaWZ5IHRoZSBjdXN0b20gZGF0YSBwcm9wZXJ0eSBcImJyZWFkY3J1bWJcIiBpcyBzcGVjaWZpZWQgb24gdGhlIHJvdXRlXG4gICAgICBpZiAoIWNoaWxkLnNuYXBzaG90LmRhdGEuaGFzT3duUHJvcGVydHkoUk9VVEVfREFUQV9CUkVBRENSVU1CKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgcm91dGUncyBVUkwgc2VnbWVudFxuICAgICAgY29uc3Qgcm91dGVVUkwgPSBjaGlsZC5zbmFwc2hvdC51cmwubWFwKHNlZ21lbnQgPT4gc2VnbWVudC5wYXRoKS5qb2luKCcvJyk7XG5cbiAgICAgIC8vIGFwcGVuZCByb3V0ZSBVUkwgdG8gVVJMXG4gICAgICB1cmwgKz0gYC8ke3JvdXRlVVJMfWA7XG5cbiAgICAgIC8vIGFkZCBicmVhZGNydW1iXG4gICAgICBjb25zdCBicmVhZGNydW1iOiBJQnJlYWRjcnVtYiA9IHtcbiAgICAgICAgbGFiZWw6IGNoaWxkLnNuYXBzaG90LmRhdGFbUk9VVEVfREFUQV9CUkVBRENSVU1CXSxcbiAgICAgICAgcGFyYW1zOiBjaGlsZC5zbmFwc2hvdC5wYXJhbXMsXG4gICAgICAgIHVybDogdXJsXG4gICAgICB9O1xuICAgICAgYnJlYWRjcnVtYnMucHVzaChicmVhZGNydW1iKTtcblxuICAgICAgLy8gcmVjdXJzaXZlXG4gICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VydmljZSB7XG5cbiAgYWN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWZvcm0tYWN0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWFjdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0NvbXBvbmVudCB7XG5cbiAgZ2V0IGFjdGlvbnNSZWYoKTogVGVtcGxhdGVSZWY8YW55PiB7IHJldHVybiB0aGlzLnRvb2xiYXJTZXJ2aWNlLmFjdGlvblRlbXBsYXRlOyB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b29sYmFyU2VydmljZTogVG9vbGJhclNlcnZpY2UpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbaW5zdGFudEZvcm1BY3Rpb25zRGVmXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSB0b29sYmFyOiBUb29sYmFyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4vdG9vbGJhci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQnJlYWRjcnVtYkNvbXBvbmVudCwgRm9ybUFjdGlvbnNDb21wb25lbnQsIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXG4gIHByb3ZpZGVyczogW1Rvb2xiYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBYSxRQUFRLEdBQUcsVUFBVSxJQUFJLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxTQUFTLEdBQUcsS0FBSzs7UUFDL0QsT0FBTztJQUNYLE9BQU8sVUFBUyxHQUFHLElBQUk7O2NBQ2YsT0FBTyxHQUFHLElBQUk7O2NBQ2QsS0FBSyxHQUFHO1lBQ1osT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFBRTtTQUMvQzs7Y0FDSyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTztRQUNyQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUFFO0tBQzVDLENBQUM7Q0FDSDs7Ozs7O0FDWkQ7Ozs7OztBQTJCQSxNQUFhLGlCQUFxQixTQUFRLFVBQWE7Ozs7SUFDckQsWUFBbUIsRUFBc0I7UUFDdkMsS0FBSyxFQUFFLENBQUM7UUFEUyxPQUFFLEdBQUYsRUFBRSxDQUFvQjtLQUV4Qzs7OztJQUNELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQzNCOzs7O0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxFQUFF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