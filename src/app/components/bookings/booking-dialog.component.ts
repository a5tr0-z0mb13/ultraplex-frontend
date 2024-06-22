import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Cinema, Response, Screening } from '../../models';
import { CinemasService, ScreeningsService } from '../../services';
import { concatMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './booking-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDialogComponent implements OnInit {
  public formGroup!: FormGroup;

  public cinemas!: Cinema[];
  public screenings!: Screening[];

  constructor(
    private dialogRef: MatDialogRef<BookingDialogComponent>,
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private screeningsService: ScreeningsService,
  ) {}

  public ngOnInit(): void {
    this.cinemasService.list({ sort: 'name,asc' }).subscribe((response: Response<Cinema>) => {
      this.cinemas = response.content;
    })

    this.formGroup = this.formBuilder.group({
      cinemaId: new FormControl<number | null>(null, Validators.required),
      screeningId: new FormControl<number | null>(null, Validators.required),
      seats: new FormControl<number | null>(null, Validators.required),
    });

    this.formGroup.get('cinemaId')?.valueChanges.pipe(
      concatMap((cinemaId: string) => this.screeningsService.list({ cinemaId, sort: 'start,asc' }))
    ).subscribe((response: Response<Screening>) => {
      this.screenings = response.content;
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public ok(): void {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
