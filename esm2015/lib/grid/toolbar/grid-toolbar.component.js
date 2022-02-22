/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
export class GridToolbarComponent {
    constructor() {
        this.page = 0;
        this.pageChange = new EventEmitter();
        this.total = 0;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    pageHandler($event) {
        this.pageSize = $event.pageSize;
        this.page = $event.pageIndex;
        this.pageChange.emit($event);
    }
}
GridToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'instant-grid-toolbar',
                template: "<mat-toolbar>\r\n  <header>\r\n    <ng-content></ng-content>\r\n  </header>\r\n  <mat-paginator [length]=\"total\" [pageSize]=\"pageSize\" (page)=\"pageHandler($event)\" [pageSizeOptions]=\"pageSizeOptions\"> </mat-paginator>\r\n</mat-toolbar>\r\n",
                styles: ["mat-toolbar header{flex:1}.mat-paginator{background:0 0}"]
            }] }
];
/** @nocollapse */
GridToolbarComponent.ctorParameters = () => [];
GridToolbarComponent.propDecorators = {
    page: [{ type: Input }],
    pageChange: [{ type: Output }],
    total: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }]
};
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luc3RhbnQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRL0UsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQjtRQU5TLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDUixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUM1QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLG9CQUFlLEdBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV0QyxDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxNQUFpQjtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsbVFBQTRDOzthQUU3Qzs7Ozs7bUJBRUUsS0FBSzt5QkFDTCxNQUFNO29CQUNOLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzs7O0lBSk4sb0NBQWtCOztJQUNsQiwwQ0FBcUQ7O0lBQ3JELHFDQUFtQjs7SUFDbkIsd0NBQXVCOztJQUN2QiwrQ0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaW5zdGFudC1ncmlkLXRvb2xiYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dyaWQtdG9vbGJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcGFnZSA9IDA7XHJcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2VFdmVudD4oKTtcclxuICBASW5wdXQoKSB0b3RhbCA9IDA7XHJcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcclxuICBASW5wdXQoKSBwYWdlU2l6ZU9wdGlvbnM6IG51bWJlcltdID0gWzUsIDEwLCAyNSwgMTAwXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBwYWdlSGFuZGxlcigkZXZlbnQ6IFBhZ2VFdmVudCkge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9ICRldmVudC5wYWdlU2l6ZTtcclxuICAgIHRoaXMucGFnZSA9ICRldmVudC5wYWdlSW5kZXg7XHJcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=