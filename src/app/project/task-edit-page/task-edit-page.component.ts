import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-edit-page',
  templateUrl: './task-edit-page.component.html',
  styleUrls: ['./task-edit-page.component.scss']
})
export class TaskEditPageComponent implements OnInit {

  projectId: number;
  taskId: number;
  formGroup: FormGroup;

  constructor(private router: Router, route: ActivatedRoute, private taskService: TaskService) {
    this.projectId = +route.snapshot.paramMap.get('id')!;
    this.taskId = +route.snapshot.paramMap.get('taskId')!;

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

    this.taskService.getTask(this.projectId, this.taskId).subscribe(task => {
      this.formGroup.patchValue({
        name: task.name,
        description: task.description
      });
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if (this.formGroup.valid) {
      this.taskService.updateTask(this.projectId, this.taskId, {
        name: this.formGroup.controls.name.value,
        description: this.formGroup.controls.description.value
      })
        .subscribe(() => this.router.navigate(['/projects', this.projectId]));
    }
  }

  getError(control: AbstractControl): string {
    return '';
  }
}
