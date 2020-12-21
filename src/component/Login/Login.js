import React, {useState} from 'react';
import Modal from '../Modal/Modal';

import './Login.scss';

const Login =(props) =>{

    const [incorrect, setIncorrect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [name, setName] = useState('');

    const inputStyling ={
        padding:'10px 20px',
        margin: '20px 10px',
        fontSize:'1rem',
        border:'none',
        outline:'none',
        borderBottom: '1px solid grey'
    }

    const formStyling ={
        display:'grid', 
        gridTemplateRows:'repeat(1fr)', 
        width:'300px', 
        height:'90%', 
        backgroundColor:'white', 
        border:'2px solid grey', 
        alignSelf:'center', 
        borderRadius:'25px'
    }

    return(
        <Modal setVisibility={props.setLoginPop}>
            <div style={{height:'100%', display:'flex', justifyContent:'center'}}>
                
                {/* Login Form */}
                <form 
                    onSubmit={(e)=>{e.preventDefault()}}
                    id='login-modal'
                    className={register? 'slide-left':'slide-right'}
                    style={formStyling}
                >
                    <span style={{
                        fontSize:'5.5rem', 
                        color:'rgb(75, 75, 75)', 
                        fontWeight:'500', 
                        fontFamily:'Qwigley, cursive'
                        }}
                        >
                            Login
                    </span>
                    
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{height:'20px'}}>
                            <span className={incorrect? '':'hidden'} style={{fontSize:'0.8rem', fontWeight:'600', color:'orangered'}}>Incorrect email or password</span>
                        </div>
                        <input 
                            style={inputStyling}
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value); setIncorrect(false)}}
                            />
                        <input 
                            style={inputStyling}
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e)=>{setPassword(e.target.value); setIncorrect(false)}}
                        />
                    </div>
                    <div style={{
                        // backgroundColor:'pink',
                        display:'flex', 
                        flexDirection:'column', 
                        justifyContent:'space-between', 
                        alignItems:'center',
                        paddingBottom:'10px'
                        }}
                    >
                        <button 
                            type='submit'
                            className='post-button login-button pointer' 
                            // style={{marginBottom:'50px'}}
                            disabled={email.length && password.length ? false:true}
                            onClick={()=>setIncorrect(true)}
                            >
                                Login
                        </button>
                        <span style={{fontSize:'0.8rem'}}>Not registered yet?&nbsp;
                            <span style={{
                                // textDecoration:'underline', 
                                color:'rgb(106, 106, 248)', 
                                cursor:'pointer'}}
                                onClick={()=>setRegister(true)}
                                >
                                Register
                            </span>
                        </span>
                    </div>
                </form>
                
                {/* Register Form*/}
                <form onSubmit={(e)=>e.preventDefault()} className={register? 'slide-in': 'slide-out'} style={formStyling}>
                    <span style={{
                        fontSize:'5.5rem', 
                        color:'rgb(75, 75, 75)', 
                        fontWeight:'500', 
                        fontFamily:'Qwigley, cursive'
                        }}>
                            Register
                    </span>
                    
                    <div style={{display:'flex', flexDirection:'column'}}>
                        {/* <div style={{height:'20px'}}>
                            <span className={incorrect? '':'hidden'} style={{fontSize:'0.8rem', fontWeight:'600', color:'orangered'}}>Incorrect email or password</span>
                        </div> */}
                        <input 
                            style={inputStyling}
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input 
                            style={inputStyling}
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        <input 
                            style={inputStyling}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{
                        // backgroundColor:'pink',
                        borderRadius:'25px',
                        display:'flex', 
                        flexDirection:'column', 
                        justifyContent:'space-between', 
                        alignItems:'center',
                        paddingBottom:'10px'
                        }}
                    >
                        <button 
                            type='submit'
                            className='post-button login-button pointer'
                            disabled={email.length && password.length && name.length? false:true}
                            >
                                Register now
                        </button>
                        <span style={{fontSize:'0.8rem'}}>Already registered?&nbsp;
                            <span style={{
                                // textDecoration:'underline', 
                                color:'rgb(106, 106, 248)', 
                                cursor:'pointer'}}
                                onClick={()=>setRegister(false)}
                                >
                                Login
                            </span>
                        </span>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Login;