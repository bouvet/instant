import { OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
export interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}
export declare class BreadcrumbComponent implements OnInit, OnDestroy {
    private route;
    private router;
    routeMap: IBreadcrumb[];
    subscriptions: Subscription[];
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @param route
     * @param url
     * @param breadcrumbs
     */
    private getBreadcrumbs(route, url?, breadcrumbs?);
}
