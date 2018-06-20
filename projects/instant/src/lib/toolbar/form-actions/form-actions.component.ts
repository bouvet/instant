import { Component, ContentChildren, TemplateRef } from '@angular/core';
import { FormActionsDefDirective } from './form-actions-def.directive';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'instant-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent {

  get actionsRef(): TemplateRef<any> { return this.toolbarService.actionTemplate; }

  constructor(private toolbarService: ToolbarService) { }

}
