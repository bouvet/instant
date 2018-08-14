/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
/**
 * @record
 */
export function ChangeEvent() { }
/**
 * @record
 */
export function Filter() { }
/**
 * @record
 */
export function Sorter() { }
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
 */
InstantDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(InstantDataSource, _super);
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
 * This is the object the Mat Table actually uses.
 * It holds an `InstantDatabase` object, and deliveres
 * living data from this object to the grid.
 * @template T
 */
export { InstantDataSource };
if (false) {
    /** @type {?} */
    InstantDataSource.prototype.db;
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
var /**
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
            _this.onRead(_this.sortCache, _this.filterCache);
        });
        this._filterSubscriber = this.filterChange.subscribe(function (filter) {
            _this.filterCache[filter.active] = filter.filter;
            _this.onRead(_this.sortCache, _this.filterCache);
        });
        // Attached to a grid. Run init
        if (this.onInit) {
            this.onInit();
        }
    };
    return InstantDatabase;
}());
/**
 * An object responsible for listening for user changes in
 * the grid, and modifying the data accordingly.
 *
 * Implementors should listen for events in the `onClientChange`
 * method and delivar data to the `dataChange` Subject.
 * @abstract
 * @template T
 */
export { InstantDatabase };
if (false) {
    /** @type {?} */
    InstantDatabase.prototype.sortChange;
    /** @type {?} */
    InstantDatabase.prototype.sortCache;
    /** @type {?} */
    InstantDatabase.prototype._sortSubscriber;
    /** @type {?} */
    InstantDatabase.prototype.filterChange;
    /** @type {?} */
    InstantDatabase.prototype.filterCache;
    /** @type {?} */
    InstantDatabase.prototype._filterSubscriber;
    /** @type {?} */
    InstantDatabase.prototype.dataChange;
    /** @type {?} */
    InstantDatabase.prototype.dataSnapshot;
    /** @type {?} */
    InstantDatabase.prototype._dataChangeSubscriber;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFBNEIsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JqRTs7Ozs7O0FBQUE7SUFBMEMsNkNBQWE7SUFDckQsMkJBQW1CLEVBQXNCO1FBQXpDLFlBQ0UsaUJBQU8sU0FDUjtRQUZrQixRQUFFLEdBQUYsRUFBRSxDQUFvQjs7S0FFeEM7Ozs7SUFDRCxtQ0FBTzs7O0lBQVA7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDM0I7Ozs7SUFDRCxzQ0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3JCOzRCQXBDSDtFQTJCMEMsVUFBVSxFQVVuRCxDQUFBOzs7Ozs7O0FBVkQsNkJBVUM7Ozs7Ozs7Ozs7Ozs7O0FBU0Q7Ozs7Ozs7OztBQUFBOzt5QkFFOEIsRUFBRTs0QkFHVyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUM7MkJBQ3BDLEVBQUU7MEJBR0csSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDOzs7OztJQUkvRCxnQ0FBTTs7O0lBQU47UUFBQSxpQkFHQztRQUZDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7S0FDMUY7Ozs7SUFDRCxtQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEM7Ozs7OztJQUNELGdDQUFNOzs7OztJQUFOLFVBQU8sSUFBYSxFQUFFLE1BQWUsS0FBSTs7Ozs7SUFFekMsb0NBQVU7Ozs7SUFBVixVQUFXLElBQWlDO1FBQTVDLGlCQWdCQztRQWZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUcxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNuRCxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6RCxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hELEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDOztRQUdILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQUU7S0FDcEM7MEJBdEZIO0lBdUZDLENBQUE7Ozs7Ozs7Ozs7QUF6Q0QsMkJBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgb25Jbml0KCkge1xuICAgIHRoaXMub25SZWFkKCk7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIgPSB0aGlzLmRhdGFDaGFuZ2Uuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5kYXRhU25hcHNob3QgPSBkYXRhKTtcbiAgfVxuICBvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgfVxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxuXG4gIF9jb25maWd1cmUoYXJnczogUGFydGlhbDxJbnN0YW50RGF0YWJhc2U8VD4+KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcblxuICAgIC8vIE9uIGFueSBjaGFuZ2VzLCByZWFkIGRhdGFcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcbiAgICAgIHRoaXMuc29ydENhY2hlW3NvcnQuYWN0aXZlXSA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIgPSB0aGlzLmZpbHRlckNoYW5nZS5zdWJzY3JpYmUoZmlsdGVyID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyQ2FjaGVbZmlsdGVyLmFjdGl2ZV0gPSBmaWx0ZXIuZmlsdGVyO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cbn1cblxuIl19