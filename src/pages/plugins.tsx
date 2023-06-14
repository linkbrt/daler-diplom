import React, { useEffect, useState } from 'react'
import PackCard from '../components/pack-card'
import axios from 'axios';
import { backend_host } from '../App';


export default function PluginsPage() {
  const [items, setItems] = useState([]);

  async function getItems(){
    const response = await axios.get(`http://${backend_host}/api/get-items/?type=plugin`);
    setItems(response.data);
  }

  useEffect(() => {getItems()}, [])
  return (
    <main>
      <div className="banner">
        <img src={require('../images/баннер вст.png')} alt="" />
      </div>
      <div className="banner-back"></div>
      <h1 className="page-title" style={{left: "45%"}}>ПЛАГИНЫ</h1>
      <div className="row w-100 row-cols-3 row-gap-5 mt-5 ms-0">
        {items.map((item: any) => <div className="col-12 col-md-4" key={item.id}><PackCard item={item}/></div>)}
      </div>
    </main>
  )
}