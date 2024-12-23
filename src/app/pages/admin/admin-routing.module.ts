import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{

  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'login',
  component:AdminLoginComponent
},
{
  path:'user',
  component:UserComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
