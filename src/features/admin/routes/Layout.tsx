import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import UserContextMenu from '../components/UserContextMenu';

export function Layout() {
  return (
    <div>
      <Header />
      <UserContextMenu />
      <Outlet />
    </div>
  )
}