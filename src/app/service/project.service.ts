import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/page';
import { PageRqeuest } from '../model/page-request';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  getProjects(pageRequest: PageRqeuest): Observable<Page<Project>> {
    return this.httpClient.get<Page<Project>>('/api/projects', { params: { ...pageRequest } });
  }
}
