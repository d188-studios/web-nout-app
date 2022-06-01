import { Main } from './Main';
import { Header } from './Header';
import { VerifyAccountMessage } from './VerifyAccountMessage';
import { useAuth } from '~/features/auth';
import { HelmetTitle } from './HelmetTitle';

export function Content() {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex flex-col">
      <HelmetTitle />
      <Header />
      <VerifyAccountMessage authorized={user.authorized} />
      <Main />
    </div>
  );
}
