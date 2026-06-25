//import { HttpClientModule } from '@angular/common/http';
//import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
//import { EmployeeListComponent } from './components/employee-list/employee-list.component';
//import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

//@NgModule({
//  declarations: [
//    AppComponent,
//    EmployeeListComponent,
//    EmployeeFormComponent
//  ],
//  imports: [
//    BrowserModule, HttpClientModule,
//    AppRoutingModule
//  ],
//  providers: [],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ← Make sure this is here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component'; //New

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    SpinnerComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,      // ← Make sure this is here
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
