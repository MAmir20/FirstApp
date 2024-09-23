import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MemberComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent
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
