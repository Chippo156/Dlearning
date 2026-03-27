import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateResponse } from '@shared/models/data/certificate-response.model';

@Component({
  selector: 'app-certificate-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-card.component.html',
})
export class CertificateCardComponent {
  @Input() certificate!: CertificateResponse;

  @Output() download = new EventEmitter<number>();

  handleDownload() {
    this.download.emit(this.certificate.certificateId);
  }
}
