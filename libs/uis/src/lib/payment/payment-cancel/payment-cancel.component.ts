import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
})
export class PaymentCancelComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    document.title = 'Payment Cancel';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
