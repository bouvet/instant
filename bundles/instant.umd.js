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
            _this.days = null;
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
                        this.operators = this.operators ? this.operators : ['CONTAINS', 'STARTS_WITH', 'ENDS_WITH', 'EQUALS', 'NOT_EQUALS', 'MATCH_WORDS', 'IS_NULL', 'IS_NOT_NULL'];
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
         * @param {?} days
         * @return {?}
         */
        ColumnDirective.prototype.setDays = /**
         * @param {?} days
         * @return {?}
         */
            function (days) {
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
                filter.days = days;
                this.setFilterValue(filter);
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
                col.setToDate($event ? $event.target.value : null);
            };
        /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
        GridComponent.prototype.onDaysChange = /**
         * @param {?} $event
         * @param {?} col
         * @return {?}
         */
            function ($event, col) {
                col.setDays($event ? $event.target.value : null);
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
         * @param {?} value
         * @return {?}
         */
        GridComponent.prototype.toNumber = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value == null) {
                    return null;
                }
                /** @type {?} */
                var type = typeof (value);
                switch (type) {
                    case 'string':
                        /** @type {?} */
                        var stringValue = value.replace(',', '.');
                        if (!stringValue || Number.isNaN(+stringValue)) {
                            return null;
                        }
                        /** @type {?} */
                        var n = +stringValue;
                        return n;
                    case 'number':
                        return value;
                    case 'boolean':
                        return (value === true) ? 1 : 0;
                    default:
                        return null;
                }
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
        GridComponent.prototype.getDays = /**
         * @param {?} col
         * @return {?}
         */
            function (col) {
                if (col.filterValue) {
                    if (typeof col.filterValue === 'object') {
                        /** @type {?} */
                        var days = this.toNumber(col.filterValue.days);
                        return days;
                    }
                    return this.toNumber(col.filterValue);
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
                        template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\r\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\r\n    <!-- Header definition -->\r\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\r\n      <header>\r\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\r\n          <mat-menu #appMenu=\"matMenu\">\r\n            <ng-container *ngIf=\"col.filterRef && (!col.templateName || col.templateName === 'defaultFilterTemplate')\">\r\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'defaultFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"defaultFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'dateFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"dateFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.filterRef && col.templateName === 'multiChoiceFilterTemplate'\">\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <ng-container style=\"overflow-y: scroll; display: inline-grid; max-width: 250px; max-height: 350px;\" *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n\r\n            <ng-template #defaultFilterTemplate>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput #filter id=\"defaultFilterInput\" placeholder=\"Filter\" [type]=\"['Long', 'Integer', 'BigDecimal'].includes(col.dataType) ? 'number' : 'text'\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"col.removeFilter()\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\" tabindex=\"2\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n            <ng-template #dateFilterTemplate>\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"fromControlDatePicker\" id=\"dateFilterInput\" placeholder=\"From\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" [value]=\"getFromDate(col)\" (dateChange)=\"onFromDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"fromControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #fromControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onFromDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"toControlDatePicker\" placeholder=\"To\"  tabindex=\"2\" (click)=\"$event.stopPropagation()\" [value]=\"getToDate(col)\" (dateChange)=\"onToDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"toControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #toControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onToDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput type=\"number\" placeholder=\"Days\" tabindex=\"3\" (click)=\"$event.stopPropagation()\" [value]=\"getDays(col)\" (change)=\"onDaysChange($event, col)\">\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n          </mat-menu>\r\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\" (menuOpened)=\"menuOpened(col)\">\r\n            <ng-container *ngIf=\"col.isFilterSet == false\">\r\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>No filter set</title>\r\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\r\n                />\r\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.isFilterSet == true\">\r\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>Filter set</title>\r\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n          </button>\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\r\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\r\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\r\n                    <span class=\"fa fa-refresh\"></span>\r\n                    <span>Refresh</span>\r\n                </button>\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\r\n                    <span class=\"fa fa-filter\"></span>\r\n                     <span>Clear filter</span>\r\n                </button>\r\n            </mat-menu>\r\n        </div>\r\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\r\n          {{ col.label }}\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\r\n          {{ col.label }}\r\n        </div>\r\n      </header>\r\n    </th>\r\n\r\n    <!-- Cell definition -->\r\n    <td mat-cell *matCellDef=\"let element\">\r\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\r\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\r\n      </ng-container>\r\n\r\n      <ng-template #defaultCellTemplate>\r\n        {{ element[col.name] }}\r\n      </ng-template>\r\n    </td>\r\n  </ng-container>\r\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\r\n           [ngClass]=\"getRowClasses(index)\"\r\n           [ngStyle]=\"getRowStyles(index)\"\r\n           [attr.data-rowIndex]=\"index\"\r\n           (click)=\"onRowClicked(row, $event)\"></tr>\r\n</table>\r\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2ZpbHRlci1vcHRpb24vYWJzdHJhY3QtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9maWx0ZXItb3B0aW9uL2RlZmF1bHQtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9maWx0ZXItb3B0aW9uL2RhdGUtZmlsdGVyLW9wdGlvbi50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9jb2x1bW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL2dyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi9ncmlkL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLm1vZHVsZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIuc2VydmljZS50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvdG9vbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQWJzdHJhY3RGaWx0ZXJPcHRpb24ge1xyXG4gIGF0dHJpYnV0ZTogc3RyaW5nID0gbnVsbDtcclxuICBsb29rdXBFbnRpdHk6IHN0cmluZyA9IG51bGw7XHJcbiAgbG9va3VwQXR0cmlidXRlOiBzdHJpbmcgPSBudWxsO1xyXG4gIGRhdGFUeXBlOiBzdHJpbmcgPSBudWxsO1xyXG4gIG9wZXJhdG9yOiBzdHJpbmcgPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7QWJzdHJhY3RGaWx0ZXJPcHRpb259IGZyb20gJy4vYWJzdHJhY3QtZmlsdGVyLW9wdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZpbHRlck9wdGlvbiBleHRlbmRzIEFic3RyYWN0RmlsdGVyT3B0aW9uIHtcclxuICBrZXk6IGFueSA9IG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHtBYnN0cmFjdEZpbHRlck9wdGlvbn0gZnJvbSAnLi9hYnN0cmFjdC1maWx0ZXItb3B0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmlsdGVyT3B0aW9uIGV4dGVuZHMgQWJzdHJhY3RGaWx0ZXJPcHRpb24ge1xyXG4gIGZyb21EYXRlOiBEYXRlID0gbnVsbDtcclxuICB0b0RhdGU6IERhdGUgPSBudWxsO1xyXG4gIGRheXM6IG51bWJlciA9IG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RGVmYXVsdEZpbHRlck9wdGlvbn0gZnJvbSAnLi9maWx0ZXItb3B0aW9uL2RlZmF1bHQtZmlsdGVyLW9wdGlvbic7XHJcbmltcG9ydCB7RGF0ZUZpbHRlck9wdGlvbn0gZnJvbSAnLi9maWx0ZXItb3B0aW9uL2RhdGUtZmlsdGVyLW9wdGlvbic7XHJcbmltcG9ydCB7REVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9zcmMvY29tcGlsZXJfZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xyXG4gIGFjdGl2ZTogc3RyaW5nO1xyXG4gIGZpbHRlcjogYW55O1xyXG59XHJcblxyXG4vKipcclxuICogQ29sdW1uIGRlZmluaXRpb24gZm9yIHRoZSBpbnN0YW50LWdyaWQuXHJcbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYW5kIG9wdGlvbmFsIGZpbHRlcnMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cclxuICpcclxuICogMjIuMDYuMjAxOSBvZnNmcnZvciAtIEFkZGVkIHN1cHBvcnQgZm9yIGRpZmZlcmVudCBmaWx0ZXIgb3BlcmF0b3JzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgQWRkZWQgb3RoZXIgaW5wdXQgbWVtYmVycyAoYXR0cmlidXRlLCBsb29rQXR0cmlidXRlLCBsb29rdXBFbnRpdHksIGRhdGFUeXBlLCBvcGVyYXRvcilcclxuICogICAgICAgICAgICAgICAgICAgICAgIGVuYWJsaW5nIGNvbnRyb2wgb2YgdGhlIGZpbHRlciBmcm9tIHRoZSBIVE1MIHRhZy5cclxuICogMjMuMDYuMjAxOSBvZnNmcnZvciAtIEFkZGVkIGRhdGVGaWx0ZXJUZW1wbGF0ZS4gQWN0aXZhdGUgZGF0ZUZpbHRlclRlbXBsYXRlIGJ5IHNldHRpbmcgaW5wdXQgbWVtYmVyIHRlbXBsYXRlTmFtZS5cclxuICogMjQuMDYuMjAxOSBvZnNmcnZvciAtIElmIGRhdGFUeXBlIGlzIExvbmcsIEludGVnZXIgb3IgQmlnRGVjaW1hbCwgc2V0IGlucHV0IGZpZWxkIHR5cGUgdG8gbnVtYmVyLiBTZXQgZGVmYXVsdCBkYXRhVHlwZSB0byBTdHJpbmcuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBVc2luZyBtb21lbnQgdG8gY29udmVydCBkYXRlU3RyaW5nIHRvIGRhdGUgb2JqZWN0LlxyXG4gKlxyXG4gKiBUT0RPIEF1dG9tYXRpY2FsbHkgZm9yY2UgY3Vyc29yIHRvIGlucHV0IGZpZWxkIHdoZW4gdGVtcGxhdGUgaXMgb3BlbmVkXHJcbiAqIFRPRE8gTmVlZCB0byBpbXBsZW1lbnQgbGFuZ3VhZ2UgdHJhbnNsYXRpb24gZm9yIHRoZSBvcGVyYXRvciBsYWJlbHMuXHJcbiAqIFRPRE8gTGlzdCBmaWx0ZXIgb3B0aW9ucyBhcmUgbm90IHVuY2hlY2tlZCB3aGVuIGxpc3QgdHlwZSBmaWx0ZXIgaXMgcmVtb3ZlZFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1jb2x1bW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGVmYXVsdEZpbHRlclRlbXBsYXRlJztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERBVEVfRklMVEVSX1RFTVBMQVRFOiBzdHJpbmcgPSAnZGF0ZUZpbHRlclRlbXBsYXRlJztcclxuXHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgdGVtcGxhdGVOYW1lOiBzdHJpbmcgPSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU7XHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nOyAgLy8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoaXMgY29sdW1uLlxyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7IC8vIERlZmF1bHRzIHRvIHRoZSBpZGVudGlmaWVyIG9mIGNvbHVtblxyXG4gIEBJbnB1dCgpIGZpbHRlcmFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNvcnRhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzdGlja3kgPSBmYWxzZTtcclxuICBASW5wdXQoJ2luc3RhbnQtc3R5bGUnKSBpbnN0YW50U3R5bGUgPSB7fTtcclxuICBASW5wdXQoKSBvcGVyYXRvcnM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEF0dHJpYnV0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxvb2t1cEVudGl0eTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnU3RyaW5nJztcclxuICBASW5wdXQoKSBvcGVyYXRvcjogc3RyaW5nO1xyXG5cclxuICAvLyBUZW1wbGF0ZSByZWZzXHJcbiAgQENvbnRlbnRDaGlsZCgnZmlsdGVyJykgZmlsdGVyUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGQoJ2NlbGwnKSBjZWxsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvLyBGaWx0ZXIgcHJvcGVydGllc1xyXG4gIGZpbHRlck9wZW46IGJvb2xlYW47XHJcbiAgaXNGaWx0ZXJTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBmaWx0ZXIgPSBuZXcgUmVwbGF5U3ViamVjdDxDb2x1bW5GaWx0ZXI+KCk7XHJcbiAgZmlsdGVyVmFsdWU6IGFueTtcclxuICBvbGRGaWx0ZXI6IGFueTtcclxuICBpbml0aWFsT3BlcmF0b3I6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMubGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMudGVtcGxhdGVOYW1lID0gQ29sdW1uRGlyZWN0aXZlLkRFRkFVTFRfRklMVEVSX1RFTVBMQVRFO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IG9wZXJhdG9yIGxpc3QgKGlmIG5vdCBhbHJlYWR5IHNldClcclxuICAgIHN3aXRjaCAodGhpcy50ZW1wbGF0ZU5hbWUpIHtcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9wZXJhdG9ycyA/IHRoaXMub3BlcmF0b3JzIDogWydDT05UQUlOUycsICdTVEFSVFNfV0lUSCcsICdFTkRTX1dJVEgnLCAnRVFVQUxTJywgJ05PVF9FUVVBTFMnLCAnTUFUQ0hfV09SRFMnLCAnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRBVEVfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5vcGVyYXRvcnMgPyB0aGlzLm9wZXJhdG9ycyA6IFsnSVNfTlVMTCcsICdJU19OT1RfTlVMTCddO1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yID8gdGhpcy5vcGVyYXRvciA6ICdFUVVBTFMnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxPcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGRpcmVjdGx5IGZyb20gdGhlIGZpbHRlciB0ZW1wbGF0ZS5cclxuICAgKiBBbnkgY3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgY29sdW1uIGZpbHRlciwgbXVzdCBmaXJlIHRoaXNcclxuICAgKiBtZXRob2Qgd2hlbiB1c2VyIGhhcyBtYWRlIGNob2ljZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZmlsdGVyIFRoZSBmaWx0ZXIgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgc2V0RmlsdGVyKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKGZpbHRlcikge1xyXG4gICAgICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIGlzIG9iamVjdCA9PiBvdmVycmlkZSBmaWx0ZXIgYXR0cmlidXRlc1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdhdHRyaWJ1dGUnKSAmJiBmaWx0ZXIuYXR0cmlidXRlICYmIGZpbHRlci5hdHRyaWJ1dGUgIT09IHRoaXMuYXR0cmlidXRlID8gZmlsdGVyLmF0dHJpYnV0ZSA6IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwQXR0cmlidXRlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBBdHRyaWJ1dGUnKSAmJiBmaWx0ZXIubG9va3VwQXR0cmlidXRlICYmIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgIT09IHRoaXMubG9va3VwQXR0cmlidXRlID8gZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA6IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgICAgIHRoaXMubG9va3VwRW50aXR5ID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdsb29rdXBFbnRpdHknKSAmJiBmaWx0ZXIubG9va3VwRW50aXR5ICYmIGZpbHRlci5sb29rdXBFbnRpdHkgIT09IHRoaXMubG9va3VwRW50aXR5ID8gZmlsdGVyLmxvb2t1cEVudGl0eSA6IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykgJiYgZmlsdGVyLm9wZXJhdG9yICYmIGZpbHRlci5vcGVyYXRvciAhPT0gdGhpcy5vcGVyYXRvciA/IGZpbHRlci5vcGVyYXRvciA6IHRoaXMub3BlcmF0b3I7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnZGF0YVR5cGUnKSAmJiBmaWx0ZXIuZGF0YVR5cGUgJiYgZmlsdGVyLmRhdGFUeXBlICE9PSB0aGlzLmRhdGFUeXBlID8gZmlsdGVyLmRhdGFUeXBlIDogdGhpcy5kYXRhVHlwZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGaWx0ZXIgaXMgcHJpbWl0aXZlID0+IGNvbnZlcnQgdG8gZGVmYXVsdCBmaWx0ZXIgb3B0aW9uXHJcbiAgICAgICAgZmlsdGVyID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIoZmlsdGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyLCBub0VtaXQpO1xyXG5cclxuICAgIC8vIEhhdmUgdG8gZG8gYSBudWxsIGNoZWNrIG9uIGZpbHRlciBpZiB0aGUgZmlsdGVyIGlzIHRvIGJlIGVtaXR0ZWRcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSBub0VtaXQgPT09IHRydWUgPyBmaWx0ZXIgIT09IG51bGwgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlcjogRGVmYXVsdEZpbHRlck9wdGlvbiA9IG5ldyBEZWZhdWx0RmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmtleSA9IGtleTtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcblxyXG4gIHNldEZpbHRlclZhbHVlKGZpbHRlcjogYW55LCBub0VtaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKChmaWx0ZXIgIT09IHRoaXMub2xkRmlsdGVyKSB8fCAoZmlsdGVyID09PSBudWxsKSkge1xyXG4gICAgICAvLyBDbG9uZSBjdXJyZW50IGZpbHRlciB0byBvbGQgZmlsdGVyXHJcbiAgICAgIHRoaXMub2xkRmlsdGVyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWx0ZXJWYWx1ZSk7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBmaWx0ZXI7XHJcbiAgICAgIGlmICghbm9FbWl0KSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIubmV4dCh7YWN0aXZlOiB0aGlzLm5hbWUsIGZpbHRlcjogZmlsdGVyfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbHRlck9wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldERheXMoZGF5czogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wbGF0ZU5hbWUgIT09ICdkYXRlRmlsdGVyVGVtcGxhdGUnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmZpbHRlclZhbHVlIDogbmV3IERhdGVGaWx0ZXJPcHRpb24oKTtcclxuICAgIGZpbHRlci5hdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgPSB0aGlzLmxvb2t1cEF0dHJpYnV0ZTtcclxuICAgIGZpbHRlci5sb29rdXBFbnRpdHkgPSB0aGlzLmxvb2t1cEVudGl0eTtcclxuICAgIGZpbHRlci5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XHJcbiAgICBmaWx0ZXIuZGF0YVR5cGUgPSB0aGlzLmRhdGFUeXBlO1xyXG4gICAgZmlsdGVyLmRheXMgPSBkYXlzO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0RnJvbURhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci5mcm9tRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBzZXRUb0RhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci50b0RhdGUgPSB0aGlzLnRvRGJEYXRlU3RyaW5nKGRhdGUpO1xyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZShmaWx0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b0RiRGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGlmIChkYXRlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZC1NTS15eXl5Jyk7XHJcbiAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICB9XHJcblxyXG5cclxuICBzZXRPcGVyYXRvcihvcGVyYXRvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSAmJiAodHlwZW9mKHRoaXMuZmlsdGVyVmFsdWUpID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHRoaXMuY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKG51bGwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRGaWx0ZXJWYWx1ZSh0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsdGVyKCkge1xyXG4gICAgLy8gRGVmYXVsdCBvcGVyYXRvciBiYWNrIHRvIENPTlRBSU5TXHJcbiAgICB0aGlzLm9wZXJhdG9yID0gdGhpcy5pbml0aWFsT3BlcmF0b3IgPyB0aGlzLmluaXRpYWxPcGVyYXRvciA6ICdDT05UQUlOUyc7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKG51bGwpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCAnZWxlbWVudC1jbG9zZXN0JztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFZpZXdDaGlsZCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TWF0U29ydCwgTWF0TWVudVRyaWdnZXIsIE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5zdGFudERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3dDbGlja0V2ZW50IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgY29sTmFtZTogc3RyaW5nO1xyXG59XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBkYXRhU291cmNlOiBJbnN0YW50RGF0YVNvdXJjZTxhbnk+O1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSBzdGlja3k6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm93QXR0cmlidXRlczogQXJyYXk8YW55PjtcclxuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkRpcmVjdGl2ZSkgY29sdW1uczogQ29sdW1uRGlyZWN0aXZlW107XHJcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0NsaWNrRXZlbnQ+KCk7XHJcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xyXG5cclxuICBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW107XHJcbiAgQElucHV0KClcclxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyh2KSB7XHJcbiAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID0gdjtcclxuICB9XHJcbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zID1cclxuICAgICAgdGhpcy5fZGlzcGxheWVkQ29sdW1ucyB8fFxyXG4gICAgICAodGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMubmFtZSkgOiBudWxsKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kYXRhU291cmNlLmRiLl9jb25maWd1cmUoe1xyXG4gICAgICAgIHNvcnRDaGFuZ2U6IHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxyXG4gICAgICAgIGZpbHRlckNoYW5nZTogbWVyZ2UoLi4udGhpcy5jb2x1bW5zLm1hcChjID0+IGMuZmlsdGVyKSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMgJiYgdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKGYgPT4gZi51bnN1YnNjcmliZSgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUm93Q2xpY2tlZChyb3csICRldmVudCkge1xyXG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xvc2VzdCgnaW5zdGFudC1ncmlkLXJvdy1tZW51JykgPT09IG51bGwpIHtcclxuICAgICAgY29uc3QgY2VsbE5hbWUgPSBbXS5zbGljZVxyXG4gICAgICAgIC5jYWxsKCRldmVudC50YXJnZXQuY2xvc2VzdCgndGQnKS5jbGFzc0xpc3QpXHJcbiAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcclxuICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKTtcclxuXHJcbiAgICAgIHRoaXMucm93Q2xpY2tlZC5lbWl0KHsgZGF0YTogcm93LCBjb2xOYW1lOiBjZWxsTmFtZSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrKCRldmVudCkge1xyXG4gICAgY29uc3QgaGVhZGVyc1RvQ2xvc2U6IHN0cmluZ1tdID0gW10uc2xpY2VcclxuICAgICAgLy8gRmluZCBhbGwgaGVhZGVyIGNlbGxzXHJcbiAgICAgIC5jYWxsKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0aCcpKVxyXG4gICAgICAvLyBGaWx0ZXIgYXdheSBjdXJyZW50IHRhcmdldFxyXG4gICAgICAuZmlsdGVyKGIgPT4gIWIuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpXHJcbiAgICAgIC8vIEdldCB0aGUgbmFtZSBvZiB0aGUgY29sdW1uXHJcbiAgICAgIC5tYXAoYiA9PlxyXG4gICAgICAgIFtdLnNsaWNlXHJcbiAgICAgICAgICAuY2FsbChiLmNsYXNzTGlzdClcclxuICAgICAgICAgIC5maW5kKGMgPT4gYy5pbmRleE9mKCdtYXQtY29sdW1uLScpID4gLTEpXHJcbiAgICAgICAgICAuc3Vic3RyKCdtYXQtY29sdW1uLScubGVuZ3RoKVxyXG4gICAgICApO1xyXG5cclxuICAgIC8vIElmIGFueSBjb2x1bW5zIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiBjbG9zZSBpdC5cclxuICAgIHRoaXMuY29sdW1uc1xyXG4gICAgICAuZmlsdGVyKGMgPT4gaGVhZGVyc1RvQ2xvc2UuaW5jbHVkZXMoYy5uYW1lKSlcclxuICAgICAgLmZvckVhY2goYyA9PiAoYy5maWx0ZXJPcGVuID0gZmFsc2UpKTtcclxuICB9XHJcblxyXG4gIG1lbnVPcGVuZWQoY29sOiBDb2x1bW5EaXJlY3RpdmUpIHtcclxuICAgIGlmICghY29sKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZmlsdGVySW5wdXQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2ggKGNvbC50ZW1wbGF0ZU5hbWUpIHtcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgZmlsdGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVmYXVsdEZpbHRlcklucHV0Jyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ29sdW1uRGlyZWN0aXZlLkRBVEVfRklMVEVSX1RFTVBMQVRFOlxyXG4gICAgICAgIGZpbHRlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVGaWx0ZXJJbnB1dCcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZmlsdGVySW5wdXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBmaWx0ZXJJbnB1dC5mb2N1cygpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQ2xvc2UoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXIpIHtcclxuICAgIGlmICgkZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIG1lbnVUcmlnZ2VyLmNsb3NlTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25GaWx0ZXJDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcclxuICAgIGNvbC5zZXRGaWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbk9wZXJhdG9yQ2hhbmdlKG9wZXJhdG9yOiBzdHJpbmcsIGNvbCkge1xyXG4gICAgY29sLnNldE9wZXJhdG9yKG9wZXJhdG9yKTtcclxuICB9XHJcblxyXG4gIG9uRnJvbURhdGVDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcclxuICAgIGNvbC5zZXRGcm9tRGF0ZSgkZXZlbnQgPyAkZXZlbnQudGFyZ2V0LnZhbHVlIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBvblRvRGF0ZUNoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29sLnNldFRvRGF0ZSgkZXZlbnQgPyAkZXZlbnQudGFyZ2V0LnZhbHVlIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBvbkRheXNDaGFuZ2UoJGV2ZW50LCBjb2wpIHtcclxuICAgIGNvbC5zZXREYXlzKCRldmVudCA/ICRldmVudC50YXJnZXQudmFsdWUgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlclZhbHVlKGNvbCkge1xyXG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gY29sLmZpbHRlclZhbHVlLmtleTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29sLmZpbHRlclZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgdG9EYXRlKGRhdGVPYmplY3Q6IGFueSk6IERhdGUge1xyXG4gICAgaWYgKGRhdGVPYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGRhdGVPYmplY3QgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBtb21lbnQoZGF0ZU9iamVjdCwgJ0RELU1NLVlZWVknKS50b0RhdGUoKTtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGVPYmplY3QpIHtcclxuICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGRhdGVPYmplY3QpO1xyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHRvTnVtYmVyKHZhbHVlOiBhbnkpOiBudW1iZXIge1xyXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHlwZTogc3RyaW5nID0gdHlwZW9mKHZhbHVlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgIGlmICghc3RyaW5nVmFsdWUgfHwgTnVtYmVyLmlzTmFOKCtzdHJpbmdWYWx1ZSkpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuOiBudW1iZXIgPSArc3RyaW5nVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB0cnVlKSA/IDEgOiAwO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RnJvbURhdGUoY29sKTogRGF0ZSB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLnRvRGF0ZShjb2wuZmlsdGVyVmFsdWUuZnJvbURhdGUpO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZShjb2wuZmlsdGVyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRUb0RhdGUoY29sKTogRGF0ZSB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLnRvRGF0ZShjb2wuZmlsdGVyVmFsdWUudG9EYXRlKTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IERhdGUoY29sLmZpbHRlclZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5cyhjb2wpOiBudW1iZXIge1xyXG4gICAgaWYgKGNvbC5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvbC5maWx0ZXJWYWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBkYXlzOiBudW1iZXIgPSB0aGlzLnRvTnVtYmVyKGNvbC5maWx0ZXJWYWx1ZS5kYXlzKTtcclxuICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy50b051bWJlcihjb2wuZmlsdGVyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRPcGVyYXRvcihjb2wpIHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnN0YW50IGdyaWQgY29tcG9uZW50IC0gZ2V0T3BlcmF0b3IgJyArIGNvbC5uYW1lKTtcclxuICAgIGlmICghY29sIHx8ICFjb2wuaGFzT3duUHJvcGVydHkoJ29wZXJhdG9yJykpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29sLm9wZXJhdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0Um93Q2xhc3NlcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICBjbGFzc2VzLnB1c2goJ2hpZ2hsaWdodCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJvd0F0dHJpYnV0ZXMgJiYgdGhpcy5yb3dBdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgYXR0ciA9IHRoaXMucm93QXR0cmlidXRlcztcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGF0dHJbaV1bJ2luZGV4J10gPT09IGluZGV4KSB7XHJcbiAgICAgICAgICBpZiAoYXR0cltpXVsnY2xhc3MnXSAmJiBhdHRyW2ldWydjbGFzcyddLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGF0dHJbaV1bJ2NsYXNzJ10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Um93U3R5bGVzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBzdHlsZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgIGlmIChhdHRyW2ldWydzdHlsZSddICYmIGF0dHJbaV1bJ3N0eWxlJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMuY29uY2F0KGF0dHJbaV1bJ3N0eWxlJ10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlcy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWx0ZXIoY29sKSB7XHJcbiAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWx0ZXJzKCkge1xyXG4gICAgY29uc29sZS5sb2coJ2luc3RhbnQgZ3JpZCBjb21wb25lbnQgLSByZW1vdmVGaWx0ZXJzJyk7XHJcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICBjb2wucmVtb3ZlRmlsdGVyKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnN0YW50IGdyaWQgY29tcG9uZW50IC0gcmVsb2FkJyk7XHJcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sLGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXRvb2xiYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcGFnZSA9IDA7XHJcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2VFdmVudD4oKTtcclxuICBASW5wdXQoKSB0b3RhbCA9IDA7XHJcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcclxuICBASW5wdXQoKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gWzUsIDEwLCAyNSwgMTAwXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBwYWdlSGFuZGxlcigkZXZlbnQ6IFBhZ2VFdmVudCkge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9ICRldmVudC5wYWdlU2l6ZTtcclxuICAgIHRoaXMucGFnZSA9ICRldmVudC5wYWdlSW5kZXg7XHJcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZ3JpZC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtcm93LW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ncmlkLXJvdy1tZW51LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRSb3dNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSByb3c7XHJcbiAgQElucHV0KCkgaWNvbiA9ICdlbGxpcHNpcy12JztcclxuXHJcbiAgc2hvd01lbnUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkQ29tcG9uZW50KSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgIFtdLnNsaWNlLmNhbGwodGhpcy5ncmlkLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWNlbGwubWF0LWNvbHVtbi1hY3Rpb25zJykpXHJcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XHJcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcclxuICAgICAgLy8gSWYgYW55IHJvdyBhY3Rpb24gKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuLCBjbG9zZSBpdC5cclxuICAgICAgLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gY2VsbC5jbG9zZXN0KCdtYXQtcm93Jyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBbXS5zbGljZS5jYWxsKHJvdy5jbG9zZXN0KCdtYXQtdGFibGUnKS5jaGlsZHJlbikuaW5kZXhPZihyb3cpIC0gMTsgLy8gLSAxIGJlY2F1c2UgaGVhZGVyIGlzIGFsc28gYSBjaGlsZC5cclxuICAgICAgICB0aGlzLmdyaWQuZGF0YVNvdXJjZS5kYi5kYXRhU25hcHNob3RbaW5kZXhdLnNob3dNZW51ID0gZmFsc2U7IC8vIEZpbmQgcm93IG9iamVjdCBpbiBkYXRhYmFzZSBzbmFwc2hvdCwgYW5kIG1hcmsgaXQgY2xvc2VkLlxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSwgTWF0UmFkaW9Nb2R1bGUsIE1hdERhdGVwaWNrZXJNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdyaWRUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdFNvcnRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICAgIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgR3JpZENvbXBvbmVudCxcclxuICAgIENvbHVtbkRpcmVjdGl2ZSxcclxuICAgIEdyaWRUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgR3JpZFJvd01lbnVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEdyaWRDb21wb25lbnQsXHJcbiAgICBDb2x1bW5EaXJlY3RpdmUsXHJcbiAgICBHcmlkVG9vbGJhckNvbXBvbmVudCxcclxuICAgIEdyaWRSb3dNZW51Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIERhdGVQaXBlLFxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkTW9kdWxlIHsgfVxyXG4iLCJleHBvcnQgY29uc3QgZGVib3VuY2UgPSBmdW5jdGlvbiAoZnVuYywgd2FpdCA9IDMwMCwgaW1tZWRpYXRlID0gZmFsc2UpIHtcclxuICBsZXQgdGltZW91dDtcclxuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XHJcbiAgICBjb25zdCBsYXRlciA9ICgpID0+IHtcclxuICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7IH1cclxuICAgIH07XHJcbiAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG4gICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxyXG4gIH07XHJcbn07XHJcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcclxuaW1wb3J0IHsgU29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICcuLi91dGlscy9kZWJvdW5jZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcclxuICBbZXZlbnQ6IHN0cmluZ106IHtcclxuICAgIGFjdGl2ZTogc3RyaW5nLFxyXG4gICAgZGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYycgfCAnJyxcclxuICAgIGZpbHRlcj86IGFueVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcclxuICBbY29sOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIHtcclxuICBbY29sOiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJyB8ICcnO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cclxuICogSXQgaG9sZHMgYW4gYEluc3RhbnREYXRhYmFzZWAgb2JqZWN0LCBhbmQgZGVsaXZlcmVzXHJcbiAqIGxpdmluZyBkYXRhIGZyb20gdGhpcyBvYmplY3QgdG8gdGhlIGdyaWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5zdGFudERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGI6IEluc3RhbnREYXRhYmFzZTxUPikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgY29ubmVjdCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcclxuICB9XHJcbiAgZGlzY29ubmVjdCgpIHtcclxuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQW4gb2JqZWN0IHJlc3BvbnNpYmxlIGZvciBsaXN0ZW5pbmcgZm9yIHVzZXIgY2hhbmdlcyBpblxyXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cclxuICpcclxuICogSW1wbGVtZW50b3JzIHNob3VsZCBsaXN0ZW4gZm9yIGV2ZW50cyBpbiB0aGUgYG9uQ2xpZW50Q2hhbmdlYFxyXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5zdGFudERhdGFiYXNlPFQ+IHtcclxuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XHJcbiAgcHJpdmF0ZSBzb3J0Q2FjaGU6IFNvcnRlciA9IHt9O1xyXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGZpbHRlckNoYW5nZTogT2JzZXJ2YWJsZTxDb2x1bW5GaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBwcml2YXRlIGZpbHRlckNhY2hlOiBGaWx0ZXIgPSB7fTtcclxuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGRhdGFDaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcclxuICBkYXRhU25hcHNob3Q7XHJcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZVN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGRhdGFSZWFkZXIgPSBkZWJvdW5jZSh0aGlzLm9uUmVhZCwgMTAwKTtcclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgdGhpcy5vblJlYWQoKTtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XHJcbiAgfVxyXG4gIG9uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxyXG5cclxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcclxuXHJcbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XHJcbiAgICAgIHRoaXMuc29ydENhY2hlID0ge307IC8vIFJlc2V0IGFsd2F5cy4gTXVsdGlwbGUgY29sdW1uIHNvcnQgaXMgTk9UIHN1cHBvcnRlZFxyXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcclxuICAgICAgdGhpcy5kYXRhUmVhZGVyKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlckNhY2hlW2ZpbHRlci5hY3RpdmVdID0gZmlsdGVyLmZpbHRlcjtcclxuICAgICAgdGhpcy5kYXRhUmVhZGVyKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEF0dGFjaGVkIHRvIGEgZ3JpZC4gUnVuIGluaXRcclxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XHJcbiAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCwgUGFyYW1zLCBBY3RpdmF0ZWRSb3V0ZSwgUFJJTUFSWV9PVVRMRVQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYiB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwYXJhbXM6IFBhcmFtcztcclxuICB1cmw6IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWJyZWFkY3J1bWInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9icmVhZGNydW1iLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9icmVhZGNydW1iLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHJvdXRlTWFwOiBJQnJlYWRjcnVtYltdO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKG5hdiA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1cmwgY2hhbmdlZCcpO1xyXG4gICAgICBjb25zdCByb290OiBBY3RpdmF0ZWRSb3V0ZSA9IHRoaXMucm91dGUucm9vdDtcclxuICAgICAgdGhpcy5yb3V0ZU1hcCA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocm9vdCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFycmF5IG9mIElCcmVhZGNydW1iIG9iamVjdHMgdGhhdCByZXByZXNlbnQgdGhlIGJyZWFkY3J1bWJcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3V0ZVxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gYnJlYWRjcnVtYnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEJyZWFkY3J1bWJzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXJsOiBzdHJpbmc9ICcnLCBicmVhZGNydW1iczogSUJyZWFkY3J1bWJbXT0gW10pOiBJQnJlYWRjcnVtYltdIHtcclxuICAgIGNvbnN0IFJPVVRFX0RBVEFfQlJFQURDUlVNQiA9ICdicmVhZGNydW1iJztcclxuXHJcbiAgICAvLyBnZXQgdGhlIGNoaWxkIHJvdXRlc1xyXG4gICAgY29uc3QgY2hpbGRyZW46IEFjdGl2YXRlZFJvdXRlW10gPSByb3V0ZS5jaGlsZHJlbjtcclxuXHJcbiAgICAvLyByZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cclxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNoaWxkcmVuXHJcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XHJcbiAgICAgIC8vIHZlcmlmeSBwcmltYXJ5IHJvdXRlXHJcbiAgICAgIGlmIChjaGlsZC5vdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHZlcmlmeSB0aGUgY3VzdG9tIGRhdGEgcHJvcGVydHkgXCJicmVhZGNydW1iXCIgaXMgc3BlY2lmaWVkIG9uIHRoZSByb3V0ZVxyXG4gICAgICBpZiAoIWNoaWxkLnNuYXBzaG90LmRhdGEuaGFzT3duUHJvcGVydHkoUk9VVEVfREFUQV9CUkVBRENSVU1CKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZ2V0IHRoZSByb3V0ZSdzIFVSTCBzZWdtZW50XHJcbiAgICAgIGNvbnN0IHJvdXRlVVJMID0gY2hpbGQuc25hcHNob3QudXJsLm1hcChzZWdtZW50ID0+IHNlZ21lbnQucGF0aCkuam9pbignLycpO1xyXG5cclxuICAgICAgLy8gYXBwZW5kIHJvdXRlIFVSTCB0byBVUkxcclxuICAgICAgdXJsICs9IGAvJHtyb3V0ZVVSTH1gO1xyXG5cclxuICAgICAgLy8gYWRkIGJyZWFkY3J1bWJcclxuICAgICAgY29uc3QgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWIgPSB7XHJcbiAgICAgICAgbGFiZWw6IGNoaWxkLnNuYXBzaG90LmRhdGFbUk9VVEVfREFUQV9CUkVBRENSVU1CXSxcclxuICAgICAgICBwYXJhbXM6IGNoaWxkLnNuYXBzaG90LnBhcmFtcyxcclxuICAgICAgICB1cmw6IHVybFxyXG4gICAgICB9O1xyXG4gICAgICBicmVhZGNydW1icy5wdXNoKGJyZWFkY3J1bWIpO1xyXG5cclxuICAgICAgLy8gcmVjdXJzaXZlXHJcbiAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2xiYXJTZXJ2aWNlIHtcclxuXHJcbiAgYWN0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtZm9ybS1hY3Rpb25zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWFjdGlvbnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNDb21wb25lbnQge1xyXG5cclxuICBnZXQgYWN0aW9uc1JlZigpOiBUZW1wbGF0ZVJlZjxhbnk+IHsgcmV0dXJuIHRoaXMudG9vbGJhclNlcnZpY2UuYWN0aW9uVGVtcGxhdGU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0b29sYmFyU2VydmljZTogVG9vbGJhclNlcnZpY2UpIHsgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4uL3Rvb2xiYXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpbnN0YW50Rm9ybUFjdGlvbnNEZWZdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIHRvb2xiYXI6IFRvb2xiYXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnRvb2xiYXIuYWN0aW9uVGVtcGxhdGUgPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1BY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMvZm9ybS1hY3Rpb25zLWRlZi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUb29sYmFyU2VydmljZSB9IGZyb20gJy4vdG9vbGJhci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtCcmVhZGNydW1iQ29tcG9uZW50LCBGb3JtQWN0aW9uc0NvbXBvbmVudCwgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1Rvb2xiYXJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbGJhck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiUmVwbGF5U3ViamVjdCIsIkRpcmVjdGl2ZSIsIkRhdGVQaXBlIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJFdmVudEVtaXR0ZXIiLCJtZXJnZSIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGRyZW4iLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJNYXRTb3J0IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIk1hdFRhYmxlTW9kdWxlIiwiTWF0U29ydE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwiTWF0UmFkaW9Nb2R1bGUiLCJNYXREYXRlcGlja2VyTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSIsIkRhdGFTb3VyY2UiLCJCZWhhdmlvclN1YmplY3QiLCJyb3V0ZXIiLCJmaWx0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwidHNsaWJfMS5fX3ZhbHVlcyIsIlBSSU1BUllfT1VUTEVUIiwiQWN0aXZhdGVkUm91dGUiLCJSb3V0ZXIiLCJJbmplY3RhYmxlIiwiVGVtcGxhdGVSZWYiLCJSb3V0ZXJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxF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