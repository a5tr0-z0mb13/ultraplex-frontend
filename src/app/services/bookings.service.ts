import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Booking, BookingRequestBody, Response } from '../models';
import { APICreateParams, APIListParams, APIService } from './api.service';

/**
 * Booking API service
 */
@Injectable({
  providedIn: 'root',
})
export class BookingsService extends APIService<BookingRequestBody, Booking> {
  private readonly path: string = '/bookings';

  public list({ page, size, sort }: APIListParams): Observable<Response<Booking>> {
    return this._list(this.path, page, size, sort);
  }

  public create({ body }: APICreateParams<BookingRequestBody>): Observable<null> {
    return this._create(this.path, body);
  }
}
