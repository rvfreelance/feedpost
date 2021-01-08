import React from 'react';

import { auth } from '../../firebase/firebase';

import './Header.scss';

const Header =(props)=>{

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
                        props.currentUser? 
                        (
                            <li className='pm-12 pointer click-animation login' 
                                onClick={()=> auth.signOut()}
                            >
                                Logout
                            </li>
                        )
                        :
                        (
                            <li className='pm-12 pointer click-animation login' 
                                onClick={()=> props.setLoginPop(true)}
                            >
                                Login
                            </li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;