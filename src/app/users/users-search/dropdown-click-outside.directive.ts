import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropdownClickOutside]'
})
export class DropdownClickOutsideDirective {
  // Properties
  private localEvent = null;

  // Event Emitter
  @Output('appDropdownClickOutside')
  dropdownClickOutside: EventEmitter<any> = new EventEmitter();

  // Event Listener
  @HostListener('document:click', ['$event'])
  compareEvent($event: MouseEvent) {
    if ($event !== this.localEvent) {
      this.dropdownClickOutside.emit($event);
    }
    this.localEvent = null;
  }

  /**
   * Directive constructor
   */
  constructor() {}
}
