import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FavItem from '../components/fav-item';
import { backend_host } from '../App';


interface IItem {
  id: number,
  title: string,
  price: string,
  old_price: string,
  path: string,
}


export function getFavorites() {
  let fav_string = localStorage.getItem('favorite')
  let favorite: string[] = ['']
  if (fav_string){
    favorite = fav_string.split(',');
  }
  return favorite;
}

export function getShop() {
  let shop_string = localStorage.getItem('shop');
  let shop = new Map<number, number>();
  if (shop_string) {
    shop = JSON.parse(shop_string);
  }
  return new Map<string, string>(Object.entries(shop));
}

export default function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites());
  const [filterItems, setFilterItems] = useState([]);

  const [shop, setShop] = useState(getShop());

  async function getItems(){
    const response = await axios.get(`http://${backend_host}/api/get-items/`);
    setFilterItems(response.data.filter((item: any) => item.id.toString() in favorites));
    console.log(favorites.length);
  }

  useEffect( () => {
    getItems();
  }, [])

  function removeFromFavorites(id: number) {
    const index = favorites.indexOf(id.toString(), 0);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorite', favorites.join(','));
    setFavorites(getFavorites());
  }

  function itemToShop(id: number){
    setShop(getShop());
    if (shop.has(id.toString())) {
      shop.delete(id.toString());
    } else {
      shop.set(id.toString(), '1');
    }
    setShop(shop);
    localStorage.setItem('shop', JSON.stringify(Object.fromEntries(shop)));
  }

  const navigate = useNavigate();
  return (
    <>
      <h2 className="shop-h2">Избранное</h2>
      {favorites.length > 1 ?
      <>
        <div className="row shop-menu">
          <div className="col-2"></div>
          <div className="col-6">Продукт</div>
          <div className="col">Цена</div>
          <div className="col">Корзина</div>
        </div>
        
        {filterItems.map((item: IItem) => <FavItem key={item.id} item={item} 
        itemToShop={itemToShop} removeFromFavorites={removeFromFavorites} active={shop.has(item.id.toString())} />)
        }
      </> : 
      <>
        <div className="shop-empty-card">
          <h5 className="text">Ваш каталог избранных паков пуст!</h5>
        </div>
        <button className='shop-orange-btn' onClick={() => navigate('/')}>
          Вернуться в магазин
        </button>
      </>}
    </>
  )
}