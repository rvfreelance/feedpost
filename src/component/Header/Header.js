import React from 'react';

import { auth } from '../../firebase/firebase';
// import WindowDimension from '../WindowDimension/WindowDimension';

import './Header.scss';

const Header =(props)=>{
    // const { width } = WindowDimension();
    
    const handleClick =(button) =>{

        if(button==='logout'){
            auth.signOut().then(()=>{
                props.setPosts([]);
                props.setName('');
                props.setUid(null);
                props.setLoginStatus(false);
                props.setLoginPop(true);
            })
        }else if(button==='login'){
            props.setLoginPop(true);
        }else{
            return;
        }
    }

    return(
        <div className='header'>
            <div className='flex-start'>
                <div id='header-text'>
                    <span id='header-text-title'>feed<span style={{color:'rgb(238, 68, 96)'}}>Post</span></span>
                </div>
            </div>
            <nav>
                
                <ul className='header-nav'>
                    
                    {
                        props.error? null :
                        props.loginStatus? 
                        (
                            <li className='pm-12 pointer click-animation login' onClick={()=>{handleClick('logout');}}>Logout</li>
                        )
                        :
                        (
                            <li className='pm-12 pointer click-animation login' onClick={()=>{handleClick('login');}}>Login</li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;