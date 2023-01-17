import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/FilterEnum';
import { TodoInterface } from '../types/todo.interface';

@Injectable()
export class TodoService {

 
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(20)
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  };

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


  
  updateFilter(filterEnum: FilterEnum): void {
    this.filter$.next(filterEnum);
  }

  //make api call to backend to save Todo ... 


  


}
