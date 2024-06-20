import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Movie, MovieRequestBody, Response } from '../models';

/**
 * Movie API service
 */
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly path: string = `${environment.cinemas.api.url}/movies`;

  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Response<Movie[]>> {
    return this.httpClient.get<Response<Movie[]>>(this.path);
  }

  public create(body: MovieRequestBody): unknown {
    return this.httpClient.put(this.path, body);
  }
}
