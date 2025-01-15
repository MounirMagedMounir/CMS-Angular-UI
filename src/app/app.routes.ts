import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerificationEmailComponent } from './pages/verification/verification-email/verification-email.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { HomeComponent } from './pages/home/home.component';
import { unAuthGuard } from './core/guards/unAuth/un-auth.guard';
import { userAuthGuard } from './core/guards/auth/userAuth/user-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'login',
        component: LoginComponent,
        canActivate: [unAuthGuard]

    },
    {
        path:'register',
        component: RegisterComponent,
        canActivate: [unAuthGuard]
    },
    {
        path:'verification',
        component: VerificationEmailComponent,
        canActivate: [unAuthGuard]
    },
    {
        path:'signout',
        component: SignoutComponent,
        canActivate: [userAuthGuard]

    },
    {
        path:'forgetpassword',
        component: ForgetpasswordComponent,
        canActivate: [unAuthGuard]
    },
    {

        path:'admin',
        loadChildren:()=>import( './pages/admin/admin.module').then(m=>m.AdminModule)   
    },
    {

        path:'profile',
        canActivate: [userAuthGuard],
        loadChildren:()=>import( './pages/profile/profile.module').then(m=>m.ProfileModule)   
    }
    

];
