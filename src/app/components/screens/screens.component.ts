import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { concatMap, filter, map, merge, startWith } from 'rxjs';

import { Response, Screen, ScreenRequestBody } from '../../models';
import { isNotUndefined, mapTableEvent } from '../../pipeable-operators';
import { ScreensService } from '../../services';
import { ScreenDialogComponent } from './screen-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './screens.component.html',
})
export class ScreensComponent implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  @Output() public refresh: EventEmitter<void> = new EventEmitter<void>();

  public columnDefs: string[] = ['id', 'name'];

  public cinemaId: string | null;

  public dataSource: Screen[] = [];
  public length = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private screensService: ScreensService,
  ) {
    this.cinemaId = this.activatedRoute.snapshot.paramMap.get('cinemaId');
  }

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.refresh).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.screensService.list({ cinemaId: this.cinemaId!, page, size, sort })),
    ).subscribe(
      (response: Response<Screen>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;
      }
    );
  }

  public create(): void {
    const dialogRef: MatDialogRef<ScreenDialogComponent, ScreenRequestBody | undefined> = this.dialog.open(ScreenDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: ScreenRequestBody) => this.screensService.create({ cinemaId: this.cinemaId!, body })),
    ).subscribe(() => {
      this.refresh.emit();

      this.snackBar.open('Screen created successfully', 'OK');
    });
  }
}
