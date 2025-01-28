import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { userAuthenticationApiService } from '../../core/services/api/userAuthentication/user-authentication-api.service';
import { ApiResponse } from '../../core/interface/api-response';
import { AuthResponse } from '../../core/interface/auth-response';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';
@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, Message, InputTextModule, PasswordModule, ButtonModule, FloatLabelModule, InputGroup, InputGroupAddonModule,FocusTrapModule,AutoFocusModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 constructor(private router: Router, private userAuthApi: userAuthenticationApiService) { }
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

  registerForm = new FormGroup(
    {

      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      userName: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

  onSubmit() {
    this.errors = [""];
    this.alert.set("");
    this.userAuthApi.register(this.registerForm.getRawValue())
      .subscribe(
        {
          next: (response: any) => {
            const res = response as ApiResponse<Array<AuthResponse>>;
            if (res.status === 200) {
              this.router.navigate(['/verification', { email: this.registerForm.getRawValue().email }]);
            }
            else if (res.status === 400) {

              res.message.forEach((element: any) => { 
                // console.log("eelementrror " + element); 
                this.errors.push(element) });
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
  getErrorStart(input: string): string | null {
    return this.errors.find(error => error.startsWith(input)) || null;
  }

}
