import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
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
import { PermissionApiService } from '../../../../core/services/api/permission/permission-api.service';

@Component({
  selector: 'app-permission-create',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    Message,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupAddonModule,
    FocusTrapModule,
    AutoFocusModule,
  ],
  templateUrl: './permission-create.component.html',
  styleUrl: './permission-create.component.scss'
})
export class PermissionCreateComponent {
 constructor(
    private router: Router,
    private permissionApi: PermissionApiService,
    private messageService: MessageService
  ) {}
  errors: string[] = [''];
  active = signal(true);

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    permissions: new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    ])
  });
  

  clickEvent(event: MouseEvent) {
    this.active.set(!this.active());
    event.stopPropagation();
  }

  get permissions(): FormArray {
    return this.createForm.get('permissions') as FormArray;
  }

  addPermission() {
    this.permissions.push(
      new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    );
  }
  
  // Remove a permission
  removePermission(index: number) {
    this.permissions.removeAt(index);
  }


  onSubmit() {
    this.errors = [''];
    this.permissionApi.CreatePermission(this.createForm.getRawValue()).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<null>;
        if (res.status === 201) {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Permission Created',
            detail: 'Permission created successfully.',
          });
          this.router.navigate([
            '/admin/permission/dashboard',
          ]);
        } else if (res.status === 400) {
          res.message.forEach((element: any) => {
            this.errors.push(element);
          });
        } else if (res.status === 404) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'some thing went wrong',
            detail: res.message.toString(),
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          key: 'toast',
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

}
