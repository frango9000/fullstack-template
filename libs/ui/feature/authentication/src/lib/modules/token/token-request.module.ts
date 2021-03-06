import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreCardViewModule, FormErrorModule } from '@app/ui/shared/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TokenRequestComponent } from './components/token-request/token-request.component';
import { TokenRequestRoutingModule } from './token-request-routing.module';

@NgModule({
  declarations: [TokenRequestComponent],
  imports: [
    CommonModule,
    TokenRequestRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    FormErrorModule,
    MatButtonModule,
    MatInputModule,
    TranslocoModule,
    CoreCardViewModule,
  ],
})
export class TokenRequestModule {}
