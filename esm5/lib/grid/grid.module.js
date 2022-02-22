/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule, MatRadioModule, MatDatepickerModule } from '@angular/material';
import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { GridToolbarComponent } from './toolbar/grid-toolbar.component';
import { GridRowMenuComponent } from './row-menu/grid-row-menu.component';
var GridModule = /** @class */ (function () {
    function GridModule() {
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
                        MatRadioModule,
                        MatDatepickerModule,
                    ],
                    declarations: [
                        GridComponent,
                        ColumnDirective,
                        GridToolbarComponent,
                        GridRowMenuComponent
                    ],
                    exports: [
                        GridComponent,
                        ColumnDirective,
                        GridToolbarComponent,
                        GridRowMenuComponent
                    ],
                    providers: [
                        DatePipe,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return GridModule;
}());
export { GridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL2dyaWQvZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUNMLGNBQWMsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQ25ILGFBQWEsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQ25ELE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRTtJQUFBO0lBaUMwQixDQUFDOztnQkFqQzFCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUVYLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULFFBQVE7cUJBQ1Q7b0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDOztJQUN5QixpQkFBQztDQUFBLEFBakMzQixJQWlDMkI7U0FBZCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdFRhYmxlTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgTWF0TWVudU1vZHVsZSwgTWF0UmFkaW9Nb2R1bGUsIE1hdERhdGVwaWNrZXJNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEdyaWRUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sYmFyL2dyaWQtdG9vbGJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkUm93TWVudUNvbXBvbmVudCB9IGZyb20gJy4vcm93LW1lbnUvZ3JpZC1yb3ctbWVudS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdFNvcnRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICAgIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgR3JpZENvbXBvbmVudCxcclxuICAgIENvbHVtbkRpcmVjdGl2ZSxcclxuICAgIEdyaWRUb29sYmFyQ29tcG9uZW50LFxyXG4gICAgR3JpZFJvd01lbnVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEdyaWRDb21wb25lbnQsXHJcbiAgICBDb2x1bW5EaXJlY3RpdmUsXHJcbiAgICBHcmlkVG9vbGJhckNvbXBvbmVudCxcclxuICAgIEdyaWRSb3dNZW51Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIERhdGVQaXBlLFxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcmlkTW9kdWxlIHsgfVxyXG4iXX0=