import { Component, OnInit } from '@angular/core';
import { FavouriteResponse } from '@shared/models/data/favourite-response.model';
import {
  Pagination,
  PaginationResponse,
} from '@shared/models/request/pagination.model';
import { FavouriteService } from '@shared/services/favourite.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourites-page.component.html',
})
export class FavouritePageComponent implements OnInit {
  courses: any[] = [];

  currentPage = 1;
  pageSize = 10;

  totalPages = 1;
  totalElements = 0;

  loading = true;

  constructor(
    private favouriteService: FavouriteService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    document.title = 'Favourite Courses';
    window.scrollTo(0, 0);
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    const pagination: Pagination = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    };

    this.favouriteService.getAllFavourite(pagination).subscribe({
      next: (res: PaginationResponse<FavouriteResponse>) => {
        const { result, totalPages, totalElements } = res;

        this.courses = result;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.fetchCourses();
  }

  handleDeleteFavourite = (id: number) => {
    this.favouriteService.deleteFavourite({ id }).subscribe({
      next: () => {
        this.message.success('Delete successfully');
        this.fetchCourses();
      },
      error: () => {
        this.message.error('Delete failed');
      },
    });
  };

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.fetchCourses();
  }
}
