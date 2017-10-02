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
<instant-grid-toolbar [page]="currentPage" [pageSize]="pageSize" (pageChange)="onPage($event)" [total]="total">
  My Grid header, or anything else you want up here.
</instant-grid-toolbar>
<instant-grid [dataSource]="data" class="striped">
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
import { InstantDataSource, InstantDatabase, Sorter, Filter } from 'instant';

export class AppComponent implements OnInit {
  currentPage = 0;
  pageSize = 10;
  total = 0;
  sort: Sorter;
  filter: Filter;
  data: InstantDataSource<any>;

  constructor() {  }

  ngOnInit() {
    // Data provider
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
      {id: 0, name: 'test',       type: 'SOMETHING', uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 1, name: 'tester',     type: 'ANYTHING',  uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 2, name: 'test igjen', type: 'WHAT?',     uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
      {id: 3, name: 'ny test',    type: 'NOTHING',   uuid: 'a0988-bfc865-a8cf89-fdc87cc'},
    ];
    setTimeout(() => {
      // setTimeout in order to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.total = data.length;
      this.data.db.dataChange.next(data);
    });
  }
}
```

**SCSS**

If your grid contains a lot of data, you might experience a column shift bug. This is a registerred bug and there exists a workaround for it.
Include the following scss in your styles:

```scss
// https://github.com/angular/material2/issues/6058#issuecomment-318612278
.mat-table {
  display: table !important;
  width: 100%;
  >.mat-header-row,
  >.mat-row {
    display: table-row;
    padding: 0;
    border: none;
    >.mat-header-cell,
    >.mat-cell {
      display: table-cell;
      height: 48px;
      vertical-align: middle;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
```

### Row menu

A row menu can be acheived by specifying a column to be non-sortable and non-filterable, and giving in a custom cell renderer.

**Example**

```html
<instant-grid [dataSource]="data" class="striped">
  <instant-column name="name"></instant-column>
  <instant-column name="type"></instant-column>
  <instant-column name="uuid"></instant-column>
  <instant-column name="actions" label="" [filterable]="false" [sortable]="false">
    <!-- Custom cell renderer -->
    <ng-template #cell let-row="row" let-col="col">
      <button md-icon-button (click)="row.showMenu = !row.showMenu"><i class="fa fa-fw fa-ellipsis-v"></i></button>
      <md-card *ngIf="row.showMenu">
        Your menu here!
      </md-card>
    </ng-template>
  </instant-column>
</instant-grid>
```

Add this to your controller
```ts
  constructor(private elRef: ElementRef) {  }

  @HostListener('click', ['$event'])
  onClick($event) {
    // Find all header cells
    [].slice.call(this.elRef.nativeElement.querySelectorAll('md-cell.mat-column-actions'))
      // Filter away current target
      .filter(b => !b.contains($event.target))
      // If any row action (not including current target) is marked as open, close it.
      .forEach(cell => {
        const row = cell.closest('md-row');
        const index = [].slice.call(row.closest('md-table').children).indexOf(row) - 1; // - 1 because header is also a child.
        this.data.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
      });
  }
```

```scss
::ng-deep [role="gridcell"] {
  position: relative;
}
md-card {
  position: absolute;
  z-index: 100;
  right: 0;
}
```
