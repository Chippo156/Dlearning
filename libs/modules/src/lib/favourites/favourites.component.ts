import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FavouriteResponse } from '@shared/models/data/favourite-response.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  imports: [
    NzCardModule,
    NzRateModule,
    NzIconModule,
    FormsModule,
    TitleCasePipe,
    CommonModule,
  ],
})
export class FavouritesComponent {
  @Input() favourites: FavouriteResponse[] = [];
  @Input() handleDeleteFavourite!: (id: number) => void;

  defaultImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADDCAMAAACxkIT5...';

  constructor(private router: Router) {}

  truncate(text: string, maxWords: number) {
    const words = text.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : text;
  }

  goToDetail(id: number) {
    this.router.navigate(['/courses', id]);
  }

  deleteFavourite(id: number) {
    if (this.handleDeleteFavourite) {
      this.handleDeleteFavourite(id);
    }
  }
}
