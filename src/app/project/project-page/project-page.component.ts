import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
import { DeleteProjectDialogComponent } from '../delete-project-dialog/delete-project-dialog.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project$: Observable<Project | null>;
  project: Project | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService,
    private dialog: MatDialog) {
    this.project$ = route.paramMap.pipe(switchMap(params => {
      return projectService.getProject(+params.get('id')!).pipe(catchError(error => {
        if (error.status === 404) {
          router.navigate(['error/not-found']);
        }
        return of(null);
      }), tap(project => {
        this.project = project;
      }));
    }));
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '250px',
      data: { id: this.project?.id, name: this.project?.name },
    });

    dialogRef.afterClosed()
      .pipe(switchMap(id => this.projectService.deleteProject(id)))
      .subscribe(() => this.router.navigate(['/projects']));
  }
}
