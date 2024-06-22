import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Movie, Response, Screen, ScreeningRequestBody } from '../../models';
import { MoviesService, ScreensService } from '../../services';

export interface ScreeningDialogData {
  cinemaId: string | number;
};

export interface ScreeningDialogResponse extends ScreeningRequestBody {
  screenId: string | number;
}

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
  templateUrl: './screening-dialog.component.html',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreeningDialogComponent implements OnInit {
  public formGroup!: FormGroup;

  public screens!: Screen[];
  public movies!: Movie[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ScreeningDialogData,
    private dialogRef: MatDialogRef<ScreeningDialogComponent>,
    private formBuilder: FormBuilder,
    private screensService: ScreensService,
    private moviesService: MoviesService,
  ) {}

  public ngOnInit(): void {
    this.screensService.list({ cinemaId: this.data.cinemaId }).subscribe((response: Response<Screen>) => {
      this.screens = response.content;
    });

    this.moviesService.list({}).subscribe((response: Response<Movie>) => {
      this.movies = response.content;
    });

    this.formGroup = this.formBuilder.group({
      screenId: new FormControl<number | null>(null, Validators.required),
      movieId: new FormControl<number | null>(null, Validators.required),
      startTime: new FormControl<Date | null>(null, Validators.required),
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public ok(): void {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
