import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Response, Screening, ScreeningRequestBody } from '../models';
import { APICreateParams, APIListParams, APIService } from './api.service';

/**
 * Screenings service
 */
@Injectable({
  providedIn: 'root',
})
export class ScreeningsService extends APIService<ScreeningRequestBody, Screening> {
  public list({ cinemaId, page, size, sort }: APIListParams): Observable<Response<Screening>> {
    return this._list(`/cinemas/${cinemaId}/screenings`, page, size, sort);
  }

  public create({ cinemaId, screenId, body }: APICreateParams<ScreeningRequestBody>): Observable<null> {
    return this._create(`/cinemas/${cinemaId}/screens/${screenId}/screenings`, body);
  }
}
