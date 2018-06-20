import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo-detail',
  templateUrl: './demo-detail.component.html',
  styleUrls: ['./demo-detail.component.scss']
})
export class DemoDetailComponent implements OnInit {
  form: FormGroup;
  @ViewChild('actionsRef') actionsRef: TemplateRef<any>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'test': ['']
    });
  }

  save() {
    console.log('Save clicked');
  }
}
