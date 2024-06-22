import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalElementsService {
  private _totals: BehaviorSubject<Record<string, number>> = new BehaviorSubject<Record<string, number>>({});
  public totals: Observable<Record<string, number>> = this._totals.asObservable();

  public update(key: string, value: number): void {
    const totalElements: Record<string, number> = this._totals.value;
    totalElements[key] = value;
    this._totals.next(totalElements);
  }
}
