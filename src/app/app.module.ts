import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, AddEmpDialogComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import '../polyfills';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';
import {NGMaterialModule} from '../ng-material-module';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';


@NgModule({
  entryComponents: [AddEmpDialogComponent],
  declarations: [
    AppComponent,
    AddEmpDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NGMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      delayStop: 500,
      message: 'Loading...'
    }),
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true
    }), // Import Block UI Http Module
  ],
  providers: [{provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

