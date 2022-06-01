import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { APP_NAME } from '~/config';
import { usePages } from '../../stores/pages';

export function HelmetTitle() {
  const { selectedPageId } = useParams();
  const { findPage } = usePages();

  const selectedPage = useMemo(() => {
    if (!selectedPageId) return null;

    return findPage(selectedPageId);
  }, [findPage, selectedPageId]);

  return (
    <Helmet>
      <title>
        {selectedPage ? `${selectedPage.title} - ${APP_NAME}` : APP_NAME}
      </title>
    </Helmet>
  );
}
