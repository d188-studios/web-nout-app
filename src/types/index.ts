import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';

export type Notification = {
  name: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  extra?: any;
}

export type Position = {
  x: number;
  y: number;
};

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}
