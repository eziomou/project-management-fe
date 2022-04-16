import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/model/task';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  createTask({ name, description, projectId }: { name: string, description: string, projectId: number }): Observable<number> {
    return this.httpClient.post<number>(`/api/projects/${projectId}/tasks`, { name, description }, { observe: 'response' })
      .pipe(map(response => {
        const location = response.headers.get('Location');
        return this.extractTaskId(location!);
      }));
  }

  private extractTaskId(locationHeader: string): number {
    return (locationHeader?.match(/^.*?\/tasks\/(?<id>\d+)$/)?.groups as any)['id'];
  }

  getTask(projectId: number, taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`/api/projects/${projectId}/tasks/${taskId}`);
  }

  getTasksByProjectId(projectId: number): Observable<Page<Task>> {
    return this.httpClient.get<Page<Task>>(`/api/projects/${projectId}/tasks`);
  }

  updateTask(projectId: number, taskId: number, data: { name: string, description: string }): Observable<any> {
    return this.httpClient.patch<any>(`/api/projects/${projectId}/tasks/${taskId}`, data);
  }

  deleteTask(task: Task): Observable<any> {
    return this.httpClient.delete(`/api/projects/${task.projectId}/tasks/${task.id}`);
  }
}
