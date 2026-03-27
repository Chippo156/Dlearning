import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-banner-layout',
  templateUrl: './banner-layout.component.html',
  standalone: true,
  imports: [RouterModule, BannerComponent],
})
export class BannerLayoutComponent {}
