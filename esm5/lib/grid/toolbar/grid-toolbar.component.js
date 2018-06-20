/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
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
                    template: "<mat-toolbar>\n  <header>\n    <ng-content></ng-content>\n  </header>\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\n</mat-toolbar>\n",
                    styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
                },] },
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
export { GridToolbarComponent };
function GridToolbarComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GridToolbarComponent.prototype.page;
    /** @type {?} */
    GridToolbarComponent.prototype.pageChange;
    /** @type {?} */
    GridToolbarComponent.prototype.total;
    /** @type {?} */
    GridToolbarComponent.prototype.pageSize;
    /** @type {?} */
    GridToolbarComponent.prototype.pageSizeOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBcUI3RTtvQkFOZ0IsQ0FBQzswQkFDTSxJQUFJLFlBQVksRUFBYTtxQkFDbkMsQ0FBQzt3QkFDRSxFQUFFOytCQUNlLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO0tBRXBDOzs7O0lBRWpCLHVDQUFROzs7SUFBUjtLQUNDOzs7OztJQUVELDBDQUFXOzs7O0lBQVgsVUFBWSxNQUFpQjtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCOztnQkEzQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSw2T0FNWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztpQkFDckU7Ozs7O3VCQUVFLEtBQUs7NkJBQ0wsTUFBTTt3QkFDTixLQUFLOzJCQUNMLEtBQUs7a0NBQ0wsS0FBSzs7K0JBbkJSOztTQWNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtdG9vbGJhcicsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXI+XHJcbiAgPGhlYWRlcj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L2hlYWRlcj5cclxuICA8bWF0LXBhZ2luYXRvciBbbGVuZ3RoXT1cInRvdGFsXCIgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCIgKHBhZ2UpPVwicGFnZUhhbmRsZXIoJGV2ZW50KVwiIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCI+IDwvbWF0LXBhZ2luYXRvcj5cclxuPC9tYXQtdG9vbGJhcj5cclxuYCxcclxuICBzdHlsZXM6IFtgbWF0LXRvb2xiYXIgaGVhZGVye2ZsZXg6MX0ubWF0LXBhZ2luYXRvcntiYWNrZ3JvdW5kOjAgMH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHBhZ2UgPSAwO1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XHJcbiAgQElucHV0KCkgdG90YWwgPSAwO1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplID0gMTA7XHJcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFs1LCAxMCwgMjUsIDEwMF07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgcGFnZUhhbmRsZXIoJGV2ZW50OiBQYWdlRXZlbnQpIHtcclxuICAgIHRoaXMucGFnZVNpemUgPSAkZXZlbnQucGFnZVNpemU7XHJcbiAgICB0aGlzLnBhZ2UgPSAkZXZlbnQucGFnZUluZGV4O1xyXG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19