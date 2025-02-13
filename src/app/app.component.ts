import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./share/navbar/navbar.component";
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { BreadcrumbComponent } from './share/breadcrumb/breadcrumb.component';
import { ToastComponent } from "./share/toast/toast.component";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BreadcrumbComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'CMS-Angular-UI';
  constructor(private auth: AuthenticationService,private messageService: MessageService) { }

  position: any = 'top-center';
  key: string= 'toast';
  baseZIndex: number = 3000;


}
