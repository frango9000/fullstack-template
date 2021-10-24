import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const loadUserUserSettingsHomeModule = () =>
  import('./modules/home/user-settings-home.module').then((m) => m.UserSettingsHomeModule);

const loadUserUpdateProfileModule = () =>
  import('./modules/update-profile/user-update-profile.module').then((m) => m.UserUpdateProfileModule);

const loadUserRemoveAccountModule = () =>
  import('./modules/remove-account/user-remove-account.module').then((m) => m.UserRemoveAccountModule);

const loadUserChangePasswordModule = () =>
  import('./modules/change-password/user-change-password.module').then((m) => m.UserChangePasswordModule);

const loadUserUploadAvatarModule = () =>
  import('./modules/upload-avatar/user-upload-avatar.module').then((m) => m.UserUploadAvatarModule);

const loadUserPreferencesModule = () =>
  import('./modules/preferences/current-user-preferences.module').then((m) => m.CurrentUserPreferencesModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: loadUserUserSettingsHomeModule,
    pathMatch: 'full',
    data: { breadcrumb: 'User Settings Home' },
  },
  {
    path: 'profile',
    loadChildren: loadUserUpdateProfileModule,
    data: { breadcrumb: 'User Profile' },
  },
  {
    path: 'delete',
    loadChildren: loadUserRemoveAccountModule,
  },
  {
    path: 'password',
    loadChildren: loadUserChangePasswordModule,
  },
  {
    path: 'avatar',
    loadChildren: loadUserUploadAvatarModule,
  },
  {
    path: 'preferences',
    loadChildren: loadUserPreferencesModule,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
