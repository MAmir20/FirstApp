import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: 'members',
    pathMatch: 'full',
    component: MemberComponent
  },
  {
    path: 'tools',
    pathMatch: 'full',
    component: ToolsComponent
  },
  {
    path: 'articles',
    pathMatch: 'full',
    component: ArticlesComponent
  },
  {
    path: 'events',
    pathMatch: 'full',
    component: EventsComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: '**',
    component: MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
