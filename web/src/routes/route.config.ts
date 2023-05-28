import NotFound from '@/pages/NotFound';
import Books from '@/pages/Books';
import Home from '@/pages/Home';
import Members from '@/pages/Members';
import Roles from '@/pages/Roles';
import { HomeOutlined, UserOutlined, BookOutlined, TagsOutlined, FormOutlined } from '@ant-design/icons';
import LoanSlips from '@/pages/LoanSlips';

export interface IRoute {
  path: string;
  title: string;
  name: string;
  icon: any;
  showInMenu: boolean;
  component: () => JSX.Element;
}

export const appRouters: any = [
  {
    path: '/',
    title: 'home',
    name: 'Trang chủ',
    icon: HomeOutlined,
    showInMenu: true,
    component: Home,
  },
  {
    path: '/books',
    title: 'books',
    name: 'Sách',
    icon: BookOutlined,
    showInMenu: true,
    component: Books,
  },
  {
    path: '/loanslips',
    title: 'loanslips',
    name: 'Phiếu mượn',
    icon: FormOutlined,
    showInMenu: true,
    component: LoanSlips,
  },
  {
    path: '/members',
    title: 'members',
    name: 'Thành viên',
    icon: UserOutlined,
    showInMenu: true,
    component: Members,
  },
  {
    path: '/roles',
    title: 'roles',
    name: 'Quy định',
    icon: TagsOutlined,
    showInMenu: true,
    component: Roles,
  },
  {
    path: '/*',
    title: 'Not Found',
    name: 'not-found',
    icon: null,
    showInMenu: false,
    component: NotFound,
  },
];

export const routers = [...appRouters];
