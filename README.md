# Instant

Instant components for the second generation Angular framework.

## Components

### instant-grid

To include this in your project, do the following:

```
import { GridModule } from 'instant';

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
<instant-grid-toolbar title="My Grid" [page]="currentPage" [pageSize]="pageSize" (pageChange)="onPage($event)" [total]="total"></instant-grid-toolbar>
<instant-grid [dataSource]="data">
  <instant-column name="id" #idCol label="Id field | translate">
    <ng-template #filter>
      Your custom filter template
    </ng-template>
    <ng-template #cell let-row="row" let-col="col">{{ row[col] }}</ng-template>
  </instant-column>

  <instant-column name="name"></instant-column>
</instant-grid>
```

**Typescript**
```
import { InstantDataSource, InstantDatabase, Sorter, Filter } from 'instant';

export class MyComponent {
  currentPage = 0;
  pageSize = 10;
  total = 0;
  sort: Sorter;
  filter: Filter;
  data: InstantDataSource<any>;

  ngOnInit() {
    const me = this;
    this.data = new InstantDataSource(new class extends InstantDatabase<any> {
      onRead (sort?: Sorter, filter?: Filter) {
        me.sort = sort;
        me.filter = filter;
        me.loadData();
      }
    });
  }

  onPage($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadData();
  }

  loadData() {
    // Load data
    const data = [
      {id: 0, name: 'test'},
      {id: 1, name: 'tester'},
      {id: 2, name: 'test igjen'},
      {id: 3, name: 'ny test'},
    ];
    this.data.db.dataChange.next(data);
    this.total = data.length;
  }
}
```
