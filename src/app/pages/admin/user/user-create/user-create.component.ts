import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ApiResponse } from '../../../../core/interface/api-response';
import { AuthResponse } from '../../../../core/interface/auth-response';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { InputGroup } from 'primeng/inputgroup';

@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    Message,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    InputGroup,
    InputGroupAddonModule,
    FocusTrapModule,
    AutoFocusModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  constructor(
    private router: Router,
    private userApi: UserApiService,
    private messageService: MessageService
  ) {}
  errors: string[] = [''];
  active = signal(true);

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  clickEvent(event: MouseEvent) {
    this.active.set(!this.active());
    event.stopPropagation();
  }

  onSubmit() {
    this.errors = [''];
    this.createForm.setControl(
      'isActive',
      new FormControl(this.active() ?? false)
    );
    this.userApi.CreateUser(this.createForm.getRawValue()).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<Array<AuthResponse>>;
        if (res.status === 200) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'User Created',
            detail: 'User created successfully.',
          });
          this.router.navigate([
            '/admin/user',
            { email: this.createForm.getRawValue().email },
          ]);
        } else if (res.status === 400) {
          res.message.forEach((element: any) => {
            this.errors.push(element);
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          sticky: true,
          severity: 'error',
          summary: 'some thing went wrong',
          detail: 'please try again later.',
        });

        console.log('server error ' + error);
      },
    });
  }

  getError(input: string): string | null {
    return this.errors.find((error) => error.includes(input)) || null;
  }
  getErrorStart(input: string): string | null {
    return this.errors.find((error) => error.startsWith(input)) || null;
  }
}
