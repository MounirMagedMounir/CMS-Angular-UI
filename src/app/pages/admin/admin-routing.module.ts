import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { roleAdminPagesGuard } from '../../core/guards/role/roleAdminPages/role-admin-pages.guard';
import { AdminComponent } from './admin.component';
import { RoleComponent } from './role/role.component';
import { adminAuthGuard } from '../../core/guards/auth/adminAuth/admin-auth.guard';
import { unAuthAdminGuard } from '../../core/guards/unAuthAdmin/un-auth-admin.guard';

const routes: Routes = [{

  path: '',
  canActivate: [roleAdminPagesGuard, adminAuthGuard],
  component: AdminComponent
},
{
  path: 'login',
  canActivate: [unAuthAdminGuard],
  component: AdminLoginComponent
}, {

  path: 'user',
  canActivate: [
    roleAdminPagesGuard,
    adminAuthGuard],
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
},

{
  path: 'role/dashboard',
  canActivate: [roleAdminPagesGuard, adminAuthGuard],
  component: RoleComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
