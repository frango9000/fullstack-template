import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { stubMessageServiceProvider } from '../../../../../../../../../../core/services/message.service.stub';
import { stubToasterServiceProvider } from '../../../../../../../../../../core/services/toaster.service.stub';
import { stubTranslationServiceProvider } from '../../../../../../../../../../core/services/translation.service.stub';
import { FormErrorModule } from '../../../../../../../../../../shared/modules/form-error/form-error.module';
import { stubUserManagementDetailServiceProvider } from '../../../../services/user-management-detail.service.stub';
import { UserManagementPreferencesComponent } from './user-management-preferences.component';

describe('UserManagementPreferencesComponent', () => {
  let component: UserManagementPreferencesComponent;
  let fixture: ComponentFixture<UserManagementPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        FormErrorModule,
      ],
      declarations: [UserManagementPreferencesComponent],
      providers: [
        stubUserManagementDetailServiceProvider,
        stubTranslationServiceProvider,
        stubToasterServiceProvider,
        stubMessageServiceProvider,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});