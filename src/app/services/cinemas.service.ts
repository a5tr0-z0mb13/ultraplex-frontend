import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Cinema, CinemaRequestBody, Response } from '../models';
import { APICreateParams, APIListParams, APIService } from './api.service';

/**
 * Cinemas service
 */
@Injectable({
  providedIn: 'root',
})
export class CinemasService extends APIService<CinemaRequestBody, Cinema> {
  private readonly path: string = '/cinemas';

  public list({ page, size, sort }: APIListParams): Observable<Response<Cinema>> {
    return this._list(this.path, page, size, sort);
  }

  public create({ body }: APICreateParams<CinemaRequestBody>): Observable<null> {
    return this._create(this.path, body);
  }
}
