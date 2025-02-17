import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: UserListComponent
  },  
   {
    path: 'add',
    component: UserCreateComponent
  }, 
  {
    path: 'edit', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'edit/:id',
    component: UserEditComponent
  },
  {
    path: 'delete', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'delete/:id',
    component: UserDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
