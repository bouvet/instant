/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQ25JLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQW1CMUUsTUFBTTs7O1lBakJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUVYLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO2dCQUM1RixPQUFPLEVBQUUsQ0FBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFFO2FBQ3hGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtcbiAgTWF0VGFibGVNb2R1bGUsIE1hdFNvcnRNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0TWVudU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHcmlkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbGJhci9ncmlkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRSb3dNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9yb3ctbWVudS9ncmlkLXJvdy1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG5cbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBHcmlkQ29tcG9uZW50LCBDb2x1bW5EaXJlY3RpdmUsIEdyaWRUb29sYmFyQ29tcG9uZW50LCBHcmlkUm93TWVudUNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIEdyaWRDb21wb25lbnQsIENvbHVtbkRpcmVjdGl2ZSwgR3JpZFRvb2xiYXJDb21wb25lbnQsIEdyaWRSb3dNZW51Q29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZE1vZHVsZSB7IH1cbiJdfQ==