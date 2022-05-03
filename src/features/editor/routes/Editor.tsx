import { useState } from 'react';

import { Sidebar } from '../components/Sidebar';
import { Content } from '../components/Content';

export function Editor() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="h-screen flex">
      <Sidebar
        className="w-80"
        visible={visible}
        onClose={() => setVisible(false)}
      />
      <Content className="flex-1" onPressMenu={() => setVisible(true)} />
    </div>
  );
}
