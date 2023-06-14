import { backend_host } from "../App";

export default function Header(props: any) {
  return (
    <header className="header">
      <a href="/" className="col-3">
        <img src={require('../images/logo.png')} alt="SoundStash" />
      </a>
      <a href="/plugins" className="col header-a text-center">Плагины</a>
      <a href="/packs" className="col header-a text-center">Паки</a>
      <a href="/presets" className="col header-a text-center">Пресеты</a>
      <a href="/favorites" className="col header-a text-center">Избранные</a>
      <a href="/shop" className="col header-a text-center bold">Корзина</a>
      {props.user ? 
        <a href='/profile' className="col-2 text-end">
          <img src={`http://${backend_host}` + props.user?.image} alt="img" 
          width={46} height={46} style={{borderRadius: "50%"}} />
        </a> 
        : <a href="/login" className="col-2 text-end">Логин</a>}
    </header>
  )
}