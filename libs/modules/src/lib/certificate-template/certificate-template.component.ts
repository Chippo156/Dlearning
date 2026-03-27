import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-template.component.html',
})
export class CertificateTemplateComponent {
  @Input() recipientName!: string;
  @Input() courseName!: string;
  @Input() instructorName!: string;
  @Input() completionDate!: string;
}
