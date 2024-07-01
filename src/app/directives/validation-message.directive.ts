import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {NgControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[appValidationMessage]'
})
export class ValidationMessageDirective implements OnInit {
  @Input() validationItem: string = 'value';
  @Input() messageVerticalPosition: string = '0';
  @Input() set isDisabledInput(isDisabled: boolean) {
    isDisabled
      ? this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true')
      : this.renderer.removeAttribute(this.el.nativeElement,'disabled');
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngOnInit() {
    if (this.control.statusChanges) {
      this.control.statusChanges
        .pipe(
          untilDestroyed(this),
          debounceTime(300)
        )
        .subscribe(() => {
          this.updateValidationMessage();
        });
    }
  }

  private removeExistingMsg(parent: HTMLElement): void {
    const existingMessage = parent.querySelector('.validation-message');

    if (existingMessage) {
      this.renderer.removeChild(parent, existingMessage);
    }
  }

  private updateValidationMessage(): void {
    const parent = this.el.nativeElement.parentNode;

    this.removeExistingMsg(parent);

    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      const message = this.renderer.createElement('span');
      const text = this.renderer.createText(`Please provide a correct ${this.validationItem}`);

      this.renderer.addClass(message, 'validation-message');
      this.renderer.setStyle(message, 'color', 'red');
      this.renderer.setStyle(message, 'font-size', 'small');
      this.renderer.setStyle(message, 'position', 'absolute');
      this.renderer.setStyle(message, 'top', `${this.messageVerticalPosition}px`);
      this.renderer.setStyle(message, 'left', '0')
      this.renderer.appendChild(message, text);
      this.renderer.appendChild(parent, message);

      this.renderer.setStyle(this.el.nativeElement, 'border-color', 'red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
    }
  }
}
