/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
/**
 * @record
 */
export function IBreadcrumb() { }
function IBreadcrumb_tsickle_Closure_declarations() {
    /** @type {?} */
    IBreadcrumb.prototype.label;
    /** @type {?} */
    IBreadcrumb.prototype.params;
    /** @type {?} */
    IBreadcrumb.prototype.url;
}
var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(route, router) {
        this.route = route;
        this.router = router;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    BreadcrumbComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; })).subscribe(function (nav) {
            console.log('url changed');
            var /** @type {?} */ root = _this.route.root;
            _this.routeMap = _this.getBreadcrumbs(root);
        }));
    };
    /**
     * @return {?}
     */
    BreadcrumbComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (s) { if (s) {
            s.unsubscribe();
        } });
    };
    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param {?} route
     * @param {?=} url
     * @param {?=} breadcrumbs
     * @return {?}
     */
    BreadcrumbComponent.prototype.getBreadcrumbs = /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param {?} route
     * @param {?=} url
     * @param {?=} breadcrumbs
     * @return {?}
     */
    function (route, url, breadcrumbs) {
        if (url === void 0) { url = ''; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        var /** @type {?} */ ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        // get the child routes
        var /** @type {?} */ children = route.children;
        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }
        try {
            // iterate over each children
            for (var children_1 = tslib_1.__values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                // verify primary route
                if (child.outlet !== PRIMARY_OUTLET) {
                    continue;
                }
                // verify the custom data property "breadcrumb" is specified on the route
                if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                    return this.getBreadcrumbs(child, url, breadcrumbs);
                }
                // get the route's URL segment
                var /** @type {?} */ routeURL = child.snapshot.url.map(function (segment) { return segment.path; }).join('/');
                // append route URL to URL
                url += "/" + routeURL;
                // add breadcrumb
                var /** @type {?} */ breadcrumb = {
                    label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                    params: child.snapshot.params,
                    url: url
                };
                breadcrumbs.push(breadcrumb);
                // recursive
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    BreadcrumbComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instant-breadcrumb',
                    template: "<a [routerLink]=\"['/']\"><i class=\"fa far fa-fw fa-home\"></i></a>\n<a *ngFor=\"let route of routeMap\" [routerLink]=\"[route.url]\">{{ route.label }}</a>\n",
                    styles: [":host{flex:1}"]
                },] },
    ];
    /** @nocollapse */
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return BreadcrumbComponent;
}());
export { BreadcrumbComponent };
function BreadcrumbComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    BreadcrumbComponent.prototype.routeMap;
    /** @type {?} */
    BreadcrumbComponent.prototype.subscriptions;
    /** @type {?} */
    BreadcrumbComponent.prototype.route;
    /** @type {?} */
    BreadcrumbComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL3Rvb2xiYXIvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFVLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBb0J0Qyw2QkFBb0IsS0FBcUIsRUFBVSxNQUFjO1FBQTdDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTs2QkFGakMsRUFBRTtLQUVvQzs7OztJQUV0RSxzQ0FBUTs7O0lBQVI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzVHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0IscUJBQU0sSUFBSSxHQUFtQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM3QyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0MsQ0FBQyxDQUFDLENBQUM7S0FDTDs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRSxFQUFFLENBQUMsQ0FBQztLQUNsRTs7Ozs7Ozs7O0lBU08sNENBQWM7Ozs7Ozs7O2NBQUMsS0FBcUIsRUFBRSxHQUFlLEVBQUUsV0FBOEI7UUFBL0Msb0JBQUEsRUFBQSxRQUFlO1FBQUUsNEJBQUEsRUFBQSxnQkFBOEI7UUFDM0YscUJBQU0scUJBQXFCLEdBQUcsWUFBWSxDQUFDOztRQUczQyxxQkFBTSxRQUFRLEdBQXFCLEtBQUssQ0FBQyxRQUFRLENBQUM7O1FBR2xELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ3BCOztZQUVELDZCQUE2QjtZQUM3QixHQUFHLENBQUMsQ0FBZ0IsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQTtnQkFBdkIsSUFBTSxLQUFLLHFCQUFBOztnQkFFZCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLFFBQVEsQ0FBQztpQkFDVjs7Z0JBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ3JEOztnQkFHRCxxQkFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksRUFBWixDQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O2dCQUczRSxHQUFHLElBQUksTUFBSSxRQUFVLENBQUM7O2dCQUd0QixxQkFBTSxVQUFVLEdBQWdCO29CQUM5QixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7b0JBQ2pELE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU07b0JBQzdCLEdBQUcsRUFBRSxHQUFHO2lCQUNULENBQUM7Z0JBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Z0JBRzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDckQ7Ozs7Ozs7Ozs7OztnQkF4RUosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxnS0FFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzFCOzs7O2dCQWhCdUMsY0FBYztnQkFBN0MsTUFBTTs7OEJBRGY7O1NBa0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIEFjdGl2YXRlZFJvdXRlLCBQUklNQVJZX09VVExFVCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElCcmVhZGNydW1iIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBhcmFtczogUGFyYW1zO1xyXG4gIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2luc3RhbnQtYnJlYWRjcnVtYicsXHJcbiAgdGVtcGxhdGU6IGA8YSBbcm91dGVyTGlua109XCJbJy8nXVwiPjxpIGNsYXNzPVwiZmEgZmFyIGZhLWZ3IGZhLWhvbWVcIj48L2k+PC9hPlxyXG48YSAqbmdGb3I9XCJsZXQgcm91dGUgb2Ygcm91dGVNYXBcIiBbcm91dGVyTGlua109XCJbcm91dGUudXJsXVwiPnt7IHJvdXRlLmxhYmVsIH19PC9hPlxyXG5gLFxyXG4gIHN0eWxlczogW2A6aG9zdHtmbGV4OjF9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHJvdXRlTWFwOiBJQnJlYWRjcnVtYltdO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKG5hdiA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1cmwgY2hhbmdlZCcpO1xyXG4gICAgICBjb25zdCByb290OiBBY3RpdmF0ZWRSb3V0ZSA9IHRoaXMucm91dGUucm9vdDtcclxuICAgICAgdGhpcy5yb3V0ZU1hcCA9IHRoaXMuZ2V0QnJlYWRjcnVtYnMocm9vdCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFycmF5IG9mIElCcmVhZGNydW1iIG9iamVjdHMgdGhhdCByZXByZXNlbnQgdGhlIGJyZWFkY3J1bWJcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3V0ZVxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gYnJlYWRjcnVtYnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEJyZWFkY3J1bWJzKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXJsOiBzdHJpbmc9ICcnLCBicmVhZGNydW1iczogSUJyZWFkY3J1bWJbXT0gW10pOiBJQnJlYWRjcnVtYltdIHtcclxuICAgIGNvbnN0IFJPVVRFX0RBVEFfQlJFQURDUlVNQiA9ICdicmVhZGNydW1iJztcclxuXHJcbiAgICAvLyBnZXQgdGhlIGNoaWxkIHJvdXRlc1xyXG4gICAgY29uc3QgY2hpbGRyZW46IEFjdGl2YXRlZFJvdXRlW10gPSByb3V0ZS5jaGlsZHJlbjtcclxuXHJcbiAgICAvLyByZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cclxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGNoaWxkcmVuXHJcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XHJcbiAgICAgIC8vIHZlcmlmeSBwcmltYXJ5IHJvdXRlXHJcbiAgICAgIGlmIChjaGlsZC5vdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHZlcmlmeSB0aGUgY3VzdG9tIGRhdGEgcHJvcGVydHkgXCJicmVhZGNydW1iXCIgaXMgc3BlY2lmaWVkIG9uIHRoZSByb3V0ZVxyXG4gICAgICBpZiAoIWNoaWxkLnNuYXBzaG90LmRhdGEuaGFzT3duUHJvcGVydHkoUk9VVEVfREFUQV9CUkVBRENSVU1CKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZ2V0IHRoZSByb3V0ZSdzIFVSTCBzZWdtZW50XHJcbiAgICAgIGNvbnN0IHJvdXRlVVJMID0gY2hpbGQuc25hcHNob3QudXJsLm1hcChzZWdtZW50ID0+IHNlZ21lbnQucGF0aCkuam9pbignLycpO1xyXG5cclxuICAgICAgLy8gYXBwZW5kIHJvdXRlIFVSTCB0byBVUkxcclxuICAgICAgdXJsICs9IGAvJHtyb3V0ZVVSTH1gO1xyXG5cclxuICAgICAgLy8gYWRkIGJyZWFkY3J1bWJcclxuICAgICAgY29uc3QgYnJlYWRjcnVtYjogSUJyZWFkY3J1bWIgPSB7XHJcbiAgICAgICAgbGFiZWw6IGNoaWxkLnNuYXBzaG90LmRhdGFbUk9VVEVfREFUQV9CUkVBRENSVU1CXSxcclxuICAgICAgICBwYXJhbXM6IGNoaWxkLnNuYXBzaG90LnBhcmFtcyxcclxuICAgICAgICB1cmw6IHVybFxyXG4gICAgICB9O1xyXG4gICAgICBicmVhZGNydW1icy5wdXNoKGJyZWFkY3J1bWIpO1xyXG5cclxuICAgICAgLy8gcmVjdXJzaXZlXHJcbiAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19