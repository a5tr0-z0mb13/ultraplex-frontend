import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { get, pick } from 'lodash';
import { concatMap, filter, Subject } from 'rxjs';

import { isNotUndefined } from '../../pipeable-operators';
import { ScreeningsService } from '../../services';
import { Column, TableContainerComponent } from '../common/table-container.component';
import { ScreeningDialogComponent, ScreeningDialogResponse } from './screening-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    TableContainerComponent,
  ],
  templateUrl: './screenings.component.html',
})
export class ScreeningsComponent {
  public refresh: Subject<void> = new Subject<void>();

  public columns: Column[] = [
    { columnDef: 'id', header: 'ID', disabled: true },
    { columnDef: 'cinemaName', header: 'Cinema Name' },
    { columnDef: 'screenName', header: 'Screen Name' },
    { columnDef: 'start', header: 'Start' },
    { columnDef: 'movie.name', header: 'Movie' },
  ];

  public cinemaId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public screeningsService: ScreeningsService,
  ) {
    this.cinemaId = this.activatedRoute.snapshot.paramMap.get('cinemaId')!;
  }

  public create(): void {
    const dialogRef: MatDialogRef<ScreeningDialogComponent, ScreeningDialogResponse | undefined> = this.dialog.open(ScreeningDialogComponent, { data: { cinemaId: this.cinemaId! } });

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: ScreeningDialogResponse) => this.screeningsService.create(
        { cinemaId: this.cinemaId!, screenId: get(body, 'screenId'), body: pick(body, ['movieId', 'startTime']) })
      ),
    ).subscribe(() => {
      this.refresh.next();

      this.snackBar.open('Screening created successfully', 'OK');
    });
  }
}
