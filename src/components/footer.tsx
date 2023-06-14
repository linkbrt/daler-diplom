import React, { useRef, useState } from 'react'


export default function Footer(props: any) {
  const [active, setActive] = useState(true);

  return (
    <footer className='footer row'>
      <div className="col-12 col-md-2">
        <h5 className="footer-title">О нас</h5>
        <a href="/about" className="footer-link">О нас</a>
        <a href="/about" className="footer-link">Пользовательское соглашение</a>
        <a href="/about" className="footer-link">Условия и конфиденциальность</a>
      </div>
      <div className="col-12 col-md-2">
        <h5 className="footer-title">Помощь</h5>
        <a href="/profile" className="footer-link">Аккаунт</a>
        <a href="/callback" className="footer-link">Связаться с нами</a>
        <a href="/faq" className="footer-link">Частые вопросы</a>
      </div>
      <div className="col-12 col-md-2">
        <h5 className="footer-title">Магазин</h5>
        <a href="/" className="footer-link">Каталог</a>
        <a href="/packs" className="footer-link">Паки</a>
      </div>
      <div className="col-12 col-md-2">
        <h5 className="footer-title">Контакты</h5>
        <a href="https://mail.google.com/" className="footer-link">Почта</a>
        <a href="https://www.youtube.com/" className="footer-link">YouTube</a>
        <a href="https://www.facebook.com/" className="footer-link">Facebook</a>
        <a href="https://www.instagram.com/" className="footer-link">Instagram</a>
      </div>
      <div className="col"></div>
      <div className="col-12 col-md-3">
        <h5 className="footer-obnova-title">Подписаться на обновление</h5>
        <p className="footer-text">Будь первым, кто получает обновления, скидки и бесплатные подарки!</p>
        {active ? 
        <div className="row">
          <div className="col-7"><input type="text" className='footer-input'/></div>
          <div className="col"><button className='footer-btn' onClick={() => setActive(false)}>Подписаться</button></div>
        </div>
        : <div className='row'><p className="footer-title text-center">Успешно!</p></div>}
      </div>
    </footer>
  )
}