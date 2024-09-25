import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToDoListService } from '../../to-do-list.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.css']
})
export class AddTodoListComponent {

  taskForm: FormGroup | any;
 
  taskId: number | null = null;
modifyEdit:boolean = false;
  constructor(private notificationService:NotificationService, public dialogRef: MatDialogRef<AddTodoListComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toDoListService: ToDoListService, private snackBar: MatSnackBar) { }
userList=['User 1','User 2','User 3']
  ngOnInit(): void {
  
    
   
    this.taskForm = new FormGroup({
      assignedTo: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      dueDate: new FormControl(null),
      priority: new FormControl('', Validators.required),
      comments: new FormControl(null),
    });

    this.modifyEdit=this.data.task?true:false;
    if (this.data.task) {
      this.taskId = this.data.task.id;
      this.taskForm.patchValue(this.data.task);
    }
  }

  //function to add a task
  
saveAddlist(): void {
  if (this.taskForm.valid) {
    const taskData = this.taskForm.value;
    this.toDoListService.addTask(taskData).subscribe({
      next: (response: any) => {
        this.dialogRef.close(response);  // Close the dialog with response data
        this.notificationService.showSuccess('Task added successfully');
      },
      error: (error: any) => {
        console.error('Error adding task:', error);
       this.notificationService.showError('Failed to add the task.');
      },
      complete: () => {
        console.log('Add operation completed.');
      }
    });
   
  } else {
    
  }
}

// Function to update an existing task
updateTask(): void {
  if (this.taskForm.valid && this.taskId) {
    const taskData = this.taskForm.value;
    this.toDoListService.updateTask(this.taskId, taskData).subscribe({

      next: (response: any) => {
        this.dialogRef.close(response);  // Close the dialog with response data
        this.notificationService.showSuccess('Task updated successfully');
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
        this.notificationService.showError('Failed to update the task.');
      },
      complete: () => {
        console.log('Update operation completed.');
      }
    });
   


  } else {
    
  }
}

  cancelAddlist(): void {
    this.dialogRef.close();
  }
}

