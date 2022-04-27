import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import Link from 'next/link';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { Context } from '../context';
import { useRouter } from 'next/router';

const defaultState = {
  email: '',
  password: ''
};

const login = () => {
  const [loginState, setLoginState] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  // destructure loginState
  const { email, password } = loginState;

  const { state, dispatch } = useContext(Context);
  const router = useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const saveToLocalStorage = (user) =>
    localStorage.setItem('user', JSON.stringify(user));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/login', loginState);
      dispatch({ type: 'LOGIN', payload: res.data });
      saveToLocalStorage(res.data);
      resetField(defaultState);
      setLoading(false);
      router.push('/');
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const resetField = () => setLoginState(defaultState);

  return (
    <>
      <header className="h-28 primaryGradient flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl">Login</h1>
      </header>
      <section className="w-full">
        <form onSubmit={handleSubmit} className="w-11/12 md:w-1/3 mx-auto mt-9">
          <Input
            className="w-full p-4 mb-4 border rounded-md outline-none"
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            placeholder="john@testmail.com"
            required={true}
          />
          <Input
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            placeholder="password"
            required={true}
          />

          <Button type="submit" loading={loading}>
            {loading ? <Spin /> : 'Login'}
          </Button>

          <p className="p-4 text-center">
            Don't have an account?
            <Link href="/login">
              <a> Register</a>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default login;
