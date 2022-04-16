import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasksByProjectId(projectId: number): Observable<Page<Task>> {
    return this.httpClient.get<Page<Task>>(`/api/projects/${projectId}/tasks`);
  }

  deleteTask(task: Task): Observable<any> {
    return this.httpClient.delete(`/api/projects/${task.projectId}/tasks/${task.id}`);
  }
}
