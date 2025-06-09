import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { RouterModule } from '@angular/router';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieGridComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  topMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.topMovies = data.results.slice(0, 10);
      console.log(this.movies);
    });
  }
}
