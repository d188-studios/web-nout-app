import { AuthProviders } from '~/features/auth';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProviders>{children}</AuthProviders>;
}
