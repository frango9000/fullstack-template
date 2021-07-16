import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorModule } from '../../../../../shared/components/form-error/form-error.component';
import { UserUploadAvatarComponent } from './components/user-upload-avatar/user-upload-avatar.component';

import { UserUploadAvatarRoutingModule } from './user-upload-avatar-routing.module';

@NgModule({
  declarations: [UserUploadAvatarComponent],
  imports: [
    CommonModule,
    UserUploadAvatarRoutingModule,
    FormErrorModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class UserUploadAvatarModule {}
