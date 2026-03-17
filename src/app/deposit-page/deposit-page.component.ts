import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  constructor(private message: NzMessageService) {}

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  onCustomAmountChange() {
    this.selectedAmount = null;
  }

  deposit() {
    const token = localStorage.getItem('token');
    const amount = this.selectedAmount || this.customAmount;

    if (!amount || amount < 1000) {
      this.message.error('Please enter a valid amount (>= 1000 VND)');
      return;
    }

    this.loading = true;

    fetch(
      `http://localhost:8081/api/v1/payment/vn-pay?amount=${amount}&bankCode=NCB`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.data.paymentUrl;
      })
      .catch(() => {
        this.message.error('An error occurred');
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
