import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
import { PermissionDeleteComponent } from './permission-delete/permission-delete.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission-list/permission-list.component';

const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {
      path: 'dashboard',
      component: PermissionListComponent
    },  
     {
      path: 'add',
      component: PermissionCreateComponent
    }, 
    {
      path: 'edit', pathMatch: 'full', redirectTo: 'dashboard'
    },
    {
      path: 'edit/:id',
      component: PermissionEditComponent
    },
    {
      path: 'delete', pathMatch: 'full', redirectTo: 'dashboard'
    },
    {
      path: 'delete/:id',
      component: PermissionDeleteComponent
    },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
