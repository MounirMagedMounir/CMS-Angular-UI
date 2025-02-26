import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { Button, ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ApiResponse } from '../../../../core/interface/api-response';
import { RoleApiService } from '../../../../core/services/api/role/role-api.service';
import { RoleResponse } from '../../interface/role-response';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-role-edit-dialog',
  imports: [
    ScrollPanelModule,
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
    InputGroupAddonModule,
    FocusTrapModule,
    AutoFocusModule,
  ],
  templateUrl: './role-edit-dialog.component.html',
  styleUrl: './role-edit-dialog.component.scss',
})
export class RoleEditDialogComponent {

  constructor(
    private router: Router,
    private roleApi: RoleApiService,
    private messageService: MessageService
  ) {}

  @Input() visible: boolean = false;
  @Input() roleData = signal<RoleResponse>({
    id: '',
    name: '',
    permissions: [{ name: '', id: '' }],
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
      id: new FormControl(this.roleData().id, [Validators.required]),
      name: new FormControl(this.roleData().name, [Validators.required]),
      permissions: new FormArray(
        this.roleData().permissions.map((permission) => {
          return new FormGroup({
            id: new FormControl(permission.id, [Validators.required]),
            name: new FormControl(permission.name, [Validators.required]),
          });
        })
      ),
    });
  });

  onSubmit() {
    const filteredPermissions = this.editForm()
      .getRawValue()
      .permissions.filter(
        (p) =>
          p.id !== '' &&
          p.id !== null &&
          p.id !== '' &&
          p.name !== '' &&
          p.name !== null
      );
    this.editForm().setControl(
      'permissions',
      new FormArray(
        filteredPermissions.map(
          (permission) =>
            new FormGroup({
              id: new FormControl(permission.id, [Validators.required]),
              name: new FormControl(permission.name, [Validators.required]),
            })
        )
      )
    );
    this.errors = [''];
    this.roleApi.UpdateRole(this.editForm().getRawValue()).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<any>;
        if (res.status === 200) {
          this.visible = false;
          this.visibleChange.emit(this.visible);

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Role Updated',
            detail: 'Role updated successfully.',
          });
        } else if (res.status === 400) {
          res.message.forEach((element: any) => {
            this.errors.push(element);
          });
        } else if (res.status === 404) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Updating the role failed ',
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

  get permissions(): FormArray {
    return this.editForm().get('permissions') as FormArray;
  }

  addPermission() {
    this.permissions.push(
      new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
      })
    );
  }

  // Remove a permission
  removePermission(index: number) {
    this.permissions.removeAt(index);
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  getError(input: string): string | null {
    return this.errors.find((error) => error.includes(input)) || null;
  }
  
}
