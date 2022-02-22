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
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
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
     * @param {?} col
     * @return {?}
     */
    menuOpened(col) {
        if (!col) {
            return;
        }
        /** @type {?} */
        let filterInput = null;
        switch (col.templateName) {
            case ColumnDirective.DEFAULT_FILTER_TEMPLATE:
                filterInput = document.getElementById('defaultFilterInput');
                break;
            case ColumnDirective.DATE_FILTER_TEMPLATE:
                filterInput = document.getElementById('dateFilterInput');
                break;
            default:
                break;
        }
        if (!filterInput) {
            return;
        }
        setTimeout(() => {
            filterInput.focus();
        }, 500);
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
     * @param {?} operator
     * @param {?} col
     * @return {?}
     */
    onOperatorChange(operator, col) {
        col.setOperator(operator);
    }
    /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    onFromDateChange($event, col) {
        col.setFromDate($event ? $event.target.value : null);
    }
    /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    onToDateChange($event, col) {
        col.setToDate($event ? $event.target.value : null);
    }
    /**
     * @param {?} $event
     * @param {?} col
     * @return {?}
     */
    onDaysChange($event, col) {
        col.setDays($event ? $event.target.value : null);
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
     * @param {?} dateObject
     * @return {?}
     */
    toDate(dateObject) {
        if (dateObject == null) {
            return null;
        }
        if (typeof dateObject === 'string') {
            /** @type {?} */
            const date = moment(dateObject, 'DD-MM-YYYY').toDate();
            return date;
        }
        if (dateObject) {
            /** @type {?} */
            const date = new Date(dateObject);
            return date;
        }
        return null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toNumber(value) {
        if (value == null) {
            return null;
        }
        /** @type {?} */
        const type = typeof (value);
        switch (type) {
            case 'string':
                /** @type {?} */
                const stringValue = value.replace(',', '.');
                if (!stringValue || Number.isNaN(+stringValue)) {
                    return null;
                }
                /** @type {?} */
                const n = +stringValue;
                return n;
            case 'number':
                return value;
            case 'boolean':
                return (value === true) ? 1 : 0;
            default:
                return null;
        }
    }
    /**
     * @param {?} col
     * @return {?}
     */
    getFromDate(col) {
        if (col.filterValue) {
            if (typeof col.filterValue === 'object') {
                /** @type {?} */
                const date = this.toDate(col.filterValue.fromDate);
                return date;
            }
            return new Date(col.filterValue);
        }
        return null;
    }
    /**
     * @param {?} col
     * @return {?}
     */
    getToDate(col) {
        if (col.filterValue) {
            if (typeof col.filterValue === 'object') {
                /** @type {?} */
                const date = this.toDate(col.filterValue.toDate);
                return date;
            }
            return new Date(col.filterValue);
        }
        return null;
    }
    /**
     * @param {?} col
     * @return {?}
     */
    getDays(col) {
        if (col.filterValue) {
            if (typeof col.filterValue === 'object') {
                /** @type {?} */
                const days = this.toNumber(col.filterValue.days);
                return days;
            }
            return this.toNumber(col.filterValue);
        }
        return null;
    }
    /**
     * @param {?} col
     * @return {?}
     */
    getOperator(col) {
        console.log('instant grid component - getOperator ' + col.name);
        if (!col || !col.hasOwnProperty('operator')) {
            return null;
        }
        return col.operator;
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
     * @param {?} col
     * @return {?}
     */
    removeFilter(col) {
        col.removeFilter();
    }
    /**
     * @return {?}
     */
    removeFilters() {
        console.log('instant grid component - removeFilters');
        this.columns.forEach(col => {
            col.removeFilter();
        });
    }
    /**
     * @return {?}
     */
    reload() {
        console.log('instant grid component - reload');
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
                template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\r\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\r\n    <!-- Header definition -->\r\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\r\n      <header>\r\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\r\n          <mat-menu #appMenu=\"matMenu\">\r\n            <ng-container *ngIf=\"col.filterRef && (!col.templateName || col.templateName === 'defaultFilterTemplate')\">\r\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'defaultFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"defaultFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'dateFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"dateFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.filterRef && col.templateName === 'multiChoiceFilterTemplate'\">\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <ng-container style=\"overflow-y: scroll; display: inline-grid; max-width: 250px; max-height: 350px;\" *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n\r\n            <ng-template #defaultFilterTemplate>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput #filter id=\"defaultFilterInput\" placeholder=\"Filter\" [type]=\"['Long', 'Integer', 'BigDecimal'].includes(col.dataType) ? 'number' : 'text'\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"col.removeFilter()\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\" tabindex=\"2\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n            <ng-template #dateFilterTemplate>\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"fromControlDatePicker\" id=\"dateFilterInput\" placeholder=\"From\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" [value]=\"getFromDate(col)\" (dateChange)=\"onFromDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"fromControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #fromControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onFromDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"toControlDatePicker\" placeholder=\"To\"  tabindex=\"2\" (click)=\"$event.stopPropagation()\" [value]=\"getToDate(col)\" (dateChange)=\"onToDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"toControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #toControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onToDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput type=\"number\" placeholder=\"Days\" tabindex=\"3\" (click)=\"$event.stopPropagation()\" [value]=\"getDays(col)\" (change)=\"onDaysChange($event, col)\">\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n          </mat-menu>\r\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\" (menuOpened)=\"menuOpened(col)\">\r\n            <ng-container *ngIf=\"col.isFilterSet == false\">\r\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>No filter set</title>\r\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\r\n                />\r\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.isFilterSet == true\">\r\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>Filter set</title>\r\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n          </button>\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\r\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\r\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\r\n                    <span class=\"fa fa-refresh\"></span>\r\n                    <span>Refresh</span>\r\n                </button>\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\r\n                    <span class=\"fa fa-filter\"></span>\r\n                     <span>Clear filter</span>\r\n                </button>\r\n            </mat-menu>\r\n        </div>\r\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\r\n          {{ col.label }}\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\r\n          {{ col.label }}\r\n        </div>\r\n      </header>\r\n    </th>\r\n\r\n    <!-- Cell definition -->\r\n    <td mat-cell *matCellDef=\"let element\">\r\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\r\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\r\n      </ng-container>\r\n\r\n      <ng-template #defaultCellTemplate>\r\n        {{ element[col.name] }}\r\n      </ng-template>\r\n    </td>\r\n  </ng-container>\r\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\r\n           [ngClass]=\"getRowClasses(index)\"\r\n           [ngStyle]=\"getRowStyles(index)\"\r\n           [attr.data-rowIndex]=\"index\"\r\n           (click)=\"onRowClicked(row, $event)\"></tr>\r\n</table>\r\n",
                styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}.filter-radio-group{display:flex;flex-direction:column;margin:15px 0}.filter-radio-button{margin:5px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsZUFBZSxFQUNmLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBMEMsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRixPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOztNQUU1QixNQUFNLEdBQUcsT0FBTzs7OztBQUV0QixtQ0FHQzs7O0lBRkMsNkJBQVU7O0lBQ1YsZ0NBQWdCOztBQU9sQixNQUFNLE9BQU8sYUFBYTs7OztJQXFCeEIsWUFDUyxLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBaEJoQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFpQnRELENBQUM7Ozs7O0lBYkosSUFDSSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7OztJQUNELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCO1lBQzVCLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3RCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVB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ckIsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELE1BQU07UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxPQUFPO2FBQ1I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXZSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDRyUUFBb0M7O2FBRXJDOzs7O1lBcEJDLFVBQVU7Ozt5QkFzQlQsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSztzQkFDTCxlQUFlLFNBQUMsZUFBZTt5QkFDL0IsTUFBTTttQkFDTixTQUFTLFNBQUMsT0FBTzsrQkFHakIsS0FBSztzQkF5Q0wsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBbEQxQyxtQ0FBNEM7O0lBQzVDLHNDQUErQjs7SUFDL0IsK0JBQXlCOztJQUN6QixzQ0FBbUM7O0lBQ25DLGdDQUE2RDs7SUFDN0QsbUNBQXlEOztJQUN6RCw2QkFBa0M7O0lBRWxDLDBDQUE0Qjs7SUFVNUIsc0NBQXNDOztJQUdwQyw4QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2VsZW1lbnQtY2xvc2VzdCc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBWaWV3Q2hpbGQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdFNvcnQsIE1hdE1lbnVUcmlnZ2VyLCBNYXREYXRlcGlja2VySW5wdXRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluc3RhbnREYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm93Q2xpY2tFdmVudCB7XHJcbiAgZGF0YTogYW55O1xyXG4gIGNvbE5hbWU6IHN0cmluZztcclxufVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogSW5zdGFudERhdGFTb3VyY2U8YW55PjtcclxuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgc3RpY2t5OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHJvd0F0dHJpYnV0ZXM6IEFycmF5PGFueT47XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpIGNvbHVtbnM6IENvbHVtbkRpcmVjdGl2ZVtdO1xyXG4gIEBPdXRwdXQoKSByb3dDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dDbGlja0V2ZW50PigpO1xyXG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcclxuXHJcbiAgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRpc3BsYXllZENvbHVtbnModikge1xyXG4gICAgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9IHY7XHJcbiAgfVxyXG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiAodGhpcy5fZGlzcGxheWVkQ29sdW1ucyA9XHJcbiAgICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgfHxcclxuICAgICAgKHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLm5hbWUpIDogbnVsbCkpO1xyXG4gIH1cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZlxyXG4gICkge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYi5fY29uZmlndXJlKHtcclxuICAgICAgICBzb3J0Q2hhbmdlOiB0aGlzLnNvcnQuc29ydENoYW5nZSxcclxuICAgICAgICBmaWx0ZXJDaGFuZ2U6IG1lcmdlKC4uLnRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmZpbHRlcikpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zICYmIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChmID0+IGYudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJvd0NsaWNrZWQocm93LCAkZXZlbnQpIHtcclxuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScpID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNlbGxOYW1lID0gW10uc2xpY2VcclxuICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ3RkJykuY2xhc3NMaXN0KVxyXG4gICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXHJcbiAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aCk7XHJcblxyXG4gICAgICB0aGlzLnJvd0NsaWNrZWQuZW1pdCh7IGRhdGE6IHJvdywgY29sTmFtZTogY2VsbE5hbWUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljaygkZXZlbnQpIHtcclxuICAgIGNvbnN0IGhlYWRlcnNUb0Nsb3NlOiBzdHJpbmdbXSA9IFtdLnNsaWNlXHJcbiAgICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xyXG4gICAgICAuY2FsbCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGgnKSlcclxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcclxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxyXG4gICAgICAvLyBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvbHVtblxyXG4gICAgICAubWFwKGIgPT5cclxuICAgICAgICBbXS5zbGljZVxyXG4gICAgICAgICAgLmNhbGwoYi5jbGFzc0xpc3QpXHJcbiAgICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxyXG4gICAgICAgICAgLnN1YnN0cignbWF0LWNvbHVtbi0nLmxlbmd0aClcclxuICAgICAgKTtcclxuXHJcbiAgICAvLyBJZiBhbnkgY29sdW1ucyAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4gY2xvc2UgaXQuXHJcbiAgICB0aGlzLmNvbHVtbnNcclxuICAgICAgLmZpbHRlcihjID0+IGhlYWRlcnNUb0Nsb3NlLmluY2x1ZGVzKGMubmFtZSkpXHJcbiAgICAgIC5mb3JFYWNoKGMgPT4gKGMuZmlsdGVyT3BlbiA9IGZhbHNlKSk7XHJcbiAgfVxyXG5cclxuICBtZW51T3BlbmVkKGNvbDogQ29sdW1uRGlyZWN0aXZlKSB7XHJcbiAgICBpZiAoIWNvbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGZpbHRlcklucHV0OiBIVE1MRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgc3dpdGNoIChjb2wudGVtcGxhdGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIGZpbHRlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlZmF1bHRGaWx0ZXJJbnB1dCcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5EQVRFX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICBmaWx0ZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlRmlsdGVySW5wdXQnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZpbHRlcklucHV0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZmlsdGVySW5wdXQuZm9jdXMoKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0Nsb3NlKCRldmVudDogS2V5Ym9hcmRFdmVudCwgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyKSB7XHJcbiAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICBtZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRmlsdGVyQ2hhbmdlKCRldmVudCwgY29sKSB7XHJcbiAgICBjb2wuc2V0RmlsdGVyKCRldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25PcGVyYXRvckNoYW5nZShvcGVyYXRvcjogc3RyaW5nLCBjb2wpIHtcclxuICAgIGNvbC5zZXRPcGVyYXRvcihvcGVyYXRvcik7XHJcbiAgfVxyXG5cclxuICBvbkZyb21EYXRlQ2hhbmdlKCRldmVudCwgY29sKSB7XHJcbiAgICBjb2wuc2V0RnJvbURhdGUoJGV2ZW50ID8gJGV2ZW50LnRhcmdldC52YWx1ZSA6IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgb25Ub0RhdGVDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcclxuICAgIGNvbC5zZXRUb0RhdGUoJGV2ZW50ID8gJGV2ZW50LnRhcmdldC52YWx1ZSA6IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgb25EYXlzQ2hhbmdlKCRldmVudCwgY29sKSB7XHJcbiAgICBjb2wuc2V0RGF5cygkZXZlbnQgPyAkZXZlbnQudGFyZ2V0LnZhbHVlIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJWYWx1ZShjb2wpIHtcclxuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZS5rZXk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHRvRGF0ZShkYXRlT2JqZWN0OiBhbnkpOiBEYXRlIHtcclxuICAgIGlmIChkYXRlT2JqZWN0ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBkYXRlT2JqZWN0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCBkYXRlOiBEYXRlID0gbW9tZW50KGRhdGVPYmplY3QsICdERC1NTS1ZWVlZJykudG9EYXRlKCk7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRlT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXRlT2JqZWN0KTtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICB0b051bWJlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IHR5cGVvZih2YWx1ZSk7XHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgICAgICBpZiAoIXN0cmluZ1ZhbHVlIHx8IE51bWJlci5pc05hTigrc3RyaW5nVmFsdWUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbjogbnVtYmVyID0gK3N0cmluZ1ZhbHVlO1xyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdHJ1ZSkgPyAxIDogMDtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEZyb21EYXRlKGNvbCk6IERhdGUge1xyXG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy50b0RhdGUoY29sLmZpbHRlclZhbHVlLmZyb21EYXRlKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IERhdGUoY29sLmZpbHRlclZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9EYXRlKGNvbCk6IERhdGUge1xyXG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy50b0RhdGUoY29sLmZpbHRlclZhbHVlLnRvRGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKGNvbC5maWx0ZXJWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldERheXMoY29sKTogbnVtYmVyIHtcclxuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgZGF5czogbnVtYmVyID0gdGhpcy50b051bWJlcihjb2wuZmlsdGVyVmFsdWUuZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMudG9OdW1iZXIoY29sLmZpbHRlclZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0T3BlcmF0b3IoY29sKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIGdldE9wZXJhdG9yICcgKyBjb2wubmFtZSk7XHJcbiAgICBpZiAoIWNvbCB8fCAhY29sLmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbC5vcGVyYXRvcjtcclxuICB9XHJcblxyXG4gIGdldFJvd0NsYXNzZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKCdoaWdobGlnaHQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xyXG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ2NsYXNzJ10gJiYgYXR0cltpXVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChhdHRyW2ldWydjbGFzcyddKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIGdldFJvd1N0eWxlcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XHJcbiAgICAgICAgICBpZiAoYXR0cltpXVsnc3R5bGUnXSAmJiBhdHRyW2ldWydzdHlsZSddLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChhdHRyW2ldWydzdHlsZSddKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVyKGNvbCkge1xyXG4gICAgY29sLnJlbW92ZUZpbHRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVycygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnN0YW50IGdyaWQgY29tcG9uZW50IC0gcmVtb3ZlRmlsdGVycycpO1xyXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sID0+IHtcclxuICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIHJlbG9hZCcpO1xyXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbCxpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19