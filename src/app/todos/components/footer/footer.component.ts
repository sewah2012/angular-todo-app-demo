import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { FilterEnum } from '../../types/FilterEnum';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<Number>;
  itemLeftText$: Observable<String>;
  filter$: Observable<FilterEnum>;

  filterEnum = FilterEnum;

  constructor(private todosService:TodoService){
    this.filter$ = this.todosService.filter$;
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map(todos=> todos.length===0)
    )

    this.activeCount$ = this.todosService.todos$.pipe(
      map(todos => todos.filter(todo=>!todo.isCompleted).length)
    )

    this.itemLeftText$ = this.activeCount$.pipe(
      map(activeCount=> `item${activeCount!==1 ? 's' : ''} left`)
    )
  }

  changeFilter(event: Event, filterEnum: FilterEnum): void {
    event.preventDefault();
    // console.log('Filter Enum: ', filterEnum)
    this.todosService.updateFilter(filterEnum);
  }
  
}
