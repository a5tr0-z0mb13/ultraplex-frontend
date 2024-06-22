import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { concatMap, map, merge, startWith } from 'rxjs';

import { Booking, Response } from '../../models';
import { mapTableEvent } from '../../pipeable-operators';
import { BookingsService, TotalElementsService } from '../../services';

@Component({
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './bookings.component.html'
})
export class BookingsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  public columnDefs: string[] = ['id'];

  public dataSource: Booking[] = [];
  public length = 0;

  constructor(
    private bookingsService: BookingsService,
    private totalElementsService: TotalElementsService,
  ) {}

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.bookingsService.list({ page, size, sort })),
    ).subscribe(
      (response: Response<Booking>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;

        this.totalElementsService.update('bookings', response.totalElements);
      }
    );
  }
}
