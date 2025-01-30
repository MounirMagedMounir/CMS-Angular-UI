import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ApiResponse } from '../../core/interface/api-response';
import { userAuthenticationApiService } from '../../core/services/api/userAuthentication/user-authentication-api.service';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgetpassword',
  imports: [CommonModule, ReactiveFormsModule, Message, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, InputGroupAddonModule, FocusTrapModule, AutoFocusModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  constructor(private router: Router, private userAuthApi: userAuthenticationApiService,private messageService:MessageService) { }
  errors: string[] = [""];

  forgetPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
    });


  onSubmit() {
    this.errors = [""];
  
    // console.log(this.forgetPasswordForm.getRawValue().email);
    this.userAuthApi.forgetPassword(JSON.stringify(this.forgetPasswordForm.getRawValue().email))
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<null>;
            if (res.status === 200) {
              this.messageService.add({
                key: 'toast',
                severity: 'success',
                summary:"Password reset link sent to your email address" ,
              });
      
              this.router.navigate(['/']);
            }
            else if (res.status === 400) {
              res.message.forEach((element: any) => {
                //  console.log("eelementrror " + element); 
                 this.errors.push(element) });
            } else if (res.status === 401) {
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'please enter the correct credentials',
                detail: res.message.toString(),
              });
            
            }
          },
          error: (error) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'something went wrong',
              detail: "please try again",
            })
            console.error("server error " + error.message);
          }
        }
      );
  }

  getError(input: string): string | null {
    return this.errors.find(error => error.includes(input)) || null;
  }
}
