import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./share/navbar/navbar.component";
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { BreadcrumbComponent } from './share/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'CMS-Angular-UI';
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    var refreshToken = localStorage.getItem("refreshToken");
    if (token && refreshToken) {
      console.log("Token and Refresh Token are available");
      this.auth.initializeAuthentication();
    }
  }
}
