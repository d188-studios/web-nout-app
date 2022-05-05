import { AuthProviders } from '~/features/auth';
import { BrowserRouter } from 'react-router-dom';
import { EventEmitterProvider } from '~/lib/eventemitter';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <EventEmitterProvider>
        <AuthProviders>{children}</AuthProviders>
      </EventEmitterProvider>
    </BrowserRouter>
  );
}
