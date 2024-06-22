import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { concatMap, filter, Subject } from 'rxjs';

import { ScreenRequestBody } from '../../models';
import { isNotUndefined } from '../../pipeable-operators';
import { ScreensService } from '../../services';
import { Column, TableContainerComponent } from '../common/table-container.component';
import { ScreenDialogComponent } from './screen-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    TableContainerComponent,
  ],
  selector: 'ultraplex-screens',
  templateUrl: './screens.component.html',
})
export class ScreensComponent {
  public refresh: Subject<void> = new Subject<void>();

  public columns: Column[] = [
    { columnDef: 'id', header: 'ID', disabled: true },
    { columnDef: 'name', header: 'Name' },
  ];

  public cinemaId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public screensService: ScreensService,
  ) {
    this.cinemaId = this.activatedRoute.snapshot.paramMap.get('cinemaId');
  }

  public create(): void {
    const dialogRef: MatDialogRef<ScreenDialogComponent, ScreenRequestBody | undefined> = this.dialog.open(ScreenDialogComponent);

    dialogRef.afterClosed().pipe(
      filter(isNotUndefined),
      concatMap((body: ScreenRequestBody) => this.screensService.create({ cinemaId: this.cinemaId!, body })),
    ).subscribe(() => {
      this.refresh.next();

      this.snackBar.open('Screen created successfully', 'OK');
    });
  }
}
