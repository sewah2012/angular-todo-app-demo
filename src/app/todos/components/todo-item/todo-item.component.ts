import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit, OnChanges{
  @Input('todo')
  todoProp!: TodoInterface;

  @Input('isEditing')
  isEditingProp!:Boolean

  @Output('setEditingId')
  setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = ""
  @ViewChild('textInput')
  textInput!: ElementRef;

  constructor(private todoService: TodoService){

  }
  ngOnInit(): void {
    this.editingText = this.todoProp.text 
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if(changes['isEditingProp'].currentValue){
      setTimeout(()=>{
        this.textInput.nativeElement.focus()
      },0)
    }
  }

  setTodoInEditMode(): void{
    console.log("set todo in edit mood")
    this.setEditingIdEvent.emit(this.todoProp.id);
  }
  removeTodo() : void {
    console.log("Remove todo item")
    this.todoService.removeTodo(this.todoProp.id)
  }

  toggleTodo() : void {
    // console.log("toggle todo")
    this.todoService.toggleTodo(this.todoProp.id)
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement
    this.editingText = target.value
  }

  changeTodo(): void {
    console.log("new todo: "+ this.editingText)
    this.todoService.updateTodo(this.todoProp.id, this.editingText)
    this.setEditingIdEvent.emit(null)
  }
}
