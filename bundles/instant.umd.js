(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('element-closest'), require('@angular/material'), require('moment'), require('@angular/forms'), require('@angular/cdk/collections'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('instant', ['exports', '@angular/core', '@angular/common', 'rxjs', 'element-closest', '@angular/material', 'moment', '@angular/forms', '@angular/cdk/collections', '@angular/router', 'rxjs/operators'], factory) :
    (factory((global.instant = {}),global.ng.core,global.ng.common,global.rxjs,null,global.ng.material,global.moment_,global.ng.forms,global.ng.cdk.collections,global.ng.router,global.rxjs.operators));
}(this, (function (exports,i0,common,rxjs,elementClosest,material,moment_,forms,collections,router,operators) { 'use strict';

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
    var AbstractFilterOption = /** @class */ (function () {
        function AbstractFilterOption() {
            this.attribute = null;
            this.lookupEntity = null;
            this.lookupAttribute = null;
            this.dataType = null;
            this.operator = null;
        }
        return AbstractFilterOption;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var DefaultFilterOption = /** @class */ (function (_super) {
        __extends(DefaultFilterOption, _super);
        function DefaultFilterOption() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.key = null;
            return _this;
        }
        return DefaultFilterOption;
    }(AbstractFilterOption));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var DateFilterOption = /** @class */ (function (_super) {
        __extends(DateFilterOption, _super);
        function DateFilterOption() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fromDate = null;
            _this.toDate = null;
            return _this;
        }
        return DateFilterOption;
    }(AbstractFilterOption));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * Column definition for the instant-grid.
     * Defines a set of cells and optional filters available for a table column.
     *
     * 22.06.2019 ofsfrvor - Added support for different filter operators.
     *                       Added other input members (attribute, lookAttribute, lookupEntity, dataType, operator)
     *                       enabling control of the filter from the HTML tag.
     * 23.06.2019 ofsfrvor - Added dateFilterTemplate. Activate dateFilterTemplate by setting input member templateName.
     * 24.06.2019 ofsfrvor - If dataType is Long, Integer or BigDecimal, set input field type to number. Set default dataType to String.
     *                       Using moment to convert dateString to date object.
     *
     * TODO Automatically force cursor to input field when template is opened
     * TODO Need to implement language translation for the operator labels.
     * TODO List filter options are not unchecked when list type filter is removed
     */
    var ColumnDirective = /** @class */ (function () {
        /**
         *
         */
        function ColumnDirective(datePipe) {
            this.datePipe = datePipe;
            // Inputs
            this.templateName = ColumnDirective.DEFAULT_FILTER_TEMPLATE;
            // Defaults to the identifier of column
            this.filterable = true;
            this.sortable = true;
            this.sticky = false;
            this.instantStyle = {};
            this.dataType = 'String';
            this.isFilterSet = false;
            this.filter = new rxjs.ReplaySubject();
            this.initialOperator = null;
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
                if (this.templateName == null) {
                    this.templateName = ColumnDirective.DEFAULT_FILTER_TEMPLATE;
                }
                // Set default operator list (if not already set)
                switch (this.templateName) {
                    case ColumnDirective.DEFAULT_FILTER_TEMPLATE:
                        this.operators = this.operators ? this.operators : ['CONTAINS', 'STARTS_WITH', 'ENDS_WITH', 'EQUALS', 'NOT_EQUALS', 'IS_NULL', 'IS_NOT_NULL'];
                        this.operator = this.operator ? this.operator : 'CONTAINS';
                        break;
                    case ColumnDirective.DATE_FILTER_TEMPLATE:
                        this.operators = this.operators ? this.operators : ['IS_NULL', 'IS_NOT_NULL'];
                        this.operator = this.operator ? this.operator : 'EQUALS';
                        break;
                    default:
                        this.operators = null;
                }
                this.initialOperator = this.operator;
            };
        /**
         * This method is invoked directly from the filter template.
         * Any custom implementation of a column filter, must fire this
         * method when user has made choices.
         *
         * @param filter The filter as received from the filter template
         */
        /**
         * This method is invoked directly from the filter template.
         * Any custom implementation of a column filter, must fire this
         * method when user has made choices.
         *
         * @param {?} filter The filter as received from the filter template
         * @param {?=} noEmit
         * @return {?}
         */
        ColumnDirective.prototype.setFilter = /**
         * This method is invoked directly from the filter template.
         * Any custom implementation of a column filter, must fire this
         * method when user has made choices.
         *
         * @param {?} filter The filter as received from the filter template
         * @param {?=} noEmit
         * @return {?}
         */
            function (filter, noEmit) {
                if (noEmit === void 0) {
                    noEmit = false;
                }
                if (filter) {
                    if (typeof (filter) === 'object') {
                        // Filter is object => override filter attributes
                        this.attribute = filter.hasOwnProperty('attribute') && filter.attribute && filter.attribute !== this.attribute ? filter.attribute : this.attribute;
                        this.lookupAttribute = filter.hasOwnProperty('lookupAttribute') && filter.lookupAttribute && filter.lookupAttribute !== this.lookupAttribute ? filter.lookupAttribute : this.lookupAttribute;
                        this.lookupEntity = filter.hasOwnProperty('lookupEntity') && filter.lookupEntity && filter.lookupEntity !== this.lookupEntity ? filter.lookupEntity : this.lookupEntity;
                        this.operator = filter.hasOwnProperty('operator') && filter.operator && filter.operator !== this.operator ? filter.operator : this.operator;
                        this.dataType = filter.hasOwnProperty('dataType') && filter.dataType && filter.dataType !== this.dataType ? filter.dataType : this.dataType;
                    }
                    else {
                        // Filter is primitive => convert to default filter option
                        filter = this.convertPrimitiveToFilter(filter);
                    }
                }
                this.setFilterValue(filter, noEmit);
                // Have to do a null check on filter if the filter is to be emitted
                this.isFilterSet = noEmit === true ? filter !== null : true;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        ColumnDirective.prototype.convertPrimitiveToFilter = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                /** @type {?} */
                var filter = new DefaultFilterOption();
                filter.attribute = this.attribute;
                filter.lookupAttribute = this.lookupAttribute;
                filter.lookupEntity = this.lookupEntity;
                filter.operator = this.operator;
                filter.key = key;
                filter.dataType = this.dataType;
                return filter;
            };
        /**
         * @param {?} filter
         * @param {?=} noEmit
         * @return {?}
         */
        ColumnDirective.prototype.setFilterValue = /**
         * @param {?} filter
         * @param {?=} noEmit
         * @return {?}
         */
            function (filter, noEmit) {
                if (noEmit === void 0) {
                    noEmit = false;
                }
                if ((filter !== this.oldFilter) || (filter === null)) {
                    // Clone current filter to old filter
                    this.oldFilter = Object.assign({}, this.filterValue);
                    this.filterValue = filter;
                    if (!noEmit) {
                        this.filter.next({ active: this.name, filter: filter });
                    }
                }
                this.filterOpen = false;
            };
        /**
         * @param {?} date
         * @return {?}
         */
        ColumnDirective.prototype.setFromDate = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                if (this.templateName !== 'dateFilterTemplate') {
                    return;
                }
                /** @type {?} */
                var filter = this.filterValue ? this.filterValue : new DateFilterOption();
                filter.attribute = this.attribute;
                filter.lookupAttribute = this.lookupAttribute;
                filter.lookupEntity = this.lookupEntity;
                filter.operator = this.operator;
                filter.dataType = this.dataType;
                filter.fromDate = this.toDbDateString(date);
                this.setFilterValue(filter);
            };
        /**
         * @param {?} date
         * @return {?}
         */
        ColumnDirective.prototype.setToDate = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                if (this.templateName !== 'dateFilterTemplate') {
                    return;
                }
                /** @type {?} */
                var filter = this.filterValue ? this.filterValue : new DateFilterOption();
                filter.attribute = this.attribute;
                filter.lookupAttribute = this.lookupAttribute;
                filter.lookupEntity = this.lookupEntity;
                filter.operator = this.operator;
                filter.dataType = this.dataType;
                filter.toDate = this.toDbDateString(date);
                this.setFilterValue(filter);
            };
        /**
         * @param {?} date
         * @return {?}
         */
        ColumnDirective.prototype.toDbDateString = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                if (date == null) {
                    return null;
                }
                /** @type {?} */
                var dateString = this.datePipe.transform(date, 'dd-MM-yyyy');
                return dateString;
            };
        /**
         * @param {?} operator
         * @return {?}
         */
        ColumnDirective.prototype.setOperator = /**
         * @param {?} operator
         * @return {?}
         */
            function (operator) {
                this.operator = operator;
                if (this.filterValue && (typeof (this.filterValue) === 'object')) {
                    this.filterValue.operator = operator;
                }
                else {
                    this.filterValue = this.convertPrimitiveToFilter(null);
                }
                this.setFilterValue(this.filterValue);
                this.isFilterSet = true;
            };
        /**
         * @return {?}
         */
        ColumnDirective.prototype.removeFilter = /**
         * @return {?}
         */
            function () {
                // Default operator back to CONTAINS
                this.operator = this.initialOperator ? this.initialOperator : 'CONTAINS';
                this.setFilterValue(null);
                this.isFilterSet = false;
            };
        ColumnDirective.DEFAULT_FILTER_TEMPLATE = 'defaultFilterTemplate';
        ColumnDirective.DATE_FILTER_TEMPLATE = 'dateFilterTemplate';
        ColumnDirective.decorators = [
            { type: i0.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'instant-column'
                    },] }
        ];
        /** @nocollapse */
        ColumnDirective.ctorParameters = function () {
            return [
                { type: common.DatePipe }
            ];
        };
        ColumnDirective.propDecorators = {
            templateName: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            label: [{ type: i0.Input }],
            filterable: [{ type: i0.Input }],
            sortable: [{ type: i0.Input }],
            sticky: [{ type: i0.Input }],
            instantStyle: [{ type: i0.Input, args: ['instant-style',] }],
            operators: [{ type: i0.Input }],
            attribute: [{ type: i0.Input }],
            lookupAttribute: [{ type: i0.Input }],
            lookupEntity: [{ type: i0.Input }],
            dataType: [{ type: i0.Input }],
            operator: [{ type: i0.Input }],
            filterRef: [{ type: i0.ContentChild, args: ['filter',] }],
            cellRef: [{ type: i0.ContentChild, args: ['cell',] }]
        };
        return ColumnDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = moment_;
    var GridComponent = /** @class */ (function () {
        function GridComponent(elRef) {
            this.elRef = elRef;
            this.rowClicked = new i0.EventEmitter();
        }
        Object.defineProperty(GridComponent.prototype, "displayedColumns", {
            get: /**
             * @return {?}
             */ function () {
                return (this._displayedColumns =
                    this._displayedColumns ||
                        (this.columns ? this.columns.map(function (c) { return c.name; }) : null));
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.menuOpened = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                if (!col) {
                    return;
                }
                /** @type {?} */
                var filterInput = null;
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
                setTimeout(function () {
                    filterInput.focus();
                }, 500);
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
         * @param {?} operator
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.onOperatorChange = /**
         * @param {?} operator
         * @param {?} col
         * @return {?}
         */
            function (operator, col) {
                col.setOperator(operator);
            };
        /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.onFromDateChange = /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
            function ($event, col) {
                console.log('instant grid component - onFromDateChange ');
                col.setFromDate($event ? $event.target.value : null);
            };
        /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.onToDateChange = /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
            function ($event, col) {
                console.log('instant grid component - onToDateChange ');
                col.setToDate($event ? $event.target.value : null);
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
                if (col.filterValue) {
                    if (typeof col.filterValue === 'object') {
                        return col.filterValue.key;
                    }
                    return col.filterValue;
                }
                return '';
            };
        /**
         * @param {?} dateObject
         * @return {?}
         */
        GridComponent.prototype.toDate = /**
         * @param {?} dateObject
         * @return {?}
         */
            function (dateObject) {
                if (dateObject == null) {
                    return null;
                }
                if (typeof dateObject === 'string') {
                    /** @type {?} */
                    var date = moment(dateObject, 'DD-MM-YYYY').toDate();
                    return date;
                }
                if (dateObject) {
                    /** @type {?} */
                    var date = new Date(dateObject);
                    return date;
                }
                return null;
            };
        /**
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.getFromDate = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                if (col.filterValue) {
                    if (typeof col.filterValue === 'object') {
                        /** @type {?} */
                        var date = this.toDate(col.filterValue.fromDate);
                        return date;
                    }
                    return new Date(col.filterValue);
                }
                return null;
            };
        /**
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.getToDate = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                if (col.filterValue) {
                    if (typeof col.filterValue === 'object') {
                        /** @type {?} */
                        var date = this.toDate(col.filterValue.toDate);
                        return date;
                    }
                    return new Date(col.filterValue);
                }
                return null;
            };
        /**
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.getOperator = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                console.log('instant grid component - getOperator ' + col.name);
                if (!col || !col.hasOwnProperty('operator')) {
                    return null;
                }
                return col.operator;
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
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.removeFilter = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                col.removeFilter();
            };
        /**
         * @return {?}
         */
        GridComponent.prototype.removeFilters = /**
         * @return {?}
         */
            function () {
                console.log('instant grid component - removeFilters');
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
                console.log('instant grid component - reload');
                this.columns.forEach(function (col, index) {
                    if (index === 0) {
                        col.removeFilter();
                    }
                    else {
                        return;
                    }
                });
            };
        GridComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'instant-grid',
                        template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\r\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\r\n    <!-- Header definition -->\r\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\r\n      <header>\r\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\r\n          <mat-menu #appMenu=\"matMenu\">\r\n            <ng-container *ngIf=\"col.filterRef && (!col.templateName || col.templateName === 'defaultFilterTemplate')\">\r\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'defaultFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"defaultFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'dateFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"dateFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.filterRef && col.templateName === 'multiChoiceFilterTemplate'\">\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <ng-container style=\"overflow-y: scroll; display: inline-grid; max-width: 250px; max-height: 350px;\" *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n\r\n            <ng-template #defaultFilterTemplate>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput #filter id=\"defaultFilterInput\" placeholder=\"Filter\" [type]=\"['Long', 'Integer', 'BigDecimal'].includes(col.dataType) ? 'number' : 'text'\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"col.removeFilter()\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\" tabindex=\"2\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n            <ng-template #dateFilterTemplate>\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"fromControlDatePicker\" id=\"dateFilterInput\" placeholder=\"From\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" [value]=\"getFromDate(col)\" (dateChange)=\"onFromDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"fromControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #fromControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onFromDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"toControlDatePicker\" placeholder=\"To\"  tabindex=\"2\" (click)=\"$event.stopPropagation()\" [value]=\"getToDate(col)\" (dateChange)=\"onToDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"toControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #toControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onToDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n          </mat-menu>\r\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\" (menuOpened)=\"menuOpened(col)\">\r\n            <ng-container *ngIf=\"col.isFilterSet == false\">\r\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>No filter set</title>\r\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\r\n                />\r\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.isFilterSet == true\">\r\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>Filter set</title>\r\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n          </button>\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\r\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\r\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\r\n                    <span class=\"fa fa-refresh\"></span>\r\n                    <span>Refresh</span>\r\n                </button>\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\r\n                    <span class=\"fa fa-filter\"></span>\r\n                     <span>Clear filter</span>\r\n                </button>\r\n            </mat-menu>\r\n        </div>\r\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\r\n          {{ col.label }}\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\r\n          {{ col.label }}\r\n        </div>\r\n      </header>\r\n    </th>\r\n\r\n    <!-- Cell definition -->\r\n    <td mat-cell *matCellDef=\"let element\">\r\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\r\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\r\n      </ng-container>\r\n\r\n      <ng-template #defaultCellTemplate>\r\n        {{ element[col.name] }}\r\n      </ng-template>\r\n    </td>\r\n  </ng-container>\r\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\r\n           [ngClass]=\"getRowClasses(index)\"\r\n           [ngStyle]=\"getRowStyles(index)\"\r\n           [attr.data-rowIndex]=\"index\"\r\n           (click)=\"onRowClicked(row, $event)\"></tr>\r\n</table>\r\n",
                        styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}.filter-radio-group{display:flex;flex-direction:column;margin:15px 0}.filter-radio-button{margin:5px}"]
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
                        template: "<mat-toolbar>\r\n  <header>\r\n    <ng-content></ng-content>\r\n  </header>\r\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\r\n</mat-toolbar>\r\n",
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
                        template: "<mat-menu #rowMenu=\"matMenu\">\r\n  <ng-content></ng-content>\r\n</mat-menu>\r\n\r\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\r\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\r\n</button>\r\n",
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
                            material.MatRadioModule,
                            material.MatDatepickerModule,
                        ],
                        declarations: [
                            GridComponent,
                            ColumnDirective,
                            GridToolbarComponent,
                            GridRowMenuComponent
                        ],
                        exports: [
                            GridComponent,
                            ColumnDirective,
                            GridToolbarComponent,
                            GridRowMenuComponent
                        ],
                        providers: [
                            common.DatePipe,
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
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
                        template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\r\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\r\n",
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
                        template: "<ng-container *ngIf=\"actionsRef; else defaultTemplate\">\r\n  <ng-container *ngTemplateOutlet=\"actionsRef\"></ng-container>\r\n</ng-container>\r\n\r\n<ng-template #defaultTemplate></ng-template>\r\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2ZpbHRlci1vcHRpb24vYWJzdHJhY3QtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9maWx0ZXItb3B0aW9uL2RlZmF1bHQtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9maWx0ZXItb3B0aW9uL2RhdGUtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIuc2VydmljZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQWJzdHJhY3RGaWx0ZXJPcHRpb24ge1xyXG4gIGF0dHJpYnV0ZTogc3RyaW5nID0gbnVsbDtcclxuICBsb29rdXBFbnRpdHk6IHN0cmluZyA9IG51bGw7XHJcbiAgbG9va3VwQXR0cmlidXRlOiBzdHJpbmcgPSBudWxsO1xyXG4gIGRhdGFUeXBlOiBzdHJpbmcgPSBudWxsO1xyXG4gIG9wZXJhdG9yOiBzdHJpbmcgPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7QWJzdHJhY3RGaWx0ZXJPcHRpb259IGZyb20gJy4vYWJzdHJhY3QtZmlsdGVyLW9wdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZpbHRlck9wdGlvbiBleHRlbmRzIEFic3RyYWN0RmlsdGVyT3B0aW9uIHtcclxuICBrZXk6IGFueSA9IG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHtBYnN0cmFjdEZpbHRlck9wdGlvbn0gZnJvbSAnLi9hYnN0cmFjdC1maWx0ZXItb3B0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmlsdGVyT3B0aW9uIGV4dGVuZHMgQWJzdHJhY3RGaWx0ZXJPcHRpb24ge1xyXG4gIGZyb21EYXRlOiBEYXRlID0gbnVsbDtcclxuICB0b0RhdGU6IERhdGUgPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0RlZmF1bHRGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kZWZhdWx0LWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RhdGVGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kYXRlLWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvc3JjL2NvbXBpbGVyX2ZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uRmlsdGVyIHtcclxuICBhY3RpdmU6IHN0cmluZztcclxuICBmaWx0ZXI6IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgaW5zdGFudC1ncmlkLlxyXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXHJcbiAqXHJcbiAqIDIyLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBzdXBwb3J0IGZvciBkaWZmZXJlbnQgZmlsdGVyIG9wZXJhdG9ycy5cclxuICogICAgICAgICAgICAgICAgICAgICAgIEFkZGVkIG90aGVyIGlucHV0IG1lbWJlcnMgKGF0dHJpYnV0ZSwgbG9va0F0dHJpYnV0ZSwgbG9va3VwRW50aXR5LCBkYXRhVHlwZSwgb3BlcmF0b3IpXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBlbmFibGluZyBjb250cm9sIG9mIHRoZSBmaWx0ZXIgZnJvbSB0aGUgSFRNTCB0YWcuXHJcbiAqIDIzLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBkYXRlRmlsdGVyVGVtcGxhdGUuIEFjdGl2YXRlIGRhdGVGaWx0ZXJUZW1wbGF0ZSBieSBzZXR0aW5nIGlucHV0IG1lbWJlciB0ZW1wbGF0ZU5hbWUuXHJcbiAqIDI0LjA2LjIwMTkgb2ZzZnJ2b3IgLSBJZiBkYXRhVHlwZSBpcyBMb25nLCBJbnRlZ2VyIG9yIEJpZ0RlY2ltYWwsIHNldCBpbnB1dCBmaWVsZCB0eXBlIHRvIG51bWJlci4gU2V0IGRlZmF1bHQgZGF0YVR5cGUgdG8gU3RyaW5nLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgVXNpbmcgbW9tZW50IHRvIGNvbnZlcnQgZGF0ZVN0cmluZyB0byBkYXRlIG9iamVjdC5cclxuICpcclxuICogVE9ETyBBdXRvbWF0aWNhbGx5IGZvcmNlIGN1cnNvciB0byBpbnB1dCBmaWVsZCB3aGVuIHRlbXBsYXRlIGlzIG9wZW5lZFxyXG4gKiBUT0RPIE5lZWQgdG8gaW1wbGVtZW50IGxhbmd1YWdlIHRyYW5zbGF0aW9uIGZvciB0aGUgb3BlcmF0b3IgbGFiZWxzLlxyXG4gKiBUT0RPIExpc3QgZmlsdGVyIG9wdGlvbnMgYXJlIG5vdCB1bmNoZWNrZWQgd2hlbiBsaXN0IHR5cGUgZmlsdGVyIGlzIHJlbW92ZWRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtY29sdW1uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJTFRFUl9URU1QTEFURTogc3RyaW5nID0gJ2RlZmF1bHRGaWx0ZXJUZW1wbGF0ZSc7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBEQVRFX0ZJTFRFUl9URU1QTEFURTogc3RyaW5nID0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZSc7XHJcblxyXG4gIC8vIElucHV0c1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlTmFtZTogc3RyaW5nID0gQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFO1xyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgIC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIGNvbHVtbi5cclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nOyAvLyBEZWZhdWx0cyB0byB0aGUgaWRlbnRpZmllciBvZiBjb2x1bW5cclxuICBASW5wdXQoKSBmaWx0ZXJhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzb3J0YWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgc3RpY2t5ID0gZmFsc2U7XHJcbiAgQElucHV0KCdpbnN0YW50LXN0eWxlJykgaW5zdGFudFN0eWxlID0ge307XHJcbiAgQElucHV0KCkgb3BlcmF0b3JzOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKSBhdHRyaWJ1dGU6IHN0cmluZztcclxuICBASW5wdXQoKSBsb29rdXBBdHRyaWJ1dGU6IHN0cmluZztcclxuICBASW5wdXQoKSBsb29rdXBFbnRpdHk6IHN0cmluZztcclxuICBASW5wdXQoKSBkYXRhVHlwZTogc3RyaW5nID0gJ1N0cmluZyc7XHJcbiAgQElucHV0KCkgb3BlcmF0b3I6IHN0cmluZztcclxuXHJcbiAgLy8gVGVtcGxhdGUgcmVmc1xyXG4gIEBDb250ZW50Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAQ29udGVudENoaWxkKCdjZWxsJykgY2VsbFJlZjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLy8gRmlsdGVyIHByb3BlcnRpZXNcclxuICBmaWx0ZXJPcGVuOiBib29sZWFuO1xyXG4gIGlzRmlsdGVyU2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgZmlsdGVyID0gbmV3IFJlcGxheVN1YmplY3Q8Q29sdW1uRmlsdGVyPigpO1xyXG4gIGZpbHRlclZhbHVlOiBhbnk7XHJcbiAgb2xkRmlsdGVyOiBhbnk7XHJcbiAgaW5pdGlhbE9wZXJhdG9yOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGVcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmxhYmVsID09IG51bGwpIHtcclxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnRlbXBsYXRlTmFtZSA9IENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgZGVmYXVsdCBvcGVyYXRvciBsaXN0IChpZiBub3QgYWxyZWFkeSBzZXQpXHJcbiAgICBzd2l0Y2ggKHRoaXMudGVtcGxhdGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vcGVyYXRvcnMgPyB0aGlzLm9wZXJhdG9ycyA6IFsnQ09OVEFJTlMnLCAnU1RBUlRTX1dJVEgnLCAnRU5EU19XSVRIJywgJ0VRVUFMUycsICdOT1RfRVFVQUxTJywgJ0lTX05VTEwnLCAnSVNfTk9UX05VTEwnXTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvciA/IHRoaXMub3BlcmF0b3IgOiAnQ09OVEFJTlMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5EQVRFX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzID8gdGhpcy5vcGVyYXRvcnMgOiBbJ0lTX05VTEwnLCAnSVNfTk9UX05VTEwnXTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvciA/IHRoaXMub3BlcmF0b3IgOiAnRVFVQUxTJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbml0aWFsT3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBkaXJlY3RseSBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGUuXHJcbiAgICogQW55IGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbHVtbiBmaWx0ZXIsIG11c3QgZmlyZSB0aGlzXHJcbiAgICogbWV0aG9kIHdoZW4gdXNlciBoYXMgbWFkZSBjaG9pY2VzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGZpbHRlciBUaGUgZmlsdGVyIGFzIHJlY2VpdmVkIGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHNldEZpbHRlcihmaWx0ZXI6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIC8vIEZpbHRlciBpcyBvYmplY3QgPT4gb3ZlcnJpZGUgZmlsdGVyIGF0dHJpYnV0ZXNcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnYXR0cmlidXRlJykgJiYgZmlsdGVyLmF0dHJpYnV0ZSAmJiBmaWx0ZXIuYXR0cmlidXRlICE9PSB0aGlzLmF0dHJpYnV0ZSA/IGZpbHRlci5hdHRyaWJ1dGUgOiB0aGlzLmF0dHJpYnV0ZTtcclxuICAgICAgICB0aGlzLmxvb2t1cEF0dHJpYnV0ZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnbG9va3VwQXR0cmlidXRlJykgJiYgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSAmJiBmaWx0ZXIubG9va3VwQXR0cmlidXRlICE9PSB0aGlzLmxvb2t1cEF0dHJpYnV0ZSA/IGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgOiB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgICAgICB0aGlzLmxvb2t1cEVudGl0eSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnbG9va3VwRW50aXR5JykgJiYgZmlsdGVyLmxvb2t1cEVudGl0eSAmJiBmaWx0ZXIubG9va3VwRW50aXR5ICE9PSB0aGlzLmxvb2t1cEVudGl0eSA/IGZpbHRlci5sb29rdXBFbnRpdHkgOiB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgICAgICB0aGlzLm9wZXJhdG9yID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpICYmIGZpbHRlci5vcGVyYXRvciAmJiBmaWx0ZXIub3BlcmF0b3IgIT09IHRoaXMub3BlcmF0b3IgPyBmaWx0ZXIub3BlcmF0b3IgOiB0aGlzLm9wZXJhdG9yO1xyXG4gICAgICAgIHRoaXMuZGF0YVR5cGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2RhdGFUeXBlJykgJiYgZmlsdGVyLmRhdGFUeXBlICYmIGZpbHRlci5kYXRhVHlwZSAhPT0gdGhpcy5kYXRhVHlwZSA/IGZpbHRlci5kYXRhVHlwZSA6IHRoaXMuZGF0YVR5cGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIHByaW1pdGl2ZSA9PiBjb252ZXJ0IHRvIGRlZmF1bHQgZmlsdGVyIG9wdGlvblxyXG4gICAgICAgIGZpbHRlciA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlciwgbm9FbWl0KTtcclxuXHJcbiAgICAvLyBIYXZlIHRvIGRvIGEgbnVsbCBjaGVjayBvbiBmaWx0ZXIgaWYgdGhlIGZpbHRlciBpcyB0byBiZSBlbWl0dGVkXHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gbm9FbWl0ID09PSB0cnVlID8gZmlsdGVyICE9PSBudWxsIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnZlcnRQcmltaXRpdmVUb0ZpbHRlcihrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICBjb25zdCBmaWx0ZXI6IERlZmF1bHRGaWx0ZXJPcHRpb24gPSBuZXcgRGVmYXVsdEZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5rZXkgPSBrZXk7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG5cclxuICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgfVxyXG5cclxuICBzZXRGaWx0ZXJWYWx1ZShmaWx0ZXI6IGFueSwgbm9FbWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICgoZmlsdGVyICE9PSB0aGlzLm9sZEZpbHRlcikgfHwgKGZpbHRlciA9PT0gbnVsbCkpIHtcclxuICAgICAgLy8gQ2xvbmUgY3VycmVudCBmaWx0ZXIgdG8gb2xkIGZpbHRlclxyXG4gICAgICB0aGlzLm9sZEZpbHRlciA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmlsdGVyVmFsdWUpO1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gZmlsdGVyO1xyXG4gICAgICBpZiAoIW5vRW1pdCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLm5leHQoe2FjdGl2ZTogdGhpcy5uYW1lLCBmaWx0ZXI6IGZpbHRlcn0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWx0ZXJPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmZyb21EYXRlID0gdGhpcy50b0RiRGF0ZVN0cmluZyhkYXRlKTtcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHNldFRvRGF0ZShkYXRlOiBEYXRlKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLnRvRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvRGJEYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgaWYgKGRhdGUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgJ2RkLU1NLXl5eXknKTtcclxuICAgIHJldHVybiBkYXRlU3RyaW5nO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldE9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgIGlmICh0aGlzLmZpbHRlclZhbHVlICYmICh0eXBlb2YodGhpcy5maWx0ZXJWYWx1ZSkgPT09ICdvYmplY3QnKSkge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIobnVsbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWx0ZXIoKSB7XHJcbiAgICAvLyBEZWZhdWx0IG9wZXJhdG9yIGJhY2sgdG8gQ09OVEFJTlNcclxuICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLmluaXRpYWxPcGVyYXRvciA/IHRoaXMuaW5pdGlhbE9wZXJhdG9yIDogJ0NPTlRBSU5TJztcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0ICdlbGVtZW50LWNsb3Nlc3QnO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uRGVzdHJveSxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciwgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xyXG4gIGRhdGE6IGFueTtcclxuICBjb2xOYW1lOiBzdHJpbmc7XHJcbn1cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IEluc3RhbnREYXRhU291cmNlPGFueT47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHN0aWNreTogYm9vbGVhbjtcclxuICBASW5wdXQoKSByb3dBdHRyaWJ1dGVzOiBBcnJheTxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcclxuICBAT3V0cHV0KCkgcm93Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Q2xpY2tFdmVudD4oKTtcclxuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XHJcblxyXG4gIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHtcclxuICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2O1xyXG4gIH1cclxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPVxyXG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8XHJcbiAgICAgICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWZcclxuICApIHt9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGIuX2NvbmZpZ3VyZSh7XHJcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXHJcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XHJcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBjZWxsTmFtZSA9IFtdLnNsaWNlXHJcbiAgICAgICAgLmNhbGwoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCd0ZCcpLmNsYXNzTGlzdClcclxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxyXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xyXG5cclxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoeyBkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxyXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykpXHJcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XHJcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcclxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cclxuICAgICAgLm1hcChiID0+XHJcbiAgICAgICAgW10uc2xpY2VcclxuICAgICAgICAgIC5jYWxsKGIuY2xhc3NMaXN0KVxyXG4gICAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcclxuICAgICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxyXG4gICAgdGhpcy5jb2x1bW5zXHJcbiAgICAgIC5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKVxyXG4gICAgICAuZm9yRWFjaChjID0+IChjLmZpbHRlck9wZW4gPSBmYWxzZSkpO1xyXG4gIH1cclxuXHJcbiAgbWVudU9wZW5lZChjb2w6IENvbHVtbkRpcmVjdGl2ZSkge1xyXG4gICAgaWYgKCFjb2wpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWx0ZXJJbnB1dDogSFRNTEVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAoY29sLnRlbXBsYXRlTmFtZSkge1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICBmaWx0ZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWZhdWx0RmlsdGVySW5wdXQnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREFURV9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgZmlsdGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZUZpbHRlcklucHV0Jyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmaWx0ZXJJbnB1dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGZpbHRlcklucHV0LmZvY3VzKCk7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xyXG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29sLnNldEZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uT3BlcmF0b3JDaGFuZ2Uob3BlcmF0b3I6IHN0cmluZywgY29sKSB7XHJcbiAgICBjb2wuc2V0T3BlcmF0b3Iob3BlcmF0b3IpO1xyXG4gIH1cclxuXHJcbiAgb25Gcm9tRGF0ZUNoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29uc29sZS5sb2coJ2luc3RhbnQgZ3JpZCBjb21wb25lbnQgLSBvbkZyb21EYXRlQ2hhbmdlICcpO1xyXG4gICAgY29sLnNldEZyb21EYXRlKCRldmVudCA/ICRldmVudC50YXJnZXQudmFsdWUgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIG9uVG9EYXRlQ2hhbmdlKCRldmVudCwgY29sKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIG9uVG9EYXRlQ2hhbmdlICcpO1xyXG4gICAgY29sLnNldFRvRGF0ZSgkZXZlbnQgPyAkZXZlbnQudGFyZ2V0LnZhbHVlIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJWYWx1ZShjb2wpIHtcclxuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZS5rZXk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbC5maWx0ZXJWYWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHRvRGF0ZShkYXRlT2JqZWN0OiBhbnkpOiBEYXRlIHtcclxuICAgIGlmIChkYXRlT2JqZWN0ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBkYXRlT2JqZWN0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCBkYXRlOiBEYXRlID0gbW9tZW50KGRhdGVPYmplY3QsICdERC1NTS1ZWVlZJykudG9EYXRlKCk7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRlT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXRlT2JqZWN0KTtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0RnJvbURhdGUoY29sKTogRGF0ZSB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLnRvRGF0ZShjb2wuZmlsdGVyVmFsdWUuZnJvbURhdGUpO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZShjb2wuZmlsdGVyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRUb0RhdGUoY29sKTogRGF0ZSB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLnRvRGF0ZShjb2wuZmlsdGVyVmFsdWUudG9EYXRlKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IERhdGUoY29sLmZpbHRlclZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0T3BlcmF0b3IoY29sKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIGdldE9wZXJhdG9yICcgKyBjb2wubmFtZSk7XHJcbiAgICBpZiAoIWNvbCB8fCAhY29sLmhhc093blByb3BlcnR5KCdvcGVyYXRvcicpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbC5vcGVyYXRvcjtcclxuICB9XHJcblxyXG4gIGdldFJvd0NsYXNzZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKCdoaWdobGlnaHQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xyXG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ2NsYXNzJ10gJiYgYXR0cltpXVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChhdHRyW2ldWydjbGFzcyddKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIGdldFJvd1N0eWxlcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XHJcbiAgICAgICAgICBpZiAoYXR0cltpXVsnc3R5bGUnXSAmJiBhdHRyW2ldWydzdHlsZSddLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChhdHRyW2ldWydzdHlsZSddKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVyKGNvbCkge1xyXG4gICAgY29sLnJlbW92ZUZpbHRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVycygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnN0YW50IGdyaWQgY29tcG9uZW50IC0gcmVtb3ZlRmlsdGVycycpO1xyXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sID0+IHtcclxuICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIHJlbG9hZCcpO1xyXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbCxpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC10b29sYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC10b29sYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ncmlkLXRvb2xiYXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHBhZ2UgPSAwO1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XHJcbiAgQElucHV0KCkgdG90YWwgPSAwO1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XHJcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFs1LCAxMCwgMjUsIDEwMF07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgcGFnZUhhbmRsZXIoJGV2ZW50OiBQYWdlRXZlbnQpIHtcclxuICAgIHRoaXMucGFnZVNpemUgPSAkZXZlbnQucGFnZVNpemU7XHJcbiAgICB0aGlzLnBhZ2UgPSAkZXZlbnQucGFnZUluZGV4O1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2dyaWQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXJvdy1tZW51JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkUm93TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcm93O1xyXG4gIEBJbnB1dCgpIGljb24gPSAnZWxsaXBzaXMtdic7XHJcblxyXG4gIHNob3dNZW51ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZENvbXBvbmVudCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrKCRldmVudCkge1xyXG4gICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXHJcbiAgICBbXS5zbGljZS5jYWxsKHRoaXMuZ3JpZC5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1jZWxsLm1hdC1jb2x1bW4tYWN0aW9ucycpKVxyXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxyXG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXHJcbiAgICAgIC8vIElmIGFueSByb3cgYWN0aW9uIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiwgY2xvc2UgaXQuXHJcbiAgICAgIC5mb3JFYWNoKGNlbGwgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IGNlbGwuY2xvc2VzdCgnbWF0LXJvdycpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gW10uc2xpY2UuY2FsbChyb3cuY2xvc2VzdCgnbWF0LXRhYmxlJykuY2hpbGRyZW4pLmluZGV4T2Yocm93KSAtIDE7IC8vIC0gMSBiZWNhdXNlIGhlYWRlciBpcyBhbHNvIGEgY2hpbGQuXHJcbiAgICAgICAgdGhpcy5ncmlkLmRhdGFTb3VyY2UuZGIuZGF0YVNuYXBzaG90W2luZGV4XS5zaG93TWVudSA9IGZhbHNlOyAvLyBGaW5kIHJvdyBvYmplY3QgaW4gZGF0YWJhc2Ugc25hcHNob3QsIGFuZCBtYXJrIGl0IGNsb3NlZC5cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXRUYWJsZU1vZHVsZSwgTWF0U29ydE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gIE1hdE1lbnVNb2R1bGUsIE1hdFJhZGlvTW9kdWxlLCBNYXREYXRlcGlja2VyTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBHcmlkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZFJvd01lbnVDb21wb25lbnQgfSBmcm9tICcuL3Jvdy1tZW51L2dyaWQtcm93LW1lbnUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcblxyXG4gICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICBNYXRTb3J0TW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXHJcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgICBNYXRSYWRpb01vZHVsZSxcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEdyaWRDb21wb25lbnQsXHJcbiAgICBDb2x1bW5EaXJlY3RpdmUsXHJcbiAgICBHcmlkVG9vbGJhckNvbXBvbmVudCxcclxuICAgIEdyaWRSb3dNZW51Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBHcmlkQ29tcG9uZW50LFxyXG4gICAgQ29sdW1uRGlyZWN0aXZlLFxyXG4gICAgR3JpZFRvb2xiYXJDb21wb25lbnQsXHJcbiAgICBHcmlkUm93TWVudUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBEYXRlUGlwZSxcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZE1vZHVsZSB7IH1cclxuIiwiZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQgPSAzMDAsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XHJcbiAgbGV0IHRpbWVvdXQ7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xyXG4gICAgY29uc3QgbGF0ZXIgPSAoKSA9PiB7XHJcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICBpZiAoIWltbWVkaWF0ZSkgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcclxuICAgIGlmIChjYWxsTm93KSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7IH1cclxuICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnLi4vdXRpbHMvZGVib3VuY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XHJcbiAgW2V2ZW50OiBzdHJpbmddOiB7XHJcbiAgICBhY3RpdmU6IHN0cmluZyxcclxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXHJcbiAgICBmaWx0ZXI/OiBhbnlcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlciB7XHJcbiAgW2NvbDogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XHJcbiAgW2NvbDogc3RyaW5nXTogJ2FzYycgfCAnZGVzYycgfCAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIG9iamVjdCB0aGUgTWF0IFRhYmxlIGFjdHVhbGx5IHVzZXMuXHJcbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xyXG4gKiBsaXZpbmcgZGF0YSBmcm9tIHRoaXMgb2JqZWN0IHRvIHRoZSBncmlkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRiOiBJbnN0YW50RGF0YWJhc2U8VD4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgIHJldHVybiB0aGlzLmRiLmRhdGFDaGFuZ2U7XHJcbiAgfVxyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICB0aGlzLmRiLm9uRGVzdHJveSgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIG9iamVjdCByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciB1c2VyIGNoYW5nZXMgaW5cclxuICogdGhlIGdyaWQsIGFuZCBtb2RpZnlpbmcgdGhlIGRhdGEgYWNjb3JkaW5nbHkuXHJcbiAqXHJcbiAqIEltcGxlbWVudG9ycyBzaG91bGQgbGlzdGVuIGZvciBldmVudHMgaW4gdGhlIGBvbkNsaWVudENoYW5nZWBcclxuICogbWV0aG9kIGFuZCBkZWxpdmFyIGRhdGEgdG8gdGhlIGBkYXRhQ2hhbmdlYCBTdWJqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RhbnREYXRhYmFzZTxUPiB7XHJcbiAgc29ydENoYW5nZTogRXZlbnRFbWl0dGVyPFNvcnQ+O1xyXG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcclxuICBwcml2YXRlIF9zb3J0U3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJDYWNoZTogRmlsdGVyID0ge307XHJcbiAgcHJpdmF0ZSBfZmlsdGVyU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8VFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XHJcbiAgZGF0YVNuYXBzaG90O1xyXG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBkYXRhUmVhZGVyID0gZGVib3VuY2UodGhpcy5vblJlYWQsIDEwMCk7XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIHRoaXMub25SZWFkKCk7XHJcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlciA9IHRoaXMuZGF0YUNoYW5nZS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLmRhdGFTbmFwc2hvdCA9IGRhdGEpO1xyXG4gIH1cclxuICBvbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgb25SZWFkKHNvcnQ/OiBTb3J0ZXIsIGZpbHRlcj86IEZpbHRlcikge31cclxuXHJcbiAgX2NvbmZpZ3VyZShhcmdzOiBQYXJ0aWFsPEluc3RhbnREYXRhYmFzZTxUPj4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XHJcblxyXG4gICAgLy8gT24gYW55IGNoYW5nZXMsIHJlYWQgZGF0YVxyXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIgPSB0aGlzLnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xyXG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcclxuICAgICAgdGhpcy5zb3J0Q2FjaGVbc29ydC5hY3RpdmVdID0gc29ydC5kaXJlY3Rpb247XHJcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIgPSB0aGlzLmZpbHRlckNoYW5nZS5zdWJzY3JpYmUoZmlsdGVyID0+IHtcclxuICAgICAgdGhpcy5maWx0ZXJDYWNoZVtmaWx0ZXIuYWN0aXZlXSA9IGZpbHRlci5maWx0ZXI7XHJcbiAgICAgIHRoaXMuZGF0YVJlYWRlcih0aGlzLnNvcnRDYWNoZSwgdGhpcy5maWx0ZXJDYWNoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBdHRhY2hlZCB0byBhIGdyaWQuIFJ1biBpbml0XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHsgdGhpcy5vbkluaXQoKTsgfVxyXG4gIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQsIFBhcmFtcywgQWN0aXZhdGVkUm91dGUsIFBSSU1BUllfT1VUTEVUIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJyZWFkY3J1bWIge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgcGFyYW1zOiBQYXJhbXM7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1icmVhZGNydW1iJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICByb3V0ZU1hcDogSUJyZWFkY3J1bWJbXTtcclxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZShuYXYgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygndXJsIGNoYW5nZWQnKTtcclxuICAgICAgY29uc3Qgcm9vdDogQWN0aXZhdGVkUm91dGUgPSB0aGlzLnJvdXRlLnJvb3Q7XHJcbiAgICAgIHRoaXMucm91dGVNYXAgPSB0aGlzLmdldEJyZWFkY3J1bWJzKHJvb3QpO1xyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhcnJheSBvZiBJQnJlYWRjcnVtYiBvYmplY3RzIHRoYXQgcmVwcmVzZW50IHRoZSBicmVhZGNydW1iXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm91dGVcclxuICAgKiBAcGFyYW0gdXJsXHJcbiAgICogQHBhcmFtIGJyZWFkY3J1bWJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRCcmVhZGNydW1icyhyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHVybDogc3RyaW5nPSAnJywgYnJlYWRjcnVtYnM6IElCcmVhZGNydW1iW109IFtdKTogSUJyZWFkY3J1bWJbXSB7XHJcbiAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUIgPSAnYnJlYWRjcnVtYic7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjaGlsZCByb3V0ZXNcclxuICAgIGNvbnN0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XHJcblxyXG4gICAgLy8gcmV0dXJuIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNoaWxkcmVuXHJcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBicmVhZGNydW1icztcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBjaGlsZHJlblxyXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xyXG4gICAgICAvLyB2ZXJpZnkgcHJpbWFyeSByb3V0ZVxyXG4gICAgICBpZiAoY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2ZXJpZnkgdGhlIGN1c3RvbSBkYXRhIHByb3BlcnR5IFwiYnJlYWRjcnVtYlwiIGlzIHNwZWNpZmllZCBvbiB0aGUgcm91dGVcclxuICAgICAgaWYgKCFjaGlsZC5zbmFwc2hvdC5kYXRhLmhhc093blByb3BlcnR5KFJPVVRFX0RBVEFfQlJFQURDUlVNQikpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGdldCB0aGUgcm91dGUncyBVUkwgc2VnbWVudFxyXG4gICAgICBjb25zdCByb3V0ZVVSTCA9IGNoaWxkLnNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcclxuXHJcbiAgICAgIC8vIGFwcGVuZCByb3V0ZSBVUkwgdG8gVVJMXHJcbiAgICAgIHVybCArPSBgLyR7cm91dGVVUkx9YDtcclxuXHJcbiAgICAgIC8vIGFkZCBicmVhZGNydW1iXHJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWI6IElCcmVhZGNydW1iID0ge1xyXG4gICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXHJcbiAgICAgICAgcGFyYW1zOiBjaGlsZC5zbmFwc2hvdC5wYXJhbXMsXHJcbiAgICAgICAgdXJsOiB1cmxcclxuICAgICAgfTtcclxuICAgICAgYnJlYWRjcnVtYnMucHVzaChicmVhZGNydW1iKTtcclxuXHJcbiAgICAgIC8vIHJlY3Vyc2l2ZVxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRCcmVhZGNydW1icyhjaGlsZCwgdXJsLCBicmVhZGNydW1icyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VydmljZSB7XHJcblxyXG4gIGFjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWZvcm0tYWN0aW9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zQ29tcG9uZW50IHtcclxuXHJcbiAgZ2V0IGFjdGlvbnNSZWYoKTogVGVtcGxhdGVSZWY8YW55PiB7IHJldHVybiB0aGlzLnRvb2xiYXJTZXJ2aWNlLmFjdGlvblRlbXBsYXRlOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9vbGJhclNlcnZpY2U6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaW5zdGFudEZvcm1BY3Rpb25zRGVmXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSB0b29sYmFyOiBUb29sYmFyU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy50b29sYmFyLmFjdGlvblRlbXBsYXRlID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVG9vbGJhclNlcnZpY2UgfSBmcm9tICcuL3Rvb2xiYXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQnJlYWRjcnVtYkNvbXBvbmVudCwgRm9ybUFjdGlvbnNDb21wb25lbnQsIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbQnJlYWRjcnVtYkNvbXBvbmVudCwgRm9ybUFjdGlvbnNDb21wb25lbnQsIEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlXSxcclxuICBwcm92aWRlcnM6IFtUb29sYmFyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xiYXJNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIlJlcGxheVN1YmplY3QiLCJEaXJlY3RpdmUiLCJEYXRlUGlwZSIsIklucHV0IiwiQ29udGVudENoaWxkIiwiRXZlbnRFbWl0dGVyIiwibWVyZ2UiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiQ29udGVudENoaWxkcmVuIiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiTWF0U29ydCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJNYXRUYWJsZU1vZHVsZSIsIk1hdFNvcnRNb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0VG9vbGJhck1vZHVsZSIsIk1hdFBhZ2luYXRvck1vZHVsZSIsIk1hdFJhZGlvTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiLCJEYXRhU291cmNlIiwiQmVoYXZpb3JTdWJqZWN0Iiwicm91dGVyIiwiZmlsdGVyIiwiTmF2aWdhdGlvbkVuZCIsInRzbGliXzEuX192YWx1ZXMiLCJQUklNQVJZX09VVExFVCIsIkFjdGl2YXRlZFJvdXRlIiwiUm91dGVyIiwiSW5qZWN0YWJsZSIsIlRlbXBsYXRlUmVmIiwiUm91dGVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsYUFBZ0IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsU0FBUyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FB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