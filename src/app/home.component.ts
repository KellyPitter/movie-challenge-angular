import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { RouterModule } from '@angular/router';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieGridComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  topMovies: Movie[] = [];
  genres: { id: number; name: string }[] = [];
  selectedGenreId: number | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.loadGenres();
      this.topMovies = data.results.slice(0, 10);
      console.log(this.movies);
    });
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe((res) => {
      this.genres = res.genres;
    });
  }
  onGenreChange(): void {
    if (this.selectedGenreId) {
      this.movieService
        .getMoviesByGenre(this.selectedGenreId)
        .subscribe((res) => {
          this.topMovies = res.results;
        });
    }
  }
}
