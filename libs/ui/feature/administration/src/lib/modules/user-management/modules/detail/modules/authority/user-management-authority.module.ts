import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorModule } from '@app/ui/shared/common';
import { NgLetModule } from '@app/ui/shared/core';
import { TranslocoModule } from '@ngneat/transloco';
import { UserManagementAuthoritiesComponent } from './components/user-management-authorities/user-management-authorities.component';
import { UserManagementAuthorityComponent } from './components/user-management-authority/user-management-authority.component';
import { UserManagementRoleComponent } from './components/user-management-role/user-management-role.component';
import { UserManagementAuthorityRoutingModule } from './user-management-authority-routing.module';

@NgModule({
  declarations: [UserManagementAuthorityComponent, UserManagementRoleComponent, UserManagementAuthoritiesComponent],
  imports: [
    CommonModule,
    UserManagementAuthorityRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormErrorModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgLetModule,
    TranslocoModule,
  ],
})
export class UserManagementAuthorityModule {}
