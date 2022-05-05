import { EventEmitter } from 'eventemitter3';
import React, { useCallback } from 'react';

export interface EventEmitterProviderValue {
  addListener: <T = any>(
    event: string,
    listener: (param: T) => void
  ) => () => void;
  emit: <T = any>(event: string, param?: T) => void;
}

export const EventEmitterContext =
  React.createContext<EventEmitterProviderValue>({
    addListener: () => () => {},
    emit: () => {},
  });

export function EventEmitterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const emitterRef = React.useRef(new EventEmitter());
  const emitter = emitterRef.current;

  const addListener = useCallback<EventEmitterProviderValue['addListener']>(
    (event, listener) => {
      emitter.on(event, listener);
      return () => emitter.off(event, listener);
    },
    [emitter]
  );

  const emit = useCallback<EventEmitterProviderValue['emit']>(
    (event, param) => emitter.emit(event, param),
    [emitter]
  );

  return (
    <EventEmitterContext.Provider value={{ addListener, emit }}>
      {children}
    </EventEmitterContext.Provider>
  );
}

export function useEventEmitter() {
  return React.useContext(EventEmitterContext);
}
