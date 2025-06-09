import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener películas populares', () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Película 1',
        release_date: '2025-01-01',
        poster_path: '/path1.jpg',
        overview: 'Descripción 1',
        vote_average: 8.5,
      },
      {
        id: 2,
        title: 'Película 2',
        release_date: '2025-02-01',
        poster_path: '/path2.jpg',
        overview: 'Descripción 2',
        vote_average: 8.5,
      },
    ];

    service.getPopularMovies().subscribe((res: { results: Movie[] }) => {
      expect(res.results.length).toBe(2);
      expect(res.results[0].title).toBe('Película 1');
    });

    const req = httpMock.expectOne((req) => req.url.includes('/movie/popular'));
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockMovies });
  });

  it('debería buscar películas por nombre', () => {
    const mockResults: Movie[] = [
      {
        id: 3,
        title: 'Matrix',
        release_date: '1999-03-31',
        poster_path: '/matrix.jpg',
        overview: 'Neo descubre la verdad',
        vote_average: 8.5,
      },
    ];

    service.searchMovies('Matrix').subscribe((res: { results: Movie[] }) => {
      expect(res.results.length).toBe(1);
      expect(res.results[0].title).toBe('Matrix');
    });

    const req = httpMock.expectOne((r) => r.url.includes('/search/movie'));
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockResults });
  });
});
