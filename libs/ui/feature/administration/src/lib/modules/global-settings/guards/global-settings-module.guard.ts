import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GlobalSettingsRelations } from '@app/ui/shared/domain';
import { AdministrationService } from '@app/ui/shared/feature/administration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalSettingsModuleGuard implements CanActivate {
  constructor(private readonly administrationService: AdministrationService) {}

  canActivate(): Observable<boolean> {
    return this._guard();
  }

  canLoad(): Observable<boolean> {
    return this._guard();
  }

  private _guard(): Observable<boolean> {
    return this.administrationService.hasLink(GlobalSettingsRelations.GLOBAL_SETTINGS_REL);
  }
}
