import { TestBed } from '@angular/core/testing';
import { stubUserManagementServiceProvider } from '../services/user-management.service.stub';

import { UserManagementGuard } from './user-management.guard';

describe('UserManagementGuard', () => {
  let guard: UserManagementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [stubUserManagementServiceProvider],
    });
    guard = TestBed.inject(UserManagementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});