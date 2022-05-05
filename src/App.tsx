import { AppRoutes } from '~/routes';
import { AppProviders } from './providers';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
