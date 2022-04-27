import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  SettingOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Context } from '../context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState('');

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    // if we're in client environment - it would be 'undefined' if in server environment
    typeof window === true && setCurrent(window.location.pathname);
  }, [typeof window === true && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    try {
      const { data } = await axios.post('/api/logout');
      toast(data);
      router.push('/login');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Menu mode="horizontal">
      <div className="flex flex-1 flex-wrap">
        <Item
          key="/"
          icon={<AppstoreOutlined />}
          onClick={(e) => setCurrent(e.key)}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>

        {!user && (
          <>
            <Item
              key="/login"
              icon={<LoginOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>
            <Item
              key="/register"
              icon={<UserAddOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}
      </div>

      {user && (
        <SubMenu key="/dropdown" title={user.name} icon={<SettingOutlined />}>
          <Item onClick={logout} className="float-right">
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
