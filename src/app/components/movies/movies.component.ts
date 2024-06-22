import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { concatMap, filter, Subject } from 'rxjs';

import { MovieRequestBody } from '../../models';
import { isNotUndefined } from '../../pipeable-operators';
import { MoviesService, TotalElementsService } from '../../services';
import { Column, TableContainerComponent } from '../common/table-container.component';
import { MovieDialogComponent } from './movie-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TableContainerComponent,
  ],
  selector: 'ultraplex-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent {
  private readonly key: string = 'movies';

  public refresh: Subject<void> = new Subject<void>();

  public columns: Column[] = [
    { columnDef: 'id', header: 'ID', disabled: true },
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'runtime', header: 'Runtime' },
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public moviesService: MoviesService,
    private totalElementsService: TotalElementsService,
  ) {}

  public totalElementsChange(totalElements: number): void {
    this.totalElementsService.update(this.key, totalElements);
  }

  public click(): void {
    const dialogRef: MatDialogRef<MovieDialogComponent, MovieRequestBody | undefined> = this.dialog.open(MovieDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: MovieRequestBody) => this.moviesService.create({ body })),
    ).subscribe(() => {
      this.refresh.next();

      this.snackBar.open('Movie created successfully', 'OK');
    });
  }
}
