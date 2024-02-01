import React from 'react'
import './Modal.css';

function Modal({closeModal}) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button className ="btn-exit" onClick={() => closeModal(false)}>X</button>
        <div className='title'>
            <h1>Are you want to continue?</h1>
        </div>
        <div className='body'>
            <p>The next page is awesome! you should move further and the pages.</p>
        </div>
        <div className='footer'>
            <button>CHAT</button>
            <button>API</button>
        </div>
      </div>
    </div>
  )
}
export default Modal
