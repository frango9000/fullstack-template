import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { stubCardViewHeaderServiceProvider } from '../../../../../../../../core/modules/card-view/services/card-view-header.service.stub';
import { stubToasterServiceProvider } from '../../../../../../../../core/services/toaster.service.stub';
import { FormErrorModule } from '../../../../../../../../shared/modules/form-error/form-error.module';
import { stubUserManagementServiceProvider } from '../../../../services/user-management.service.stub';
import { UserManagementCreateComponent } from './user-management-create.component';

describe('UserManagementCreateComponent', () => {
  let component: UserManagementCreateComponent;
  let fixture: ComponentFixture<UserManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormErrorModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
      ],
      declarations: [UserManagementCreateComponent],
      providers: [stubUserManagementServiceProvider, stubCardViewHeaderServiceProvider, stubToasterServiceProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
