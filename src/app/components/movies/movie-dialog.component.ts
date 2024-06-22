import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-dialog.component.html'
})
export class MovieDialogComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl<string | null>(null, Validators.required),
      runtime: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public ok(): void {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
