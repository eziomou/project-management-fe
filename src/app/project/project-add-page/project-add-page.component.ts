import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-add-page',
  templateUrl: './project-add-page.component.html',
  styleUrls: ['./project-add-page.component.scss']
})
export class ProjectAddPageComponent implements OnInit {

  messages = {
    required: 'This field is required'
  } as any;

  formGroup: FormGroup;

  constructor(private router: Router, private projectService: ProjectService) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if (this.formGroup.valid) {
      this.projectService.createProject(this.formGroup.controls.name.value)
        .subscribe(id => this.router.navigate(['/projects', id]));
    }
  }

  getError(control: AbstractControl): string {
    return Object.keys(control.errors!).map(key => this.messages[key]).join(', ');
  }
}
