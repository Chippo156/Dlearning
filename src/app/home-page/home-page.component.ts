import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  courses: any[] = [];

  currentPage = 1;
  pageSize = 4;

  hasMore = true;
  loading = true;

  showPromoModal = false;
  ads: any[] = [];

  //   constructor(
  //     private courseService: CourseService,
  //     private advertisementService: AdvertisementService,
  //   ) {}

  ngOnInit(): void {
    document.title = 'Home Page';

    this.fetchAds();
    this.fetchCourses();

    setTimeout(() => {
      this.showPromoModal = true;
    }, 700);
  }

  fetchAds() {
    // this.advertisementService.getAdsActive().subscribe({
    //   next: (res: any) => {
    //     this.ads = res?.data || [];
    //   },
    //   error: (err) => console.error(err),
    // });
  }

  fetchCourses() {
    this.loading = true;

    // this.courseService
    //   .getAllCoursesCaching(this.currentPage, this.pageSize)
    //   .subscribe({
    //     next: (res: any) => {
    //       const { result, totalPages } = res.data;

    //       if (this.currentPage === 1) {
    //         this.courses = result;
    //       } else {
    //         const newCourses = result.filter(
    //           (c: any) => !this.courses.some((prev) => prev.id === c.id),
    //         );

    //         this.courses = [...this.courses, ...newCourses];
    //       }

    //       if (this.currentPage >= totalPages) {
    //         this.hasMore = false;
    //       }
    //     },
    //     error: (err) => console.error(err),
    //     complete: () => (this.loading = false),
    //   });
  }

  loadMoreCourses() {
    if (this.hasMore) {
      this.currentPage++;
      this.fetchCourses();
    }
  }

  closePromoModal() {
    this.showPromoModal = false;
  }
}
