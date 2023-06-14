import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getShop } from './favorites';
import { getFavorites } from './favorites';
import { backend_host } from '../App';


export default function Item() {
  let { id } = useParams();
  const [item, setItem] = useState<any>();

  let audio = useRef(new Audio());
  const [play, setPlay] = useState(false);


  const [favorites, setFavorites] = useState(getFavorites());
  const [activeFav, setActiveFav] = useState(false);


  const [activeShop, setActiveShop] = useState(false);
  const [shop, setShop] = useState(getShop());

  async function getData() {
    const response = await axios.post(`http://${backend_host}/api/get-item-info/`, { id })
    setItem(response.data);
  }

  function addToFavorite(e: React.MouseEvent<SVGSVGElement, MouseEvent>){
    let favorite = getFavorites();

    if (item.id in favorite){
      setActiveFav(false);
      const index = favorite.indexOf(item.id.toString(), 0);
      if (index > -1) {
        favorite.splice(index, 1);
      }
    } else {
      setActiveFav(true);
      favorite.push(item.id);
    }
    localStorage.setItem('favorite', favorite.join(','));
  }

  function itemToShop(id: number){
    setShop(getShop());
    if (shop.has(id.toString())) {
      shop.delete(id.toString());
      setActiveShop(false);
    } else {
      shop.set(id.toString(), '1');
      setActiveShop(true);
    }
    setShop(shop);
    localStorage.setItem('shop', JSON.stringify(Object.fromEntries(shop)));
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    audio.current.src = `http://${backend_host}` + item?.file;
    audio.current.controls = true;
  }, [item])

  function playAudio() {
    audio.current.play();
  }

  function stopAudio() {
    audio.current.pause();
  }


  function handleAudio() {
    play ? stopAudio() : playAudio();
    setPlay((a) => !a);
  }

  return (
    <div className="item-card d-flex">
      <img src={`http://${backend_host}` + item?.path} className='item-img' alt="" />
      <div className="item-info d-flex flex-wrap">
        <h2 className="item-header w-100">{item?.title}</h2>
        <h3 className="item-subheader w-100">Loops & Samples Pack</h3>
        <audio ref={audio} style={{display: "none"}}/>
 
        <svg className='item-play' onClick={handleAudio} xmlns="http://www.w3.org/2000/svg" 
        width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M14 8L0.499999 15.7942L0.5 0.205771L14 8Z" fill="#F16C21" /></svg>
        <svg data-active={activeFav} onClick={(e) => addToFavorite(e)} 
        className='item-sub align-self-center' width="19" height="18" viewBox="0 0 19 18" 
        xmlns="http://www.w3.org/2000/svg"><path d="M16.2723 2.34319C15.8679 1.91736 15.3878 1.57956 14.8594 1.34909C14.331 1.11862 13.7647 1 13.1927 1C12.6207 1 12.0544 1.11862 11.526 1.34909C10.9975 1.57956 10.5175 1.91736 10.1131 2.34319L9.27394 3.22652L8.43477 2.34319C7.61802 1.48344 6.51026 1.00045 5.35519 1.00045C4.20012 1.00045 3.09236 1.48344 2.27561 2.34319C1.45885 3.20293 1 4.36899 1 5.58485C1 6.80072 1.45885 7.96678 2.27561 8.82652L3.11477 9.70985L9.27394 16.1932L15.4331 9.70985L16.2723 8.82652C16.6768 8.40089 16.9977 7.89553 17.2167 7.33932C17.4356 6.7831 17.5483 6.18693 17.5483 5.58485C17.5483 4.98278 17.4356 4.38661 17.2167 3.83039C16.9977 3.27418 16.6768 2.76882 16.2723 2.34319Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>

        <button style={activeShop ? {background: "#F16C21"} : {}} onClick={() => itemToShop(item?.id)} className='item-btn'><span>{activeShop ? 'В корзине ' : item?.price + " ₽ " } {activeShop ? null : <img src={require('../images/image 1.png')} />} 
         </span></button>
        <h3 className="item-text">Этот набор звуков погружает в мир Trap и дрилл с энергией и стилем. Содержит уникальные элементы и текстуры, создающие зловещую атмосферу улиц и городской интриги. С глубокими басами, пронзительными синтезаторами и хрустящими ударами. Предлагает полный набор звуков и инструментов для высококачественных треков Trap и дрилл. В наборе более 50 разных сэмплов и лупов.</h3>
      </div>
      
      
    </div>
  )
}