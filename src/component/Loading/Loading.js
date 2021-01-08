import React from 'react';

import './Loading.scss';

const Loading =(props) =>{
    return (
        <div className='loading' style={{height: props.height? props.height: '100%'}}>
            <div className='loading-div-circle'>
                <span className='text-in-loading'>f<span className='loading-pink'>P</span></span>
            </div>
        </div>
    )
}

export default Loading;