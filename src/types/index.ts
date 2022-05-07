export type Notification = {
  name: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  extra?: any;
}