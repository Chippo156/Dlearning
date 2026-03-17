import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Certificate {
  certificateId: string;
  username: string;
  courseName: string;
  author: string;
  issueDate: string;
}

@Component({
  selector: 'app-certificate-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-card.component.html',
})
export class CertificateCardComponent {
  @Input() certificate!: Certificate;

  @Output() download = new EventEmitter<string>();

  handleDownload() {
    this.download.emit(this.certificate.certificateId);
  }
}
