import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

import { forkJoin } from 'rxjs';

import { BookingsService, CinemasService, MoviesService, TotalElementsService } from './services';
import { Booking, Cinema, Movie, Response } from './models';

@Component({
  selector: 'ultraplex-root',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public links: { path: string, text: string, key: string }[] = [
    { path: '/cinemas', text: 'Cinemas', key: 'cinemas' },
    { path: '/movies', text: 'Movies', key: 'movies' },
    { path: '/bookings', text: 'Bookings', key: 'bookings' },
  ];

  public totalElements!: Record<string, number>

  constructor(
    private bookingsService: BookingsService,
    private cinemasService: CinemasService,
    private moviesService: MoviesService,
    private totalElementsService: TotalElementsService
  ) {}

  public ngOnInit(): void {
    this.totalElementsService.totals.subscribe((totalElements: Record<string, number>) => {
      this.totalElements = totalElements;
    });

    forkJoin([
      this.bookingsService.list({ page: 0, size: 1 }),
      this.cinemasService.list({ page: 0, size: 1 }),
      this.moviesService.list({ page: 0, size: 1 }),
    ]).subscribe((responses: [Response<Booking>, Response<Cinema>, Response<Movie>]) => {
      this.totalElementsService.update('bookings', responses[0].totalElements);
      this.totalElementsService.update('cinemas', responses[1].totalElements);
      this.totalElementsService.update('movies', responses[2].totalElements);
    });
  }
}
