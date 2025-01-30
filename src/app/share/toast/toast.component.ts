import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule, ButtonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})

export class ToastComponent  {
  constructor(public messageService: MessageService) {}
@Input({required:true}) position: any= 'top-right';
@Input({required:true}) key: string = 'toast';
@Input({required:true}) baseZIndex: number = 3000;
}
