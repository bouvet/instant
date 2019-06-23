import {AbstractFilterOption} from './abstract-filter-option';

export class DateFilterOption extends AbstractFilterOption {
  fromDate: Date = null;
  toDate: Date = null;
}
