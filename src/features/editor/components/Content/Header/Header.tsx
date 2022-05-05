import { Button } from 'antd';
import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Title } from './Title';
import { useEventEmitter } from '~/lib/eventemitter';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const {
    emit,
    addListener
  } = useEventEmitter();

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);

  useEffect(() => {
    return addListener('closeSidebar', () => {
      setVisibleMenu(true);
    });
  }, [addListener]);

  useEffect(() => {
    return addListener('openSidebar', () => {
      setVisibleMenu(false);
    });
  }, [addListener]);

  return (
    <div className="px-4 h-16 flex items-center bg-slate-50">
      {visibleMenu ? (
        <Button
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className="bg-transparent border-0 shadow-none mr-2"
          onClick={() => {
            emit('openSidebar');
            setHoverMenu(false);
          }}
          icon={hoverMenu ? <DoubleRightOutlined /> : <MenuOutlined />}
        />
      ) : null}
      <Title />
    </div>
  );
}
