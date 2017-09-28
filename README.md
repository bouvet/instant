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
import { InstantDataSource, InstantDatabase, FilterOption } from 'instant';

export class MyComponent {
  data = new InstantDataSource(new class extends InstantDatabase<any> {
    onRead (sort?: Sort, filter?: FilterOption) {
      // Read in data somehow, and call dataChange.next with the results
      this.dataChange.next([
        {id: 0, name: 'test'},
        {id: 1, name: 'tester'},
        {id: 2, name: 'test igjen'},
        {id: 3, name: 'ny test'},
      ]);
    }
  });
}
```
