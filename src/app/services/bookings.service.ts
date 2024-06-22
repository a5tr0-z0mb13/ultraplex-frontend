import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Booking, BookingRequestBody, Response } from '../models';
import { APIService } from './api.service';

/**
 * Booking API service
 */
@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private readonly path: string = '/bookings';

  constructor(private apiService: APIService<BookingRequestBody, Booking>) {}

  public list(page?: number, size?: number, sort?: string): Observable<Response<Booking>> {
    return this.apiService.list(this.path, page, size, sort);
  }

  public create(body: BookingRequestBody): Observable<null> {
    return this.apiService.create(this.path, body);
  }
}
