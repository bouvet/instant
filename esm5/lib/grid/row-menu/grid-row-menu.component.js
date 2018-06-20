/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            var /** @type {?} */ row = cell.closest('mat-row');
            var /** @type {?} */ index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1; // - 1 because header is also a child.
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
function GridRowMenuComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    GridRowMenuComponent.prototype.row;
    /** @type {?} */
    GridRowMenuComponent.prototype.icon;
    /** @type {?} */
    GridRowMenuComponent.prototype.showMenu;
    /** @type {?} */
    GridRowMenuComponent.prototype.grid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1yb3ctbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBb0JoRCw4QkFBb0IsSUFBbUI7UUFBbkIsU0FBSSxHQUFKLElBQUksQ0FBZTtvQkFKdkIsWUFBWTt3QkFFakIsS0FBSztLQUU0Qjs7OztJQUU1Qyx1Q0FBUTs7O0lBQVIsZUFBYzs7Ozs7SUFHZCxzQ0FBTzs7OztJQURQLFVBQ1EsTUFBTTtRQURkLGlCQVlDOztRQVRDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBRXpGLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQTFCLENBQTBCLENBQUM7YUFFdkMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNYLHFCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLHFCQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEYsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzlELENBQUMsQ0FBQztLQUNOOztnQkFsQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxvTkFPWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx5RUFBeUUsQ0FBQztpQkFDcEY7Ozs7Z0JBYlEsYUFBYTs7O3NCQWVuQixLQUFLO3VCQUNMLEtBQUs7MEJBUUwsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzsrQkF6QjVDOztTQWVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9ncmlkLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtZ3JpZC1yb3ctbWVudScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LW1lbnUgI3Jvd01lbnU9XCJtYXRNZW51XCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L21hdC1tZW51PlxyXG5cclxuPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJyb3dNZW51XCI+XHJcbiAgPGkgY2xhc3M9XCJmYSBmYXIgZmEtZncgZmEte3sgaWNvbiB9fVwiPjwvaT5cclxuPC9idXR0b24+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfW1hdC1jYXJke3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwO3JpZ2h0OjB9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRSb3dNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSByb3c7XHJcbiAgQElucHV0KCkgaWNvbiA9ICdlbGxpcHNpcy12JztcclxuXHJcbiAgc2hvd01lbnUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkQ29tcG9uZW50KSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uQ2xpY2soJGV2ZW50KSB7XHJcbiAgICAvLyBGaW5kIGFsbCBoZWFkZXIgY2VsbHNcclxuICAgIFtdLnNsaWNlLmNhbGwodGhpcy5ncmlkLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWF0LWNlbGwubWF0LWNvbHVtbi1hY3Rpb25zJykpXHJcbiAgICAgIC8vIEZpbHRlciBhd2F5IGN1cnJlbnQgdGFyZ2V0XHJcbiAgICAgIC5maWx0ZXIoYiA9PiAhYi5jb250YWlucygkZXZlbnQudGFyZ2V0KSlcclxuICAgICAgLy8gSWYgYW55IHJvdyBhY3Rpb24gKG5vdCBpbmNsdWRpbmcgY3VycmVudCB0YXJnZXQpIGlzIG1hcmtlZCBhcyBvcGVuLCBjbG9zZSBpdC5cclxuICAgICAgLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gY2VsbC5jbG9zZXN0KCdtYXQtcm93Jyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBbXS5zbGljZS5jYWxsKHJvdy5jbG9zZXN0KCdtYXQtdGFibGUnKS5jaGlsZHJlbikuaW5kZXhPZihyb3cpIC0gMTsgLy8gLSAxIGJlY2F1c2UgaGVhZGVyIGlzIGFsc28gYSBjaGlsZC5cclxuICAgICAgICB0aGlzLmdyaWQuZGF0YVNvdXJjZS5kYi5kYXRhU25hcHNob3RbaW5kZXhdLnNob3dNZW51ID0gZmFsc2U7IC8vIEZpbmQgcm93IG9iamVjdCBpbiBkYXRhYmFzZSBzbmFwc2hvdCwgYW5kIG1hcmsgaXQgY2xvc2VkLlxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19