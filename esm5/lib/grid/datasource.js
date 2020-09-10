/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { debounce } from '../utils/debounce';
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
    /** @type {?} */
    InstantDatabase.prototype.dataReader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFBNEIsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUU3QyxpQ0FNQzs7OztBQUVELDRCQUVDOzs7O0FBRUQsNEJBRUM7Ozs7Ozs7QUFPRDs7Ozs7OztJQUEwQyw2Q0FBYTtJQUNyRCwyQkFBbUIsRUFBc0I7UUFBekMsWUFDRSxpQkFBTyxTQUNSO1FBRmtCLFFBQUUsR0FBRixFQUFFLENBQW9COztJQUV6QyxDQUFDOzs7O0lBQ0QsbUNBQU87OztJQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUM1QixDQUFDOzs7O0lBQ0Qsc0NBQVU7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBMEMsVUFBVSxHQVVuRDs7Ozs7Ozs7OztJQVRhLCtCQUE2Qjs7Ozs7Ozs7Ozs7QUFrQjNDOzs7Ozs7Ozs7O0lBQUE7UUFFVSxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRy9CLGlCQUFZLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR2pDLGVBQVUsR0FBeUIsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFHeEQsZUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBaUNsRCxDQUFDOzs7O0lBL0JDLGdDQUFNOzs7SUFBTjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7O0lBQ0QsbUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUNELGdDQUFNOzs7OztJQUFOLFVBQU8sSUFBYSxFQUFFLE1BQWUsSUFBRyxDQUFDOzs7OztJQUV6QyxvQ0FBVTs7OztJQUFWLFVBQVcsSUFBaUM7UUFBNUMsaUJBZ0JDO1FBZkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ25ELEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsc0RBQXNEO1lBQzNFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDN0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDekQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoRCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBRUgsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUFFO0lBQ3JDLENBQUM7SUFJSCxzQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7Ozs7Ozs7Ozs7Ozs7SUE1Q0MscUNBQStCOztJQUMvQixvQ0FBK0I7O0lBQy9CLDBDQUFzQzs7SUFFdEMsdUNBQW1FOztJQUNuRSxzQ0FBaUM7O0lBQ2pDLDRDQUF3Qzs7SUFFeEMscUNBQWdFOztJQUNoRSx1Q0FBYTs7SUFDYixnREFBNEM7O0lBQzVDLHFDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcclxuaW1wb3J0IHsgU29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICcuLi91dGlscy9kZWJvdW5jZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcclxuICBbZXZlbnQ6IHN0cmluZ106IHtcclxuICAgIGFjdGl2ZTogc3RyaW5nLFxyXG4gICAgZGlyZWN0aW9uPzogJ2FzYycgfCAnZGVzYycgfCAnJyxcclxuICAgIGZpbHRlcj86IGFueVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcclxuICBbY29sOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVyIHtcclxuICBbY29sOiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJyB8ICcnO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cclxuICogSXQgaG9sZHMgYW4gYEluc3RhbnREYXRhYmFzZWAgb2JqZWN0LCBhbmQgZGVsaXZlcmVzXHJcbiAqIGxpdmluZyBkYXRhIGZyb20gdGhpcyBvYmplY3QgdG8gdGhlIGdyaWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5zdGFudERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGI6IEluc3RhbnREYXRhYmFzZTxUPikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgY29ubmVjdCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcclxuICB9XHJcbiAgZGlzY29ubmVjdCgpIHtcclxuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQW4gb2JqZWN0IHJlc3BvbnNpYmxlIGZvciBsaXN0ZW5pbmcgZm9yIHVzZXIgY2hhbmdlcyBpblxyXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cclxuICpcclxuICogSW1wbGVtZW50b3JzIHNob3VsZCBsaXN0ZW4gZm9yIGV2ZW50cyBpbiB0aGUgYG9uQ2xpZW50Q2hhbmdlYFxyXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5zdGFudERhdGFiYXNlPFQ+IHtcclxuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XHJcbiAgcHJpdmF0ZSBzb3J0Q2FjaGU6IFNvcnRlciA9IHt9O1xyXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGZpbHRlckNoYW5nZTogT2JzZXJ2YWJsZTxDb2x1bW5GaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBwcml2YXRlIGZpbHRlckNhY2hlOiBGaWx0ZXIgPSB7fTtcclxuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGRhdGFDaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcclxuICBkYXRhU25hcHNob3Q7XHJcbiAgcHJpdmF0ZSBfZGF0YUNoYW5nZVN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGRhdGFSZWFkZXIgPSBkZWJvdW5jZSh0aGlzLm9uUmVhZCwgMTAwKTtcclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgdGhpcy5vblJlYWQoKTtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyID0gdGhpcy5kYXRhQ2hhbmdlLnN1YnNjcmliZShkYXRhID0+IHRoaXMuZGF0YVNuYXBzaG90ID0gZGF0YSk7XHJcbiAgfVxyXG4gIG9uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2RhdGFDaGFuZ2VTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxyXG5cclxuICBfY29uZmlndXJlKGFyZ3M6IFBhcnRpYWw8SW5zdGFudERhdGFiYXNlPFQ+Pikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcclxuXHJcbiAgICAvLyBPbiBhbnkgY2hhbmdlcywgcmVhZCBkYXRhXHJcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XHJcbiAgICAgIHRoaXMuc29ydENhY2hlID0ge307IC8vIFJlc2V0IGFsd2F5cy4gTXVsdGlwbGUgY29sdW1uIHNvcnQgaXMgTk9UIHN1cHBvcnRlZFxyXG4gICAgICB0aGlzLnNvcnRDYWNoZVtzb3J0LmFjdGl2ZV0gPSBzb3J0LmRpcmVjdGlvbjtcclxuICAgICAgdGhpcy5kYXRhUmVhZGVyKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlckNhY2hlW2ZpbHRlci5hY3RpdmVdID0gZmlsdGVyLmZpbHRlcjtcclxuICAgICAgdGhpcy5kYXRhUmVhZGVyKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEF0dGFjaGVkIHRvIGEgZ3JpZC4gUnVuIGluaXRcclxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XHJcbiAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG4iXX0=