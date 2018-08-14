/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, HostListener } from '@angular/core';
import { GridComponent } from '../grid.component';
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
            .filter(function (b) { return !b.contains($event.target); })
            .forEach(function (cell) {
            /** @type {?} */
            var row = cell.closest('mat-row');
            /** @type {?} */
            var index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1; // - 1 because header is also a child.
            _this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
        });
    };
    GridRowMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-grid-row-menu',
                    template: "<mat-menu #rowMenu=\"matMenu\">\n  <ng-content></ng-content>\n</mat-menu>\n\n<button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowMenu\">\n  <i class=\"fa far fa-fw fa-{{ icon }}\"></i>\n</button>\n",
                    styles: [":host{position:relative}mat-card{position:absolute;z-index:100;right:0}"]
                },] },
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
export { GridRowMenuComponent };
if (false) {
    /** @type {?} */
    GridRowMenuComponent.prototype.row;
    /** @type {?} */
    GridRowMenuComponent.prototype.icon;
    /** @type {?} */
    GridRowMenuComponent.prototype.showMenu;
    /** @type {?} */
    GridRowMenuComponent.prototype.grid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBb0JoRCw4QkFBb0IsSUFBbUI7UUFBbkIsU0FBSSxHQUFKLElBQUksQ0FBZTtvQkFKdkIsWUFBWTt3QkFFakIsS0FBSztLQUU0Qjs7OztJQUU1Qyx1Q0FBUTs7O0lBQVIsZUFBYzs7Ozs7SUFHZCxzQ0FBTzs7OztJQURQLFVBQ1EsTUFBTTtRQURkLGlCQVlDOztRQVRDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBRXpGLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLENBQUM7YUFFdkMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7WUFDWCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUNwQyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEYsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzlELENBQUMsQ0FBQztLQUNOOztnQkFsQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxvTkFPWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx5RUFBeUUsQ0FBQztpQkFDcEY7Ozs7Z0JBYlEsYUFBYTs7O3NCQWVuQixLQUFLO3VCQUNMLEtBQUs7MEJBUUwsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzsrQkF6QjVDOztTQWVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZ3JpZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnN0YW50LWdyaWQtcm93LW1lbnUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtbWVudSAjcm93TWVudT1cIm1hdE1lbnVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9tYXQtbWVudT5cblxuPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJyb3dNZW51XCI+XG4gIDxpIGNsYXNzPVwiZmEgZmFyIGZhLWZ3IGZhLXt7IGljb24gfX1cIj48L2k+XG48L2J1dHRvbj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZX1tYXQtY2FyZHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRSb3dNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcm93O1xuICBASW5wdXQoKSBpY29uID0gJ2VsbGlwc2lzLXYnO1xuXG4gIHNob3dNZW51ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkQ29tcG9uZW50KSB7IH1cblxuICBuZ09uSW5pdCgpIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljaygkZXZlbnQpIHtcbiAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcbiAgICBbXS5zbGljZS5jYWxsKHRoaXMuZ3JpZC5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21hdC1jZWxsLm1hdC1jb2x1bW4tYWN0aW9ucycpKVxuICAgICAgLy8gRmlsdGVyIGF3YXkgY3VycmVudCB0YXJnZXRcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcbiAgICAgIC8vIElmIGFueSByb3cgYWN0aW9uIChub3QgaW5jbHVkaW5nIGN1cnJlbnQgdGFyZ2V0KSBpcyBtYXJrZWQgYXMgb3BlbiwgY2xvc2UgaXQuXG4gICAgICAuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gY2VsbC5jbG9zZXN0KCdtYXQtcm93Jyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gW10uc2xpY2UuY2FsbChyb3cuY2xvc2VzdCgnbWF0LXRhYmxlJykuY2hpbGRyZW4pLmluZGV4T2Yocm93KSAtIDE7IC8vIC0gMSBiZWNhdXNlIGhlYWRlciBpcyBhbHNvIGEgY2hpbGQuXG4gICAgICAgIHRoaXMuZ3JpZC5kYXRhU291cmNlLmRiLmRhdGFTbmFwc2hvdFtpbmRleF0uc2hvd01lbnUgPSBmYWxzZTsgLy8gRmluZCByb3cgb2JqZWN0IGluIGRhdGFiYXNlIHNuYXBzaG90LCBhbmQgbWFyayBpdCBjbG9zZWQuXG4gICAgICB9KTtcbiAgfVxufVxuIl19