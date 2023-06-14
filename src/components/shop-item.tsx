import React, { useState } from 'react'
import { backend_host } from '../App';


export default function ShopItem(props: any) {
  const [amount, setAmount] = useState(parseInt(props.shop.get(props.item.id.toString())))

  return (
    <div className='row shop-item  d-flex align-items-center' key={props.item.id}>
      <div className="col-1 d-flex justify-content-center" 
      onClick={() => props.deleteItemFromShop(props.item.id)}>
        <img src={require('../images/white_close.png')} alt=""/>
      </div>
      <div className="col-1">
        <img src={`http://${backend_host}` + props.item.path} width={64} height={64} alt="" />
      </div>
      <div className="col-6">{props.item.title}</div>
      <div className="col">{props.item.price} p</div>
      <div className="col d-flex">
        <input type="number" disabled className='input-num' value={amount} 
        onInput={() => console.log(1)} onChange={(e) => setAmount(parseInt(e.target.value))}/>
        <div className="controls d-flex flex-column justify-content-between">
          <div 
          className="btn-num" 
          onClick={() => {setAmount(amount + 1); props.setAmountValue(props.item.id, amount + 1)}}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{background: "white"}}><path d="M4 0L8 8H0L4 0Z" fill="black"/></svg>
          </div>
          <div 
          className="btn-num" 
          onClick={() => {setAmount(amount > 1 ? amount - 1: amount); props.setAmountValue(props.item.id, amount - 1)}}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8L-2.54292e-07 -6.99382e-07L8 0L4 8Z" fill="black"/></svg>
          </div>
        </div>
      </div>
      <div className="col">{props.item.price * amount} р</div>
    </div>
  )
}