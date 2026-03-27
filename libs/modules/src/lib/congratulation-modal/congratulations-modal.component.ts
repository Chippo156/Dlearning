import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-congratulations-modal',
  templateUrl: './congratulations-modal.component.html',
  styleUrls: ['./congratulations-modal.component.less'],
  standalone: true,
  imports: [NzButtonModule],
})
export class CongratulationsModalComponent implements AfterViewInit {
  @Input() avatar!: string;
  @Input() username!: string;

  @Output() onClose = new EventEmitter<void>();

  @ViewChild('confettiContainer', { static: true })
  confettiContainer!: ElementRef;

  ngAfterViewInit() {
    this.createConfetti();
  }

  createConfetti() {
    const container = this.confettiContainer.nativeElement;

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${2 + Math.random() * 3}s`;

      container.appendChild(confetti);
    }
  }

  close() {
    this.onClose.emit();
  }
}
