import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';
import { GridModule, ToolbarModule } from 'instant';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DemoGridComponent,
    DemoDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

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
  bootstrap: [AppComponent]
})
export class AppModule { }
