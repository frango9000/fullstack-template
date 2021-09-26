import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgLetModule } from '../../../../../../../../../../shared/directives/ng-let.directive';
import { stubToasterServiceProvider } from '../../../../../../../../../../shared/services/toaster.service.stub';
import { stubUserManagementDetailServiceProvider } from '../../../../services/user-management-detail.service.stub';
import { UserManagementAccountTokenComponent } from './user-management-account-token.component';

describe('UserManagementAccountTokenComponent', () => {
  let component: UserManagementAccountTokenComponent;
  let fixture: ComponentFixture<UserManagementAccountTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, NgLetModule],
      declarations: [UserManagementAccountTokenComponent],
      providers: [stubToasterServiceProvider, stubUserManagementDetailServiceProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAccountTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
