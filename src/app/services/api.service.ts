import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { isUndefined, omitBy } from 'lodash';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Response } from '../models';

export interface APIListParams {
  cinemaId?: string | number;
  page?: number;
  size?: number;
  sort?: string;
};

export interface APICreateParams<T> {
  cinemaId?: string | number;
  screenId?: string | number;
  body: T;
};

/**
 * Generic API service
 */
@Injectable({
  providedIn: 'root',
})
export abstract class APIService<TReq, TRes> {
  private readonly url: string = environment.cinemas.api.url;

  constructor(private httpClient: HttpClient) {}

  public abstract list(params: APIListParams): Observable<Response<TRes>>;

  public abstract create(params: APICreateParams<TReq>): Observable<null>;

  protected _list(path: string, page?: number, size?: number, sort?: string): Observable<Response<TRes>> {
    const url = `${this.url}${path}`;

    const params: HttpParams = new HttpParams({
      fromObject: omitBy<Record<string, string | number | undefined>>({
        page, size, sort
      }, isUndefined) as Record<string, string | number>
    });

    return this.httpClient.get<Response<TRes>>(url, { params });
  }

  protected _create(path: string, body: TReq): Observable<null> {
    const url = `${this.url}${path}`;

    return this.httpClient.put<null>(url, body);
  }
}
