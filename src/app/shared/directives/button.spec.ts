import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from './button';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  selector: 'test-host',
  standalone: true,
  template: `<button mcMainButton>Click me</button>`,
  imports: [ButtonDirective],
})
class TestHostComponent {}

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should add mcmain-button class to the element', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('mcmain-button')).toBeTrue();
  });
});
