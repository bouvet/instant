import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ToolbarService } from '../../toolbar';

@Component({
  selector: 'instant-demo-detail',
  templateUrl: './demo-detail.component.html',
  styleUrls: ['./demo-detail.component.scss']
})
export class DemoDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @ViewChild('actionsRef') actionsRef: TemplateRef<any>;

  constructor(private fb: FormBuilder, private toolbar: ToolbarService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'test': ['']
    });

    this.toolbar.actionTemplate = this.actionsRef;
  }

  ngOnDestroy() {
    this.toolbar.actionTemplate = null;
  }

  save() {
    console.log('Save clicked');
  }
}
