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
 * @suppress {checkTypes} checked by tsc
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
            this.onRead(this.sortCache, this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(filter$$1 => {
            this.filterCache[filter$$1.active] = filter$$1.filter;
            this.onRead(this.sortCache, this.filterCache);
        });
        // Attached to a grid. Run init
        if (this.onInit) {
            this.onInit();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.filterable = true;
        this.sortable = true;
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
     * @return {?}
     */
    setFilter(obj) {
        if (obj !== this.oldFilter) {
            this.filter.next({ active: this.name, filter: obj });
            this.filterValue = obj;
            this.oldFilter = obj;
        }
        this.filterOpen = false;
    }
}
ColumnDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'instant-column'
            },] },
];
/** @nocollapse */
ColumnDirective.ctorParameters = () => [];
ColumnDirective.propDecorators = {
    name: [{ type: Input }],
    label: [{ type: Input }],
    filterable: [{ type: Input }],
    sortable: [{ type: Input }],
    filterRef: [{ type: ContentChild, args: ['filter',] }],
    cellRef: [{ type: ContentChild, args: ['cell',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            const /** @type {?} */ cellName = [].slice.call($event.target.closest('mat-cell').classList)
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
        const /** @type {?} */ headersToClose = [].slice
            .call(this.elRef.nativeElement.querySelectorAll('mat-header-cell'))
            .filter(b => !b.contains($event.target))
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
}
GridComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid',
                template: `<mat-table #table [dataSource]="dataSource" matSort>
  <ng-container *ngFor="let col of columns" [matColumnDef]="col.name">
    <!-- Header definition -->
    <mat-header-cell *matHeaderCellDef>
      <header>
        <div class="action" *ngIf="col.filterable != false">
          <mat-menu #appMenu="matMenu">
            <ng-container *ngIf="col.filterRef; else defaultFilterTemplate">
              <ng-container *ngTemplateOutlet="col.filterRef;context:{col:col}"></ng-container>
            </ng-container>

            <ng-template #defaultFilterTemplate>
              <mat-form-field class="no-padding">
                <input matInput placeholder="Filter" (click)="$event.stopPropagation()" (keyup)="checkClose($event, menuTrigger)"  [(ngModel)]="col.filterValue" [ngModelOptions]="{standalone:true}" (change)="col.setFilter(col.filterValue)">
                <button mat-icon-button matSuffix (click)="col.setFilter(undefined)">
                  <i class="fa far fa-times fa-fw"></i>
                </button>
              </mat-form-field>
            </ng-template>
          </mat-menu>
          <button mat-icon-button [matMenuTriggerFor]="appMenu" #menuTrigger="matMenuTrigger">
            <i class="fa far fa-fw fa-filter"></i>
          </button>
        </div>
        <div mat-sort-header class="flex-col" role="heading" *ngIf="col.sortable != false">
          {{ col.label }}
        </div>
        <div class="flex-col" role="heading" *ngIf="col.sortable == false">
          {{ col.label }}
        </div>
      </header>
    </mat-header-cell>

    <!-- Cell definition -->
    <mat-cell *matCellDef="let element">
      <ng-container *ngIf="col.cellRef; else defaultCellTemplate">
        <ng-container *ngTemplateOutlet="col.cellRef;context:{row:element,col:col.name}"></ng-container>
      </ng-container>

      <ng-template #defaultCellTemplate>
        {{ element[col.name] }}
      </ng-template>
    </mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns;let index=index;"
           [ngClass]="{highlight: index === selectedIndex}"
           [attr.data-rowIndex]="index"
           (click)="onRowClicked(row, $event)"></mat-row>
</mat-table>
`,
                styles: [`[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]:nth-child(even){background:rgba(0,0,0,.02)}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}`]
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: ElementRef }
];
GridComponent.propDecorators = {
    dataSource: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnDirective,] }],
    rowClicked: [{ type: Output }],
    sort: [{ type: ViewChild, args: [MatSort,] }],
    displayedColumns: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<mat-toolbar>
  <header>
    <ng-content></ng-content>
  </header>
  <mat-paginator [length]="total" [pageSize]="pageSize" (page)="pageHandler($event)" [pageSizeOptions]="pageSizeOptions"> </mat-paginator>
</mat-toolbar>
`,
                styles: [`mat-toolbar header{flex:1}.mat-paginator{background:0 0}`]
            },] },
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
 * @suppress {checkTypes} checked by tsc
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
            .filter(b => !b.contains($event.target))
            .forEach(cell => {
            const /** @type {?} */ row = cell.closest('mat-row');
            const /** @type {?} */ index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1; // - 1 because header is also a child.
            this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
        });
    }
}
GridRowMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid-row-menu',
                template: `<mat-menu #rowMenu="matMenu">
  <ng-content></ng-content>
</mat-menu>

<button type="button" mat-icon-button [matMenuTriggerFor]="rowMenu">
  <i class="fa far fa-fw fa-{{ icon }}"></i>
</button>
`,
                styles: [`:host{position:relative}mat-card{position:absolute;z-index:100;right:0}`]
            },] },
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
 * @suppress {checkTypes} checked by tsc
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            const /** @type {?} */ root = this.route.root;
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
        const /** @type {?} */ ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        // get the child routes
        const /** @type {?} */ children = route.children;
        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }
        // iterate over each children
        for (const /** @type {?} */ child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }
            // verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            // get the route's URL segment
            const /** @type {?} */ routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            // append route URL to URL
            url += `/${routeURL}`;
            // add breadcrumb
            const /** @type {?} */ breadcrumb = {
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
                template: `<a [routerLink]="['/']"><i class="fa far fa-fw fa-home"></i></a>
<a *ngFor="let route of routeMap" [routerLink]="[route.url]">{{ route.label }}</a>
`,
                styles: [`:host{flex:1}`]
            },] },
];
/** @nocollapse */
BreadcrumbComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToolbarService {
    constructor() { }
}
ToolbarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ToolbarService.ctorParameters = () => [];
/** @nocollapse */ ToolbarService.ngInjectableDef = defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<ng-container *ngIf="actionsRef; else defaultTemplate">
  <ng-container *ngTemplateOutlet="actionsRef"></ng-container>
</ng-container>

<ng-template #defaultTemplate></ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
FormActionsComponent.ctorParameters = () => [
    { type: ToolbarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
FormActionsDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ToolbarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { GridModule, GridComponent, ColumnDirective, GridRowMenuComponent, InstantDataSource, InstantDatabase, ToolbarModule, BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective, ToolbarService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9kYXRhc291cmNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2NvbHVtbi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQubW9kdWxlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5zZXJ2aWNlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci90b29sYmFyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcclxuICBbZXZlbnQ6IHN0cmluZ106IHtcclxuICAgIGFjdGl2ZTogc3RyaW5nLFxyXG4gICAgZGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYycgfCAnJyxcclxuICAgIGZpbHRlcj86IGFueVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcclxuICBbY29sOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIHtcclxuICBbY29sOiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJyB8ICcnO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cclxuICogSXQgaG9sZHMgYW4gYEluc3RhbnREYXRhYmFzZWAgb2JqZWN0LCBhbmQgZGVsaXZlcmVzXHJcbiAqIGxpdmluZyBkYXRhIGZyb20gdGhpcyBvYmplY3QgdG8gdGhlIGdyaWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5zdGFudERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGI6IEluc3RhbnREYXRhYmFzZTxUPikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgY29ubmVjdCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcclxuICB9XHJcbiAgZGlzY29ubmVjdCgpIHtcclxuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQW4gb2JqZWN0IHJlc3BvbnNpYmxlIGZvciBsaXN0ZW5pbmcgZm9yIHVzZXIgY2hhbmdlcyBpblxyXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cclxuICpcclxuICogSW1wbGVtZW50b3JzIHNob3VsZCBsaXN0ZW4gZm9yIGV2ZW50cyBpbiB0aGUgYG9uQ2xpZW50Q2hhbmdlYFxyXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5zdGFudERhdGFiYXNlPFQ+IHtcclxuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XHJcbiAgcHJpdmF0ZSBzb3J0Q2FjaGU6IFNvcnRlciA9IHt9O1xyXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGZpbHRlckNoYW5nZTogT2JzZXJ2YWJsZTxDb2x1bW5GaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBwcml2YXRlIGZpbHRlckNhY2hlOiBGaWx0ZXIgPSB7fTtcclxuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGRhdGFDaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcclxuICBkYXRhU25hcHNob3Q7XHJcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZVN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgdGhpcy5vblJlYWQoKTtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XHJcbiAgfVxyXG4gIG9uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxyXG5cclxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcclxuXHJcbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XHJcbiAgICAgIHRoaXMuc29ydENhY2hlID0ge307IC8vIFJlc2V0IGFsd2F5cy4gTXVsdGlwbGUgY29sdW1uIHNvcnQgaXMgTk9UIHN1cHBvcnRlZFxyXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcclxuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyID0gdGhpcy5maWx0ZXJDaGFuZ2Uuc3Vic2NyaWJlKGZpbHRlciA9PiB7XHJcbiAgICAgIHRoaXMuZmlsdGVyQ2FjaGVbZmlsdGVyLmFjdGl2ZV0gPSBmaWx0ZXIuZmlsdGVyO1xyXG4gICAgICB0aGlzLm9uUmVhZCh0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBdHRhY2hlZCB0byBhIGdyaWQuIFJ1biBpbml0XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHsgdGhpcy5vbkluaXQoKTsgfVxyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XHJcbiAgYWN0aXZlOiBzdHJpbmc7XHJcbiAgZmlsdGVyOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIGluc3RhbnQtZ3JpZC5cclxuICogRGVmaW5lcyBhIHNldCBvZiBjZWxscyBhbmQgb3B0aW9uYWwgZmlsdGVycyBhdmFpbGFibGUgZm9yIGEgdGFibGUgY29sdW1uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8vIElucHV0c1xyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nOyAvLyBEZWZhdWx0cyB0byB0aGUgaWRlbnRpZmllciBvZiBjb2x1bW5cclxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XHJcblxyXG4gIC8vIFRlbXBsYXRlIHJlZnNcclxuICBAQ29udGVudENoaWxkKCdmaWx0ZXInKSBmaWx0ZXJSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG5cclxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xyXG4gIGZpbHRlck9wZW46IGJvb2xlYW47XHJcbiAgZmlsdGVyID0gbmV3IFJlcGxheVN1YmplY3Q8Q29sdW1uRmlsdGVyPigpO1xyXG4gIGZpbHRlclZhbHVlOiBhbnk7XHJcbiAgcHJpdmF0ZSBvbGRGaWx0ZXI6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmxhYmVsID09IG51bGwpIHtcclxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZGlyZWN0bHkgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlLlxyXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xyXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBzZXRGaWx0ZXIob2JqOiBhbnkpIHtcclxuICAgIGlmIChvYmogIT09IHRoaXMub2xkRmlsdGVyKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyLm5leHQoe2FjdGl2ZTogdGhpcy5uYW1lLCBmaWx0ZXI6IG9ian0pO1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gb2JqO1xyXG4gICAgICB0aGlzLm9sZEZpbHRlciA9IG9iajtcclxuICAgIH1cclxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNvcnQsIE1hdE1lbnVUcmlnZ2VyICB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSW5zdGFudERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3dDbGlja0V2ZW50IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgY29sTmFtZTogc3RyaW5nO1xyXG59XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxtYXQtdGFibGUgI3RhYmxlIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBtYXRTb3J0PlxyXG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2wubmFtZVwiPlxyXG4gICAgPCEtLSBIZWFkZXIgZGVmaW5pdGlvbiAtLT5cclxuICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+XHJcbiAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvblwiICpuZ0lmPVwiY29sLmZpbHRlcmFibGUgIT0gZmFsc2VcIj5cclxuICAgICAgICAgIDxtYXQtbWVudSAjYXBwTWVudT1cIm1hdE1lbnVcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5maWx0ZXJSZWY7IGVsc2UgZGVmYXVsdEZpbHRlclRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5maWx0ZXJSZWY7Y29udGV4dDp7Y29sOmNvbH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJuby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGtleXVwKT1cImNoZWNrQ2xvc2UoJGV2ZW50LCBtZW51VHJpZ2dlcilcIiAgWyhuZ01vZGVsKV09XCJjb2wuZmlsdGVyVmFsdWVcIiBbbmdNb2RlbE9wdGlvbnNdPVwie3N0YW5kYWxvbmU6dHJ1ZX1cIiAoY2hhbmdlKT1cImNvbC5zZXRGaWx0ZXIoY29sLmZpbHRlclZhbHVlKVwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjb2wuc2V0RmlsdGVyKHVuZGVmaW5lZClcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtdGltZXMgZmEtZndcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9tYXQtbWVudT5cclxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJhcHBNZW51XCIgI21lbnVUcmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtZncgZmEtZmlsdGVyXCI+PC9pPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBtYXQtc29ydC1oZWFkZXIgY2xhc3M9XCJmbGV4LWNvbFwiIHJvbGU9XCJoZWFkaW5nXCIgKm5nSWY9XCJjb2wuc29ydGFibGUgIT0gZmFsc2VcIj5cclxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbFwiIHJvbGU9XCJoZWFkaW5nXCIgKm5nSWY9XCJjb2wuc29ydGFibGUgPT0gZmFsc2VcIj5cclxuICAgICAgICAgIHt7IGNvbC5sYWJlbCB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgIDwvbWF0LWhlYWRlci1jZWxsPlxyXG5cclxuICAgIDwhLS0gQ2VsbCBkZWZpbml0aW9uIC0tPlxyXG4gICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnRcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbC5jZWxsUmVmOyBlbHNlIGRlZmF1bHRDZWxsVGVtcGxhdGVcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLmNlbGxSZWY7Y29udGV4dDp7cm93OmVsZW1lbnQsY29sOmNvbC5uYW1lfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdENlbGxUZW1wbGF0ZT5cclxuICAgICAgICB7eyBlbGVtZW50W2NvbC5uYW1lXSB9fVxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9tYXQtY2VsbD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cclxuICA8bWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztsZXQgaW5kZXg9aW5kZXg7XCJcclxuICAgICAgICAgICBbbmdDbGFzc109XCJ7aGlnaGxpZ2h0OiBpbmRleCA9PT0gc2VsZWN0ZWRJbmRleH1cIlxyXG4gICAgICAgICAgIFthdHRyLmRhdGEtcm93SW5kZXhdPVwiaW5kZXhcIlxyXG4gICAgICAgICAgIChjbGljayk9XCJvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpXCI+PC9tYXQtcm93PlxyXG48L21hdC10YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgW3JvbGU9Y29sdW1uaGVhZGVyXSBoZWFkZXJ7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn1bcm9sZT1jb2x1bW5oZWFkZXJdOmhvdmVyIC5hY3Rpb24+YnV0dG9ue3Zpc2liaWxpdHk6dmlzaWJsZX1bcm9sZT1jb2x1bW5oZWFkZXJdIFtyb2xlPWhlYWRpbmdde2ZsZXg6MX06aG9zdC5zdHJpcGVkIFtyb2xlPXJvd106bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDIpfTo6bmctZGVlcCAubWF0LXRhYmxle2Rpc3BsYXk6dGFibGUhaW1wb3J0YW50O3dpZHRoOjEwMCV9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93LDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93e2Rpc3BsYXk6dGFibGUtcm93O3BhZGRpbmc6MDtib3JkZXI6bm9uZX06Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LWhlYWRlci1yb3c+Lm1hdC1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtaGVhZGVyLXJvdz4ubWF0LWhlYWRlci1jZWxsLDo6bmctZGVlcCAubWF0LXRhYmxlPi5tYXQtcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWhlYWRlci1jZWxse2Rpc3BsYXk6dGFibGUtY2VsbDtoZWlnaHQ6NDhweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpO3BhZGRpbmctbGVmdDozcHh9OjpuZy1kZWVwIC5tYXQtdGFibGU+Lm1hdC1oZWFkZXItcm93Pi5tYXQtY2VsbCw6Om5nLWRlZXAgLm1hdC10YWJsZT4ubWF0LXJvdz4ubWF0LWNlbGx7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKX06Om5nLWRlZXAgLm5vLXBhZGRpbmd7bWF4LWhlaWdodDozcmVtO3BhZGRpbmc6MCAxNnB4O292ZXJmbG93OmhpZGRlbn0uYWN0aW9uIG1hdC1tZW51e3BhZGRpbmc6MH0uYWN0aW9uIG1hdC1tZW51IG1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowfS5tYXQtaWNvbi1idXR0b257d2lkdGg6MThweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcclxuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpIGNvbHVtbnM6IENvbHVtbkRpcmVjdGl2ZVtdO1xyXG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcclxuXHJcbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRpc3BsYXllZENvbHVtbnModikgeyB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjsgfVxyXG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fCAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcclxuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcclxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcclxuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2UuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ21hdC1jZWxsJykuY2xhc3NMaXN0KVxyXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXHJcbiAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCk7XHJcblxyXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7ZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxyXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1oZWFkZXItY2VsbCcpKVxyXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxyXG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXHJcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXHJcbiAgICAgIC5tYXAoYiA9PiBbXS5zbGljZS5jYWxsKGIuY2xhc3NMaXN0KS5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCkpO1xyXG5cclxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cclxuICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKS5mb3JFYWNoKGMgPT4gYy5maWx0ZXJPcGVuID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xyXG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtdG9vbGJhcicsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXI+XHJcbiAgPGhlYWRlcj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L2hlYWRlcj5cclxuICA8bWF0LXBhZ2luYXRvciBbbGVuZ3RoXT1cInRvdGFsXCIgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCIgKHBhZ2UpPVwicGFnZUhhbmRsZXIoJGV2ZW50KVwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCI+IDwvbWF0LXBhZ2luYXRvcj5cclxuPC9tYXQtdG9vbGJhcj5cclxuYCxcclxuICBzdHlsZXM6IFtgbWF0LXRvb2xiYXIgaGVhZGVye2ZsZXg6MX0ubWF0LXBhZ2luYXRvcntiYWNrZ3JvdW5kOjAgMH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHBhZ2UgPSAwO1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XHJcbiAgQElucHV0KCkgdG90YWwgPSAwO1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XHJcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFs1LCAxMCwgMjUsIDEwMF07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgcGFnZUhhbmRsZXIoJGV2ZW50OiBQYWdlRXZlbnQpIHtcclxuICAgIHRoaXMucGFnZVNpemUgPSAkZXZlbnQucGFnZVNpemU7XHJcbiAgICB0aGlzLnBhZ2UgPSAkZXZlbnQucGFnZUluZGV4O1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2dyaWQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXJvdy1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxtYXQtbWVudSAjcm93TWVudT1cIm1hdE1lbnVcIj5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjwvbWF0LW1lbnU+XHJcblxyXG48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cInJvd01lbnVcIj5cclxuICA8aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS17eyBpY29uIH19XCI+PC9pPlxyXG48L2J1dHRvbj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9bWF0LWNhcmR7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDA7cmlnaHQ6MH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFJvd01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJvdztcclxuICBASW5wdXQoKSBpY29uID0gJ2VsbGlwc2lzLXYnO1xyXG5cclxuICBzaG93TWVudSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljaygkZXZlbnQpIHtcclxuICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xyXG4gICAgW10uc2xpY2UuY2FsbCh0aGlzLmdyaWQuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtY2VsbC5tYXQtY29sdW1uLWFjdGlvbnMnKSlcclxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcclxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxyXG4gICAgICAvLyBJZiBhbnkgcm93IGFjdGlvbiAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4sIGNsb3NlIGl0LlxyXG4gICAgICAuZm9yRWFjaChjZWxsID0+IHtcclxuICAgICAgICBjb25zdCByb3cgPSBjZWxsLmNsb3Nlc3QoJ21hdC1yb3cnKTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IFtdLnNsaWNlLmNhbGwocm93LmNsb3Nlc3QoJ21hdC10YWJsZScpLmNoaWxkcmVuKS5pbmRleE9mKHJvdykgLSAxOyAvLyAtIDEgYmVjYXVzZSBoZWFkZXIgaXMgYWxzbyBhIGNoaWxkLlxyXG4gICAgICAgIHRoaXMuZ3JpZC5kYXRhU291cmNlLmRiLmRhdGFTbmFwc2hvdFtpbmRleF0uc2hvd01lbnUgPSBmYWxzZTsgLy8gRmluZCByb3cgb2JqZWN0IGluIGRhdGFiYXNlIHNuYXBzaG90LCBhbmQgbWFyayBpdCBjbG9zZWQuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0VGFibGVNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0TWVudU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR3JpZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRSb3dNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG5cclxuICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0U29ydE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxyXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbIEdyaWRDb21wb25lbnQsIENvbHVtbkRpcmVjdGl2ZSwgR3JpZFRvb2xiYXJDb21wb25lbnQsIEdyaWRSb3dNZW51Q29tcG9uZW50IF0sXHJcbiAgZXhwb3J0czogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgUGFyYW1zLCBBY3RpdmF0ZWRSb3V0ZSwgUFJJTUFSWV9PVVRMRVQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYiB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwYXJhbXM6IFBhcmFtcztcclxuICB1cmw6IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWJyZWFkY3J1bWInLFxyXG4gIHRlbXBsYXRlOiBgPGEgW3JvdXRlckxpbmtdPVwiWycvJ11cIj48aSBjbGFzcz1cImZhIGZhciBmYS1mdyBmYS1ob21lXCI+PC9pPjwvYT5cclxuPGEgKm5nRm9yPVwibGV0IHJvdXRlIG9mIHJvdXRlTWFwXCIgW3JvdXRlckxpbmtdPVwiW3JvdXRlLnVybF1cIj57eyByb3V0ZS5sYWJlbCB9fTwvYT5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7ZmxleDoxfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICByb3V0ZU1hcDogSUJyZWFkY3J1bWJbXTtcclxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZShuYXYgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygndXJsIGNoYW5nZWQnKTtcclxuICAgICAgY29uc3Qgcm9vdDogQWN0aXZhdGVkUm91dGUgPSB0aGlzLnJvdXRlLnJvb3Q7XHJcbiAgICAgIHRoaXMucm91dGVNYXAgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJvb3QpO1xyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhcnJheSBvZiBJQnJlYWRjcnVtYiBvYmplY3RzIHRoYXQgcmVwcmVzZW50IHRoZSBicmVhZGNydW1iXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm91dGVcclxuICAgKiBAcGFyYW0gdXJsXHJcbiAgICogQHBhcmFtIGJyZWFkY3J1bWJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRCcmVhZGNydW1icyhyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHVybDogc3RyaW5nPSAnJywgYnJlYWRjcnVtYnM6IElCcmVhZGNydW1iW109IFtdKTogSUJyZWFkY3J1bWJbXSB7XHJcbiAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUIgPSAnYnJlYWRjcnVtYic7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjaGlsZCByb3V0ZXNcclxuICAgIGNvbnN0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XHJcblxyXG4gICAgLy8gcmV0dXJuIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoaWxkcmVuXHJcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBicmVhZGNydW1icztcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjaGlsZHJlblxyXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xyXG4gICAgICAvLyB2ZXJpZnkgcHJpbWFyeSByb3V0ZVxyXG4gICAgICBpZiAoY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2ZXJpZnkgdGhlIGN1c3RvbSBkYXRhIHByb3BlcnR5IFwiYnJlYWRjcnVtYlwiIGlzIHNwZWNpZmllZCBvbiB0aGUgcm91dGVcclxuICAgICAgaWYgKCFjaGlsZC5zbmFwc2hvdC5kYXRhLmhhc093blByb3BlcnR5KFJPVVRFX0RBVEFfQlJFQURDUlVNQikpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGdldCB0aGUgcm91dGUncyBVUkwgc2VnbWVudFxyXG4gICAgICBjb25zdCByb3V0ZVVSTCA9IGNoaWxkLnNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcclxuXHJcbiAgICAgIC8vIGFwcGVuZCByb3V0ZSBVUkwgdG8gVVJMXHJcbiAgICAgIHVybCArPSBgLyR7cm91dGVVUkx9YDtcclxuXHJcbiAgICAgIC8vIGFkZCBicmVhZGNydW1iXHJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWI6IElCcmVhZGNydW1iID0ge1xyXG4gICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXHJcbiAgICAgICAgcGFyYW1zOiBjaGlsZC5zbmFwc2hvdC5wYXJhbXMsXHJcbiAgICAgICAgdXJsOiB1cmxcclxuICAgICAgfTtcclxuICAgICAgYnJlYWRjcnVtYnMucHVzaChicmVhZGNydW1iKTtcclxuXHJcbiAgICAgIC8vIHJlY3Vyc2l2ZVxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VydmljZSB7XHJcblxyXG4gIGFjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWZvcm0tYWN0aW9ucycsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aW9uc1JlZjsgZWxzZSBkZWZhdWx0VGVtcGxhdGVcIj5cclxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYWN0aW9uc1JlZlwiPjwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPjwvbmctdGVtcGxhdGU+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0NvbXBvbmVudCB7XHJcblxyXG4gIGdldCBhY3Rpb25zUmVmKCk6IFRlbXBsYXRlUmVmPGFueT4geyByZXR1cm4gdGhpcy50b29sYmFyU2VydmljZS5hY3Rpb25UZW1wbGF0ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvb2xiYXJTZXJ2aWNlOiBUb29sYmFyU2VydmljZSkgeyB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbVG9vbGJhclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7OztBQTBCQSx1QkFBa0MsU0FBUSxVQUFhOzs7O0lBQ3JELFlBQW1CLEVBQXNCO1FBQ3ZDLEtBQUssRUFBRSxDQUFDO1FBRFMsT0FBRSxHQUFGLEVBQUUsQ0FBb0I7S0FFeEM7Ozs7SUFDRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUMzQjs7OztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3JCO0NBQ0Y7Ozs7Ozs7Ozs7QUFTRDs7eUJBRThCLEVBQUU7NEJBR1csSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDOzJCQUNwQyxFQUFFOzBCQUdHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQzs7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