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
import { AdminauthenticationApiService } from '../../../core/services/api/adminAuthentication/adminauthenticationApi.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, Message, InputTextModule, PasswordModule, Checkbox, ButtonModule, FloatLabelModule,InputGroup,InputGroupAddonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  constructor(private router: Router, public formBuilder: FormBuilder, private adminAuthApi: AdminauthenticationApiService) { }
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
    this.adminAuthApi.logIn(this.logInForm.getRawValue())
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<Array<AuthResponse>>;
            if (res.status === 200) {
              localStorage.setItem('token', res.data[0].token);
              localStorage.setItem('refreshToken', res.data[0].refreshToken);
              this.router.navigate(['/']);
            }
            else if (res.status === 400) {
               
              res.message.forEach((element: any) => { console.log("eelementrror " + element); this.errors.push(element) });
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
