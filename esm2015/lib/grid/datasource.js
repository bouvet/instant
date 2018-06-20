/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
/**
 * @record
 */
export function ChangeEvent() { }
function ChangeEvent_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [event: string]: {
        active: string,
        direction?: 'asc' | 'desc' | '',
        filter?: any
      };
    */
}
/**
 * @record
 */
export function Filter() { }
function Filter_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [col: string]: any;
    */
}
/**
 * @record
 */
export function Sorter() { }
function Sorter_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [col: string]: 'asc' | 'desc' | '';
    */
}
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
function InstantDataSource_tsickle_Closure_declarations() {
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
function InstantDatabase_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kYXRhc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUE0QixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JqRSxNQUFNLHdCQUE0QixTQUFRLFVBQWE7Ozs7SUFDckQsWUFBbUIsRUFBc0I7UUFDdkMsS0FBSyxFQUFFLENBQUM7UUFEUyxPQUFFLEdBQUYsRUFBRSxDQUFvQjtLQUV4Qzs7OztJQUNELE9BQU87UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDM0I7Ozs7SUFDRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNyQjtDQUNGOzs7Ozs7Ozs7Ozs7OztBQVNELE1BQU07O3lCQUV3QixFQUFFOzRCQUdXLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQzsyQkFDcEMsRUFBRTswQkFHRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUM7Ozs7O0lBSS9ELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzFGOzs7O0lBQ0QsU0FBUztRQUNQLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7O0lBQ0QsTUFBTSxDQUFDLElBQWEsRUFBRSxNQUFlLEtBQUk7Ozs7O0lBRXpDLFVBQVUsQ0FBQyxJQUFpQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7UUFHMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7O1FBR0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FBRTtLQUNwQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xyXG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb2x1bW5GaWx0ZXIgfSBmcm9tICcuL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VFdmVudCB7XHJcbiAgW2V2ZW50OiBzdHJpbmddOiB7XHJcbiAgICBhY3RpdmU6IHN0cmluZyxcclxuICAgIGRpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnIHwgJycsXHJcbiAgICBmaWx0ZXI/OiBhbnlcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlciB7XHJcbiAgW2NvbDogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNvcnRlciB7XHJcbiAgW2NvbDogc3RyaW5nXTogJ2FzYycgfCAnZGVzYycgfCAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIG9iamVjdCB0aGUgTWF0IFRhYmxlIGFjdHVhbGx5IHVzZXMuXHJcbiAqIEl0IGhvbGRzIGFuIGBJbnN0YW50RGF0YWJhc2VgIG9iamVjdCwgYW5kIGRlbGl2ZXJlc1xyXG4gKiBsaXZpbmcgZGF0YSBmcm9tIHRoaXMgb2JqZWN0IHRvIHRoZSBncmlkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEluc3RhbnREYXRhU291cmNlPFQ+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRiOiBJbnN0YW50RGF0YWJhc2U8VD4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgIHJldHVybiB0aGlzLmRiLmRhdGFDaGFuZ2U7XHJcbiAgfVxyXG4gIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICB0aGlzLmRiLm9uRGVzdHJveSgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIG9iamVjdCByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciB1c2VyIGNoYW5nZXMgaW5cclxuICogdGhlIGdyaWQsIGFuZCBtb2RpZnlpbmcgdGhlIGRhdGEgYWNjb3JkaW5nbHkuXHJcbiAqXHJcbiAqIEltcGxlbWVudG9ycyBzaG91bGQgbGlzdGVuIGZvciBldmVudHMgaW4gdGhlIGBvbkNsaWVudENoYW5nZWBcclxuICogbWV0aG9kIGFuZCBkZWxpdmFyIGRhdGEgdG8gdGhlIGBkYXRhQ2hhbmdlYCBTdWJqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RhbnREYXRhYmFzZTxUPiB7XHJcbiAgc29ydENoYW5nZTogRXZlbnRFbWl0dGVyPFNvcnQ+O1xyXG4gIHByaXZhdGUgc29ydENhY2hlOiBTb3J0ZXIgPSB7fTtcclxuICBwcml2YXRlIF9zb3J0U3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBmaWx0ZXJDaGFuZ2U6IE9ic2VydmFibGU8Q29sdW1uRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJDYWNoZTogRmlsdGVyID0ge307XHJcbiAgcHJpdmF0ZSBfZmlsdGVyU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8VFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XHJcbiAgZGF0YVNuYXBzaG90O1xyXG4gIHByaXZhdGUgX2RhdGFDaGFuZ2VTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIHRoaXMub25SZWFkKCk7XHJcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlciA9IHRoaXMuZGF0YUNoYW5nZS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLmRhdGFTbmFwc2hvdCA9IGRhdGEpO1xyXG4gIH1cclxuICBvbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kYXRhQ2hhbmdlU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX2ZpbHRlclN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgb25SZWFkKHNvcnQ/OiBTb3J0ZXIsIGZpbHRlcj86IEZpbHRlcikge31cclxuXHJcbiAgX2NvbmZpZ3VyZShhcmdzOiBQYXJ0aWFsPEluc3RhbnREYXRhYmFzZTxUPj4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XHJcblxyXG4gICAgLy8gT24gYW55IGNoYW5nZXMsIHJlYWQgZGF0YVxyXG4gICAgdGhpcy5fc29ydFN1YnNjcmliZXIgPSB0aGlzLnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xyXG4gICAgICB0aGlzLnNvcnRDYWNoZSA9IHt9OyAvLyBSZXNldCBhbHdheXMuIE11bHRpcGxlIGNvbHVtbiBzb3J0IGlzIE5PVCBzdXBwb3J0ZWRcclxuICAgICAgdGhpcy5zb3J0Q2FjaGVbc29ydC5hY3RpdmVdID0gc29ydC5kaXJlY3Rpb247XHJcbiAgICAgIHRoaXMub25SZWFkKHRoaXMuc29ydENhY2hlLCB0aGlzLmZpbHRlckNhY2hlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZmlsdGVyU3Vic2NyaWJlciA9IHRoaXMuZmlsdGVyQ2hhbmdlLnN1YnNjcmliZShmaWx0ZXIgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlckNhY2hlW2ZpbHRlci5hY3RpdmVdID0gZmlsdGVyLmZpbHRlcjtcclxuICAgICAgdGhpcy5vblJlYWQodGhpcy5zb3J0Q2FjaGUsIHRoaXMuZmlsdGVyQ2FjaGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXR0YWNoZWQgdG8gYSBncmlkLiBSdW4gaW5pdFxyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7IHRoaXMub25Jbml0KCk7IH1cclxuICB9XHJcbn1cclxuXHJcbiJdfQ==