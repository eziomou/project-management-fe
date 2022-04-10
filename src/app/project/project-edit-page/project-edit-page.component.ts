import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.scss']
})
export class ProjectEditPageComponent implements OnInit {

  messages = {
    required: 'This field is required'
  } as any;

  project$: Observable<Project | null>;
  project: Project | null = null;
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {
    this.project$ = route.paramMap.pipe(switchMap(params => {
      return projectService.getProject(+params.get('id')!).pipe(catchError(error => {
        if (error.status === 404) {
          router.navigate(['error/not-found']);
        }
        return of(null);
      }), tap(project => {
        this.project = project;
        this.formGroup.patchValue({
          name: project?.name,
          description: project?.description
        })
      }));
    }));
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if (this.formGroup.valid) {
      this.projectService.updateProject(this.project!.id, {
        name: this.formGroup.controls.name.value,
        description: this.formGroup.controls.description.value
      })
        .subscribe(() => this.router.navigate(['/projects', this.project!.id]));
    }
  }

  getError(control: AbstractControl): string {
    return Object.keys(control.errors!).map(key => this.messages[key]).join(', ');
  }
}
