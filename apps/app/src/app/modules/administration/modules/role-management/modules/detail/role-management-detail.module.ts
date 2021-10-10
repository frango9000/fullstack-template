import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorModule } from '../../../../../../shared/modules/form-error/form-error.module';
import { RoleManagementDetailAuthoritiesComponent } from './components/role-management-detail-authorities/role-management-detail-authorities.component';
import { RoleManagementDetailNameComponent } from './components/role-management-detail-name/role-management-detail-name.component';
import { RoleManagementDetailComponent } from './components/role-management-detail/role-management-detail.component';
import { RoleManagementDetailRoutingModule } from './role-management-detail-routing.module';

@NgModule({
  declarations: [
    RoleManagementDetailComponent,
    RoleManagementDetailAuthoritiesComponent,
    RoleManagementDetailNameComponent,
  ],
  imports: [
    CommonModule,
    RoleManagementDetailRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormErrorModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class RoleManagementDetailModule {}