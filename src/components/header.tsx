import { backend_host } from "../App";

import logo from "../images/menu.svg";

import main_logo from "../images/asdasdasd.svg";

export default function Header(props: any) {
  return (
    <header className="header">
      <a href="/" className="col col-md-3">
        <img src={main_logo} width={220} alt="SoundStash1" />
      </a>
      <a href="/plugins" className="col header-a hidedd text-center">Плагины</a>
      <a href="/packs" className="col header-a hidedd text-center">Паки</a>
      <a href="/presets" className="col header-a hidedd text-center">Пресеты</a>
      <a href="/favorites" className="col header-a hidedd text-center">Избранные</a>
      <a href="/shop" className="col header-a hidedd text-center bold">Корзина</a>
      {props.user ? 
        <a href='/profile' className="col-2 text-end header-a hidedd">
          <img src={`http://${backend_host}` + props.user.image} alt="img" 
          width={46} height={46} style={{borderRadius: "50%"}} />
        </a> 
        : <a href="/login" className="col-2 text-end header-a hidedd">Логин</a>
      }
        <a data-bs-toggle="offcanvas" id='menu' href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <img src={logo} alt="" />
        </a>
        <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Меню</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
          <a href="/plugins" className="col header-a black text-center">Плагины</a>
          <a href="/packs" className="col header-a black text-center">Паки</a>
          <a href="/presets" className="col header-a black text-center">Пресеты</a>
          <a href="/favorites" className="col header-a black text-center">Избранные</a>
          <a href="/shop" className="col header-a black text-center bold">Корзина</a>
          {props.user ? <a href="/login" className="col header-a black text-center bold">Логин</a> : <a href="/profile" className="col header-a black text-center bold">Профиль</a> }
          </div>
        </div>
    </header>
  )
}