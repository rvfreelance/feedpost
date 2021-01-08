import React from 'react';
import Modal from '../Modal/Modal';

import { auth, firestore, signInWithGoogle, createUserProfileDocument } from '../../firebase/firebase';

import './Login.scss';
import Loading from '../Loading/Loading';

const LoginEmailForm =(props) =>{
    const { formStyling, inputStyling, email, password, handleSignIn, handleEmailChange, loginMethodGoogle,
        handlePasswordChange, handleToggle, register, invalidEmailPassword, selectedLoginMethod, 
        handleLoginMethod } = props;

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
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <div style={{height:'20px'}}>
                                        <span className={invalidEmailPassword? '':'hidden'} style={{fontSize:'0.8rem', fontWeight:'600', color:'orangered'}}>Incorrect email or password</span>
                                    </div>
                                    <input 
                                        style={inputStyling}
                                        type='email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e)=>{handleEmailChange(e)}}
                                        autoFocus
                                        />
                                    <input 
                                        style={inputStyling}
                                        type='password'
                                        value={password}
                                        placeholder='Password'
                                        onChange={(e)=>{handlePasswordChange(e)}}
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
                            </div>
                        )
                    :
                    <div>
                        Select Login Method
                        <br/>
                        <br/>
                        <br/>
                        <button className='x-post-button' 
                            style={{color:'#4b4b4b'}} 
                            onClick={()=>handleLoginMethod(false)}
                        >
                            Email
                        </button>
                        <button className='x-post-button' 
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
        }
    }
    // const [incorrect, setIncorrect] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [register, setRegister] = useState(false);
    // const [name, setName] = useState('');
    // const [uid, setUid] = useState(null);

    handleEmailChange =(e) =>{
        this.setState({ 
            email: e.target.value, 
            invalidEmailPassword: false
        })
    }
    handlePasswordChange =(e) =>{
        this.setState({ 
            password: e.target.value, 
            invalidEmailPassword: false
        })
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
    

    handleSignIn =() =>{ 
        const { email, password } = this.state; 

        auth.signInWithEmailAndPassword(email, password)
            .then(data=>{
                this.setState({uid: data.user.uid}, ()=>{
                    firestore.doc(`/feeders/${this.state.uid}`).get()
                        .then(doc=>{ 
                            this.setState({name: doc.data().name})
                                //console.log('lovebytes: ', doc.data().lovebytes);
                                // this.props.setLovebytes(doc.data().lovebytes);
                                // this.props.setName(doc.data().name);
                                // this.props.setUid(doc.data().uid);
                                // this.props.setLoginStatus(true);
                                // this.props.fetchPosts();
                                // this.props.setLoginPop(false);
                            // }) 
                        })
                    
                });
                // setPassword('');
                // //console.log(data.user.uid);
            })
            .catch((error)=>{
                if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                    // //console.log(error.code);
                    this.setState({ invalidEmailPassword: true })
                }else if(error.code === 'auth/too-many-requests'){
                    alert("Your account has been temporarily disabled, try again after some time!")
                }else if(error.code === 'auth/network-request-failed'){
                    alert("Network connectivity issue. Kindly check your internet connection.")
                }
                // //console.log(error)
            })
    }

    handleRegister = async(event) =>{
        event.preventDefault();

        const { email, password, name } = this.state;
        
        try{

            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            // console.log('user: ', user);
            const userAuthEdited = {
                email: user.email,
                uid: user.uid,
                displayName: name
            } 
            // console.log(userAuthEdited);
            // const { displayName } = userAuthEdited;
            // console.log('display name: ', displayName);

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
                alert("Network connectivity issue. Kindly check your internet connection.")
            }else if(error.code === 'auth/email-already-in-use'){
                alert("We are finding it difficult to register new users at the moment, kindly try again after some time");
            }else{
                console.log(error);
                // firestore.collection('/registrationErrors').add({
                //     'error': error.code,
                //     'error_info': error.message,
                //     'error_logged': firestoreTimestamp,
                //     'email': email,
                // }).then(()=>{
                //     //console.log('Error successfully logged.')
                // })
                // .catch((error)=>{
                //     //console.log('Unable to log error.')
                // });
                // //console.log(error)
            }
        }
        
        // auth.createUserWithEmailAndPassword(email, password).then((data)=>{
        //     // //console.log(data.user.uid);
        //     firestore.collection('/feeders').doc(data.user.uid).set({
        //         name: name,
        //         joined: firestoreTimestamp,
        //         uid: data.user.uid,
        //         org: null,
        //         lovebytes: []
        //     }).then(()=>{
        //         // //console.log("feeder registration successfull!");
        //         this.setState({ email: '', password: ''}, ()=>{
        //             // this.props.setLovebytes([]);
        //             this.props.setName(name);
        //             this.props.setUid(data.user.uid);
        //             this.props.setLoginStatus(true);
        //             this.props.fetchPosts();  
        //             this.props.setLoginPop(false);
        //         })              
        //     })
        // }).catch(error=>{
        //     //console.log(error)
        //     if(error.code === 'auth/network-request-failed'){
        //         alert("Network connectivity issue. Kindly check your internet connection.")
        //     }else if(error.code === 'auth/email-already-in-use'){
        //         alert("We are finding it difficult to register new users at the moment, kindly try again after some time");
        //     }else{
        //         firestore.collection('/registrationErrors').add({
        //             'error': error.code,
        //             'error_info': error.message,
        //             'error_logged': firestoreTimestamp,
        //             'email': email,
        //         }).then(()=>{
        //             //console.log('Error successfully logged.')
        //         })
        //         .catch((error)=>{
        //             //console.log('Unable to log error.')
        //         });
        //         // //console.log(error)
        //     }
        // })
    }

    render(){
        const { email, password, name, register, invalidEmailPassword, selectedLoginMethod, loginMethodGoogle } = this.state;
    
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
                    
                    {/* Login Form */}
                    <LoginEmailForm 
                        email={email}
                        password={password}
                        handleSignIn={this.handleSignIn}
                        handleEmailChange={this.handleEmailChange}
                        handlePasswordChange={this.handlePasswordChange}
                        handleToggle={this.handleToggle}
                        inputStyling={inputStyling}
                        formStyling={formStyling}
                        invalidEmailPassword={invalidEmailPassword}
                        register={register}
                        selectedLoginMethod={selectedLoginMethod}
                        loginMethodGoogle={loginMethodGoogle}
                        handleLoginMethod={this.handleLoginMethod}
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
                                placeholder='Name'
                                value={name}
                                onChange={(e)=>this.setState({name: e.target.value})}
                            />
                            <input 
                                style={inputStyling}
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e)=>this.setState({email: e.target.value})}
                                />
                            <input 
                                style={inputStyling}
                                type='password'
                                value={password}
                                minLength='6'
                                placeholder='Password'
                                onChange={(e)=>this.setState({password: e.target.value})}
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