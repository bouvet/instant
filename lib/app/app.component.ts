import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = new AppDataSource();

  onSortChanged($event) {
    console.log($event);
  }

  onFilterChanged($event) {
    console.log($event);
  }
}

export class AppDataSource extends DataSource<any> {
  connect(): Observable<any> {
    return Observable.of([
      {id: 0, name: 'test'},
      {id: 1, name: 'testing'},
      {id: 2, name: 'test more'},
      {id: 3, name: 'test again'},
    ]);
  }

  disconnect() {}
}
