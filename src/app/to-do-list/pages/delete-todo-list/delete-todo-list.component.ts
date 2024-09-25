import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo-list',
  templateUrl: './delete-todo-list.component.html',
  styleUrls: ['./delete-todo-list.component.css']
})
export class DeleteTodoListComponent {
  constructor( public dialogRef: MatDialogRef<DeleteTodoListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log(data);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
