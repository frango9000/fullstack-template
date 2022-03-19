import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslationService } from '@app/ui/shared';

@Component({
  selector: 'app-locale-picker',
  templateUrl: './locale-picker.component.html',
  styleUrls: ['./locale-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LocalePickerComponent {
  public readonly pickerFlagWidth = 35;
  public readonly pickerFlagHeight = 23;
  public readonly menuFlagWidth = 30;
  public readonly menuFlagHeight = 20;

  constructor(public readonly translationService: TranslationService) {}
}