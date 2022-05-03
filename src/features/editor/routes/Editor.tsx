import { useState } from 'react';

import { Sidebar } from '../features/sidebar';
import { Content } from '../features/content';

export function Editor() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="h-screen flex">
      <Sidebar
        className="w-80"
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <Content
        className="flex-1"
        onPressMenu={() => setSidebarVisible(true)}
        showMenuButton={!sidebarVisible}
      />
    </div>
  );
}
