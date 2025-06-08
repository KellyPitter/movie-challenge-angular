import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MovieDetailComponent } from './pages/movie-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: HomeComponent },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movie-detail.component').then(
        (m) => m.MovieDetailComponent
      ),
  },
];
