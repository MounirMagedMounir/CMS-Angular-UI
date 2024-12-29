import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerificationEmailComponent } from './pages/verification/verification-email/verification-email.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'verification',
        component: VerificationEmailComponent
    },
    {
        path:'signout',
        component: SignoutComponent
    },
    {
        path:'forgetpassword',
        component: ForgetpasswordComponent
    },
    {

        path:'admin',
        loadChildren:()=>import( './pages/admin/admin.module').then(m=>m.AdminModule)   
    },
    {

        path:'profile',
        loadChildren:()=>import( './pages/profile/profile.module').then(m=>m.ProfileModule)   
    }
    

];
