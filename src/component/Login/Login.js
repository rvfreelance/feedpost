import React from 'react';
import Modal from '../Modal/Modal';

import './Login.scss';

const Login =() =>{

    const inputStyling ={
        padding:'10px 20px',
        margin: '20px 10px',
        fontSize:'1rem',
        border:'none',
        outline:'none',
        borderBottom: '1px solid grey'
    }

    return(
        <Modal>
            <div style={{height:'100%', display:'flex', justifyContent:'center'}}>
                <div style={{display:'grid', gridTemplateRows:'repeat(1fr)', width:'300px', height:'90%', backgroundColor:'white', border:'2px solid grey', alignSelf:'center', borderRadius:'25px'}}>
                    {/* <span style={{fontSize:'2rem'}}>Registered ? 
                        <span style={{fontSize:'0.7rem', color:'blue', textDecoration:'underline'}}>not yet</span></span> */}
                    <span style={{fontSize:'4.5rem', color:'rgb(75, 75, 75)', fontWeight:'500', fontFamily:'Qwigley'}}>login</span>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <input 
                            style={inputStyling}
                            type='email'
                            placeholder='Email'
                            />
                        <input 
                            style={inputStyling}
                            type='password'
                            placeholder='Password'
                        />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <button className='post-button feed-post' style={{marginBottom:'20px'}}>login</button>
                        <span style={{fontSize:'0.8rem'}}>Not registered?&nbsp;
                            <span style={{textDecoration:'underline', color:'blue', cursor:'pointer'}}>Click here</span>
                        </span>
                    </div>
                </div>
                <div className='hidden'>
                    <input 
                        type='text'
                        placeholder='Name'
                    />
                    <input 
                        type='email'
                        placeholder='Email'
                    />
                    <input 
                        type='password'
                        placeholder='Create Password'
                    />
                </div>
            </div>
        </Modal>
    )
}

export default Login;