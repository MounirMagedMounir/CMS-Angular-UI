import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { userAuthenticationApiService } from '../../core/services/api/userAuthentication/userauthenticationApi.service';
import { ApiResponse } from '../../core/interface/api-response';
import { AuthResponse } from '../../core/interface/auth-response';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Checkbox } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, Message, InputTextModule, PasswordModule, Checkbox, ButtonModule, FloatLabelModule, InputGroup, InputGroupAddonModule,FocusTrapModule,AutoFocusModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(private router: Router, private userAuthApi: userAuthenticationApiService,private auth:AuthenticationService) { }
  errors: string[] = [""];
  alert = signal("");
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clearMessages() {
    this.alert.set("");
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
    this.alert.set("");
    this.userAuthApi.logIn(this.logInForm.getRawValue())
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<Array<AuthResponse>>;
            if (res.status === 200) {
              this.auth.login(res.data[0].token, res.data[0].refreshToken);
              this.router.navigate(['/']);
            }
            else if (res.status === 400) {

              res.message.forEach((element: any) => {
                //  console.log("eelementrror " + element); 
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
