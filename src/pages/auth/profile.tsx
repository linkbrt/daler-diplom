import React, { useState } from 'react'
import ProfileMain from './profile/main';
import ProfileTransactions from './profile/transactions';
import { useNavigate } from 'react-router-dom';


export interface IProfile {
  id: number,
  username: string,
  email: string,
  card_num: string,
}

export default function Profile(props: any) {
  const [active, setActive] = useState(1);

  const navigate = useNavigate();
  return (
    <>
    <div className="row profile-menu">
      <div className="col-2 p-0" data-active={active === 1} onClick={() => setActive(1)}>
        <h4 className="profile-menu-title">Профиль</h4>
      </div>
      <div className="col-2 p-0" data-active={active === 2} onClick={() => setActive(2)}>
        <h4 className="profile-menu-title">Транзакции</h4>
      </div>
      <div className="col"></div>
      <div className="col-2 p-0" data-active={active === 3} 
      onClick={() => {setActive(3); localStorage.removeItem('token'); props.getUserInfo(); navigate('/login')}}>
        <h4 className="profile-menu-title">Выйти из профиля</h4>
      </div>
    </div>
    {active === 1 ? <ProfileMain profile={props.profile}/> : <ProfileTransactions profile={props.profile}/>}
    </>
  )
}