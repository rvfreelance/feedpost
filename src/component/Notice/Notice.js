import React from 'react';

import './Notice.scss';
const NoticeMsg ={
    1: 'Unable to connect, please try after some time',
    2: 'Something went wrong, please try after some time',
    3: 'Unable to connect, please check your connection',
    4: 'Your account has been temporarily disabled, try again after some time',
    5: 'Something went wrong, we are trying to figure out what went wrong',

} 
const Notice =(props) =>{
    return(
        <div className={`transparent notice`}
            // onAnimationEnd={()=>this.setState({ visibility:false, msg:''})}    
            onAnimationEnd={()=>props.setVisibility(false)}    
        >
            <span>{props.notice? NoticeMsg[props.notice]: NoticeMsg[2]}</span>
            {/* <span>{props.notice? props.notice: 'Unable to connect'}</span> */}
        </div>
    )    
}

export default Notice;