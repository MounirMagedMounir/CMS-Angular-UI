import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Checkbox } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiResponse } from '../../../core/interface/api-response';
import { AuthResponse } from '../../../core/interface/auth-response';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AdminauthenticationApiService } from '../../../core/services/api/adminAuthentication/admin-authentication-api.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, Message, InputTextModule, PasswordModule, Checkbox, ButtonModule, FloatLabelModule,InputGroup,InputGroupAddonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  constructor(private router: Router, public formBuilder: FormBuilder, private adminAuthApi: AdminauthenticationApiService,private auth:AuthenticationService,private messageService:MessageService) { }
  errors: string[] = [""];

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  logInForm = new FormGroup(
    {

      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [Validators.required]),
    });

  onSubmit() {
    this.errors = [""];

    this.adminAuthApi.logIn(this.logInForm.getRawValue())
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<Array<AuthResponse>>;
            if (res.status === 200) {
              this.auth.login(res.data[0].token, res.data[0].refreshToken);
              this.router.navigate(['/admin']);
            }
            else if (res.status === 400) {
               
              res.message.forEach((element: any) => {
                //  console.log("eelementrror " + element);
                  this.errors.push(element) });
            } else if (res.status === 404) {
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'please enter your correct credentials',
                detail:res.message.toString(),
              });
      
         
            }else if (res.status === 403) {
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'access denied',
                detail:res.message.toString() ,
              });
      

            }
          },
          error: (error) => {
            console.log("server error " + error);
          }
        }
      );
  }

  getError(input: string): string | null {
    return this.errors.find(error => error.includes(input)) || null;
  }
}
