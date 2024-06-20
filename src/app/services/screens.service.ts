import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ScreenRequestBody } from '../models';

/**
 * Screen API service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  constructor(private httpClient: HttpClient) {}

  public create(cinemaId: number, body: ScreenRequestBody): unknown {
    return this.httpClient.put(`${environment.cinemas.api.url}/cinemas/${cinemaId}/screens`, body);
  }
}
