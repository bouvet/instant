import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatTableModule } from '@angular/material';

import { DemoComponent } from './demo.component';
import { GridModule } from '../grid';
import { ToolbarModule } from '../toolbar';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';

@NgModule({
  declarations: [
    DemoComponent,
    DemoGridComponent,
    DemoDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', component: DemoGridComponent, data: { breadcrumb: 'list' }},
      {path: ':id', component: DemoDetailComponent, data: { breadcrumb: 'detail' }}
    ]),

    // Material Design modules
    MatButtonModule,
    MatCardModule,

    // Instant modules
    GridModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }
