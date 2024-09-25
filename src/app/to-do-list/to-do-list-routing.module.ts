import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewToDoListComponent } from './pages/view-to-do-list/view-to-do-list.component';
import { AddTodoListComponent } from './pages/add-todo-list/add-todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: ViewToDoListComponent
  },
  {
    path: 'view',
    component: ViewToDoListComponent
  },
  {
    path: 'add',
    component: AddTodoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoListRoutingModule { }
