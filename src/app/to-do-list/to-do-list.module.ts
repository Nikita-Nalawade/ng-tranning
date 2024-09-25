import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { AddTodoListComponent } from './pages/add-todo-list/add-todo-list.component';
import { ViewToDoListComponent } from './pages/view-to-do-list/view-to-do-list.component';
import { DeleteTodoListComponent } from './pages/delete-todo-list/delete-todo-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './reusable';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [
    AddTodoListComponent,
    ViewToDoListComponent,
    DeleteTodoListComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,          // For the Material table
    MatPaginatorModule,      // For pagination
    MatSortModule ,   
    MatCheckboxModule,
         
  ],
  providers:[{
    
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE],
  },
  { provide: MAT_DATE_FORMATS, useValue:MY_FORMATS },DatePipe]
})
export class ToDoListModule { }
