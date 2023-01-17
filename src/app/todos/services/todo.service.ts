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


  updateTodo(id: string, editingText: string) {
    const updatedTodos = this.todos$.getValue().map(
      todo =>{
       if(todo.id === id){
        return {
          ...todo,
          text: editingText
        }
       }
       return todo;
    })
    this.todos$.next(updatedTodos); //this line updates the todo behavior subject
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().filter(
      todo => todo.id!==id
    )
    this.todos$.next(updatedTodos); //this line updates the todo behavior subject
  }

  toggleTodo(id: string) {
    const updatedTodos = this.todos$.getValue().map(
      todo =>{
      if(todo.id === id){
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo;
    })

    // console.log('updatedTodos', updatedTodos)
    this.todos$.next(updatedTodos);
  }

  //make api call to backend to save Todo ... 


  


}
