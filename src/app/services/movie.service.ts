import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'c109ee6b21ec51892887f1bf9b18bf3a'; // reemplázala por tu clave real

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.API_URL}/movie/popular?api_key=${this.API_KEY}&language=es-ES&page=1`
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.API_URL}/movie/${id}?api_key=${this.API_KEY}&language=es-ES`
    );
  }

  getGenres() {
    return this.http.get<{ genres: { id: number; name: string }[] }>(
      `${this.API_URL}/genre/movie/list?api_key=${this.API_KEY}&language=es-ES`
    );
  }

  getMoviesByGenre(genreId: number) {
    return this.http.get<{ results: Movie[] }>(
      `${this.API_URL}/discover/movie?api_key=${this.API_KEY}&language=es-ES&with_genres=${genreId}`
    );
  }

  searchMovies(query: string) {
    return this.http.get<{ results: Movie[] }>(
      `${this.API_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&api_key=${this.API_KEY}`
    );
  }
}
