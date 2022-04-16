import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectAddPageComponent } from './project-add-page/project-add-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';

const routes: Routes = [
  {
    path: 'projects',
    children: [{
      path: '',
      component: ProjectsPageComponent
    }, {
      path: 'add',
      component: ProjectAddPageComponent
    }, {
      path: ':id',
      component: ProjectPageComponent
    }, {
      path: ':id/edit',
      component: ProjectEditPageComponent
    }]
  },
];

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ProjectPageComponent,
    ProjectAddPageComponent,
    ProjectEditPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})
export class ProjectModule { }
