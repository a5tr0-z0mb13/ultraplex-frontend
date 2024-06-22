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
  selector: 'ultraplex-screen-dialog',
  templateUrl: './screen-dialog.component.html'
})
export class ScreenDialogComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ScreenDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl<string | null>(null, Validators.required),
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public ok(): void {
    this.dialogRef.close(this.formGroup.getRawValue());
  }
}
