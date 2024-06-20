import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Cinema, CinemaRequestBody, Response } from '../models';

/**
 * Cinema API service
 */
@Injectable({
  providedIn: 'root',
})
export class CinemasService {
  private readonly path: string = `${environment.cinemas.api.url}/cinemas`;

  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Response<Cinema[]>> {
    return this.httpClient.get<Response<Cinema[]>>(this.path);
  }

  public create(body: CinemaRequestBody): unknown {
    return this.httpClient.put(this.path, body);
  }
}
