import { useState } from 'react';

import { Sidebar } from '../features/sidebar';
import { Content } from '../features/content';
import { Page } from '../features/sidebar/types';

export function Editor() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedPage, setSelectedPage] = useState<Page | undefined>();

  return (
    <div className="h-screen flex">
      <Sidebar
        className="w-80"
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        selectedPage={selectedPage}
        onSelectedPageChange={(page) => {
          console.log('selected page', page);
          setSelectedPage(page);
        }}
      />
      <Content
        className="flex-1"
        onPressMenu={() => setSidebarVisible(true)}
        showMenuButton={!sidebarVisible}
        page={selectedPage}
      />
    </div>
  );
}
