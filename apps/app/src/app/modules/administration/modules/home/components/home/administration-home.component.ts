import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CoreService } from '../../../../../../core/services/core.service';
import { TiledMenuTileData } from '../../../../../../shared/modules/tiled-menu/components/tiled-menu-tile/tiled-menu-tile.component';

@Component({
  selector: 'app-administration-home',
  templateUrl: './administration-home.component.html',
  styleUrls: ['./administration-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministrationHomeComponent implements OnDestroy {
  tiles: TiledMenuTileData[] = [
    {
      icon: 'manage_accounts',
      title: 'User Management',
      subtitle: 'Manage User Accounts',
      link: 'user-management',
    },
    {
      icon: 'cabin',
      title: 'Service Logs',
      subtitle: 'Have a look at the service logs.',
      link: 'service-logs',
    },
  ];

  constructor(private readonly coreService: CoreService) {
    this.coreService.setCoreStyle('raw');
  }

  ngOnDestroy(): void {
    this.coreService.reset();
  }
}