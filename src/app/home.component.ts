import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      console.log(this.movies);
    });
  }
}
