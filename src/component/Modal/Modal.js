import React from 'react';

import './Modal.scss';

const Modal =(props) =>{

    return(
        <div className='modal-cover' onClick={(e)=>props.setVisibility(false)}>
            <div className='popup-modal' onClick={(e)=>e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;
