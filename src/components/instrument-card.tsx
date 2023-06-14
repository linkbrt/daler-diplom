import React from 'react'

export default function InstrumentCard(props: any) {
  return (
    <div className="card">
      <img src={require('../images/IMAGE.png')} className='p-5' 
      alt="" style={{backgroundColor: "black", minHeight: "200px"}}/>
      <div className="card-body p-4">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
        <div className="w-100 text-end">
          <img src={require("../images/play.svg")} alt="adg" className='w-100' />
        </div>
      </div>
    </div>
  )
}