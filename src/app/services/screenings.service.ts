import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Response, Screening, ScreeningRequestBody } from '../models';

/**
 * Screening API service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreeningsService {
  constructor(private httpClient: HttpClient) {}

  public list(cinemaId: number): Observable<Response<Screening[]>> {
    return this.httpClient.get<Response<Screening[]>>(`${environment.cinemas.api.url}/cinemas/${cinemaId}`);
  }

  public create(cinemaId: number, screenId: number, body: ScreeningRequestBody): unknown {
    return this.httpClient.put(`${environment.cinemas.api.url}/cinemas/${cinemaId}/screens/${screenId}/screenings`, body);
  }
}
