import React, { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getShop } from './favorites';
import axios from 'axios';
import ShopItem from '../components/shop-item';


export default function Shop() {
  const [shop, setShop] = useState(getShop());
  const [items, setItems] = useState([]);

  const [cost, setCost] = useState(0);


  async function getItems(){
    const response = await axios.get('http://localhost:8000/api/get-items/');
    setItems(response.data.filter((item:any) => shop.has(item.id.toString())));
    getAllCost();
  }

  function setAmountValue(id: number, amount: number) {
    const index = id.toString()
    getShop()
    shop.set(index, amount.toString())
    setShop(shop);
    localStorage.setItem('shop', JSON.stringify(Object.fromEntries(shop)));
  }

  function deleteItemFromShop(id: number) {
    getShop()
    shop.delete(id.toString())
    setShop(shop);
    getItems();
    localStorage.setItem('shop', JSON.stringify(Object.fromEntries(shop)));
  }

  function getAllCost() {
    getShop();
    shop.forEach((value, key) => {
      let item = items.find((item: any) => item.id == key);
      console.log(items);
    });
  }

  useEffect(() => {getItems(); }, []);

  useEffect(() => getAllCost(), [shop,]);

  const navigate = useNavigate();
  return (
    <>
      <h2 className="shop-h2">Корзина</h2>
      {shop.size > 0 ? 
      <>
        <div className="row shop-menu">
          <div className="col-2"></div>
          <div className="col-6">Продукт</div>
          <div className="col">Цена</div>
          <div className="col">Кол-во</div>
          <div className="col">Подитог</div>
        </div>
        {items.map((item: any) => <ShopItem key={item.id} item={item} shop={shop} 
        setAmountValue={setAmountValue} deleteItemFromShop={deleteItemFromShop}/>)}
        <h3 className="shop-small-title">Всего в корзине</h3>
        <div className="row row-gap-4">
          <div className="col-4 shop-text">Итог</div>
          <div className="col-8 shop-text">13h</div>
          <div className="col-2 p-0"><div className="shop-blue-btn">Оплата</div></div>
        </div>
        
      </> : 
      <> 
        <div className="shop-empty-card">
          <h5 className="text">Ваша корзина пуста</h5>
        </div>
        <button className='shop-orange-btn' onClick={() => navigate('/')}>Вернуться в магазин</button></>
      }
    </>
  )
}