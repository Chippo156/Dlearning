import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PaymentService } from '@shared/services/payment.service';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
})
export class DepositPageComponent {
  predefinedAmounts = [
    50000, 100000, 200000, 500000, 1000000, 2000000, 4000000, 5000000,
  ];

  selectedAmount: number | null = null;
  customAmount: number | null = null;
  loading = false;

  constructor(
    private notification: NzNotificationService,
    private paymentService: PaymentService
  ) {}

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  onCustomAmountChange() {
    this.selectedAmount = null;
  }

  deposit() {
    const amount = this.selectedAmount || this.customAmount;

    if (!amount || amount < 1000) {
      this.notification.error('Please enter a valid amount (>= 1000 VND)', '');
      return;
    }

    this.loading = true;

    this.paymentService.goVnpay(amount).subscribe({
      next: (res) => {
        window.location.href = res.paymentUrl;
      },
      error: (err) => {
        this.notification.error(
          'Payment Failed',
          err.message || 'Please try again.'
        );
        this.loading = false;
      },
    });
  }
}
