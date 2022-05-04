import { Button } from 'antd';
import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEditor } from '~/features/editor/stores/editor';
import { useSidebar } from '~/features/editor/stores/sidebar';
import { Title } from './Title';

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
          className="bg-transparent border-0 shadow-none mr-2"
          onClick={() => {
            setVisible(true);
            setHoverMenu(false);
          }}
          icon={hoverMenu ? <DoubleRightOutlined /> : <MenuOutlined />}
        />
      ) : null}
      {selectedPage !== null ? (
        <Title page={selectedPage} />
      ) : null}
    </div>
  );
}
