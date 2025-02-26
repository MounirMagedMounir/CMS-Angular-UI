import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditDialogComponent } from './role-edit-dialog.component';

describe('RoleEditDialogComponent', () => {
  let component: RoleEditDialogComponent;
  let fixture: ComponentFixture<RoleEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
