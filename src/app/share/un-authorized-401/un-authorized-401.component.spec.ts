import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorized401Component } from './un-authorized-401.component';

describe('UnAuthorized401Component', () => {
  let component: UnAuthorized401Component;
  let fixture: ComponentFixture<UnAuthorized401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthorized401Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthorized401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
