import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { CertificateService } from '@services/certificate.service';

@Component({
  selector: 'app-certificate-page',
  templateUrl: './certificate-page.component.html',
})
export class CertificatePageComponent implements OnInit {
  certificates: any[] = [];
  loading = true;
  httpError = '';

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.fetchCertificates();
  }

  fetchCertificates() {
    // this.certificateService.getCertificateCurrentLogin().subscribe({
    //   next: (res: any) => {
    //     this.certificates = res?.data || [];
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.httpError = err.message || 'Failed to fetch certificates';
    //     this.loading = false;
    //   },
    // });
  }

  handleDownload(certificateId: string) {
    Swal.fire({
      title: 'Download Confirmation',
      text: 'Are you sure you want to download this certificate?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Download',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const element = document.getElementById(`certificate-${certificateId}`);
        if (!element) return;

        html2canvas(element, { scale: 5 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          const pdf = new jsPDF('p', 'mm', 'a4');

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

          pdf.save(`Certificate_${certificateId}.pdf`);
        });
      }
    });
  }
}
