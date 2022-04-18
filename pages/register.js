import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import Link from 'next/link';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const defaultState = {
  name: '',
  email: '',
  password: ''
};

const register = () => {
  const [registerState, setRegisterState] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  const { name, email, password } = registerState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterState({ ...registerState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/register', registerState);
      toast.success(res.data);
      resetField(defaultState);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const resetField = () => setRegisterState(defaultState);

  return (
    <>
      <header className="h-28 primaryGradient flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl">Register</h1>
      </header>
      <section className="w-full">
        <form onSubmit={handleSubmit} className="w-11/12 md:w-1/3 mx-auto mt-9">
          <Input
            className="w-full p-4 mb-4 border rounded-md outline-none"
            name="name"
            type="text"
            value={name}
            handleChange={handleChange}
            placeholder="John Doe"
            required={true}
          />
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
            {loading ? <Spin /> : 'Register'}
          </Button>
          
          <p className="p-4 text-center">
            Already registered?
            <Link href="/login">
              <a> Login</a>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default register;
