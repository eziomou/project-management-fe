import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-add-page',
  templateUrl: './task-add-page.component.html',
  styleUrls: ['./task-add-page.component.scss']
})
export class TaskAddPageComponent implements OnInit {

  projectId: number;
  formGroup: FormGroup;

  constructor(private router: Router, route: ActivatedRoute, private taskService: TaskService) {
    this.projectId = +route.snapshot.paramMap.get('id')!;

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      projectId: new FormControl(this.projectId)
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if (this.formGroup.valid) {
      this.taskService.createTask({
        name: this.formGroup.controls.name.value,
        description: this.formGroup.controls.description.value,
        projectId: this.formGroup.controls.projectId.value
      })
        .subscribe(() => this.router.navigate(['/projects', this.projectId]));
    }
  }

  getError(control: AbstractControl): string {
    return '';
  }
}
