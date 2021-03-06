import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const loadLoginModule = () => import('./modules/login/login.module').then((m) => m.LoginModule);
const loadSignupModule = () => import('./modules/signup/signup.module').then((m) => m.SignupModule);
const loadActivationModule = () =>
  import('./modules/activation/account-activation.module').then((m) => m.AccountActivationModule);
const loadTokenModule = () => import('./modules/token/token-request.module').then((m) => m.TokenRequestModule);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: loadLoginModule,
    canActivate: [AuthGuard],
    data: { breadcrumb: { i18n: 'authentication.login', parentOffset: 1 } },
  },
  {
    path: 'signup',
    loadChildren: loadSignupModule,
    canActivate: [AuthGuard],
    data: { breadcrumb: { i18n: 'authentication.signup' } },
  },
  {
    path: 'activation',
    loadChildren: loadActivationModule,
    canActivate: [AuthGuard],
    data: { breadcrumb: { i18n: 'authentication.activation' } },
  },
  {
    path: 'token-request',
    loadChildren: loadTokenModule,
    canActivate: [AuthGuard],
    data: { breadcrumb: { i18n: 'authentication.token-request' } },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
