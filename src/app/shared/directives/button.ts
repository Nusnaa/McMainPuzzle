import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[mcMainButton]',
})
export class ButtonDirective {
  private element = inject(ElementRef);

  constructor() {
    this.element.nativeElement.classList.add('mcmain-button');
  }
}
