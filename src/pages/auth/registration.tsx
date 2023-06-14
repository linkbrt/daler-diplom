import React, { useState } from 'react'




export default function Registration() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  function handleSubmit() {

  }

  return (
    <form method='POST' onSubmit={handleSubmit} action='http://localhost:8000/api/registration/'>
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col text-center"><img src={require('../../images/big-logo.png')} alt="" /></div>
      </div>
      <div className="row justify-content-center mt-4 pt-4">
        <div className="col text-center"><h1 className="login-title">Регистрация</h1></div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-10 col-md-3 text-center"><input type="text" required className="login-input w-100" onChange={e => setUsername(e.target.value)} placeholder='Логин'/></div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-10 col-md-3 text-center"><input type="text" required className="login-input w-100" onChange={e => setPassword1(e.target.value)} placeholder='Пароль'/></div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-10 col-md-3 text-center"><input type="text" required className="login-input w-100" onChange={e => setPassword2(e.target.value)} placeholder='Повторите пароль'/></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-md-3 mt-3"><button type='submit' className='login-btn'>Зарегистрироваться</button></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-md-3 mt-3"><a href="/login" className="login-a">Есть аккаунт?  Войти</a></div>
      </div>
    </form>
  )
}