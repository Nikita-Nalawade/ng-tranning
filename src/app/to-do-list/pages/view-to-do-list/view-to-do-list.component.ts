import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToDoListService } from '../../to-do-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTodoListComponent } from '../add-todo-list/add-todo-list.component';
import { DeleteTodoListComponent } from '../delete-todo-list/delete-todo-list.component';
export interface Task {
  id: number;
  assignTo: string; 
  status: string;  
  dueDate: string;  
  priority: string; 
  comments: string; 
  actions: string;  
}
@Component({
  selector: 'app-view-to-do-list',
  templateUrl: './view-to-do-list.component.html',
  styleUrls: ['./view-to-do-list.component.css']
})
export class ViewToDoListComponent implements OnInit{

  
    displayedColumns: string[] = ['select','assignedTo', 'status', 'dueDate', 'priority', 'comments', 'actions'];
    
    tasks: any[] = [];
   
    displayedTasks: Task[] = []; // Tasks to be displayed on the current page
    itemsPerPage = 5; // Number of tasks per page
    currentPage = 1; // Current page number
    totalPages = 0; // Total number of pages
    totalPagesArray: number[] = []; // Array used for generating page numbers in the
   
    searchItem: string = '';
  
    pageSizes = [10, 20, 50];
    totalreacord: any;
    
  
    constructor( private notificationServices:NotificationService,private datePipe:DatePipe,private dialog: MatDialog, private toDoListService: ToDoListService, private snackBar: MatSnackBar,) { }
  
  
    ngOnInit(): void {
          
    
      this.getList();
     
    }
    selectAll(): void {
      const allSelected = this.tasks.every(task => task.selected);
      this.tasks.forEach(task => task.selected = !allSelected);
    }
    //function to view the list
    getList(): void {
      this.toDoListService.getTaskList().subscribe({
        next: (response: any) => {
          this.tasks = response.tasks.map((elm:any)=>{
            console.log(elm);
            
            return{
              id: elm.id,
              assignedTo: elm.assignedTo,
              status:elm.status,
              dueDate: this.datePipe.transform(elm.dueDate, 'yyyy-MM-dd'),
              priority:elm.priority,
              comments:elm.comments,
              actions: ''
            }
          });
          this.displayedTasks = [...this.tasks];
          console.log(this.tasks);
          this.totalreacord=this.tasks.length;
          this.totalPages = Math.ceil(this.tasks.length / this.itemsPerPage);
          console.log(this.totalPages);
          
         
          this.updateDisplayedTasks();
          },
        error: (error) => {
          console.error('Error fetching tasks:', error);
        }
      });
    }
  
    //  SearchList
    filterList(): void {
      const searchTerm = this.searchItem.toLowerCase();
        this.displayedTasks = this.tasks.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
    
    
  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value); // Get the selected number of items per page
    this.currentPage = 1; // Reset to the first page
    this.totalPages = Math.ceil(this.tasks.length / this.itemsPerPage); // Calculate the total pages
    this.updateDisplayedTasks(); // Update the displayed tasks
  }
  
    updateDisplayedTasks(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedTasks = this.tasks.slice(startIndex, endIndex); // Get tasks for the current page
    }
  
    // Handle page changes
    changePage(page: number): void {
      if (page < 1 || page > this.totalPages) {
        return; // Prevent going out of bounds
      }
      this.currentPage = page;
      this.updateDisplayedTasks(); // Update displayed tasks based on the new page
    }
  
  
    openAddTaskDialog(): void {
      const dialogRef = this.dialog.open(AddTodoListComponent, {
        width: '690px',
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getList();
          console.log('Task added:', result);
        }
      });
    }
  
    openEditTaskDialog(task: any): void {
      const dialogRef = this.dialog.open(AddTodoListComponent, {
        width: '690px',
        data:{task}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getList();
        }
      });
    }
  
    //function to delete a task
    deleteTask(taskId: number): void {
      const dialogRef = this.dialog.open(DeleteTodoListComponent, {
        width: '600px',
        data: { taskId }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.toDoListService.deleteTask(taskId).subscribe(
            () => {
              this.getList();
            this.notificationServices.showSuccess('Task deleted successfully.');
              console.log('Task deleted successfully.');
            },
            (error) => {
             this.notificationServices.showError('Failed to delete the task');
            }
          );
        }
      });
    }
  
    onRefresh() {
      window.location.reload();
    }
  }
  
