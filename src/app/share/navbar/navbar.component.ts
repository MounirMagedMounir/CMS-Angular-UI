import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import {RouterModule} from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';


@Component({
  selector: 'app-navbar',
  imports: [Menubar,RouterModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,MenuModule,  RippleModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{
auth=inject(AuthenticationService);
mainMenu: MenuItem[] | undefined;
endMenu: MenuItem[] | undefined;

 
ngOnInit() : void {


      this.mainMenu = [

          {
              label: 'About',
               route: '/about'
          },

          {
              label: 'Contact',
               route: '/Contact'
          }
      ];
      this.endMenu = [
          {
              label: 'Profile',
              icon: 'pi pi-home',
               route: '/profile'
          },
          {
              label: 'Sign Out',
              icon: 'pi pi-envelope',
               route: '/signout'
          }
      ];

  }




}
