import { Button } from 'antd';
import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSidebar } from '../../stores/sidebar';
import { useEditor } from '../../stores/editor';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { visible, setVisible } = useSidebar();
  const { selectedPage } = useEditor();
  const [hoverMenu, setHoverMenu] = useState(false);

  return (
    <div className="px-4 h-16 flex items-center">
      {!visible ? (
        <Button
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className="bg-transparent border-0 shadow-none"
          onClick={() => {
            setVisible(true);
            setHoverMenu(false);
          }}
          icon={hoverMenu ? <DoubleRightOutlined /> : <MenuOutlined />}
        />
      ) : null}
      {selectedPage !== null ? (
        <span className="mx-2">{selectedPage.title}</span>
      ) : null}
    </div>
  );
}
