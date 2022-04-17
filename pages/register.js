import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const defaultState = {
  name: '',
  email: '',
  password: ''
};

const register = () => {
  const [registerState, setRegisterState] = useState(defaultState);

  const { name, email, password } = registerState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterState({...registerState, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register', registerState);
      toast.success(res.data);
      resetField(defaultState);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  const resetField = () => setRegisterState(defaultState);

  return (
    <>
      <header className="h-28 primaryGradient flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl">Register</h1>
      </header>
      <section className="w-full">
        <form onSubmit={handleSubmit} className="w-11/12 md:w-1/3 mx-auto mt-9">
          <input
            className="w-full p-4 mb-4 border rounded-md outline-none"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          <input
            className="w-full p-4 mb-4 border rounded-md outline-none"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="john@testmail.com"
            required
          />
          <input
            className="w-full p-4 mb-4 border rounded-md outline-none"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="password"
            required
          />

          <button className="w-full mt-2 p-4 rounded bg-cyan-700 hover:bg-cyan-900 text-white text-lg" type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default register;
