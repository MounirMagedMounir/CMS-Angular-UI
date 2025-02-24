import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../../../core/interface/api-response';
import { UserApiService } from '../../../../core/services/api/user/user-api.service';
import { CommonModule } from '@angular/common';
import { AutoFocusModule } from 'primeng/autofocus';
import { Button, ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { UserResponse } from '../../../../core/interface/user/user-response';

@Component({
  selector: 'app-user-edit-dialog',
  imports: [
    Button,
    Dialog,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Message,
    PasswordModule,
    FloatLabelModule,
    InputGroup,
    InputGroupAddonModule,
    FocusTrapModule,
    AutoFocusModule,
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss',
})
export class UserEditDialogComponent {
  
  constructor(
    private router: Router,
    private userApi: UserApiService,
    private messageService: MessageService
  ) {}

  @Input() visible: boolean = false;
  @Input() userData = signal<UserResponse>({
    id: '',
    name: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    profileImage: '',
    isActive: false,
    role: '',
    createdDate: new Date(),
    lastUpdatedDate: new Date(),
    createdbyId: '',
    createdByName: '',
    lastUpdatedbyId: '',
    lastUpdatedByName: '',
  });

 @Output() visibleChange = new EventEmitter();
 
  errors: string[] = [''];
  hide = signal(true);

  editForm = computed(() => {
    return new FormGroup({
      id: new FormControl(this.userData().id, [Validators.required]),
      name: new FormControl(this.userData().name, [Validators.required]),
      email: new FormControl(this.userData().email, [Validators.required]),
      phone: new FormControl(this.userData().phone, [Validators.required]),
      userName: new FormControl(this.userData().userName, [
        Validators.required,
      ]),
      profileImage: new FormControl(this.userData().profileImage, [
        Validators.required,
      ]),
      isActive: new FormControl(this.userData().isActive, [
        Validators.required,
      ]),
      role: new FormControl(this.userData().role, [Validators.required]),
      password: new FormControl(this.userData().password, [
        Validators.required,
      ]),
    });
  });

  onSubmit() {
    this.errors = [''];
    this.userApi.UpdateUser(this.editForm().getRawValue()).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<any>;
        if (res.status === 200) {
          this.visible = false;
          this.visibleChange.emit( this.visible );
       
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'User Updated',
            detail: 'User updated successfully.',
          }); 

        } else if (res.status === 400) {
          res.message.forEach((element: any) => {
            this.errors.push(element);
          });
        } else if (res.status === 404) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Updating the user failed ',
            detail: res.message.toString(),
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'something went wrong',
          detail: 'please try again later.',
        });

        console.log('server error ' + error);
      },
    });
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit( this.visible );
  }

  getError(input: string): string | null {
    return this.errors.find((error) => error.includes(input)) || null;
  }

  clickActiveEvent(event: MouseEvent) {
    this.editForm().setControl(
      'isActive',
      new FormControl(!this.editForm().get('isActive')?.value)
    );
    event.stopPropagation();
  }

  clickHidePasswordEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
