import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleCreateComponent } from './role-create/role-create.component';

const routes: Routes = [

   { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {
      path: 'dashboard',
      component: RoleListComponent
    },  
     {
      path: 'add',
      component: RoleCreateComponent
    }, 
    {
      path: 'edit', pathMatch: 'full', redirectTo: 'dashboard'
    },
    // {
    //   path: 'edit/:id',
    //   component: UserEditComponent
    // },
    // {
    //   path: 'delete', pathMatch: 'full', redirectTo: 'dashboard'
    // },
    // {
    //   path: 'delete/:id',
    //   component: UserDeleteComponent
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
