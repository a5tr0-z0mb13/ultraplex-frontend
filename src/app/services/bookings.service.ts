import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Booking, BookingRequestBody, Response } from '../models';
import { environment } from '../../environments/environment';

/**
 * Booking API service
 */
@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private readonly path: string = `${environment.cinemas.api.url}/bookings`;

  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Response<Booking[]>> {
    return this.httpClient.get<Response<Booking[]>>(this.path);
  }

  public create(body: BookingRequestBody): unknown {
    return this.httpClient.put(this.path, body);
  }
}
