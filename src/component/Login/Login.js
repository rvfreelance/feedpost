import React from 'react';
import Modal from '../Modal/Modal';

import Loading from '../Loading/Loading';
import Notice from '../Notice/Notice'; 

import { auth, firestore, firestoreTimestamp, signInWithGoogle, createUserProfileDocument } from '../../firebase/firebase';

import './Login.scss';

const LoginEmailForm =(props) =>{
    const { formStyling, inputStyling, email, password, handleSignIn, handleChange, loginMethodGoogle,
        handleToggle, register, invalidEmailPassword, selectedLoginMethod, 
        handleLoginMethod, loading } = props;

    return(
        <form 
        onSubmit={(e)=>{e.preventDefault()}}
        id='login-modal'
        className={register? 'slide-left':'slide-right'}
        style={formStyling}
        >
            <span className='login-card-title'>Login</span>
            {
                selectedLoginMethod ? 
                    loginMethodGoogle ?
                        <div>
                            <span>Login in with Google</span>
                            <Loading />
                        </div>
                        :
                        (
                            <div>
                                {
                                    loading? 
                                        <Loading />
                                        :
                                        <>
                                            <div style={{display:'flex', flexDirection:'column'}}>
                                                <div style={{height:'20px'}}>
                                                    <span className={invalidEmailPassword? '':'hidden'} style={{fontSize:'0.8rem', fontWeight:'600', color:'orangered'}}>Incorrect email or password</span>
                                                </div>
                                                <input 
                                                    style={inputStyling}
                                                    type='email'
                                                    name='email'
                                                    placeholder='Email'
                                                    value={email}
                                                    onChange={(e)=>{handleChange(e, 'login')}}
                                                    autoFocus
                                                    />
                                                <input 
                                                    style={inputStyling}
                                                    type='password'
                                                    name='password'
                                                    value={password}
                                                    placeholder='Password'
                                                    onChange={(e)=>{handleChange(e, 'login')}}
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
                                                    onClick={()=>handleSignIn()}
                                                    >
                                                        Login
                                                </button>
                                                
                                            </div>
                                        </>
                                }
                                
                            </div>
                        )
                    :
                    <div>
                        Select Login Method
                        <br/>
                        <br/>
                        <br/>
                        <button className='x-post-button' 
                            style={{color:'#4b4b4b', fontSize:'2.2rem'}} 
                            onClick={()=>handleLoginMethod(false)}
                        >
                            Email
                        </button>
                        <button className='x-post-button' 
                            style={{fontSize:'2.2rem'}}
                            onClick={()=>{handleLoginMethod(true); signInWithGoogle();}}
                        >
                            Google
                        </button>
                    </div>
                
            }
            <div style={{ 
                position: 'absolute', 
                bottom: '10px', 
                width:'100%',
                display:'flex',
                justifyContent:'center'
                }}
            >
                <span style={{fontSize:'0.8rem'}}>Not registered yet?&nbsp;
                    <span style={{
                        // textDecoration:'underline', 
                        color:'rgb(106, 106, 248)', 
                        cursor:'pointer'}}
                        onClick={()=>handleToggle(true)}
                        >
                        Register
                    </span>
                </span>
            </div>
        </form>
    )
}
// const Login =(props) =>{

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            invalidEmailPassword: false,
            email:'',
            password:'',
            register: false,
            name: '',
            uid: null,
            selectedLoginMethod: false,
            loginMethodGoogle: false,
            loading: false,
            noticeMsg:null,
            noticeVisibility: false,
        }
    }
    // const [incorrect, setIncorrect] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [register, setRegister] = useState(false);
    // const [name, setName] = useState('');
    // const [uid, setUid] = useState(null);

    handleChange =(e, form) =>{
        const { name, value } = e.target;
        if(form==='login'){
            this.setState({ 
                [name]: value,
                invalidEmailPassword: false
            })
        }else {
            this.setState({ [name]: value });
        }
    }

    handleLoginMethod =(loginBool) =>{
        this.setState({ 
            loginMethodGoogle: loginBool, 
            selectedLoginMethod: true 
        })
    }

    handleToggle =(bool) =>{
        this.setState({ 
            register: bool, 
            selectedLoginMethod: false,
            loginMethodGoogle:false 
        })
    }
    
    handleNoticeVisibilty =(bool) =>{
        this.setState({
            notice: '',
            noticeVisibility: bool
        })
    }

    handleSignIn =() =>{ 
        const { email, password } = this.state; 

        this.setState({
            loading: true
        }, ()=>{

            //sign in with email password
            auth.signInWithEmailAndPassword(email, password)
                .catch((error)=>{
                    this.setState({ loading: false}, () =>{
                        if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                            // //console.log(error.code);
                            this.setState({ invalidEmailPassword: true })
                        }else if(error.code === 'auth/too-many-requests'){
                            this.setState({
                                noticeMsg:3,
                                noticeVisibility: true
                            })
                            // alert("Your account has been temporarily disabled, try again after some time!")
                        }else if(error.code === 'auth/network-request-failed'){
                            this.setState({
                                noticeMsg:4,
                                noticeVisibility: true
                            })
                            // alert("Network connectivity issue. Kindly check your internet connection.")
                        }else{
                            this.setState({
                                noticeMsg:2,
                                noticeVisibility: true
                            })
                        }
                    })
                    // //console.log(error)
                })
        })
    }

    handleRegister = async(event) =>{
        event.preventDefault();

        const { email, password, name } = this.state;
        
        try{

            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            const userAuthEdited = {
                email: user.email,
                uid: user.uid,
                displayName: name
            } 

            await createUserProfileDocument(userAuthEdited);
            this.setState({
                invalidEmailPassword: false,
                email:'',
                password:'',
                register: false,
                name: '',
                uid: null,
                selectedLoginMethod: false,
                loginMethodGoogle: false
            })

        }catch(error){
            if(error.code === 'auth/network-request-failed'){
                this.setState({ noticeVisibility: true })
                // alert("Network connectivity issue. Kindly check your internet connection.")
            // }else if(error.code === 'auth/email-already-in-use'){
            //     alert("We are finding it difficult to register new users at the moment, kindly try again after some time");
            }else{
                // console.log(error);
                this.setState({ noticeVisibility:true, noticeMsg:2})
                firestore.collection('/registrationErrors').add({
                    'error': error.code,
                    'error_info': error.message,
                    'error_logged': firestoreTimestamp,
                    'email': email,
                }).then(()=>{
                    //console.log('Error successfully logged.')
                })
                .catch((error)=>{
                    //console.log('Unable to log error.')
                });
                //console.log(error)
            }
        }
    }

    render(){
        const { email, password, name, register, invalidEmailPassword, selectedLoginMethod, loading, loginMethodGoogle } = this.state;
    
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
            height:'500px', 
            backgroundColor:'white', 
            border:'2px solid grey', 
            alignSelf:'center', 
            borderRadius:'25px'
        }

        return(
            <Modal setVisibility={this.props.setLoginPop}>
                <div style={{height:'100%', display:'flex', justifyContent:'center'}}>
                    {
                        this.state.noticeVisibility ? 
                            <Notice 
                                notice={this.state.noticeMsg}
                                setVisibility={this.handleNoticeVisibilty}
                            />
                            :
                            null
                    }
                    
                    {/* Login Form */}
                    <LoginEmailForm 
                        email={email}
                        password={password}
                        handleSignIn={this.handleSignIn}
                        handleChange={this.handleChange}
                        handleToggle={this.handleToggle}
                        inputStyling={inputStyling}
                        formStyling={formStyling}
                        invalidEmailPassword={invalidEmailPassword}
                        register={register}
                        selectedLoginMethod={selectedLoginMethod}
                        loginMethodGoogle={loginMethodGoogle}
                        handleLoginMethod={this.handleLoginMethod}
                        loading={loading}
                    />
                    
                    {/* Register Form*/}
                    <form onSubmit={(e)=>e.preventDefault()} className={register? 'slide-in': 'slide-out'} style={formStyling}>
                    
                        <span className='login-card-title'>Register</span>
                        
                        <div style={{display:'flex', flexDirection:'column'}}>
                            {/* <div style={{height:'20px'}}>
                                <span className={incorrect? '':'hidden'} style={{fontSize:'0.8rem', fontWeight:'600', color:'orangered'}}>Incorrect email or password</span>
                            </div> */}
                            <input 
                                style={inputStyling}
                                type='text'
                                name='name'
                                placeholder='Name'
                                value={name}
                                onChange={(e)=>this.handleChange(e, 'register')}
                            />
                            <input 
                                style={inputStyling}
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e)=>this.handleChange(e, 'register')}
                                />
                            <input 
                                style={inputStyling}
                                type='password'
                                name='password'
                                value={password}
                                minLength='6'
                                placeholder='Password'
                                onChange={(e)=>this.handleChange(e, 'register')}
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
                                disabled={email.length && password.length>=6 && name.length? false:true}
                                onClick={(e)=>this.handleRegister(e)}
                                >
                                    Register now
                            </button>
                            <span style={{fontSize:'0.8rem'}}>Already registered?&nbsp;
                                <span style={{
                                    // textDecoration:'underline', 
                                    color:'rgb(106, 106, 248)', 
                                    cursor:'pointer'}}
                                    onClick={()=>this.setState({register: false})}
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
}

export default Login;