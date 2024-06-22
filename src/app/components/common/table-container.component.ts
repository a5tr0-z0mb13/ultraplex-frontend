import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { Observable, concatMap, map, merge, startWith } from 'rxjs';

import { mapTableEvent } from '../../pipeable-operators';
import { APIListParams, APIService } from '../../services';
import { Response } from '../../models';

export interface Column {
  columnDef: string;
  header: string;
  disabled?: boolean;
};

@Component({
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  selector: 'ultraplex-table-container',
  templateUrl: './table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent<TService extends APIService<unknown, TModel>, TModel> implements AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  @Output() public totalElementsChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() public service!: TService;
  @Input() public params!: APIListParams;

  @Input() public columns!: Column[];

  @Input() public refresh!: Observable<void>;

  private _columnDefs?: string[];

  public get columnDefs(): string[] {
    if (!this._columnDefs) {
      this._columnDefs = this.columns.map((column: Column) => column.columnDef);
    }

    return this._columnDefs;
  }

  public dataSource: TModel[] = [];
  public length = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.refresh).pipe(
      startWith(void 0),
      map(mapTableEvent(this.paginator, this.sort)),
      concatMap(({ page, size, sort }) => this.service.list(Object.assign({}, this.params, { page, size, sort }))),
    ).subscribe(
      (response: Response<TModel>) => {
        this.dataSource = response.content;
        this.length = response.totalElements;

        this.changeDetectorRef.detectChanges();

        this.totalElementsChange.emit(response.totalElements);
      }
    );
  }
}
