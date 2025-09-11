import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../shared/directives/button';

@Component({
  selector: 'mcmain-puzzle-settings',
  imports: [CommonModule, FormsModule, ButtonDirective],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  @Input() gridSize!: WritableSignal<number>;
  @Input() tileSize!: WritableSignal<number>;
  @Output() settingsChange = new EventEmitter();

  onSettingsChange() {
    this.settingsChange.emit();
  }
}
