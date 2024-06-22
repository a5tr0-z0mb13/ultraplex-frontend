import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Cinema, CinemaRequestBody, Response } from '../models';
import { APIService } from './api.service';

/**
 * Cinemas service
 */
@Injectable({
  providedIn: 'root',
})
export class CinemasService {
  private readonly path: string = '/cinemas';

  constructor(private apiService: APIService<CinemaRequestBody, Cinema>) {}

  public list(page?: number, size?: number, sort?: string): Observable<Response<Cinema>> {
    return this.apiService.list(this.path, page, size, sort);
  }

  public create(body: CinemaRequestBody): Observable<null> {
    return this.apiService.create(this.path, body);
  }
}
