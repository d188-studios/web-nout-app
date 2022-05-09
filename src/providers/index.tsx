import { AuthProviders } from '~/features/auth';
import { BrowserRouter } from 'react-router-dom';
import { EventEmitterProvider } from '~/lib/eventemitter';
import { Toaster } from 'react-hot-toast';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <EventEmitterProvider>
        <AuthProviders>
          {children}
          <Toaster position="bottom-right" />
        </AuthProviders>
      </EventEmitterProvider>
    </BrowserRouter>
  );
}
