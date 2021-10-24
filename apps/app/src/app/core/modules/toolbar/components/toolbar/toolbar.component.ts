import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavService } from '../../../sidenav/services/sidenav.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  constructor(
    public readonly toolbarService: ToolbarService,
    public readonly sidenavService: SidenavService,
    public readonly breadcrumbService: BreadcrumbService,
  ) {}
}
