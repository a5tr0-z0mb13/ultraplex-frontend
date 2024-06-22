import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'

export interface TableEvent {
  page?: number;
  size?: number;
  sort?: string;
}

export const mapTableEvent = (paginator: MatPaginator, sort: MatSort) => (): TableEvent => {
  return {
    page: paginator.pageIndex,
    size: paginator.pageSize,
    sort: sort.direction !== '' ? `${sort.active},${sort.direction}` : undefined,
  };
}
