import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { PageMetadata } from 'src/app/model/page';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name'];

  data: Project[] = [];
  _metadata: PageMetadata = { totalCount: 0 };

  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService) {
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize }),
        switchMap(meta => {
          this.loading = true;
          return this.projectService.getProjects({ page: meta.pageIndex, size: meta.pageSize });
        }),
        catchError(() => of(null))
      ).subscribe(page => {
        if (page) {
          this.data = page.data
          this._metadata = page._metadata;
        }
        this.loading = false;
      });
  }
}
