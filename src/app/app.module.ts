import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { Task1Component } from './task1/task1.component';
import { Task2Component } from './task2/task2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Task1Service } from './task1/task1.service';

const appRoutes: Routes = [
  { path: 'task1', component: Task1Component },
  { path: 'task2', component: Task2Component },
  { path: '', redirectTo: 'task1', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Task1Component,
    Task2Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    NgxChartsModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    Task1Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
