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
import { stubToasterServiceProvider } from '@app/ui/shared/app';
import { FormErrorModule, StubCoreCardViewComponent } from '@app/ui/shared/common';
import { getTranslocoModule } from '@app/ui/testing';
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
        getTranslocoModule(),
      ],
      declarations: [UserManagementCreateComponent, StubCoreCardViewComponent],
      providers: [stubUserManagementServiceProvider, stubToasterServiceProvider],
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
