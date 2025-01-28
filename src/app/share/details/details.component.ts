import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';




@Component({
  selector: 'app-details',
  imports: [Avatar, PanelModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true
})
export class DetailsComponent  {
  @Input() data?: any;
}