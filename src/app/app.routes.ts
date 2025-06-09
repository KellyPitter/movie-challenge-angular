import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import('./pages/movie-detail.component').then(
            (m) => m.MovieDetailComponent
          ),
      },
    ],
  },
];
