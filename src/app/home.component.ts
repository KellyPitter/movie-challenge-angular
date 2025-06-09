import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { RouterModule } from '@angular/router';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { FormsModule } from '@angular/forms';

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
  searchQuery: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();

    this.movieService.getLatestMovies(this.currentYear).subscribe((data) => {
      const filtered = data.results.filter((movie: Movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear === currentYear;
      });
      this.topMovies = filtered.slice(0, 6); // ✅ Aquí se usa el filtrado correcto
    });

    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.loadGenres();
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
          this.movies = res.results;
        });
    } else {
      // Si se borra el filtro, cargar películas populares otra vez
      this.movieService.getPopularMovies().subscribe((data) => {
        this.movies = data.results;
      });
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    this.movieService.searchMovies(this.searchQuery).subscribe((data) => {
      this.movies = data.results;
    });
  }
}
