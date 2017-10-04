import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridModule } from '../grid';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdCardModule, MdTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class InstantModule { }
