import React, { useState } from 'react'
import { setTokenToStorage } from '../../components/protected-route';
import { useNavigate } from 'react-router-dom';



export default function LoginPage(props: any) {
  const [username, setUsername] = useState<string| null>(null);
  const [password, setPassword] = useState<string| null>(null);

  const navigate = useNavigate();

  async function loginUser(credentials: any) {
    return fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
      .then(response => response.json())
   }

   const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await loginUser({username, password})
    if (response.token) {
      setTokenToStorage(response.token);
      props.getUserInfo();
      navigate('/profile');
    }
  }


  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col text-center">
          <img src={require('../../images/big-logo.png')} alt="" />
        </div>
      </div>
      <div className="row justify-content-center mt-4 pt-4">
        <div className="col text-center">
          <h1 className="login-title">Войти в аккаунт</h1>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-3 text-center"><input type="text" required 
        className="login-input w-100" 
        onChange={e => setUsername(e.target.value)} placeholder='Логин'/></div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-3 text-center"><input type="text" required 
        className="login-input w-100" 
        onChange={e => setPassword(e.target.value)} placeholder='Пароль'/></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 mt-3">
          <a href='/forgot-password' className="login-a">Забыли пароль?</a>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 mt-3">
          <button type='submit' className='login-btn'>Войти</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 mt-3">
          <a href="/registration" className="login-a">Нет аккаунта?  Регистрация</a>
        </div>
      </div>
    </form>
  )
}