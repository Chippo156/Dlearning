import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  courses: any[] = [];

  hasMore = true;

  showPromoModal = false;

  ngOnInit(): void {
    document.title = 'Home Page';

    setTimeout(() => {
      this.showPromoModal = true;
    }, 700);
  }

  closePromoModal() {
    this.showPromoModal = false;
  }
}
