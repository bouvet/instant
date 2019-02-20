/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
export class InstantDataSource extends DataSource {
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
export class InstantDatabase {
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
    onRead(sort, filter) { }
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
        this._filterSubscriber = this.filterChange.subscribe(filter => {
            this.filterCache[filter.active] = filter.filter;
            this.onRead(this.sortCache, this.filterCache);
        });
        // Attached to a grid. Run init
        if (this.onInit) {
            this.onInit();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUE0QixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFHakUsaUNBTUM7Ozs7QUFFRCw0QkFFQzs7OztBQUVELDRCQUVDOzs7Ozs7O0FBT0QsTUFBTSxPQUFPLGlCQUFxQixTQUFRLFVBQWE7Ozs7SUFDckQsWUFBbUIsRUFBc0I7UUFDdkMsS0FBSyxFQUFFLENBQUM7UUFEUyxPQUFFLEdBQUYsRUFBRSxDQUFvQjtJQUV6QyxDQUFDOzs7O0lBQ0QsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDNUIsQ0FBQzs7OztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjs7O0lBVGEsK0JBQTZCOzs7Ozs7Ozs7OztBQWtCM0MsTUFBTSxPQUFnQixlQUFlO0lBQXJDO1FBRVUsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUcvQixpQkFBWSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUdqQyxlQUFVLEdBQXlCLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDO0lBZ0NsRSxDQUFDOzs7O0lBNUJDLE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzNGLENBQUM7Ozs7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUNELE1BQU0sQ0FBQyxJQUFhLEVBQUUsTUFBZSxJQUFHLENBQUM7Ozs7O0lBRXpDLFVBQVUsQ0FBQyxJQUFpQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHNEQUFzRDtZQUMzRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUFFO0lBQ3JDLENBQUM7Q0FDRjs7O0lBeENDLHFDQUErQjs7SUFDL0Isb0NBQStCOztJQUMvQiwwQ0FBc0M7O0lBRXRDLHVDQUFtRTs7SUFDbkUsc0NBQWlDOztJQUNqQyw0Q0FBd0M7O0lBRXhDLHFDQUFnRTs7SUFDaEUsdUNBQWE7O0lBQ2IsZ0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW4uZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XG4gIFtldmVudDogc3RyaW5nXToge1xuICAgIGFjdGl2ZTogc3RyaW5nLFxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXG4gICAgZmlsdGVyPzogYW55XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgW2NvbDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XG4gIFtjb2w6IHN0cmluZ106ICdhc2MnIHwgJ2Rlc2MnIHwgJyc7XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgb2JqZWN0IHRoZSBNYXQgVGFibGUgYWN0dWFsbHkgdXNlcy5cbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xuICogbGl2aW5nIGRhdGEgZnJvbSB0aGlzIG9iamVjdCB0byB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYjogSW5zdGFudERhdGFiYXNlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZGIuZGF0YUNoYW5nZTtcbiAgfVxuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGIub25EZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVzcG9uc2libGUgZm9yIGxpc3RlbmluZyBmb3IgdXNlciBjaGFuZ2VzIGluXG4gKiB0aGUgZ3JpZCwgYW5kIG1vZGlmeWluZyB0aGUgZGF0YSBhY2NvcmRpbmdseS5cbiAqXG4gKiBJbXBsZW1lbnRvcnMgc2hvdWxkIGxpc3RlbiBmb3IgZXZlbnRzIGluIHRoZSBgb25DbGllbnRDaGFuZ2VgXG4gKiBtZXRob2QgYW5kIGRlbGl2YXIgZGF0YSB0byB0aGUgYGRhdGFDaGFuZ2VgIFN1YmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnN0YW50RGF0YWJhc2U8VD4ge1xuICBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD47XG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gIHByaXZhdGUgZmlsdGVyQ2FjaGU6IEZpbHRlciA9IHt9O1xuICBwcml2YXRlIF9maWx0ZXJTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PFRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBkYXRhU25hcHNob3Q7XG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgb25Jbml0KCkge1xuICAgIHRoaXMub25SZWFkKCk7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIgPSB0aGlzLmRhdGFDaGFuZ2Uuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5kYXRhU25hcHNob3QgPSBkYXRhKTtcbiAgfVxuICBvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGF0YUNoYW5nZVN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgfVxuICBvblJlYWQoc29ydD86IFNvcnRlciwgZmlsdGVyPzogRmlsdGVyKSB7fVxuXG4gIF9jb25maWd1cmUoYXJnczogUGFydGlhbDxJbnN0YW50RGF0YWJhc2U8VD4+KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcblxuICAgIC8vIE9uIGFueSBjaGFuZ2VzLCByZWFkIGRhdGFcbiAgICB0aGlzLl9zb3J0U3Vic2NyaWJlciA9IHRoaXMuc29ydENoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcbiAgICAgIHRoaXMuc29ydENhY2hlW3NvcnQuYWN0aXZlXSA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIgPSB0aGlzLmZpbHRlckNoYW5nZS5zdWJzY3JpYmUoZmlsdGVyID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyQ2FjaGVbZmlsdGVyLmFjdGl2ZV0gPSBmaWx0ZXIuZmlsdGVyO1xuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxuICAgIGlmICh0aGlzLm9uSW5pdCkgeyB0aGlzLm9uSW5pdCgpOyB9XG4gIH1cbn1cblxuIl19