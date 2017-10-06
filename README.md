# Instant

Instant components for the second generation Angular framework.

## Components

### instant-grid

To include this in your project, do the following:

```ts
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

```html
<instant-grid-toolbar [page]="currentPage" [pageSize]="pageSize" [total]="total" (pageChange)="onPage($event)">
  My Grid header, or anything else you want up here.
</instant-grid-toolbar>
<instant-grid [dataSource]="data" class="striped" (rowClick)="rowClicked($event)">
  <instant-column name="id" #idCol>
    <!-- Custom filter -->
    <ng-template #filter let-col="col">
      Your custom filtering markup. You must support any user choices made here
      by transmitting change to: col.setFilter(anyValues);
    </ng-template>
    <!-- Custom cell renderer -->
    <ng-template #cell let-row="row" let-col="col">{{ row[col] }}</ng-template>
  </instant-column>

  <instant-column name="name"></instant-column>
  <instant-column name="type"></instant-column>
  <instant-column name="uuid"></instant-column>
</instant-grid>
```

**Typescript**
```ts
import { InstantDataSource, InstantDatabase, Sorter, Filter, RowClickEvent } from 'instant';

export class AppComponent implements OnInit {
  currentPage = 0;
  pageSize = 10;
  total = 0;
  sort: Sorter;
  filter: Filter;
  data: InstantDataSource<any>;

  constructor(private backendService: MyService) {  }

  ngOnInit() {
    // Data provider
    const me = this;
    this.data = new InstantDataSource(new class extends InstantDatabase<any> {
      onRead (sort?: Sorter, filter?: Filter) {
        me.sort = sort; me.filter = filter;
        me.loadData();
      }
    });
  }

  onPage($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadData();
  }

  rowClicked(row: RowClickEvent) {
    console.log('From col: ', row.colName, row.data);
  }

  loadData() {
    this.backendService.loadData().subscribe(data => {
      setTimeout(() => {
        // setTimeout in order to avoid ExpressionChangedAfterItHasBeenCheckedError
        this.total = data.length;
        this.data.db.dataChange.next(data); // Set data back to grid
      });
    });
  }
}
```

### Row menu

A row menu can be acheived by specifying a column to be non-sortable and non-filterable, and giving in a custom cell renderer.

**Example**

```html
  <instant-column name="actions" label="" [filterable]="false" [sortable]="false">
    <!-- Custom cell renderer -->
    <ng-template #cell let-row="row" let-col="col">
      <instant-grid-row-menu [row]="row">
        Your menu here!
      </instant-grid-row-menu>
    </ng-template>
  </instant-column>
```

