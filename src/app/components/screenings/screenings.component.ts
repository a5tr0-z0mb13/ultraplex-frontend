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
import { ActivatedRoute } from '@angular/router';

import { get, pick } from 'lodash';
import { concatMap, filter, map, merge, startWith } from 'rxjs';

import { Response, Screening } from '../../models';
import { isNotUndefined, mapTableEvent } from '../../pipeable-operators';
import { ScreeningsService } from '../../services';
import { ScreeningDialogComponent, ScreeningDialogResponse } from './screening-dialog.component';

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
  templateUrl: './screenings.component.html',
})
export class ScreeningsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  @Output() public refresh: EventEmitter<void> = new EventEmitter<void>();

  public columnDefs: string[] = ['id', 'cinemaName', 'screenName', 'start', 'movie'];

  public cinemaId!: string | null;

  public dataSource!: Screening[];
  public length = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private screeningsService: ScreeningsService,
  ) {
    this.cinemaId = this.activatedRoute.snapshot.paramMap.get('cinemaId')!;
  }

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.refresh).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.screeningsService.list({ cinemaId: this.cinemaId!, page, size, sort })),
    ).subscribe(
      (response: Response<Screening>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;
      }
    );
  }

  public create(): void {
    const dialogRef: MatDialogRef<ScreeningDialogComponent, ScreeningDialogResponse | undefined> = this.dialog.open(ScreeningDialogComponent, { data: { cinemaId: this.cinemaId! } });

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: ScreeningDialogResponse) => this.screeningsService.create(
        { cinemaId: this.cinemaId!, screenId: get(body, 'screenId'), body: pick(body, ['movieId', 'startTime']) })
      ),
    ).subscribe(() => {
      this.refresh.emit();

      this.snackBar.open('Screening created successfully', 'OK');
    });
  }
}
