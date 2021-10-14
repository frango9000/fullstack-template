import { TestBed } from '@angular/core/testing';
import { stubAdministrationServiceProvider } from '../../../services/administration.service.stub';

import { GlobalSettingsModuleGuard } from './global-settings-module.guard';

describe('GlobalSettingsModuleGuard', () => {
  let guard: GlobalSettingsModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [stubAdministrationServiceProvider],
    });
    guard = TestBed.inject(GlobalSettingsModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
