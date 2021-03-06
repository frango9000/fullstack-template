import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ContextMenuComponent } from './components/context-menu.component';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, MatTooltipModule, RouterModule],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {}
