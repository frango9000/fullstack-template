import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { stubToasterServiceProvider } from '@app/ui/shared/app';
import { getTranslocoModule } from '@app/ui/testing';
import { stubGlobalSettingsServiceProvider } from '../../../../services/global-settings.service.stub';
import { GlobalSettingsGeneralSignupOpenComponent } from './global-settings-general-signup-open.component';

describe('GlobalSettingsGeneralSignupOpenComponent', () => {
  let component: GlobalSettingsGeneralSignupOpenComponent;
  let fixture: ComponentFixture<GlobalSettingsGeneralSignupOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatSlideToggleModule, getTranslocoModule()],
      declarations: [GlobalSettingsGeneralSignupOpenComponent],
      providers: [stubToasterServiceProvider, stubGlobalSettingsServiceProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSettingsGeneralSignupOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
