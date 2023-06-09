import React, { useEffect, useState } from 'react'
import PackCard from '../components/pack-card'
import axios from 'axios';
import { backend_host } from '../App';


export default function PacksPage() {
  const [items, setItems] = useState([]);

  async function getItems(){
    const response = await axios.get(`http://${backend_host}/api/get-items/?type=pack`);
    setItems(response.data);
  }

  useEffect(() => {getItems()}, [])
  return (
    <main>
    <div className="banner">
      <img src={require('../images/Без имени-2.png')} alt="" />
    </div>
      <div className="banner-back"></div>
      <div className="page-title" style={{left: "45%"}}>ПАКИ</div>
      <div className="row w-100 row-cols-4 row-gap-5 mt-5 ms-0">
        {items.map((item: any) => <div className="col-12 col-md-3" key={item.id}><PackCard item={item}/></div>)}
      </div>
    </main>
  )
}