import { NgModule } from "@angular/core";
import { TodosComponent } from "./components/todo/todos.component";
import {Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoService } from "./services/todo.service";
import { MainComponent } from './components/main/main.component';
import { CommonModule } from "@angular/common";
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent
  }
];

@NgModule({
    declarations: [TodosComponent, HeaderComponent, MainComponent, TodoItemComponent, FooterComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [TodoService]
})
export class TodosModule{}