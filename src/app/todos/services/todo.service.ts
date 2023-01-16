import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/FilterEnum';
import { TodoInterface } from '../types/todo.interface';

@Injectable()
export class TodoService {
  toggleAll(isCompleted: boolean) {
    const updatedTodos = this.todos$.getValue().map(
      todo =>{
       return {
        ...todo,
        isCompleted
       }
    })

    // console.log('updatedTodos', updatedTodos)
    this.todos$.next(updatedTodos);
  }
 
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  addTodo(text: String): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(20)
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  };

  //make api call to backend to save Todo ... 


}
