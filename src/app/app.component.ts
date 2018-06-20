import { Component, OnInit, HostListener, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';

import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor() {  }

  ngOnInit() {

  }
}
