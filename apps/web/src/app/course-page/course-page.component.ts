import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CourseResponse } from '@shared/models/course-response.model';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';
import { GetCourseElasticSearchUx } from '@uxs/course-uxs/get-course-elastic-search.ux';
import { SearchCourseComponent } from '@modules/search-course/search-course.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FavouriteService } from '@shared/services/favourite.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class CoursePageComponent {
  @ViewChild('searchCourse') searchCourse!: SearchCourseComponent;
  searchControl = new FormControl('');

  pagination: Pagination = {
    currentPage: 1,
    pageSize: 8,
  };
  paginationResponse!: PaginationResponse<CourseResponse>;

  option = '0';
  keyword: string = '';

  @ViewChild('ux', { static: true }) getUx!: GetCourseElasticSearchUx;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private favouriteService: FavouriteService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((keyword) => {
        this.keyword = keyword || '';

        if (this.getUx) {
          this.getUx.getCoursesElasticSearch(this.pagination, this.keyword);
        }
      });
  }

  onCoursesLoaded(response: PaginationResponse<CourseResponse>) {
    this.paginationResponse = response;
  }

  viewCourseDetail(course: CourseResponse) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }

  setOption(option: string) {
    this.option = option;
  }

  setCurrentPage(page: number) {
    this.pagination.currentPage = page;
    if (this.getUx) {
      this.getUx.getCoursesElasticSearch(this.pagination, this.keyword);
    }
  }

  handleAddFavourite(course: CourseResponse) {
    this.favouriteService.createFavourite({ id: course.id }).subscribe({
      next: () => {
        this.notificationService.success(
          'Added to Favourites',
          `${course.title} has been added to your favourites.`
        );
      },
      error: (err) => {
        console.error('Error adding to favourites:', err);
      },
    });
  }
}
