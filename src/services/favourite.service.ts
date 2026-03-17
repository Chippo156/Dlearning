import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(private http: HttpClient) {}

  getAllFavourite(page: number, size: number) {
    return this.http.get(`/api/v1/favourite?page=${page}&size=${size}`);
  }

  deleteFavourite(id: number) {
    return this.http.delete(`/api/v1/favourite/${id}`);
  }
}
