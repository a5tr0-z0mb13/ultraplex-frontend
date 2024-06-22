import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Movie, MovieRequestBody, Response } from '../models';
import { APIService } from './api.service';

/**
 * Movies service
 */
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly path: string = '/movies';

  constructor(private apiService: APIService<MovieRequestBody, Movie>) {}

  public list(page?: number, size?: number, sort?: string): Observable<Response<Movie>> {
    return this.apiService.list(this.path, page, size, sort);
  }

  public create(body: MovieRequestBody): Observable<null> {
    return this.apiService.create(this.path, body);
  }
}
