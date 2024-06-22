import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Subject } from 'rxjs';

import { BookingsService, TotalElementsService } from '../../services';
import { Column, TableContainerComponent } from '../common/table-container.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TableContainerComponent,
  ],
  selector: 'ultraplex-bookings',
  templateUrl: './bookings.component.html'
})
export class BookingsComponent {
  private readonly key: string = 'bookings';

  public refresh: Subject<void> = new Subject<void>();

  public columns: Column[] = [
    { columnDef: 'id', header: 'ID', disabled: true },
  ];

  constructor(
    public bookingsService: BookingsService,
    private totalElementsService: TotalElementsService,
  ) {}

  public totalElementsChange(totalElements: number): void {
    this.totalElementsService.update(this.key, totalElements);
  }
}
