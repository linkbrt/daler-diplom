import React, { useEffect, useState } from 'react'
import { getFavorites, getShop } from '../pages/favorites';
import { useNavigate } from 'react-router-dom';
import { backend_host } from '../App';

export default function PackCard(props: any) {
  const [active, setActive] = useState<boolean>();
  const [shop, setShop] = useState(getShop());

  const navigate = useNavigate();

  useEffect(() => {
    getFavorites().map((item) => setActive(item == props.item.id));
  }, [])

  function addToFavorite(e: React.MouseEvent<SVGSVGElement, MouseEvent>){
    let favorite = getFavorites();

    if (props.item.id in favorite){
      setActive(false);
      const index = favorite.indexOf(props.item.id.toString(), 0);
      if (index > -1) {
        favorite.splice(index, 1);
      }
    } else {
      setActive(true);
      favorite.push(props.item.id);
    }
    localStorage.setItem('favorite', favorite.join(','));
  }

  function itemToShop(id: number){
    setShop(getShop());
    if (!shop.has(id.toString())) {
      shop.set(id.toString(), '1');
    }
    setShop(shop);
    localStorage.setItem('shop', JSON.stringify(Object.fromEntries(shop)));
  }

  return (
    <div className="pack-card" onClick={() => navigate('/item/' + props.item.id)}>
      <svg data-active={active} onClick={(e) => addToFavorite(e)} 
      className='pack-card-sub' width="19" height="18" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.2723 2.34319C15.8679 1.91736 15.3878 1.57956 14.8594 1.34909C14.331 1.11862 13.7647 1 13.1927 1C12.6207 1 12.0544 1.11862 11.526 1.34909C10.9975 1.57956 10.5175 1.91736 10.1131 2.34319L9.27394 3.22652L8.43477 2.34319C7.61802 1.48344 6.51026 1.00045 5.35519 1.00045C4.20012 1.00045 3.09236 1.48344 2.27561 2.34319C1.45885 3.20293 1 4.36899 1 5.58485C1 6.80072 1.45885 7.96678 2.27561 8.82652L3.11477 9.70985L9.27394 16.1932L15.4331 9.70985L16.2723 8.82652C16.6768 8.40089 16.9977 7.89553 17.2167 7.33932C17.4356 6.7831 17.5483 6.18693 17.5483 5.58485C17.5483 4.98278 17.4356 4.38661 17.2167 3.83039C16.9977 3.27418 16.6768 2.76882 16.2723 2.34319Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <img src={`http://${backend_host}` + props.item.path} 
      className='m-5 pack-card-img' width="180" height="180" alt="" />
      <div className="card-body pb-3">
        <h5 className="pack-card-title">{props.item.title}</h5>
        <p className="pack-card-text">{props.item.price ? props.item.price : '- '}р</p>
        <div className="text-center">
          <button className='pack-card-btn-buy' 
          onClick={(e) => {e.stopPropagation(); itemToShop(props.item.id); navigate('/shop')}}>
            Купить
          </button>
        </div>
      </div>
    </div>
  )
}