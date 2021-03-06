import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { stubUserManagementDetailServiceProvider } from '../../../../services/user-management-detail.service.stub';
import { UserManagementAccountDeleteConfirmComponent } from './user-management-account-delete-confirm.component';

describe('UserManagementAccountDeleteConfirmComponent', () => {
  let component: UserManagementAccountDeleteConfirmComponent;
  let fixture: ComponentFixture<UserManagementAccountDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
      declarations: [UserManagementAccountDeleteConfirmComponent],
      providers: [stubUserManagementDetailServiceProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAccountDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
