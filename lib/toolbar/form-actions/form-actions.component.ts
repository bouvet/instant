import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'instant-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent implements OnInit {

  get actionsRef() { return this.toolbarService.actionTemplate; }

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit() {

  }

}
