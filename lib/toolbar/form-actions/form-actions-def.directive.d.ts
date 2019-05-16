import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { ToolbarService } from '../toolbar.service';
export declare class FormActionsDefDirective implements OnInit, OnDestroy {
    template: TemplateRef<any>;
    private toolbar;
    constructor(template: TemplateRef<any>, toolbar: ToolbarService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
