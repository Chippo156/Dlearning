import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateTemplateComponent } from '@modules/certificate-template/certificate-template.component';

@Component({
  selector: 'app-certificate-content',
  standalone: true,
  imports: [CommonModule, CertificateTemplateComponent],
  templateUrl: './certificate-content.component.html',
})
export class CertificateContentComponent {}
