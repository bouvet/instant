import { __extends, __values, __spread } from 'tslib';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, ReplaySubject, merge } from 'rxjs';
import { Input, Directive, TemplateRef, ContentChild, Component, ContentChildren, ViewChild, HostListener, ElementRef, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA, NgModule, Injectable, defineInjectable } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import 'element-closest';
import { MatSort, MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule, MatRadioModule, MatDatepickerModule } from '@angular/material';
import * as moment_ from 'moment';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var debounce = function (func, wait, immediate) {
    if (wait === void 0) { wait = 300; }
    if (immediate === void 0) { immediate = false; }
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
            _this.dataReader(_this.sortCache, _this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(function (filter$$1) {
            _this.filterCache[filter$$1.active] = filter$$1.filter;
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
var AbstractFilterOption = /** @class */ (function () {
    function AbstractFilterOption() {
        this.attribute = null;
        this.lookupEntity = null;
        this.lookupAttribute = null;
        this.dataType = null;
        this.operator = null;
        this.ignoreCase = null;
        this.upperCase = null;
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
 * 22.02.2022 ofsfrvor - Added boolean input members ignoreCase and upperCase.
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
        this.filter = new ReplaySubject();
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
    function (filter$$1, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if (filter$$1) {
            if (typeof (filter$$1) === 'object') {
                // Filter is object => override filter attributes
                this.attribute = filter$$1.hasOwnProperty('attribute') && filter$$1.attribute && filter$$1.attribute !== this.attribute ? filter$$1.attribute : this.attribute;
                this.lookupAttribute = filter$$1.hasOwnProperty('lookupAttribute') && filter$$1.lookupAttribute && filter$$1.lookupAttribute !== this.lookupAttribute ? filter$$1.lookupAttribute : this.lookupAttribute;
                this.lookupEntity = filter$$1.hasOwnProperty('lookupEntity') && filter$$1.lookupEntity && filter$$1.lookupEntity !== this.lookupEntity ? filter$$1.lookupEntity : this.lookupEntity;
                this.operator = filter$$1.hasOwnProperty('operator') && filter$$1.operator && filter$$1.operator !== this.operator ? filter$$1.operator : this.operator;
                this.dataType = filter$$1.hasOwnProperty('dataType') && filter$$1.dataType && filter$$1.dataType !== this.dataType ? filter$$1.dataType : this.dataType;
                this.ignoreCase = filter$$1.hasOwnProperty('ignoreCase') && filter$$1.ignoreCase && filter$$1.ignoreCase !== this.ignoreCase ? filter$$1.ignoreCase : this.ignoreCase;
                this.upperCase = filter$$1.hasOwnProperty('upperCase') && filter$$1.upperCase && filter$$1.upperCase !== this.upperCase ? filter$$1.upperCase : this.upperCase;
            }
            else {
                // Filter is primitive => convert to default filter option
                filter$$1 = this.convertPrimitiveToFilter(filter$$1);
            }
        }
        this.setFilterValue(filter$$1, noEmit);
        // Have to do a null check on filter if the filter is to be emitted
        this.isFilterSet = noEmit === true ? filter$$1 !== null : true;
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
        var filter$$1 = new DefaultFilterOption();
        filter$$1.attribute = this.attribute;
        filter$$1.lookupAttribute = this.lookupAttribute;
        filter$$1.lookupEntity = this.lookupEntity;
        filter$$1.operator = this.operator;
        filter$$1.key = key;
        filter$$1.dataType = this.dataType;
        filter$$1.ignoreCase = this.ignoreCase;
        filter$$1.upperCase = this.upperCase;
        return filter$$1;
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
    function (filter$$1, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if ((filter$$1 !== this.oldFilter) || (filter$$1 === null)) {
            // Clone current filter to old filter
            this.oldFilter = Object.assign({}, this.filterValue);
            this.filterValue = filter$$1;
            if (!noEmit) {
                this.filter.next({ active: this.name, filter: filter$$1 });
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
        var filter$$1 = this.filterValue ? this.filterValue : new DateFilterOption();
        filter$$1.attribute = this.attribute;
        filter$$1.lookupAttribute = this.lookupAttribute;
        filter$$1.lookupEntity = this.lookupEntity;
        filter$$1.operator = this.operator;
        filter$$1.dataType = this.dataType;
        filter$$1.ignoreCase = this.ignoreCase;
        filter$$1.upperCase = this.upperCase;
        filter$$1.days = days;
        this.setFilterValue(filter$$1);
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
        var filter$$1 = this.filterValue ? this.filterValue : new DateFilterOption();
        filter$$1.attribute = this.attribute;
        filter$$1.lookupAttribute = this.lookupAttribute;
        filter$$1.lookupEntity = this.lookupEntity;
        filter$$1.operator = this.operator;
        filter$$1.dataType = this.dataType;
        filter$$1.ignoreCase = this.ignoreCase;
        filter$$1.upperCase = this.upperCase;
        filter$$1.fromDate = this.toDbDateString(date);
        this.setFilterValue(filter$$1);
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
        var filter$$1 = this.filterValue ? this.filterValue : new DateFilterOption();
        filter$$1.attribute = this.attribute;
        filter$$1.lookupAttribute = this.lookupAttribute;
        filter$$1.lookupEntity = this.lookupEntity;
        filter$$1.operator = this.operator;
        filter$$1.dataType = this.dataType;
        filter$$1.ignoreCase = this.ignoreCase;
        filter$$1.upperCase = this.upperCase;
        filter$$1.toDate = this.toDbDateString(date);
        this.setFilterValue(filter$$1);
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
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'instant-column'
                },] }
    ];
    /** @nocollapse */
    ColumnDirective.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    ColumnDirective.propDecorators = {
        templateName: [{ type: Input }],
        name: [{ type: Input }],
        label: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        sticky: [{ type: Input }],
        instantStyle: [{ type: Input, args: ['instant-style',] }],
        operators: [{ type: Input }],
        attribute: [{ type: Input }],
        lookupAttribute: [{ type: Input }],
        lookupEntity: [{ type: Input }],
        dataType: [{ type: Input }],
        operator: [{ type: Input }],
        ignoreCase: [{ type: Input }],
        upperCase: [{ type: Input }],
        filterRef: [{ type: ContentChild, args: ['filter',] }],
        cellRef: [{ type: ContentChild, args: ['cell',] }]
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
        this.rowClicked = new EventEmitter();
    }
    Object.defineProperty(GridComponent.prototype, "displayedColumns", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._displayedColumns =
                this._displayedColumns ||
                    (this.columns ? this.columns.map(function (c) { return c.name; }) : null));
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
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
        { type: Component, args: [{
                    selector: 'instant-grid',
                    template: "<table mat-table #table [dataSource]=\"dataSource\" matSort>\r\n  <ng-container *ngFor=\"let col of columns; let i = index\" [matColumnDef]=\"col.name\" [sticky]=\"col.sticky\">\r\n    <!-- Header definition -->\r\n    <th mat-header-cell *matHeaderCellDef [ngStyle]=\"col.instantStyle\">\r\n      <header>\r\n        <div class=\"action\" *ngIf=\"col.filterable != false\">\r\n          <mat-menu #appMenu=\"matMenu\">\r\n            <ng-container *ngIf=\"col.filterRef && (!col.templateName || col.templateName === 'defaultFilterTemplate')\">\r\n              <ng-container *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'defaultFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"defaultFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"!col.filterRef && col.templateName === 'dateFilterTemplate'\">\r\n              <ng-container *ngTemplateOutlet=\"dateFilterTemplate;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.filterRef && col.templateName === 'multiChoiceFilterTemplate'\">\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <ng-container style=\"overflow-y: scroll; display: inline-grid; max-width: 250px; max-height: 350px;\" *ngTemplateOutlet=\"col.filterRef;context:{col:col}\"></ng-container>\r\n            </ng-container>\r\n\r\n            <ng-template #defaultFilterTemplate>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput #filter id=\"defaultFilterInput\" placeholder=\"Filter\" [type]=\"['Long', 'Integer', 'BigDecimal'].includes(col.dataType) ? 'number' : 'text'\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" (keyup)=\"checkClose($event, menuTrigger)\" [value]=\"getFilterValue(col)\" (change)=\"onFilterChange($event, col)\">\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"col.removeFilter()\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\" tabindex=\"2\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n            <ng-template #dateFilterTemplate>\r\n              <button mat-icon-button class=\"no-padding\" (click)=\"removeFilter(col)\">\r\n                <i class=\"fa far fa-times fa-fw\"></i>\r\n              </button>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"fromControlDatePicker\" id=\"dateFilterInput\" placeholder=\"From\" tabindex=\"1\" (click)=\"$event.stopPropagation()\" [value]=\"getFromDate(col)\" (dateChange)=\"onFromDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"fromControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #fromControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onFromDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput [matDatepicker]=\"toControlDatePicker\" placeholder=\"To\"  tabindex=\"2\" (click)=\"$event.stopPropagation()\" [value]=\"getToDate(col)\" (dateChange)=\"onToDateChange($event, col)\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"toControlDatePicker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #toControlDatePicker></mat-datepicker>\r\n                <button mat-icon-button matSuffix tabindex=\"91\" (click)=\"$event.stopPropagation(); onToDateChange(null, col)\">\r\n                  <i class=\"fa far fa-times fa-fw\"></i>\r\n                </button>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"no-padding\">\r\n                <input matInput type=\"number\" placeholder=\"Days\" tabindex=\"3\" (click)=\"$event.stopPropagation()\" [value]=\"getDays(col)\" (change)=\"onDaysChange($event, col)\">\r\n              </mat-form-field>\r\n              <mat-radio-group class=\"filter-radio-group\" [(ngModel)]=\"col.operator\">\r\n                <mat-radio-button class=\"filter-radio-button\" *ngFor=\"let operator of col.operators\" [value]=\"operator\" (change)=\"onOperatorChange(operator, col)\">{{operator}}</mat-radio-button>\r\n              </mat-radio-group>\r\n            </ng-template>\r\n\r\n          </mat-menu>\r\n          <button mat-icon-button [matMenuTriggerFor]=\"appMenu\" #menuTrigger=\"matMenuTrigger\" (menuOpened)=\"menuOpened(col)\">\r\n            <ng-container *ngIf=\"col.isFilterSet == false\">\r\n              <svg class=\"filter-icon no-filter-set\" data-name=\"No filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>No filter set</title>\r\n                <polygon class=\"cls-1\" points=\"10.3 19.93 10.3 12.94 4.46 5.87 19.43 5.87 13.58 13.05 13.58 19.93 10.3 19.93\"\r\n                />\r\n                <path class=\"cls-2\" d=\"M18.48,6.32l-5.15,6.32-.2.25v6.58H10.75V12.78l-.21-.26L5.42,6.32H18.48m1.9-.9H3.5L9.84,13.1v7.28H14V13.21l6.35-7.79Z\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"col.isFilterSet == true\">\r\n              <svg class=\"filter-icon filter-set\" data-name=\"Filter set\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24.06 24.12\">\r\n                <title>Filter set</title>\r\n                <polygon class=\"cls-2\" points=\"20.3 5.42 3.42 5.42 9.77 13.1 9.77 20.38 13.96 20.38 13.96 13.21 20.3 5.42\"\r\n                />\r\n              </svg>\r\n            </ng-container>\r\n          </button>\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i===0\">\r\n            <button mat-icon-button [matMenuTriggerFor]=\"clearmenu\" class=\"mat-icon-button-ellipsis\"><i style=\"color: #000\" class=\"fa fa-fw fa-ellipsis-v\"></i></button>\r\n            <mat-menu #clearmenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"reload()\">\r\n                    <span class=\"fa fa-refresh\"></span>\r\n                    <span>Refresh</span>\r\n                </button>\r\n                <button mat-menu-item class=\"mat-menu-item\" (click)=\"removeFilters()\">\r\n                    <span class=\"fa fa-filter\"></span>\r\n                     <span>Clear filter</span>\r\n                </button>\r\n            </mat-menu>\r\n        </div>\r\n        <div mat-sort-header class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable != false\">\r\n          {{ col.label }}\r\n        </div>\r\n        <div class=\"flex-col\" role=\"heading\" *ngIf=\"i!=0 && col.sortable == false\">\r\n          {{ col.label }}\r\n        </div>\r\n      </header>\r\n    </th>\r\n\r\n    <!-- Cell definition -->\r\n    <td mat-cell *matCellDef=\"let element\">\r\n      <ng-container *ngIf=\"col.cellRef; else defaultCellTemplate\">\r\n        <ng-container *ngTemplateOutlet=\"col.cellRef;context:{row:element,col:col.name}\"></ng-container>\r\n      </ng-container>\r\n\r\n      <ng-template #defaultCellTemplate>\r\n        {{ element[col.name] }}\r\n      </ng-template>\r\n    </td>\r\n  </ng-container>\r\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: sticky\"></tr>\r\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;let index=index;\"\r\n           [ngClass]=\"getRowClasses(index)\"\r\n           [ngStyle]=\"getRowStyles(index)\"\r\n           [attr.data-rowIndex]=\"index\"\r\n           (click)=\"onRowClicked(row, $event)\"></tr>\r\n</table>\r\n",
                    styles: ["[role=columnheader] header{position:relative;display:flex;align-items:center}[role=columnheader]:hover .action>button{visibility:visible}[role=columnheader] [role=heading]{flex:1}:host.striped [role=row]{background:#fff}:host.striped [role=row]:nth-child(even){background:#fefefe}::ng-deep .mat-table{display:table!important;width:100%}::ng-deep .mat-table>.mat-header-row,::ng-deep .mat-table>.mat-row{display:table-row;padding:0;border:none}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-header-row>.mat-header-cell,::ng-deep .mat-table>.mat-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-header-cell{display:table-cell;height:48px;vertical-align:middle;border-bottom:1px solid rgba(0,0,0,.12);padding-left:3px}::ng-deep .mat-table>.mat-header-row>.mat-cell,::ng-deep .mat-table>.mat-row>.mat-cell{border-left:1px solid rgba(0,0,0,.12)}::ng-deep .no-padding{max-height:3rem;padding:0 16px;overflow:hidden}::ng-deep .mat-column-actions{overflow:initial}::ng-deep .mat-column-actions .mat-card,::ng-deep .mat-column-actions mat-card{position:absolute}.action mat-menu{padding:0}.action mat-menu mat-form-field{width:100%;padding:0;margin:0}.mat-icon-button{width:18px}.mat-icon-button-ellipsis{width:40px}.filter-icon .cls-1{fill:#fff}.filter-icon .cls-2{fill:#1d1d1b}.filter-radio-group{display:flex;flex-direction:column;margin:15px 0}.filter-radio-button{margin:5px}"]
                }] }
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return GridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                    template: "<mat-toolbar>\r\n  <header>\r\n    <ng-content></ng-content>\r\n  </header>\r\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\r\n</mat-toolbar>\r\n",
                    styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
                }] }
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
        { type: Component, args: [{
                    selector: 'instant-grid-row-menu',
                    template: "<mat-menu #rowMenu=\"matMenu\">\r\n  <ng-content></ng-content>\r\n</mat-menu>\r\n\r\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\r\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\r\n</button>\r\n",
                    styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                        MatRadioModule,
                        MatDatepickerModule,
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
                        DatePipe,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return GridModule;
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
        if (url === void 0) { url = ''; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
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
                if (child.outlet !== PRIMARY_OUTLET) {
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    BreadcrumbComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-breadcrumb',
                    template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\r\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\r\n",
                    styles: [":host{flex:1}"]
                }] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ToolbarService = /** @class */ (function () {
    function ToolbarService() {
    }
    ToolbarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ToolbarService.ctorParameters = function () { return []; };
    /** @nocollapse */ ToolbarService.ngInjectableDef = defineInjectable({ factory: function ToolbarService_Factory() { return new ToolbarService(); }, token: ToolbarService, providedIn: "root" });
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
         */
        function () { return this.toolbarService.actionTemplate; },
        enumerable: true,
        configurable: true
    });
    FormActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-form-actions',
                    template: "<ng-container *ngIf=\"actionsRef; else defaultTemplate\">\r\n  <ng-container *ngTemplateOutlet=\"actionsRef\"></ng-container>\r\n</ng-container>\r\n\r\n<ng-template #defaultTemplate></ng-template>\r\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FormActionsComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
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
        { type: Directive, args: [{
                    selector: '[instantFormActionsDef]'
                },] }
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
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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

export { GridModule, GridComponent, ColumnDirective, GridRowMenuComponent, InstantDataSource, InstantDatabase, ToolbarModule, BreadcrumbComponent, FormActionsComponent, FormActionsDefDirective, ToolbarService, GridToolbarComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFudC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaW5zdGFudC9saWIvdXRpbHMvZGVib3VuY2UudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZGF0YXNvdXJjZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9maWx0ZXItb3B0aW9uL2Fic3RyYWN0LWZpbHRlci1vcHRpb24udHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZmlsdGVyLW9wdGlvbi9kZWZhdWx0LWZpbHRlci1vcHRpb24udHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZmlsdGVyLW9wdGlvbi9kYXRlLWZpbHRlci1vcHRpb24udHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvY29sdW1uLmRpcmVjdGl2ZS50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC9ncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvZ3JpZC90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL2dyaWQvZ3JpZC5tb2R1bGUudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyIsIm5nOi8vaW5zdGFudC9saWIvdG9vbGJhci90b29sYmFyLnNlcnZpY2UudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL2luc3RhbnQvbGliL3Rvb2xiYXIvZm9ybS1hY3Rpb25zL2Zvcm0tYWN0aW9ucy1kZWYuZGlyZWN0aXZlLnRzIiwibmc6Ly9pbnN0YW50L2xpYi90b29sYmFyL3Rvb2xiYXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0ID0gMzAwLCBpbW1lZGlhdGUgPSBmYWxzZSkge1xyXG4gIGxldCB0aW1lb3V0O1xyXG4gIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcclxuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xyXG4gICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgaWYgKCFpbW1lZGlhdGUpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICBpZiAoY2FsbE5vdykgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9XHJcbiAgfTtcclxufTtcclxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb2x1bW5GaWx0ZXIgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJy4uL3V0aWxzL2RlYm91bmNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlRXZlbnQge1xyXG4gIFtldmVudDogc3RyaW5nXToge1xyXG4gICAgYWN0aXZlOiBzdHJpbmcsXHJcbiAgICBkaXJlY3Rpb24/OiAnYXNjJyB8ICdkZXNjJyB8ICcnLFxyXG4gICAgZmlsdGVyPzogYW55XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xyXG4gIFtjb2w6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTb3J0ZXIge1xyXG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBvYmplY3QgdGhlIE1hdCBUYWJsZSBhY3R1YWxseSB1c2VzLlxyXG4gKiBJdCBob2xkcyBhbiBgSW5zdGFudERhdGFiYXNlYCBvYmplY3QsIGFuZCBkZWxpdmVyZXNcclxuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbnN0YW50RGF0YVNvdXJjZTxUPiBleHRlbmRzIERhdGFTb3VyY2U8VD4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYi5kYXRhQ2hhbmdlO1xyXG4gIH1cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgdGhpcy5kYi5vbkRlc3Ryb3koKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXHJcbiAqIHRoZSBncmlkLCBhbmQgbW9kaWZ5aW5nIHRoZSBkYXRhIGFjY29yZGluZ2x5LlxyXG4gKlxyXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXHJcbiAqIG1ldGhvZCBhbmQgZGVsaXZhciBkYXRhIHRvIHRoZSBgZGF0YUNoYW5nZWAgU3ViamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xyXG4gIHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTb3J0PjtcclxuICBwcml2YXRlIHNvcnRDYWNoZTogU29ydGVyID0ge307XHJcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZmlsdGVyQ2hhbmdlOiBPYnNlcnZhYmxlPENvbHVtbkZpbHRlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xyXG4gIHByaXZhdGUgX2ZpbHRlclN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xyXG4gIGRhdGFTbmFwc2hvdDtcclxuICBwcml2YXRlIF9kYXRhQ2hhbmdlU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgZGF0YVJlYWRlciA9IGRlYm91bmNlKHRoaXMub25SZWFkLCAxMDApO1xyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICB0aGlzLm9uUmVhZCgpO1xyXG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIgPSB0aGlzLmRhdGFDaGFuZ2Uuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5kYXRhU25hcHNob3QgPSBkYXRhKTtcclxuICB9XHJcbiAgb25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3NvcnRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIG9uUmVhZChzb3J0PzogU29ydGVyLCBmaWx0ZXI/OiBGaWx0ZXIpIHt9XHJcblxyXG4gIF9jb25maWd1cmUoYXJnczogUGFydGlhbDxJbnN0YW50RGF0YWJhc2U8VD4+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xyXG5cclxuICAgIC8vIE9uIGFueSBjaGFuZ2VzLCByZWFkIGRhdGFcclxuICAgIHRoaXMuX3NvcnRTdWJzY3JpYmVyID0gdGhpcy5zb3J0Q2hhbmdlLnN1YnNjcmliZShzb3J0ID0+IHtcclxuICAgICAgdGhpcy5zb3J0Q2FjaGUgPSB7fTsgLy8gUmVzZXQgYWx3YXlzLiBNdWx0aXBsZSBjb2x1bW4gc29ydCBpcyBOT1Qgc3VwcG9ydGVkXHJcbiAgICAgIHRoaXMuc29ydENhY2hlW3NvcnQuYWN0aXZlXSA9IHNvcnQuZGlyZWN0aW9uO1xyXG4gICAgICB0aGlzLmRhdGFSZWFkZXIodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9maWx0ZXJTdWJzY3JpYmVyID0gdGhpcy5maWx0ZXJDaGFuZ2Uuc3Vic2NyaWJlKGZpbHRlciA9PiB7XHJcbiAgICAgIHRoaXMuZmlsdGVyQ2FjaGVbZmlsdGVyLmFjdGl2ZV0gPSBmaWx0ZXIuZmlsdGVyO1xyXG4gICAgICB0aGlzLmRhdGFSZWFkZXIodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7IHRoaXMub25Jbml0KCk7IH1cclxuICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbiIsImV4cG9ydCBjbGFzcyBBYnN0cmFjdEZpbHRlck9wdGlvbiB7XHJcbiAgYXR0cmlidXRlOiBzdHJpbmcgPSBudWxsO1xyXG4gIGxvb2t1cEVudGl0eTogc3RyaW5nID0gbnVsbDtcclxuICBsb29rdXBBdHRyaWJ1dGU6IHN0cmluZyA9IG51bGw7XHJcbiAgZGF0YVR5cGU6IHN0cmluZyA9IG51bGw7XHJcbiAgb3BlcmF0b3I6IHN0cmluZyA9IG51bGw7XHJcbiAgaWdub3JlQ2FzZTogYm9vbGVhbiA9IG51bGw7XHJcbiAgdXBwZXJDYXNlOiBib29sZWFuID0gbnVsbDtcclxufVxyXG4iLCJpbXBvcnQge0Fic3RyYWN0RmlsdGVyT3B0aW9ufSBmcm9tICcuL2Fic3RyYWN0LWZpbHRlci1vcHRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRGaWx0ZXJPcHRpb24gZXh0ZW5kcyBBYnN0cmFjdEZpbHRlck9wdGlvbiB7XHJcbiAga2V5OiBhbnkgPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7QWJzdHJhY3RGaWx0ZXJPcHRpb259IGZyb20gJy4vYWJzdHJhY3QtZmlsdGVyLW9wdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZUZpbHRlck9wdGlvbiBleHRlbmRzIEFic3RyYWN0RmlsdGVyT3B0aW9uIHtcclxuICBmcm9tRGF0ZTogRGF0ZSA9IG51bGw7XHJcbiAgdG9EYXRlOiBEYXRlID0gbnVsbDtcclxuICBkYXlzOiBudW1iZXIgPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0RlZmF1bHRGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kZWZhdWx0LWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RhdGVGaWx0ZXJPcHRpb259IGZyb20gJy4vZmlsdGVyLW9wdGlvbi9kYXRlLWZpbHRlci1vcHRpb24nO1xyXG5pbXBvcnQge0RFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvc3JjL2NvbXBpbGVyX2ZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uRmlsdGVyIHtcclxuICBhY3RpdmU6IHN0cmluZztcclxuICBmaWx0ZXI6IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgaW5zdGFudC1ncmlkLlxyXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGNlbGxzIGFuZCBvcHRpb25hbCBmaWx0ZXJzIGF2YWlsYWJsZSBmb3IgYSB0YWJsZSBjb2x1bW4uXHJcbiAqXHJcbiAqIDIyLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBzdXBwb3J0IGZvciBkaWZmZXJlbnQgZmlsdGVyIG9wZXJhdG9ycy5cclxuICogICAgICAgICAgICAgICAgICAgICAgIEFkZGVkIG90aGVyIGlucHV0IG1lbWJlcnMgKGF0dHJpYnV0ZSwgbG9va0F0dHJpYnV0ZSwgbG9va3VwRW50aXR5LCBkYXRhVHlwZSwgb3BlcmF0b3IpXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBlbmFibGluZyBjb250cm9sIG9mIHRoZSBmaWx0ZXIgZnJvbSB0aGUgSFRNTCB0YWcuXHJcbiAqIDIzLjA2LjIwMTkgb2ZzZnJ2b3IgLSBBZGRlZCBkYXRlRmlsdGVyVGVtcGxhdGUuIEFjdGl2YXRlIGRhdGVGaWx0ZXJUZW1wbGF0ZSBieSBzZXR0aW5nIGlucHV0IG1lbWJlciB0ZW1wbGF0ZU5hbWUuXHJcbiAqIDI0LjA2LjIwMTkgb2ZzZnJ2b3IgLSBJZiBkYXRhVHlwZSBpcyBMb25nLCBJbnRlZ2VyIG9yIEJpZ0RlY2ltYWwsIHNldCBpbnB1dCBmaWVsZCB0eXBlIHRvIG51bWJlci4gU2V0IGRlZmF1bHQgZGF0YVR5cGUgdG8gU3RyaW5nLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgVXNpbmcgbW9tZW50IHRvIGNvbnZlcnQgZGF0ZVN0cmluZyB0byBkYXRlIG9iamVjdC5cclxuICogMjIuMDIuMjAyMiBvZnNmcnZvciAtIEFkZGVkIGJvb2xlYW4gaW5wdXQgbWVtYmVycyBpZ25vcmVDYXNlIGFuZCB1cHBlckNhc2UuXHJcbiAqXHJcbiAqIFRPRE8gQXV0b21hdGljYWxseSBmb3JjZSBjdXJzb3IgdG8gaW5wdXQgZmllbGQgd2hlbiB0ZW1wbGF0ZSBpcyBvcGVuZWRcclxuICogVE9ETyBOZWVkIHRvIGltcGxlbWVudCBsYW5ndWFnZSB0cmFuc2xhdGlvbiBmb3IgdGhlIG9wZXJhdG9yIGxhYmVscy5cclxuICogVE9ETyBMaXN0IGZpbHRlciBvcHRpb25zIGFyZSBub3QgdW5jaGVja2VkIHdoZW4gbGlzdCB0eXBlIGZpbHRlciBpcyByZW1vdmVkXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWNvbHVtbidcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9GSUxURVJfVEVNUExBVEU6IHN0cmluZyA9ICdkZWZhdWx0RmlsdGVyVGVtcGxhdGUnO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREFURV9GSUxURVJfVEVNUExBVEU6IHN0cmluZyA9ICdkYXRlRmlsdGVyVGVtcGxhdGUnO1xyXG5cclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSB0ZW1wbGF0ZU5hbWU6IHN0cmluZyA9IENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTtcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7ICAvLyBVbmlxdWUgaWRlbnRpZmllciBmb3IgdGhpcyBjb2x1bW4uXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZzsgLy8gRGVmYXVsdHMgdG8gdGhlIGlkZW50aWZpZXIgb2YgY29sdW1uXHJcbiAgQElucHV0KCkgZmlsdGVyYWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgc29ydGFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHN0aWNreSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgnaW5zdGFudC1zdHlsZScpIGluc3RhbnRTdHlsZSA9IHt9O1xyXG4gIEBJbnB1dCgpIG9wZXJhdG9yczogc3RyaW5nW107XHJcbiAgQElucHV0KCkgYXR0cmlidXRlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9va3VwQXR0cmlidXRlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9va3VwRW50aXR5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGF0YVR5cGU6IHN0cmluZyA9ICdTdHJpbmcnO1xyXG4gIEBJbnB1dCgpIG9wZXJhdG9yOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaWdub3JlQ2FzZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSB1cHBlckNhc2U6IGJvb2xlYW47XHJcblxyXG4gIC8vIFRlbXBsYXRlIHJlZnNcclxuICBAQ29udGVudENoaWxkKCdmaWx0ZXInKSBmaWx0ZXJSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQENvbnRlbnRDaGlsZCgnY2VsbCcpIGNlbGxSZWY6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8vIEZpbHRlciBwcm9wZXJ0aWVzXHJcbiAgZmlsdGVyT3BlbjogYm9vbGVhbjtcclxuICBpc0ZpbHRlclNldDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGZpbHRlciA9IG5ldyBSZXBsYXlTdWJqZWN0PENvbHVtbkZpbHRlcj4oKTtcclxuICBmaWx0ZXJWYWx1ZTogYW55O1xyXG4gIG9sZEZpbHRlcjogYW55O1xyXG4gIGluaXRpYWxPcGVyYXRvcjogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lID09IG51bGwpIHtcclxuICAgICAgdGhpcy50ZW1wbGF0ZU5hbWUgPSBDb2x1bW5EaXJlY3RpdmUuREVGQVVMVF9GSUxURVJfVEVNUExBVEU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGRlZmF1bHQgb3BlcmF0b3IgbGlzdCAoaWYgbm90IGFscmVhZHkgc2V0KVxyXG4gICAgc3dpdGNoICh0aGlzLnRlbXBsYXRlTmFtZSkge1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzID8gdGhpcy5vcGVyYXRvcnMgOiBbJ0NPTlRBSU5TJywgJ1NUQVJUU19XSVRIJywgJ0VORFNfV0lUSCcsICdFUVVBTFMnLCAnTk9UX0VRVUFMUycsICdNQVRDSF9XT1JEUycsICdJU19OVUxMJywgJ0lTX05PVF9OVUxMJ107XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3IgPyB0aGlzLm9wZXJhdG9yIDogJ0NPTlRBSU5TJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREFURV9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLm9wZXJhdG9ycyA/IHRoaXMub3BlcmF0b3JzIDogWydJU19OVUxMJywgJ0lTX05PVF9OVUxMJ107XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IHRoaXMub3BlcmF0b3IgPyB0aGlzLm9wZXJhdG9yIDogJ0VRVUFMUyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5pdGlhbE9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgZGlyZWN0bHkgZnJvbSB0aGUgZmlsdGVyIHRlbXBsYXRlLlxyXG4gICAqIEFueSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBjb2x1bW4gZmlsdGVyLCBtdXN0IGZpcmUgdGhpc1xyXG4gICAqIG1ldGhvZCB3aGVuIHVzZXIgaGFzIG1hZGUgY2hvaWNlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmaWx0ZXIgVGhlIGZpbHRlciBhcyByZWNlaXZlZCBmcm9tIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBzZXRGaWx0ZXIoZmlsdGVyOiBhbnksIG5vRW1pdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBGaWx0ZXIgaXMgb2JqZWN0ID0+IG92ZXJyaWRlIGZpbHRlciBhdHRyaWJ1dGVzXHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2F0dHJpYnV0ZScpICYmIGZpbHRlci5hdHRyaWJ1dGUgJiYgZmlsdGVyLmF0dHJpYnV0ZSAhPT0gdGhpcy5hdHRyaWJ1dGUgPyBmaWx0ZXIuYXR0cmlidXRlIDogdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICAgICAgdGhpcy5sb29rdXBBdHRyaWJ1dGUgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2xvb2t1cEF0dHJpYnV0ZScpICYmIGZpbHRlci5sb29rdXBBdHRyaWJ1dGUgJiYgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSAhPT0gdGhpcy5sb29rdXBBdHRyaWJ1dGUgPyBmaWx0ZXIubG9va3VwQXR0cmlidXRlIDogdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICAgICAgdGhpcy5sb29rdXBFbnRpdHkgPSBmaWx0ZXIuaGFzT3duUHJvcGVydHkoJ2xvb2t1cEVudGl0eScpICYmIGZpbHRlci5sb29rdXBFbnRpdHkgJiYgZmlsdGVyLmxvb2t1cEVudGl0eSAhPT0gdGhpcy5sb29rdXBFbnRpdHkgPyBmaWx0ZXIubG9va3VwRW50aXR5IDogdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSAmJiBmaWx0ZXIub3BlcmF0b3IgJiYgZmlsdGVyLm9wZXJhdG9yICE9PSB0aGlzLm9wZXJhdG9yID8gZmlsdGVyLm9wZXJhdG9yIDogdGhpcy5vcGVyYXRvcjtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gZmlsdGVyLmhhc093blByb3BlcnR5KCdkYXRhVHlwZScpICYmIGZpbHRlci5kYXRhVHlwZSAmJiBmaWx0ZXIuZGF0YVR5cGUgIT09IHRoaXMuZGF0YVR5cGUgPyBmaWx0ZXIuZGF0YVR5cGUgOiB0aGlzLmRhdGFUeXBlO1xyXG4gICAgICAgIHRoaXMuaWdub3JlQ2FzZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgnaWdub3JlQ2FzZScpICYmIGZpbHRlci5pZ25vcmVDYXNlICYmIGZpbHRlci5pZ25vcmVDYXNlICE9PSB0aGlzLmlnbm9yZUNhc2UgPyBmaWx0ZXIuaWdub3JlQ2FzZSA6IHRoaXMuaWdub3JlQ2FzZTtcclxuICAgICAgICB0aGlzLnVwcGVyQ2FzZSA9IGZpbHRlci5oYXNPd25Qcm9wZXJ0eSgndXBwZXJDYXNlJykgJiYgZmlsdGVyLnVwcGVyQ2FzZSAmJiBmaWx0ZXIudXBwZXJDYXNlICE9PSB0aGlzLnVwcGVyQ2FzZSA/IGZpbHRlci51cHBlckNhc2UgOiB0aGlzLnVwcGVyQ2FzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGaWx0ZXIgaXMgcHJpbWl0aXZlID0+IGNvbnZlcnQgdG8gZGVmYXVsdCBmaWx0ZXIgb3B0aW9uXHJcbiAgICAgICAgZmlsdGVyID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIoZmlsdGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyLCBub0VtaXQpO1xyXG5cclxuICAgIC8vIEhhdmUgdG8gZG8gYSBudWxsIGNoZWNrIG9uIGZpbHRlciBpZiB0aGUgZmlsdGVyIGlzIHRvIGJlIGVtaXR0ZWRcclxuICAgIHRoaXMuaXNGaWx0ZXJTZXQgPSBub0VtaXQgPT09IHRydWUgPyBmaWx0ZXIgIT09IG51bGwgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29udmVydFByaW1pdGl2ZVRvRmlsdGVyKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGZpbHRlcjogRGVmYXVsdEZpbHRlck9wdGlvbiA9IG5ldyBEZWZhdWx0RmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmtleSA9IGtleTtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuaWdub3JlQ2FzZSA9IHRoaXMuaWdub3JlQ2FzZTtcclxuICAgIGZpbHRlci51cHBlckNhc2UgPSB0aGlzLnVwcGVyQ2FzZTtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgc2V0RmlsdGVyVmFsdWUoZmlsdGVyOiBhbnksIG5vRW1pdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoKGZpbHRlciAhPT0gdGhpcy5vbGRGaWx0ZXIpIHx8IChmaWx0ZXIgPT09IG51bGwpKSB7XHJcbiAgICAgIC8vIENsb25lIGN1cnJlbnQgZmlsdGVyIHRvIG9sZCBmaWx0ZXJcclxuICAgICAgdGhpcy5vbGRGaWx0ZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGZpbHRlcjtcclxuICAgICAgaWYgKCFub0VtaXQpIHtcclxuICAgICAgICB0aGlzLmZpbHRlci5uZXh0KHthY3RpdmU6IHRoaXMubmFtZSwgZmlsdGVyOiBmaWx0ZXJ9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsdGVyT3BlbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF5cyhkYXlzOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuaWdub3JlQ2FzZSA9IHRoaXMuaWdub3JlQ2FzZTtcclxuICAgIGZpbHRlci51cHBlckNhc2UgPSB0aGlzLnVwcGVyQ2FzZTtcclxuICAgIGZpbHRlci5kYXlzID0gZGF5cztcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUoZmlsdGVyKTtcclxuICB9XHJcblxyXG4gIHNldEZyb21EYXRlKGRhdGU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlTmFtZSAhPT0gJ2RhdGVGaWx0ZXJUZW1wbGF0ZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcjogYW55ID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiBuZXcgRGF0ZUZpbHRlck9wdGlvbigpO1xyXG4gICAgZmlsdGVyLmF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEF0dHJpYnV0ZSA9IHRoaXMubG9va3VwQXR0cmlidXRlO1xyXG4gICAgZmlsdGVyLmxvb2t1cEVudGl0eSA9IHRoaXMubG9va3VwRW50aXR5O1xyXG4gICAgZmlsdGVyLm9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcclxuICAgIGZpbHRlci5kYXRhVHlwZSA9IHRoaXMuZGF0YVR5cGU7XHJcbiAgICBmaWx0ZXIuaWdub3JlQ2FzZSA9IHRoaXMuaWdub3JlQ2FzZTtcclxuICAgIGZpbHRlci51cHBlckNhc2UgPSB0aGlzLnVwcGVyQ2FzZTtcclxuICAgIGZpbHRlci5mcm9tRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBzZXRUb0RhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMudGVtcGxhdGVOYW1lICE9PSAnZGF0ZUZpbHRlclRlbXBsYXRlJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5maWx0ZXJWYWx1ZSA6IG5ldyBEYXRlRmlsdGVyT3B0aW9uKCk7XHJcbiAgICBmaWx0ZXIuYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwQXR0cmlidXRlID0gdGhpcy5sb29rdXBBdHRyaWJ1dGU7XHJcbiAgICBmaWx0ZXIubG9va3VwRW50aXR5ID0gdGhpcy5sb29rdXBFbnRpdHk7XHJcbiAgICBmaWx0ZXIub3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xyXG4gICAgZmlsdGVyLmRhdGFUeXBlID0gdGhpcy5kYXRhVHlwZTtcclxuICAgIGZpbHRlci5pZ25vcmVDYXNlID0gdGhpcy5pZ25vcmVDYXNlO1xyXG4gICAgZmlsdGVyLnVwcGVyQ2FzZSA9IHRoaXMudXBwZXJDYXNlO1xyXG4gICAgZmlsdGVyLnRvRGF0ZSA9IHRoaXMudG9EYkRhdGVTdHJpbmcoZGF0ZSk7XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKGZpbHRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvRGJEYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgaWYgKGRhdGUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgJ2RkLU1NLXl5eXknKTtcclxuICAgIHJldHVybiBkYXRlU3RyaW5nO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldE9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgIGlmICh0aGlzLmZpbHRlclZhbHVlICYmICh0eXBlb2YodGhpcy5maWx0ZXJWYWx1ZSkgPT09ICdvYmplY3QnKSkge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gdGhpcy5jb252ZXJ0UHJpbWl0aXZlVG9GaWx0ZXIobnVsbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEZpbHRlclZhbHVlKHRoaXMuZmlsdGVyVmFsdWUpO1xyXG4gICAgdGhpcy5pc0ZpbHRlclNldCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWx0ZXIoKSB7XHJcbiAgICAvLyBEZWZhdWx0IG9wZXJhdG9yIGJhY2sgdG8gQ09OVEFJTlNcclxuICAgIHRoaXMub3BlcmF0b3IgPSB0aGlzLmluaXRpYWxPcGVyYXRvciA/IHRoaXMuaW5pdGlhbE9wZXJhdG9yIDogJ0NPTlRBSU5TJztcclxuICAgIHRoaXMuc2V0RmlsdGVyVmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLmlzRmlsdGVyU2V0ID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0ICdlbGVtZW50LWNsb3Nlc3QnO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uRGVzdHJveSxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXRTb3J0LCBNYXRNZW51VHJpZ2dlciwgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbnN0YW50RGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NsaWNrRXZlbnQge1xyXG4gIGRhdGE6IGFueTtcclxuICBjb2xOYW1lOiBzdHJpbmc7XHJcbn1cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ncmlkLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IEluc3RhbnREYXRhU291cmNlPGFueT47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHN0aWNreTogYm9vbGVhbjtcclxuICBASW5wdXQoKSByb3dBdHRyaWJ1dGVzOiBBcnJheTxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uRGlyZWN0aXZlKSBjb2x1bW5zOiBDb2x1bW5EaXJlY3RpdmVbXTtcclxuICBAT3V0cHV0KCkgcm93Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Um93Q2xpY2tFdmVudD4oKTtcclxuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XHJcblxyXG4gIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkaXNwbGF5ZWRDb2x1bW5zKHYpIHtcclxuICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSB2O1xyXG4gIH1cclxuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPVxyXG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zIHx8XHJcbiAgICAgICh0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5uYW1lKSA6IG51bGwpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWZcclxuICApIHt9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGIuX2NvbmZpZ3VyZSh7XHJcbiAgICAgICAgc29ydENoYW5nZTogdGhpcy5zb3J0LnNvcnRDaGFuZ2UsXHJcbiAgICAgICAgZmlsdGVyQ2hhbmdlOiBtZXJnZSguLi50aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5maWx0ZXIpKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucyAmJiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoZiA9PiBmLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Sb3dDbGlja2VkKHJvdywgJGV2ZW50KSB7XHJcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdpbnN0YW50LWdyaWQtcm93LW1lbnUnKSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBjZWxsTmFtZSA9IFtdLnNsaWNlXHJcbiAgICAgICAgLmNhbGwoJGV2ZW50LnRhcmdldC5jbG9zZXN0KCd0ZCcpLmNsYXNzTGlzdClcclxuICAgICAgICAuZmluZChjID0+IGMuaW5kZXhPZignbWF0LWNvbHVtbi0nKSA+IC0xKVxyXG4gICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpO1xyXG5cclxuICAgICAgdGhpcy5yb3dDbGlja2VkLmVtaXQoeyBkYXRhOiByb3csIGNvbE5hbWU6IGNlbGxOYW1lIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzVG9DbG9zZTogc3RyaW5nW10gPSBbXS5zbGljZVxyXG4gICAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgICAgLmNhbGwodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykpXHJcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XHJcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcclxuICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIHRoZSBjb2x1bW5cclxuICAgICAgLm1hcChiID0+XHJcbiAgICAgICAgW10uc2xpY2VcclxuICAgICAgICAgIC5jYWxsKGIuY2xhc3NMaXN0KVxyXG4gICAgICAgICAgLmZpbmQoYyA9PiBjLmluZGV4T2YoJ21hdC1jb2x1bW4tJykgPiAtMSlcclxuICAgICAgICAgIC5zdWJzdHIoJ21hdC1jb2x1bW4tJy5sZW5ndGgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgLy8gSWYgYW55IGNvbHVtbnMgKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuIGNsb3NlIGl0LlxyXG4gICAgdGhpcy5jb2x1bW5zXHJcbiAgICAgIC5maWx0ZXIoYyA9PiBoZWFkZXJzVG9DbG9zZS5pbmNsdWRlcyhjLm5hbWUpKVxyXG4gICAgICAuZm9yRWFjaChjID0+IChjLmZpbHRlck9wZW4gPSBmYWxzZSkpO1xyXG4gIH1cclxuXHJcbiAgbWVudU9wZW5lZChjb2w6IENvbHVtbkRpcmVjdGl2ZSkge1xyXG4gICAgaWYgKCFjb2wpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBmaWx0ZXJJbnB1dDogSFRNTEVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAoY29sLnRlbXBsYXRlTmFtZSkge1xyXG4gICAgICBjYXNlIENvbHVtbkRpcmVjdGl2ZS5ERUZBVUxUX0ZJTFRFUl9URU1QTEFURTpcclxuICAgICAgICBmaWx0ZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWZhdWx0RmlsdGVySW5wdXQnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDb2x1bW5EaXJlY3RpdmUuREFURV9GSUxURVJfVEVNUExBVEU6XHJcbiAgICAgICAgZmlsdGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZUZpbHRlcklucHV0Jyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmaWx0ZXJJbnB1dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGZpbHRlcklucHV0LmZvY3VzKCk7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDbG9zZSgkZXZlbnQ6IEtleWJvYXJkRXZlbnQsIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcikge1xyXG4gICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgbWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29sLnNldEZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uT3BlcmF0b3JDaGFuZ2Uob3BlcmF0b3I6IHN0cmluZywgY29sKSB7XHJcbiAgICBjb2wuc2V0T3BlcmF0b3Iob3BlcmF0b3IpO1xyXG4gIH1cclxuXHJcbiAgb25Gcm9tRGF0ZUNoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29sLnNldEZyb21EYXRlKCRldmVudCA/ICRldmVudC50YXJnZXQudmFsdWUgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIG9uVG9EYXRlQ2hhbmdlKCRldmVudCwgY29sKSB7XHJcbiAgICBjb2wuc2V0VG9EYXRlKCRldmVudCA/ICRldmVudC50YXJnZXQudmFsdWUgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIG9uRGF5c0NoYW5nZSgkZXZlbnQsIGNvbCkge1xyXG4gICAgY29sLnNldERheXMoJGV2ZW50ID8gJGV2ZW50LnRhcmdldC52YWx1ZSA6IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyVmFsdWUoY29sKSB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJldHVybiBjb2wuZmlsdGVyVmFsdWUua2V5O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2wuZmlsdGVyVmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICB0b0RhdGUoZGF0ZU9iamVjdDogYW55KTogRGF0ZSB7XHJcbiAgICBpZiAoZGF0ZU9iamVjdCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgZGF0ZU9iamVjdCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IG1vbWVudChkYXRlT2JqZWN0LCAnREQtTU0tWVlZWScpLnRvRGF0ZSgpO1xyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0ZU9iamVjdCkge1xyXG4gICAgICBjb25zdCBkYXRlOiBEYXRlID0gbmV3IERhdGUoZGF0ZU9iamVjdCk7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgdG9OdW1iZXIodmFsdWU6IGFueSk6IG51bWJlciB7XHJcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSB0eXBlb2YodmFsdWUpO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICAgICAgaWYgKCFzdHJpbmdWYWx1ZSB8fCBOdW1iZXIuaXNOYU4oK3N0cmluZ1ZhbHVlKSkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG46IG51bWJlciA9ICtzdHJpbmdWYWx1ZTtcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHRydWUpID8gMSA6IDA7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRGcm9tRGF0ZShjb2wpOiBEYXRlIHtcclxuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMudG9EYXRlKGNvbC5maWx0ZXJWYWx1ZS5mcm9tRGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKGNvbC5maWx0ZXJWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFRvRGF0ZShjb2wpOiBEYXRlIHtcclxuICAgIGlmIChjb2wuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjb2wuZmlsdGVyVmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMudG9EYXRlKGNvbC5maWx0ZXJWYWx1ZS50b0RhdGUpO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZShjb2wuZmlsdGVyVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXREYXlzKGNvbCk6IG51bWJlciB7XHJcbiAgICBpZiAoY29sLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29sLmZpbHRlclZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGRheXM6IG51bWJlciA9IHRoaXMudG9OdW1iZXIoY29sLmZpbHRlclZhbHVlLmRheXMpO1xyXG4gICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnRvTnVtYmVyKGNvbC5maWx0ZXJWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldE9wZXJhdG9yKGNvbCkge1xyXG4gICAgY29uc29sZS5sb2coJ2luc3RhbnQgZ3JpZCBjb21wb25lbnQgLSBnZXRPcGVyYXRvciAnICsgY29sLm5hbWUpO1xyXG4gICAgaWYgKCFjb2wgfHwgIWNvbC5oYXNPd25Qcm9wZXJ0eSgnb3BlcmF0b3InKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2wub3BlcmF0b3I7XHJcbiAgfVxyXG5cclxuICBnZXRSb3dDbGFzc2VzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgIGNsYXNzZXMucHVzaCgnaGlnaGxpZ2h0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucm93QXR0cmlidXRlcyAmJiB0aGlzLnJvd0F0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5yb3dBdHRyaWJ1dGVzO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYXR0cltpXVsnaW5kZXgnXSA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgIGlmIChhdHRyW2ldWydjbGFzcyddICYmIGF0dHJbaV1bJ2NsYXNzJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQoYXR0cltpXVsnY2xhc3MnXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBnZXRSb3dTdHlsZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3dBdHRyaWJ1dGVzICYmIHRoaXMucm93QXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnJvd0F0dHJpYnV0ZXM7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhdHRyW2ldWydpbmRleCddID09PSBpbmRleCkge1xyXG4gICAgICAgICAgaWYgKGF0dHJbaV1bJ3N0eWxlJ10gJiYgYXR0cltpXVsnc3R5bGUnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcy5jb25jYXQoYXR0cltpXVsnc3R5bGUnXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZpbHRlcihjb2wpIHtcclxuICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZpbHRlcnMoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaW5zdGFudCBncmlkIGNvbXBvbmVudCAtIHJlbW92ZUZpbHRlcnMnKTtcclxuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbCA9PiB7XHJcbiAgICAgIGNvbC5yZW1vdmVGaWx0ZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVsb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJ2luc3RhbnQgZ3JpZCBjb21wb25lbnQgLSByZWxvYWQnKTtcclxuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2wsaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgY29sLnJlbW92ZUZpbHRlcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtdG9vbGJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC10b29sYmFyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBwYWdlID0gMDtcclxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PigpO1xyXG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcclxuICBASW5wdXQoKSBwYWdlU2l6ZSA9IDEwO1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbNSwgMTAsIDI1LCAxMDBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIHBhZ2VIYW5kbGVyKCRldmVudDogUGFnZUV2ZW50KSB7XHJcbiAgICB0aGlzLnBhZ2VTaXplID0gJGV2ZW50LnBhZ2VTaXplO1xyXG4gICAgdGhpcy5wYWdlID0gJGV2ZW50LnBhZ2VJbmRleDtcclxuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtcm93LW1lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQtcm93LW1lbnUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFJvd01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJvdztcclxuICBASW5wdXQoKSBpY29uID0gJ2VsbGlwc2lzLXYnO1xyXG5cclxuICBzaG93TWVudSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IEdyaWRDb21wb25lbnQpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljaygkZXZlbnQpIHtcclxuICAgIC8vIEZpbmQgYWxsIGhlYWRlciBjZWxsc1xyXG4gICAgW10uc2xpY2UuY2FsbCh0aGlzLmdyaWQuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtY2VsbC5tYXQtY29sdW1uLWFjdGlvbnMnKSlcclxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcclxuICAgICAgLmZpbHRlcihiID0+ICFiLmNvbnRhaW5zKCRldmVudC50YXJnZXQpKVxyXG4gICAgICAvLyBJZiBhbnkgcm93IGFjdGlvbiAobm90IGluY2x1ZGluZyBjdXJyZW50IHRhcmdldCkgaXMgbWFya2VkIGFzIG9wZW4sIGNsb3NlIGl0LlxyXG4gICAgICAuZm9yRWFjaChjZWxsID0+IHtcclxuICAgICAgICBjb25zdCByb3cgPSBjZWxsLmNsb3Nlc3QoJ21hdC1yb3cnKTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IFtdLnNsaWNlLmNhbGwocm93LmNsb3Nlc3QoJ21hdC10YWJsZScpLmNoaWxkcmVuKS5pbmRleE9mKHJvdykgLSAxOyAvLyAtIDEgYmVjYXVzZSBoZWFkZXIgaXMgYWxzbyBhIGNoaWxkLlxyXG4gICAgICAgIHRoaXMuZ3JpZC5kYXRhU291cmNlLmRiLmRhdGFTbmFwc2hvdFtpbmRleF0uc2hvd01lbnUgPSBmYWxzZTsgLy8gRmluZCByb3cgb2JqZWN0IGluIGRhdGFiYXNlIHNuYXBzaG90LCBhbmQgbWFyayBpdCBjbG9zZWQuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0VGFibGVNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlLCBNYXRSYWRpb01vZHVsZSwgTWF0RGF0ZXBpY2tlck1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR3JpZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3Rvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRSb3dNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG5cclxuICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0U29ydE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxyXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gICAgTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBHcmlkQ29tcG9uZW50LFxyXG4gICAgQ29sdW1uRGlyZWN0aXZlLFxyXG4gICAgR3JpZFRvb2xiYXJDb21wb25lbnQsXHJcbiAgICBHcmlkUm93TWVudUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgR3JpZENvbXBvbmVudCxcclxuICAgIENvbHVtbkRpcmVjdGl2ZSxcclxuICAgIEdyaWRUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgR3JpZFJvd01lbnVDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgRGF0ZVBpcGUsXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlLCBQUklNQVJZX09VVExFVCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBhcmFtczogUGFyYW1zO1xyXG4gIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtYnJlYWRjcnVtYicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2JyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcm91dGVNYXA6IElCcmVhZGNydW1iW107XHJcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMucm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKS5zdWJzY3JpYmUobmF2ID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ3VybCBjaGFuZ2VkJyk7XHJcbiAgICAgIGNvbnN0IHJvb3Q6IEFjdGl2YXRlZFJvdXRlID0gdGhpcy5yb3V0ZS5yb290O1xyXG4gICAgICB0aGlzLnJvdXRlTWFwID0gdGhpcy5nZXRCcmVhZGNydW1icyhyb290KTtcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYXJyYXkgb2YgSUJyZWFkY3J1bWIgb2JqZWN0cyB0aGF0IHJlcHJlc2VudCB0aGUgYnJlYWRjcnVtYlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvdXRlXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqIEBwYXJhbSBicmVhZGNydW1ic1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0QnJlYWRjcnVtYnMocm91dGU6IEFjdGl2YXRlZFJvdXRlLCB1cmw6IHN0cmluZz0gJycsIGJyZWFkY3J1bWJzOiBJQnJlYWRjcnVtYltdPSBbXSk6IElCcmVhZGNydW1iW10ge1xyXG4gICAgY29uc3QgUk9VVEVfREFUQV9CUkVBRENSVU1CID0gJ2JyZWFkY3J1bWInO1xyXG5cclxuICAgIC8vIGdldCB0aGUgY2hpbGQgcm91dGVzXHJcbiAgICBjb25zdCBjaGlsZHJlbjogQWN0aXZhdGVkUm91dGVbXSA9IHJvdXRlLmNoaWxkcmVuO1xyXG5cclxuICAgIC8vIHJldHVybiBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjaGlsZHJlblxyXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gYnJlYWRjcnVtYnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggY2hpbGRyZW5cclxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcclxuICAgICAgLy8gdmVyaWZ5IHByaW1hcnkgcm91dGVcclxuICAgICAgaWYgKGNoaWxkLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdmVyaWZ5IHRoZSBjdXN0b20gZGF0YSBwcm9wZXJ0eSBcImJyZWFkY3J1bWJcIiBpcyBzcGVjaWZpZWQgb24gdGhlIHJvdXRlXHJcbiAgICAgIGlmICghY2hpbGQuc25hcHNob3QuZGF0YS5oYXNPd25Qcm9wZXJ0eShST1VURV9EQVRBX0JSRUFEQ1JVTUIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBnZXQgdGhlIHJvdXRlJ3MgVVJMIHNlZ21lbnRcclxuICAgICAgY29uc3Qgcm91dGVVUkwgPSBjaGlsZC5zbmFwc2hvdC51cmwubWFwKHNlZ21lbnQgPT4gc2VnbWVudC5wYXRoKS5qb2luKCcvJyk7XHJcblxyXG4gICAgICAvLyBhcHBlbmQgcm91dGUgVVJMIHRvIFVSTFxyXG4gICAgICB1cmwgKz0gYC8ke3JvdXRlVVJMfWA7XHJcblxyXG4gICAgICAvLyBhZGQgYnJlYWRjcnVtYlxyXG4gICAgICBjb25zdCBicmVhZGNydW1iOiBJQnJlYWRjcnVtYiA9IHtcclxuICAgICAgICBsYWJlbDogY2hpbGQuc25hcHNob3QuZGF0YVtST1VURV9EQVRBX0JSRUFEQ1JVTUJdLFxyXG4gICAgICAgIHBhcmFtczogY2hpbGQuc25hcHNob3QucGFyYW1zLFxyXG4gICAgICAgIHVybDogdXJsXHJcbiAgICAgIH07XHJcbiAgICAgIGJyZWFkY3J1bWJzLnB1c2goYnJlYWRjcnVtYik7XHJcblxyXG4gICAgICAvLyByZWN1cnNpdmVcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlcnZpY2Uge1xyXG5cclxuICBhY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1BY3Rpb25zRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1mb3JtLWFjdGlvbnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWFjdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tYWN0aW9ucy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0NvbXBvbmVudCB7XHJcblxyXG4gIGdldCBhY3Rpb25zUmVmKCk6IFRlbXBsYXRlUmVmPGFueT4geyByZXR1cm4gdGhpcy50b29sYmFyU2VydmljZS5hY3Rpb25UZW1wbGF0ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvb2xiYXJTZXJ2aWNlOiBUb29sYmFyU2VydmljZSkgeyB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbGJhci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2luc3RhbnRGb3JtQWN0aW9uc0RlZl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdG9vbGJhcjogVG9vbGJhclNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudG9vbGJhci5hY3Rpb25UZW1wbGF0ZSA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUFjdGlvbnNEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0tYWN0aW9ucy9mb3JtLWFjdGlvbnMtZGVmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvb2xiYXJTZXJ2aWNlIH0gZnJvbSAnLi90b29sYmFyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW0JyZWFkY3J1bWJDb21wb25lbnQsIEZvcm1BY3Rpb25zQ29tcG9uZW50LCBGb3JtQWN0aW9uc0RlZkRpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbVG9vbGJhclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJmaWx0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWEsUUFBUSxHQUFHLFVBQVUsSUFBSSxFQUFFLElBQVUsRUFBRSxTQUFpQjtJQUE3QixxQkFBQSxFQUFBLFVBQVU7SUFBRSwwQkFBQSxFQUFBLGlCQUFpQjs7UUFDL0QsT0FBTztJQUNYLE9BQU87UUFBUyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzs7WUFDZixPQUFPLEdBQUcsSUFBSTs7WUFDZCxLQUFLLEdBQUc7WUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzth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