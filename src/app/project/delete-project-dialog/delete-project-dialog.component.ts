import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.scss']
})
export class DeleteProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteProjectDialogData) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}

export interface DeleteProjectDialogData {
  id: number;
  name: string;
}
