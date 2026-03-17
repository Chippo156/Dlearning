import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule],
})
export class PaymentFailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    document.title = 'Payment Failed';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
