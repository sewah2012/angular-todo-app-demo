import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit{
  @Input('todo')
  todoProp!: TodoInterface;

  @Input('isEditing')
  isEditingProp!:Boolean

  @Output('setEditingId')
  setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = ""


  ngOnInit(): void {
    this.editingText = this.todoProp.text 
  }

  setTodoInEditMode(): void{
    console.log("set todo in edit mood")
    this.setEditingIdEvent.emit(this.todoProp.id);
  }
  removeTodo() : void {
    console.log("Remove todo item")
  }

  toggleTodo() : void {
    console.log("toggle todo")
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement
    this.editingText = target.value
  }

  changeTodo(): void {
    console.log("new todo: "+ this.editingText)
  }
}
