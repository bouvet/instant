import { Directive, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { ToolbarService } from '../toolbar.service';

@Directive({
  selector: '[instantFormActionsDef]'
})
export class FormActionsDefDirective implements OnInit, OnDestroy {
  constructor(public template: TemplateRef<any>, private toolbar: ToolbarService) { }

  ngOnInit() {
    this.toolbar.actionTemplate = this.template;
  }

  ngOnDestroy() {
    this.toolbar.actionTemplate = null;
  }
}
