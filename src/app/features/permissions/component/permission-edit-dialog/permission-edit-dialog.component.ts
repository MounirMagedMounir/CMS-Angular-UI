import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ApiResponse } from '../../../../core/interface/api-response';
import { PermissionApiService } from '../../../../core/services/api/permission/permission-api.service';
import { PermissionResponse } from '../../interface/permission-response';

@Component({
  selector: 'app-permission-edit-dialog',
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
  templateUrl: './permission-edit-dialog.component.html',
  styleUrl: './permission-edit-dialog.component.scss'
})
export class PermissionEditDialogComponent {

  constructor(
    private router: Router,
    private PermissionApi: PermissionApiService,
    private messageService: MessageService
  ) {}

  @Input() visible: boolean = false;
  @Input() permissionData = signal<PermissionResponse>({
    id: '',
    name: '',
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
      id: new FormControl(this.permissionData().id, [Validators.required]),
      name: new FormControl(this.permissionData().name, [Validators.required]),
    });
  });

  onSubmit() {
    this.errors = [''];
    this.PermissionApi.UpdatePermission(this.editForm().getRawValue()).subscribe({
      next: (response: any) => {
        const res = response as ApiResponse<any>;
        if (res.status === 200) {
          this.visible = false;
          this.visibleChange.emit(this.visible);

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Permission Updated',
            detail: 'Permission updated successfully.',
          });
        } else if (res.status === 400) {
          res.message.forEach((element: any) => {
            this.errors.push(element);
          });
        } else if (res.status === 404) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Updating the Permission failed ',
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
    this.visibleChange.emit(this.visible);
  }

  getError(input: string): string | null {
    return this.errors.find((error) => error.includes(input)) || null;
  }
  
}
