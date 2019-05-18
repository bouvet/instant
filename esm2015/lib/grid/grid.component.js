/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
export class GridComponent {
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
        if (col.filterValue !== undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsZUFBZSxFQUNmLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBa0IsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRXJELG1DQUdDOzs7SUFGQyw2QkFBVTs7SUFDVixnQ0FBZ0I7O0FBT2xCLE1BQU0sT0FBTyxhQUFhOzs7O0lBcUJ4QixZQUFtQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBZjFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWVsQixDQUFDOzs7OztJQVh4QyxJQUNJLGdCQUFnQixDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBQ0QsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUI7WUFDNUIsSUFBSSxDQUFDLGlCQUFpQjtnQkFDdEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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QUFDOzs7WUEvSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4Qiw4d0lBQW9DOzthQUVyQzs7OztZQWxCQyxVQUFVOzs7eUJBb0JULEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7c0JBQ0wsZUFBZSxTQUFDLGVBQWU7eUJBQy9CLE1BQU07bUJBQ04sU0FBUyxTQUFDLE9BQU87K0JBR2pCLEtBQUs7c0JBdUNMLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQWhEMUMsbUNBQTRDOztJQUM1QyxzQ0FBK0I7O0lBQy9CLCtCQUF5Qjs7SUFDekIsc0NBQW1DOztJQUNuQyxnQ0FBNkQ7O0lBQzdELG1DQUF5RDs7SUFDekQsNkJBQWtDOztJQUVsQywwQ0FBNEI7O0lBVTVCLHNDQUFzQzs7SUFFMUIsOEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdlbGVtZW50LWNsb3Nlc3QnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBWaWV3Q2hpbGQsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgSG9zdExpc3RlbmVyLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNvcnQsIE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xuICBkYXRhOiBhbnk7XG4gIGNvbE5hbWU6IHN0cmluZztcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHN0aWNreTogYm9vbGVhbjtcbiAgQElucHV0KCkgcm93QXR0cmlidXRlczogQXJyYXk8YW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpIGNvbHVtbnM6IENvbHVtbkRpcmVjdGl2ZVtdO1xuICBAT3V0cHV0KCkgcm93Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Q2xpY2tFdmVudD4oKTtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG4gIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXllZENvbHVtbnModikge1xuICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2O1xuICB9XG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPVxuICAgICAgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fFxuICAgICAgKHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLm5hbWUpIDogbnVsbCkpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2VcbiAgICAgICAgLmNhbGwoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCd0ZCcpLmNsYXNzTGlzdClcbiAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcbiAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMucm93Q2xpY2tlZC5lbWl0KHsgZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgY29uc3QgaGVhZGVyc1RvQ2xvc2U6IHN0cmluZ1tdID0gW10uc2xpY2VcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykpXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cbiAgICAgIC5tYXAoYiA9PlxuICAgICAgICBbXS5zbGljZVxuICAgICAgICAgIC5jYWxsKGIuY2xhc3NMaXN0KVxuICAgICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXG4gICAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aClcbiAgICAgICk7XG5cbiAgICAvLyBJZiBhbnkgY29sdW1ucyAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4gY2xvc2UgaXQuXG4gICAgdGhpcy5jb2x1bW5zXG4gICAgICAuZmlsdGVyKGMgPT4gaGVhZGVyc1RvQ2xvc2UuaW5jbHVkZXMoYy5uYW1lKSlcbiAgICAgIC5mb3JFYWNoKGMgPT4gKGMuZmlsdGVyT3BlbiA9IGZhbHNlKSk7XG4gIH1cblxuICBjaGVja0Nsb3NlKCRldmVudDogS2V5Ym9hcmRFdmVudCwgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIG1lbnVUcmlnZ2VyLmNsb3NlTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2hhbmdlKCRldmVudCwgY29sKSB7XG4gICAgY29sLnNldEZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIGdldEZpbHRlclZhbHVlKGNvbCkge1xuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBjb2wuZmlsdGVyVmFsdWUua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0Um93Q2xhc3NlcyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdoaWdobGlnaHQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChhdHRyW2ldWydjbGFzcyddICYmIGF0dHJbaV1bJ2NsYXNzJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGF0dHJbaV1bJ2NsYXNzJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRSb3dTdHlsZXMoaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBzdHlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xuICAgICAgICAgIGlmIChhdHRyW2ldWydzdHlsZSddICYmIGF0dHJbaV1bJ3N0eWxlJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChhdHRyW2ldWydzdHlsZSddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcy5qb2luKCcgJyk7XG4gIH1cblxuICByZW1vdmVGaWx0ZXJzKCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgIGNvbC5zZXRGaWx0ZXIodW5kZWZpbmVkKTtcbiAgICAgIH0gZWxzZSByZXR1cm47XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==