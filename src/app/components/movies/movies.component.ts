import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { concatMap, filter, map, merge, startWith } from 'rxjs';

import { Movie, MovieRequestBody, Response } from '../../models';
import { isNotUndefined, mapTableEvent } from '../../pipeable-operators';
import { MoviesService } from '../../services';
import { MovieDialogComponent } from './movie-dialog.component';

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
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  @Output() public refresh: EventEmitter<void> = new EventEmitter<void>();

  public columnDefs: string[] = ['id', 'name', 'runtime'];

  public dataSource: Movie[] = [];
  public length = 0;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private moviesService: MoviesService
  ) {}

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.refresh).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.moviesService.list({ page, size, sort })),
    ).subscribe(
      (response: Response<Movie>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;
      }
    );
  }

  public click(): void {
    const dialogRef: MatDialogRef<MovieDialogComponent, MovieRequestBody | undefined> = this.dialog.open(MovieDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: MovieRequestBody) => this.moviesService.create({ body })),
    ).subscribe(() => {
      this.refresh.emit();

      this.snackBar.open('Movie created successfully', 'OK');
    });
  }
}
