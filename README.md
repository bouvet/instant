# Instant

Instant components for the second generation Angular framework.

## Components

### instant-grid

To include this in your project, do the following:

```
import { GridModule } from 'ng-instant';

@NgModule({
  imports: [
    GridModule
  ]
})
export class YourModule { }

```

To use it, do this:

**HTML**

```
<instant-grid [dataSource]="data" (sortChange)="onSortChanged($event)" (filterChange)="onFilterChanged($event)">
  <instant-column name="id" #idCol>
    <ng-template #filter>
      TEST
    </ng-template>
    <ng-template #cell let-row="row" let-col="col">{{ row[col] }}</ng-template>
  </instant-column>

  <instant-column name="name"></instant-column>
</instant-grid>
```

**Typescript**
```
export class MyComponent {
  data = new MyDataSource();

  onSortChanged($event) {
    console.log($event);
  }

  onFilterChanged($event) {
    console.log($event);
  }
}

export class MyDataSource extends DataSource<any> {
  connect(): Observable<any> {
    // Return an Observable for your data here
    return Observable.of([
      {id: 0, name: 'test'},
      {id: 1, name: 'testing'},
      {id: 2, name: 'test more'},
      {id: 3, name: 'test again'},
    ]);
  }

  disconnect() {}
}
```
