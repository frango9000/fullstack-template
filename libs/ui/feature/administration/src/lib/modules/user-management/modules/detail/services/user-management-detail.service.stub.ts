import { Injectable } from '@angular/core';
import { User, UserPreferences } from '@app/ui/shared/domain';
import { of } from 'rxjs';
import { UserManagementDetailService } from './user-management-detail.service';

@Injectable({ providedIn: 'root' })
export class StubUserManagementDetailService implements Partial<UserManagementDetailService> {
  get user$() {
    return of(new User({}));
  }

  fetchUserPreferences = () => of(new UserPreferences({}));
  canUpdateProfile = () => of(true);
  canUpdateAuthorities = () => of(true);
  canUpdateRole = () => of(true);
  canSendActivationToken = () => of(true);
  canDeleteAccount = () => of(true);
}

export const stubUserManagementDetailServiceProvider = {
  provide: UserManagementDetailService,
  useClass: StubUserManagementDetailService,
};
