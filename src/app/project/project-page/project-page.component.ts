import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project$: Observable<Project | null>;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {
    this.project$ = route.paramMap.pipe(switchMap(params => {
      return projectService.getProject(+params.get('id')!).pipe(catchError(error => {
        if (error.status === 404) {
          router.navigate(['error/not-found']);
        }
        return of(null);
      }));
    }));
  }

  ngOnInit(): void {
  }
}
