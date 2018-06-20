/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule } from '@angular/material';
import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { GridToolbarComponent } from './toolbar/grid-toolbar.component';
import { GridRowMenuComponent } from './row-menu/grid-row-menu.component';
export class GridModule {
}
GridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    MatTableModule,
                    MatSortModule,
                    MatInputModule,
                    MatCardModule,
                    MatMenuModule,
                    MatButtonModule,
                    MatToolbarModule,
                    MatPaginatorModule,
                ],
                declarations: [GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent],
                exports: [GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQ25JLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQW1CMUUsTUFBTTs7O1lBakJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUVYLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO2dCQUM1RixPQUFPLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO2FBQ3hGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdE1lbnVNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdyaWRUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdFNvcnRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdLFxyXG4gIGV4cG9ydHM6IFsgR3JpZENvbXBvbmVudCwgQ29sdW1uRGlyZWN0aXZlLCBHcmlkVG9vbGJhckNvbXBvbmVudCwgR3JpZFJvd01lbnVDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZE1vZHVsZSB7IH1cclxuIl19