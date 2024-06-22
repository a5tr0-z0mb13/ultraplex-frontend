import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Response, Screen, ScreenRequestBody } from '../models';
import { APICreateParams, APIListParams, APIService } from './api.service';

/**
 * Screens service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreensService extends APIService<ScreenRequestBody, Screen> {
  public list({ cinemaId, page, size, sort }: APIListParams): Observable<Response<Screen>> {
    return this._list(`/cinemas/${cinemaId}/screens`, page, size, sort);
  }

  public create({ cinemaId, body }: APICreateParams<ScreenRequestBody>): Observable<null> {
    return this._create(`/cinemas/${cinemaId}/screens`, body);
  }
}
