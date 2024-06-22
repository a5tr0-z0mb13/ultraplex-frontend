import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Response, Screen, ScreenRequestBody } from '../models';
import { APIService } from './api.service';

/**
 * Screens service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  constructor(private apiService: APIService<ScreenRequestBody, Screen>) {}

  public list(cinemaId: string | number, page?: number, size?: number, sort?: string): Observable<Response<Screen>> {
    return this.apiService.list(`/cinemas/${cinemaId}/screens`, page, size, sort);
  }

  public create(cinemaId: string | number, body: ScreenRequestBody): Observable<null> {
    return this.apiService.create(`/cinemas/${cinemaId}/screens`, body);
  }
}
