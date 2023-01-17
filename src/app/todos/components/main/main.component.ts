import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/FilterEnum';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<Boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodoService){
    //return true if every element isCompleted int his array.
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map(todos=>todos.every(todo=>todo.isCompleted))
    )

    this.noTodoClass$ = this.todosService.todos$.pipe(
      map(todos=> todos.length===0)
    )
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(map(([todos, filter] : [TodoInterface[], FilterEnum])=>{
      // console.log('combine', todos, filter)
      if(filter === FilterEnum.active){
        return todos.filter(todo => !todo.isCompleted);
      }

      if(filter===FilterEnum.completed){
        return todos.filter(todo => todo.isCompleted);
      }

      if(filter===FilterEnum.all){
        return todos;
      }
      return [];
    }))
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked)
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId
  }

  
}
