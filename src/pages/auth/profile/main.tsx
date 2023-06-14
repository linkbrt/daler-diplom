import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { backend_host } from '../../../App';


export default function ProfileMain(props: any) {
  const [image, setImage] = useState<File>();
  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files){
      return;
    }
    setImage(e.target.files[0]);
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(image);
    axios.post(
      `http://${backend_host}/api/set-user-image/`, 
      formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Token ' + localStorage.getItem('token')?.slice(1, -1),
      }
    });
  }
  return (
    <>
      <div className="row row-cols-2">
        <div className="col d-flex align-items-center"><p className="profile-text">Фото</p></div>
        <div className="col position-relative">
          <p className="profile-text text-end">
            <img src={`http://${backend_host}` + props.profile?.image} width={46} height={46} alt="" style={{borderRadius: "50%"}} />
            <input type="file" accept="image/png, image/jpeg" onInput={handleFiles} className='file-inp' />
          </p>
        </div>
        <div className="profile-line"></div>
        <div className="col d-flex align-items-center"><p className="profile-text">Юзернейм</p></div>
        <div className="col"><p className="profile-text text-end">{props.profile?.username}</p></div>
        <div className="profile-line"></div>
        <div className="col"><p className="profile-text">Email</p></div>
        <div className="col"><p className="profile-text text-end">{props.profile?.email}</p></div>
        <div className="profile-line"></div>
        <div className="col"><p className="profile-text">Пароль</p></div>
        <div className="col"><p className="profile-text text-end">********</p></div>
        <div className="profile-line"></div>
      </div>
    </>
  )
}