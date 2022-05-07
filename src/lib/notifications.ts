import { useCallback } from 'react';
import { useEventEmitter } from './eventemitter';
import { Notification } from '~/types';

type NotifyNotification = Omit<Notification, 'type'> & {
  type?: Notification['type'];
};

export function useNotifications() {
  const { emit, addListener } = useEventEmitter();

  const notify = useCallback(
    (notification: NotifyNotification) => {
      emit<Notification>('notification', {
        ...notification,
        type: notification.type ?? 'info',
      });
    },
    [emit]
  );

  const on = useCallback(
    (callback: (notification: Notification) => void) => {
      return addListener('notification', callback);
    },
    [addListener]
  );

  return {
    notify,
    on,
  };
}
