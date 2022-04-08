import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [{
  path: '', pathMatch: 'full', redirectTo: 'projects'
}, {
  path: '**', pathMatch: 'full', redirectTo: 'error/not-found'
},
{
  path: 'error/:type', component: ErrorPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
