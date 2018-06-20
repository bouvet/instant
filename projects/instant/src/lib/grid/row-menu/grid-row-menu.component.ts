import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'instant-grid-row-menu',
  templateUrl: './grid-row-menu.component.html',
  styleUrls: ['./grid-row-menu.component.scss']
})
export class GridRowMenuComponent implements OnInit {
  @Input() row;
  @Input() icon = 'ellipsis-v';

  showMenu = false;

  constructor(private grid: GridComponent) { }

  ngOnInit() { }

  @HostListener('document:click', ['$event'])
  onClick($event) {
    // Find all header cells
    [].slice.call(this.grid.elRef.nativeElement.querySelectorAll('mat-cell.mat-column-actions'))
      // Filter away current target
      .filter(b => !b.contains($event.target))
      // If any row action (not including current target) is marked as open, close it.
      .forEach(cell => {
        const row = cell.closest('mat-row');
        const index = [].slice.call(row.closest('mat-table').children).indexOf(row) - 1; // - 1 because header is also a child.
        this.grid.dataSource.db.dataSnapshot[index].showMenu = false; // Find row object in database snapshot, and mark it closed.
      });
  }
}
