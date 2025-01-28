import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { userAuthenticationApiService } from '../../../core/services/api/userAuthentication/user-authentication-api.service';
import { ApiResponse } from '../../../core/interface/api-response';
import { AuthResponse } from '../../../core/interface/auth-response';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-verification-email',
  imports: [CommonModule, ReactiveFormsModule, Message, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, InputGroupAddonModule, FocusTrapModule, AutoFocusModule],
  templateUrl: './verification-email.component.html',
  styleUrl: './verification-email.component.scss'
})
export class VerificationEmailComponent implements OnInit{
 constructor(private router: Router,private route: ActivatedRoute, private auth: userAuthenticationApiService) { }
  errors: string[] = [""];
  alert = signal("");
  
    emailVerificationForm = new FormGroup(
    {
      verificationCode: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [Validators.required]),
    });

  ngOnInit(): void  {
     this.emailVerificationForm.setValue({verificationCode:null,email:this.route.snapshot.paramMap.get('email')});

// console.log("email "+this.route.snapshot.paramMap.get('email'));
  }

  clearMessages() {
    this.alert.set("");
  }
  onSubmit() {
    this.errors = [""];
    this.alert.set("");
    this.auth.emailVerification(this.emailVerificationForm.getRawValue())
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<Array<AuthResponse>>;
            if (res.status === 201) {
              this.router.navigate(['/']);
            }
            else if (res.status === 400) {

              res.message.forEach((element: any) => { 
                // console.log("eelementrror " + element);
                 this.errors.push(element) });
            } else if (res.status === 404) {

              this.alert.set(res.message.toString());
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
