import React, { useState } from 'react';
// import Logo from '../../assets/svg/logo_circle.svg';
// import Menu from '../../assets/svg/menu_gap.svg';
// import WindowDimension from '../WindowDimension/WindowDimension';
// import {title, subtitle} from '../Constants/Constants';

// import { auth } from '../../firebase/firebaseConfig';

import './Header.scss';

const Header =(props)=>{

    // const { width } = WindowDimension();
    const [ dropdown, setDropdown ] = useState(false);
    
    
    const handleClick =() =>{
        // if(!props.loginStatus){
        //     props.onRouteChange('login')
        // }else{
        //     auth.signOut().then(function(){
        //         props.changeLoginStatus(false)
        //         // console.log('sign out successfull')
        //     }).catch(function(error){
        //         console.log(error)
        //     })
        // }
        props.setLoginStatus(!props.loginStatus)
    }
    // const [menuProducts, setMenuProducts ] = useState(false);
    // const [menuServices, setMenuServices ] = useState(false);
    return(
        <div className='header'>
            <div className='flex-start'>
                {/* <div id='header-logo-container'>
                    <img id='header-logo' src={Logo} alt='logo'/>
                </div> */}
                <div id='header-text'>
                    <span id='header-text-title'>PostFeed</span>
                    {/* <span id='header-text-subtitle'>{subtitle}</span> */}
                </div>
                {/* <span id='header-text'>{title}</span> */}
            </div>


            <nav>
                {/* <MenuSign /> */}
                {/* <div onClick={()=>setDropdown(!dropdown)}>
                    <img id='header-menu' className={`pointer ${dropdown? 'down':'up'}`} src={Menu} alt={'menu'} width='30px'/>
                </div> */}
                <ul className='header-nav'>
                    {/* <li className='pm-12 pointer bottom-bar' onClick={()=>{props.onRouteChange('home'); setDropdown(!dropdown)}}>
                        Home
                    </li> */}
                    {/* <li className='pm-12 pointer bottom-bar' onClick={()=>{props.onRouteChange('products'); setDropdown(!dropdown)}}>
                        Products
                            <ul className={menuProducts? '':''}>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                            </ul> 
                    </li> */}
                    {/* <li className='pm-12 pointer bottom-bar' onClick={()=>{props.onRouteChange('contact'); setDropdown(!dropdown)}}>Contact</li> */}
                    <li className='pm-12 pointer click-animation login' onClick={()=>{handleClick(); setDropdown(!dropdown)}}>{props.loginStatus? 'Logout': 'Login'}</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;