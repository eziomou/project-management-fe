import { Component, Inject, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
      if (!this.data.confirmText) {
        this.data.confirmText = 'Confirm';
      }
      if (!this.data.cancelText) {
        this.data.cancelText = 'Cancel';
      }
    }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title?: string;
  content?: string;
  confirmText?: string;
  confirmColor?: ThemePalette;
  cancelText?: string;
  cancelColor?: ThemePalette;
}
