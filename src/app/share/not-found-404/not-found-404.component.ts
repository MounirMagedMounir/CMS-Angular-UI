import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-not-found-404',
  imports: [Button,RouterLink],
  templateUrl: './not-found-404.component.html',
  styleUrl: './not-found-404.component.scss'
})
export class NotFound404Component {

}
