import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerificationEmailComponent } from './pages/verification/verification-email/verification-email.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
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

        path:'admin',
        loadChildren:()=>import( './pages/admin/admin.module').then(m=>m.AdminModule)   
    }
    

];
