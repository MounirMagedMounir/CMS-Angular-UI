import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation-scrole',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './animation-scrole.component.html',
  styleUrl: './animation-scrole.component.scss' 

})

export class AnimationScroleComponent implements AfterViewInit {
  constructor(private cd:ChangeDetectorRef) {}
 isVisible = false;

  @ViewChild('animatedElement', { static: false }) animatedElement!: ElementRef;

  ngAfterViewInit() {
    this.checkScroll(); // Check on load
    this.cd.detectChanges();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    if (!this.animatedElement) return;

    const rect = this.animatedElement.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

     // Calculate visibility boundaries
     const triggerBottom = windowHeight - 100;
     const triggerTop = 100;
 
     // Check if element overlaps with trigger zone
     const isElementVisible = 
       rect.top <= triggerBottom && 
       rect.bottom >= triggerTop;
 
     // Only update if visibility changes
     if (isElementVisible !== this.isVisible) {
       this.isVisible = isElementVisible;
       this.cd.detectChanges(); // Force update for animation bindings
     }
   
  }
}
