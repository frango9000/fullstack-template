import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoritiesResolver } from '../../../../../role-management/resolvers/authorities.resolver';
import { RolesResolver } from '../../../../../role-management/resolvers/roles.resolver';
import { UserManagementAuthorityComponent } from './components/user-management-authority/user-management-authority.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementAuthorityComponent,
    resolve: {
      roles: RolesResolver,
      authorities: AuthoritiesResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementAuthorityRoutingModule {}
