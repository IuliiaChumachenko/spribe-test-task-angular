import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-btns-panel',
  templateUrl: './btns-panel.component.html',
  styleUrl: './btns-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnsPanelComponent implements OnInit {
  @Input() isSubmitting!: boolean;
  @Input() isBtnDisabled!: boolean;

  @Output() confirmSubmission: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSubmitting: EventEmitter<boolean> = new EventEmitter<boolean>();

  timer!: number;
  timerInterval!: number;

  private readonly defaultTimer = 15;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.timer = this.defaultTimer;
  }

  startTimer(): void {
    this.changeSubmitting.emit(true);

    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.cd.markForCheck();
      } else {
        this.confirmSubmission.emit();
        this.cancelSubmitting();
      }
    }, 1000);
  }

  cancelSubmitting(): void {
    this.changeSubmitting.emit(false);
    this.timer = this.defaultTimer;
    this.stopTimer();
  }

  private stopTimer(): void {
    clearInterval(this.timerInterval);

    this.cd.markForCheck();
  }
}
