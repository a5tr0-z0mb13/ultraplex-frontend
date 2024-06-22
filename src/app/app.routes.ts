import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cinemas',
    loadComponent: async () => {
      const module = await import('./components/cinemas/cinemas.component');
      return module.CinemasComponent;
    },
  },
  {
    path: 'cinemas/:cinemaId/screens',
    loadComponent: async () => {
      const module = await import('./components/screens/screens.component');
      return module.ScreensComponent;
    },
  },
  {
    path: 'cinemas/:cinemaId/screenings',
    loadComponent: async () => {
      const module = await import('./components/screenings/screenings.component');
      return module.ScreeningsComponent;
    },
  },
  {
    path: 'movies',
    loadComponent: async () => {
      const module = await import('./components/movies/movies.component');
      return module.MoviesComponent;
    },
  },
  {
    path: 'bookings',
    loadComponent: async () => {
      const module = await import('./components/bookings/bookings.component');
      return module.BookingsComponent;
    },
  },
  {
    path: '',
    redirectTo: 'cinemas',
    pathMatch: 'full',
  },
];
