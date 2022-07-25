import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbService, SearchService, SidenavService, ToolbarService } from '@app/ui/shared/core';

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
    public readonly searchService: SearchService,
  ) {}
}
