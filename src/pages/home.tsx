import React, { useEffect, useState } from 'react'
import InstrumentCard from '../components/instrument-card'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import play_logo from '../images/play.svg';


export default function Home() {
  const navigate = useNavigate();


  return (
    <main>
      <h1 className="page-title">ПОВЫШАЙ НАВЫК С ПРОДЮСИРОВАНИЯ ПОМОЩЬЮ НАШИХ ИНСТРУМЕНТОВ</h1>
      <div className="row row-gap-5 w-100 mt-5 main-row">
        <div className="col-12 col-md-4">
          <div className="card" onClick={() => navigate('/packs')}>
            <img src={require('../images/IMAGE.png')} className='p-5' 
            alt="" style={{backgroundColor: "black", minHeight: "200px"}}/>
            <div className="card-body p-4 position-relative">
              <h5 className="card-title">Sample Packs</h5>
              <p className="card-text">Хотите, чтобы ваша музыка выделялась из остальных? Нажмите здесь, чтобы получить вдохновляющие бесплатные наборы сэмплов с тысячами мелодических петель, барабанными сэмплами, вокальными сэмплами и многим другим.</p>
              <div className="w-100 text-end">
              <img src={play_logo} width={28} height={28} className='position-absolute' style={{'bottom': "7%", right: "5%"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100" onClick={() => navigate('/presets')}>
            <img src={require('../images/IMAGE2.png')} className='p-5' 
            alt="" style={{backgroundColor: "black", minHeight: "200px"}}/>
            <div className="card-body p-4 position-relative">
              <h5 className="card-title">Preset Packs</h5>
              <p className="card-text">Хотите получить доступ к уникальным и модным пресетам? Нажмите здесь и получите доступ к сотням темных и атмосферных пресетов для Serum, Massive, Omnisphere и Vital.</p>
              <div className="w-100 text-end">
                <img src={play_logo} width={28} height={28} className='position-absolute' style={{'bottom': "7%", right: "5%"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100" onClick={() => navigate('/plugins')}>
            <img src={require('../images/IMAGE (1).png')} className='p-5' 
            alt="" style={{backgroundColor: "black", minHeight: "200px"}}/>
            <div className="card-body p-4 position-relative">
              <h5 className="card-title">Audio Plugins</h5>
              <p className="card-text">Хотите получить профессиональные звуковые плагины по доступной цене? Нажмите здесь, чтобы ознакомиться с нашими популярными виртуальными инструментами и многопроцессорными эффектами.</p>
              <div className="w-100 text-end">
              <img src={play_logo} width={28} height={28} className='position-absolute' style={{'bottom': "7%", right: "5%"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}