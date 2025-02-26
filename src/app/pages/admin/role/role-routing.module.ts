import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';

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
    {
      path: 'edit/:id',
      component: RoleEditComponent
    },
    {
      path: 'delete', pathMatch: 'full', redirectTo: 'dashboard'
    },
    {
      path: 'delete/:id',
      component: RoleDeleteComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
