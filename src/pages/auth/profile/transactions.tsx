import React, { useState } from 'react'

import close_svg from '../../../images/close.png'
import axios from 'axios';
import { backend_host } from '../../../App';


export default function ProfileTransactions(props: any) {
  const [card, setCard] = useState(props.profile.card_num);
  let [showCardModal, setShowCardModal] = useState(false);

  let [num, setNum] = useState('');
  let [date, setDate] = useState('');
  let [cvv, setCVV] = useState('');
  let [name, setName] = useState('');

  async function sendData() {
    const config = {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')?.slice(1, -1),
      }
    }
    axios.post(
      `http://${backend_host}/api/set-user-card/`, {
        card_num: num + ":" + date + ":" + cvv + "name"
      }, config
    )
    setCard(num + ":" + date + ":" + cvv + "name");
  }

  const cardModal = (
    <div className="faded">
      <div className="new-card-modal">
        <h3 className="new-card-title">Привязать карту</h3>
        <img src={close_svg} className='close-svg' onClick={() => setShowCardModal(false)}/>
        <div style={{background: "black", height: "1px"}}></div>
        <div className="new-card-text">
        Привяжите карту для будущих покупок
        </div>
        <div className="new-card-inp-label">
          Номер карты
        </div>
        <input type="text" className='new-card-input w-100' value={num} 
        onInput={(e: any) => setNum(e.target.value)}/>
        <input type="text" className='new-card-input w-25' value={date} 
        onInput={(e: any) => setDate(e.target.value)}/>
        <input type="text" className='new-card-input w-25' value={cvv} 
        onInput={(e: any) => setCVV(e.target.value)}/>
        <p className="new-card-inp-label">Имя и Фамилия держателя карты</p>
        <input type="text" className='new-card-input w-100 mt-0' value={name} 
        onInput={(e: any) => setName(e.target.value)}/>
        <button className="new-card-btn" onClick={() => {sendData(); setShowCardModal(false);}}>Привязать</button>
      </div>
    </div>

  )

  return (
    <>
      <h2 className="profile-title">Привязанные карты</h2>
      <div className="profile-card-info d-flex">
        {card && card !== '' ? <>
          <img src={require('../../../images/visa.png')} alt="" width={34} height={21}/>
          <div className="profile-card-text flex-grow-1">Visa **** **** **** {card.slice(12, 16)}</div>
          <p className="profile-orange w-auto align-items-end" onClick={() => setCard('')}>Удалить карту</p>

        </> : <>
        <p className="profile-orange" onClick={() => setShowCardModal(true)}>Привязать карту</p>
        </>}
      {showCardModal && cardModal}
      </div>
      <h2 className="profile-title mt-5 mb-4">История покупок</h2>
      
      <div className="row row-gap-3">
        <div className="col-12"><div className="profile-trans-line"></div></div>
        <div className="col">
          <p className="profile-trans-text mb-0">Trap & Drill</p>
          <p className="profile-trans-text mb-0">599p</p>
        </div>
        <div className="col-auto d-flex">
          <p className="profile-trans-text my-auto">November 21st 2023</p>
        </div>
        <div className="col-12"><div className="profile-trans-line"></div></div>
        <div className="col">
          <p className="profile-trans-text mb-0">Trap & Drill</p>
          <p className="profile-trans-text mb-0">599p</p>
        </div>
        <div className="col-auto d-flex">
          <p className="profile-trans-text my-auto">November 21st 2023</p>
        </div>
        <div className="col-12"><div className="profile-trans-line"></div></div>
      </div>
    </>
  )
}