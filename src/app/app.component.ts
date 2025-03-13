import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./share/navbar/navbar.component";
import { BreadcrumbComponent } from './share/breadcrumb/breadcrumb.component';
import { ToastComponent } from "./share/toast/toast.component";

import { ScrollTopModule } from 'primeng/scrolltop';


@Component({
  selector: 'app-root',
  imports: [ScrollTopModule,RouterOutlet, NavbarComponent, BreadcrumbComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'CMS-Angular-UI';
  position: any = 'top-center';
  key: string= 'toast';
  baseZIndex: number = 3000;


}
