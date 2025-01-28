import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { userAuthenticationApiService } from '../../core/services/api/userAuthentication/user-authentication-api.service';
import { ApiResponse } from '../../core/interface/api-response';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Message } from 'primeng/message';
@Component({
  selector: 'app-signout',
  imports: [ProgressSpinner,Message],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})

export class SignoutComponent implements OnInit {

  constructor(private router: Router, private userAuthApi: userAuthenticationApiService,private auth :AuthenticationService) { }
  

  errors: string[] = [""];
  alert = signal("");

  clearMessages() {
    this.alert.set("");
  }

  ngOnInit(): void {

    this.userAuthApi.signOut(null).subscribe(
      {
        next: (response: any) => {
          const res = response as ApiResponse<null>;
          if (res.status === 200) {
                this.auth.signout();
            this.router.navigate(['/']);
          }
          else if (res.status === 404) {
            this.auth.signout();
            res.message.forEach((element: any) => { 
              // console.log("eelementrror " + element); 
              this.errors.push(element) });
            this.router.navigate(['/login']);
          } 
        },
        error: (error) => {
          this.auth.signout();
          console.log("server error " + error);
        }
      });
  }

}
