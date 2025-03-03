import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEditDialogComponent } from './permission-edit-dialog.component';

describe('PermissionEditDialogComponent', () => {
  let component: PermissionEditDialogComponent;
  let fixture: ComponentFixture<PermissionEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
