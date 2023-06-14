import React, { useState } from 'react'
import { backend_host } from '../App';


export default function FavItem(props: any) {
  const [active, setActive] = useState(props.active);

  return (
    <div className='row shop-item  d-flex align-items-center' key={props.item.id}>
      <div 
      onClick={() => props.removeFromFavorites(props.item.id)} 
      className="col-1 d-flex justify-content-center">
        <img src={require('../images/white_close.png')} alt="" />
      </div>
      <div className="col-1">
        <img src={`http://${backend_host}` + props.item.path} width={64} height={64} alt="" />
      </div>
      <div className="col-6">{props.item.title}</div>
      <div className="col">{props.item.price} p</div>
      <div className="col">
        <button 
        className={'shop-orange-small-btn ' + (active ? 'blue' : '')} 
        onClick={(e) => {props.itemToShop(props.item.id); setActive(!active);}}>
            {active ? 'Товар в корзине' : 'Добавить в корзину'}
          </button>
        </div>
    </div>
  )
}