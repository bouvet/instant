import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Sort } from '@angular/material';
import 'rxjs/add/observable/of';
import { InstantDataSource, InstantDatabase, FilterOption } from './grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data = new InstantDataSource(new class extends InstantDatabase<any> {
    onRead (sort?: Sort, filter?: FilterOption) {
      this.dataChange.next([
        {id: 0, name: 'test'},
        {id: 1, name: 'tester'},
        {id: 2, name: 'test igjen'},
        {id: 3, name: 'ny test'},
      ]);
    }
  });

  constructor() {  }

  ngOnInit() {  }
}
