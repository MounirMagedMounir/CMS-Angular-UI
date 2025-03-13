import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationScroleComponent } from './animation-scrole.component';

describe('AnimationScroleComponent', () => {
  let component: AnimationScroleComponent;
  let fixture: ComponentFixture<AnimationScroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationScroleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationScroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
