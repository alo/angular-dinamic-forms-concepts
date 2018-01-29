import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomFormObjectComponent } from './components/custom-form-object/custom-form-object.component';
import { CustomFormControlComponent } from './components/custom-form-control/custom-form-control.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomFormObjectComponent,
    CustomFormControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
