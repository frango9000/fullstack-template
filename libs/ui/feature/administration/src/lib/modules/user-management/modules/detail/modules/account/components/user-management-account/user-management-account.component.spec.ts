import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementAccountDeleteComponent } from '../user-management-account-delete/user-management-account-delete.component';
import { UserManagementAccountPasswordComponent } from '../user-management-account-password/user-management-account-password.component';
import { UserManagementAccountTokenComponent } from '../user-management-account-token/user-management-account-token.component';
import { UserManagementAccountComponent } from './user-management-account.component';

@Component({ selector: 'app-user-management-account-delete', template: '' })
export class StubUserManagementAccountDeleteComponent implements Partial<UserManagementAccountDeleteComponent> {}

@Component({ selector: 'app-user-management-account-password', template: '' })
export class StubUserManagementAccountPasswordComponent implements Partial<UserManagementAccountPasswordComponent> {}

@Component({ selector: 'app-user-management-account-token', template: '' })
export class StubUserManagementAccountTokenComponent implements Partial<UserManagementAccountTokenComponent> {}

describe('UserManagementAccountComponent', () => {
  let component: UserManagementAccountComponent;
  let fixture: ComponentFixture<UserManagementAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserManagementAccountComponent,
        StubUserManagementAccountDeleteComponent,
        StubUserManagementAccountPasswordComponent,
        StubUserManagementAccountTokenComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
