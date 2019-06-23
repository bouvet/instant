import { Input, Directive, TemplateRef, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {DefaultFilterOption} from './filter-option/default-filter-option';

export interface ColumnFilter {
  active: string;
  filter: any;
}

/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 *
 * 22.06.2019 ofsfrvor - Added support for different filter operators.
 *                       Added other input members (attribute, lookAttribute, lookupEntity, dataType, operator)
 *                       enabling control of the filter from the HTML tag.
 *                       TODO Need to implement language translation for the operator labels.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'instant-column'
})
export class ColumnDirective implements OnInit {
  // Inputs
  @Input() name: string;  // Unique identifier for this column.
  @Input() label: string; // Defaults to the identifier of column
  @Input() filterable = true;
  @Input() sortable = true;
  @Input() sticky = false;
  @Input('instant-style') instantStyle = {};
  @Input() operators: string[] = ['CONTAINS', 'STARTS_WITH', 'EQUALS', 'NOT_EQUALS', 'IS_NULL', 'IS_NOT_NULL'];
  @Input() attribute: string;
  @Input() lookupAttribute: string;
  @Input() lookupEntity: string;
  @Input() dataType: string;
  @Input() operator: string = this.operators && this.operators.length > 0 ? this.operators[0] : null;

  // Template refs
  @ContentChild('filter') filterRef: TemplateRef<any>;
  @ContentChild('cell') cellRef: TemplateRef<any>;

  // Filter properties
  filterOpen: boolean;
  isFilterSet: boolean = false;
  filter = new ReplaySubject<ColumnFilter>();
  filterValue: any;
  oldFilter: any;

  /**
   *
   */
  constructor() { }

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
   * @param filter The filter as received from the filter template
   */
  setFilter(filter: any, noEmit: boolean = false) {
    if (filter) {
      if (typeof(filter) === 'object') {
        // Filter is object => override filter attributes
        this.attribute = filter.hasOwnProperty('attribute') && filter.attribute && filter.attribute !== this.attribute ? filter.attribute : this.attribute;
        this.lookupAttribute = filter.hasOwnProperty('lookupAttribute') && filter.lookupAttribute && filter.lookupAttribute !== this.lookupAttribute ? filter.lookupAttribute : this.lookupAttribute;
        this.lookupEntity = filter.hasOwnProperty('lookupEntity') && filter.lookupEntity && filter.lookupEntity !== this.lookupEntity ? filter.lookupEntity : this.lookupEntity;
        this.operator = filter.hasOwnProperty('operator') && filter.operator && filter.operator !== this.operator ? filter.operator : this.operator;
        this.dataType = filter.hasOwnProperty('dataType') && filter.dataType && filter.dataType !== this.dataType ? filter.dataType : this.dataType;
      } else {
        // Filter is primitive => convert to default filter option
        filter = this.convertPrimitiveToFilter(filter);
      }
    }

    this.setFilterValue(filter, noEmit);

    // Have to do a null check on filter if the filter is to be emitted
    this.isFilterSet = noEmit === true ? filter !== null : true;
  }

  convertPrimitiveToFilter(key: string): any {
    const filter: DefaultFilterOption = new DefaultFilterOption();
    filter.attribute = this.attribute;
    filter.lookupAttribute = this.lookupAttribute;
    filter.lookupEntity = this.lookupEntity;
    filter.operator = this.operator;
    filter.key = key;
    filter.dataType = this.dataType;

    return filter;
  }

  setFilterValue(filter: any, noEmit: boolean = false) {
    if ((filter !== this.oldFilter) || (filter === null)) {
      // Clone current filter to old filter
      this.oldFilter = Object.assign({}, this.filterValue);
      this.filterValue = filter;
      if (!noEmit) {
        this.filter.next({active: this.name, filter: filter});
      }
    }

    this.filterOpen = false;
  }

  setOperator(operator: string) {
    this.operator = operator;
    if (this.filterValue && (typeof(this.filterValue) === 'object')) {
      this.filterValue.operator = operator;
    } else {
      this.filterValue = this.convertPrimitiveToFilter(null);
    }
    this.setFilterValue(this.filterValue);
    this.isFilterSet = true;
  }

  removeFilter() {
    // Default operator back to CONTAINS
    this.operator = 'CONTAINS';
    this.setFilterValue(null);
    this.isFilterSet = false;
  }
}

