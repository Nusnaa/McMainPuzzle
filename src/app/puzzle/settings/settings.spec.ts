import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { Settings } from './settings';

describe('Settings Component (Standalone)', () => {
  let fixture: ComponentFixture<Settings>;
  let component: Settings;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Settings],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;

    component.gridSize = signal(3);
    component.tileSize = signal(100);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit settingsChange when onSettingsChange is called', () => {
    spyOn(component.settingsChange, 'emit');

    component.onSettingsChange();

    expect(component.settingsChange.emit).toHaveBeenCalled();
  });

  it('should reflect initial signal values', () => {
    expect(component.gridSize()).toBe(3);
    expect(component.tileSize()).toBe(100);
  });

  it('should update signal values dynamically', () => {
    component.gridSize.set(4);
    component.tileSize.set(120);

    expect(component.gridSize()).toBe(4);
    expect(component.tileSize()).toBe(120);
  });
});
