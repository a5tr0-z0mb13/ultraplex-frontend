import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Response, Screening, ScreeningRequestBody } from '../models';
import { APIService } from './api.service';

/**
 * Screenings service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreeningsService {
  constructor(private apiService: APIService<ScreeningRequestBody, Screening>) {}

  public list(cinemaId: string | number, page?: number, size?: number, sort?: string): Observable<Response<Screening>> {
    return this.apiService.list(`/cinemas/${cinemaId}/screenings`, page, size, sort);
  }

  public create(cinemaId: string | number, screenId: string | number, body: ScreeningRequestBody): Observable<null> {
    return this.apiService.create(`/cinemas/${cinemaId}/screens/${screenId}/screenings`, body);
  }
}
