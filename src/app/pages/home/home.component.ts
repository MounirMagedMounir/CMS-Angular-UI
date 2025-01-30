import { Component } from '@angular/core';
import { ToastComponent } from '../../share/toast/toast.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {

  // constructor(private messageService: MessageService) {}

  // showToast() {

  //   this.messageService.add({
  //     key: 'toast',
  //     sticky: true,
  //     severity: 'error',
  //     summary: 'Can you send me the report?'
  //     , detail: 'I need the report to finish the task.',
  //     data: {
  //       button:[ {
  //         label: 'Delete',
  //         severity: 'danger',
  //         action: () => this.handleReply(),
  //       },{
  //         label: 'cansel',
  //         severity: 'error',
  //         action: () => this.handleCansel(),
  //       }],
  //     },
  //   });

  // }


  // private handleReply() {
  //   console.log('Reply clicked');
  //   this.messageService.clear('toast');
  // }

  // private handleCansel() {
  //   console.log('cansel clicked');
  //   this.messageService.clear('toast');
  // }

}
