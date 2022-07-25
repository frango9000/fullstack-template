import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IsMobileModule } from '@app/ui/shared/core';
import { TiledMenuTileComponent } from './components/tiled-menu-tile/tiled-menu-tile.component';
import { TiledMenuComponent } from './components/tiled-menu/tiled-menu.component';

@NgModule({
  declarations: [TiledMenuComponent, TiledMenuTileComponent],
  imports: [CommonModule, MatIconModule, RouterModule, IsMobileModule],
  exports: [TiledMenuComponent],
})
export class TiledMenuModule {}
