import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { concatMap, filter, map, merge, startWith } from 'rxjs';

import { BookingRequestBody, Cinema, CinemaRequestBody, Response } from '../../models';
import { isNotUndefined, mapTableEvent } from '../../pipeable-operators';
import { BookingsService, CinemasService, TotalElementsService } from '../../services';
import { BookingDialogComponent } from '../bookings/booking-dialog.component';
import { CinemaDialogComponent } from './cinema-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
  selector: 'ultraplex-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrl: './cinemas.component.scss',
})
export class CinemasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  @Output() public refresh: EventEmitter<void> = new EventEmitter<void>();

  public columnDefs: string[] = ['id', 'name', 'actions']

  public dataSource: Cinema[] = [];
  public length = 0;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private bookingsService: BookingsService,
    private cinemasService: CinemasService,
    private totalElementsService: TotalElementsService,
  ) {}

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.refresh).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.cinemasService.list({ page, size, sort })),
    ).subscribe(
      (response: Response<Cinema>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;

        this.totalElementsService.update('cinemas', response.totalElements);
      }
    );
  }

  public create(): void {
    const dialogRef: MatDialogRef<CinemaDialogComponent, CinemaRequestBody | undefined> = this.dialog.open(CinemaDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: CinemaRequestBody) => this.cinemasService.create({ body })),
    ).subscribe(() => {
      this.refresh.emit();

      this.snackBar.open('Cinema created successfully', 'OK');
    });
  }

  public book(): void {
    const dialogRef: MatDialogRef<BookingDialogComponent, BookingRequestBody | undefined> = this.dialog.open(BookingDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: BookingRequestBody) => this.bookingsService.create({ body })),
    ).subscribe(() => {
      this.snackBar.open('Booking created successfully', 'OK');
    });
  }

  public navigate(cinemaId: string, command: string): void {
    this.router.navigate(['cinemas', cinemaId, command]);
  }
}
