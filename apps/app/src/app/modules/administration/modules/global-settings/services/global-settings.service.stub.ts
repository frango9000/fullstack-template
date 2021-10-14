import { Injectable } from '@angular/core';
import { GlobalSettings } from '@app/domain';
import { of } from 'rxjs';
import { GlobalSettingsService } from './global-settings.service';

@Injectable({
  providedIn: 'root',
})
export class StubGlobalSettingsService implements Partial<GlobalSettingsService> {
  getGlobalSettings = () => of(new GlobalSettings({}));
  canUpdateGlobalSettings = () => of(true);
}

export const stubGlobalSettingsServiceProvider = {
  provide: GlobalSettingsService,
  useClass: StubGlobalSettingsService,
};
