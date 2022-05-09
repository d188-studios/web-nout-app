import { Main } from './Main';
import { Header } from './Header';
import { useParams } from 'react-router-dom';
import { usePages } from '../../stores/pages';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '~/config';

export function Content() {
  const { selectedPageId } = useParams();
  const { findPage } = usePages();

  const selectedPage = useMemo(() => {
    if (!selectedPageId) return null;

    return findPage(selectedPageId);
  }, [findPage, selectedPageId]);

  return (
    <div className="flex-1 flex flex-col">
      <Helmet>
        <title>
          {selectedPage ? `${selectedPage.title} - ${APP_NAME}` : APP_NAME}
        </title>
      </Helmet>
      <Header />
      <Main />
    </div>
  );
}
