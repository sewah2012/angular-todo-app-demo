import { NgModule } from "@angular/core";
import { TodosComponent } from "./components/todo/todos.component";
import {Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent
  }
];

@NgModule({
    declarations: [TodosComponent, HeaderComponent],
    imports: [RouterModule.forChild(routes)]
})
export class TodosModule{}