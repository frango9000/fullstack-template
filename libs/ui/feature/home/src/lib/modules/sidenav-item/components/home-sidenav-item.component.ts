import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MenuData } from '@app/ui/shared/domain';

@Component({
  selector: 'app-home-sidenav-item',
  templateUrl: './home-sidenav-item.component.html',
  styleUrls: ['./home-sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSidenavItemComponent {
  @Output() toggleSidenav = new EventEmitter();
  public items: MenuData[] = [
    {
      icon: 'home',
      title: 'Home',
      link: '/',
    },
  ];
}
