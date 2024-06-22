import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Movie, MovieRequestBody, Response } from '../models';
import { APICreateParams, APIListParams, APIService } from './api.service';

/**
 * Movies service
 */
@Injectable({
  providedIn: 'root',
})
export class MoviesService extends APIService<MovieRequestBody, Movie> {
  private readonly path: string = '/movies';

  public list({ page, size, sort }: APIListParams): Observable<Response<Movie>> {
    return this._list(this.path, page, size, sort);
  }

  public create({ body }: APICreateParams<MovieRequestBody>): Observable<null> {
    return this._create(this.path, body);
  }
}
