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
import { FormsModule } from '@angular/forms'; // Required for forms
import { HttpClientModule } from '@angular/common/http'; // Required for API calls

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import your new components
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent, // Added
    EmployeeFormComponent  // Added
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,         // Added
    HttpClientModule     // Added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
