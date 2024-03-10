import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassViewComponent } from './class-view/class-view.component';
import {UiViewComponent} from "./ui-view/ui-view.component"; // Adjust the path as necessary

export const routes: Routes = [
  { path: 'class-view', component: ClassViewComponent },
  { path: 'ui-view', component: UiViewComponent}
];

