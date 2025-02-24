import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTableComponent } from './role-table.component';

describe('RoleTableComponent', () => {
  let component: RoleTableComponent;
  let fixture: ComponentFixture<RoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
