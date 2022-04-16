import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { Page } from 'src/app/model/page';
import { Project } from 'src/app/model/project';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: Project | null = null;
  tasks: Page<Task> | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService,
    private dialog: MatDialog) {
    route.paramMap.pipe(
      switchMap(params => projectService.getProject(+params.get('id')!)),
      switchMap(project => {
        this.project = project;
        return taskService.getTasksByProjectId(project!.id);
      }),
      catchError(error => {
        if (error.status === 404) {
          router.navigate(['error/not-found']);
        }
        return of(null);
      })
    ).subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit(): void {
  }

  openProjectDialog(project: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: `Delete ${project.name}`,
        content: `Are you sure delete ${project.name}?`,
        confirmColor: 'warn'
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.projectService.deleteProject(project.id))
      )
      .subscribe(() => this.router.navigate(['/projects']));
  }

  openTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: `Delete ${task.name}`,
        content: `Are you sure delete ${task.name}?`,
        confirmColor: 'warn'
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.taskService.deleteTask(task))
      )
      .subscribe(() => {
        this.taskService.getTasksByProjectId(task.projectId).subscribe(tasks => {
          this.tasks = tasks;
        });
      });
  }
}
