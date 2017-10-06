import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { ToolbarService } from './toolbar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ToolbarComponent, BreadcrumbComponent, FormActionsComponent],
  exports: [ToolbarComponent, BreadcrumbComponent, FormActionsComponent],
  providers: [ToolbarService]
})
export class ToolbarModule { }
