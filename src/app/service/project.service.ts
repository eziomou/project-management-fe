import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../model/page';
import { PageRqeuest } from '../model/page-request';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  createProject(name: string): Observable<number> {
    return this.httpClient.post<number>('/api/projects', { name }, { observe: 'response' })
      .pipe(map(response => {
        const location = response.headers.get('Location');
        return this.extractProjectId(location!);
      }));
  }

  private extractProjectId(locationHeader: string): number {
    return (locationHeader?.match(/^.*?\/projects\/(?<id>\d+)$/)?.groups as any)['id'];
  }

  getProjects(pageRequest: PageRqeuest): Observable<Page<Project>> {
    return this.httpClient.get<Page<Project>>('/api/projects', { params: { ...pageRequest } });
  }

  getProject(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`/api/projects/${id}`);
  }

  updateProject(id: number, data: { name: string, description: string }): Observable<any> {
    return this.httpClient.patch<any>(`/api/projects/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete<any>(`/api/projects/${id}`);
  }
}
