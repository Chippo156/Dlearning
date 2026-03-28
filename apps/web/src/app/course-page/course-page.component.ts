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
  searchSpecification: string = '';
  sortBy: string = 'id';

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
        this.searchSpecification = this.buildSpecificationSearch();

        if (this.getUx) {
          this.pagination.currentPage = 1;
          this.getUx.getCourses(
            this.pagination,
            this.keyword,
            this.searchSpecification,
            this.sortBy
          );
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
    this.sortBy = this.mapSortBy(option);
    this.pagination.currentPage = 1;
    this.reloadCourses();
  }

  setCurrentPage(page: number) {
    this.pagination.currentPage = page;
    this.reloadCourses();
  }

  onFilterChanged() {
    this.pagination.currentPage = 1;
    this.searchSpecification = this.buildSpecificationSearch();
    this.keyword = this.searchControl.value || '';
    this.reloadCourses();
  }

  private reloadCourses() {
    if (this.getUx) {
      this.getUx.getCourses(
        this.pagination,
        this.keyword,
        this.searchSpecification,
        this.sortBy
      );
    }
  }

  private buildSpecificationSearch(): string {
    const specs: string[] = [];

    const selectedLevel = this.searchCourse?.level?.[0];
    const selectedType = this.searchCourse?.type?.[0];
    const selectedDuration = this.searchCourse?.duration;

    if (selectedLevel) {
      specs.push(`courseLevel:${selectedLevel}`);
    }

    if (selectedType) {
      specs.push(`typeCourse:${selectedType}`);
    }

    if (selectedDuration) {
      specs.push(...this.mapDurationToSpecification(selectedDuration));
    }

    return specs.join(',');
  }

  private mapDurationToSpecification(duration: string): string[] {
    if (duration.startsWith('<')) {
      return [`duration<${duration.slice(1)}`];
    }

    if (duration.startsWith('>')) {
      return [`duration>${duration.slice(1)}`];
    }

    const [min, max] = duration.split('-');
    if (min && max) {
      return [`duration>${min}`, `duration<${max}`];
    }

    return [];
  }

  private mapSortBy(option: string): string {
    switch (option) {
      case '1':
        return 'studentCount';
      case '2':
        return 'averageRating';
      case '3':
        return 'createdAt';
      case '4':
        return 'id';
      default:
        return 'id';
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
