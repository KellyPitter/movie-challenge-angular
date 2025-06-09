import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
})
export class MovieGridComponent {
  @Input() movies: Movie[] = [];
}
