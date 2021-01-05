import React from 'react';

import ErrorImg from '../../assets/svg/error.svg';
import { firestore, firestoreTimestamp } from '../../firebase/firebase';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hasError: false,
            supportEmail: 'support@envoq.in',
            textCopied: false,
        }
    }

    static getDerivedStateFromError(error) {    
        return { hasError: true };  
    }


    componentDidCatch =(error, errorInfo) =>{
        this.props.setError(true);
        
        firestore.collection('/errorlogs').add({
            'user_uid': this.props.uid,
            'error': error,
            'error_info': errorInfo,
            'error_logged': firestoreTimestamp
        }).then(()=>console.log('Error information logged, we will keep this information for further development.'))
        // console.log(error, errorInfo)
        .catch((error)=>{
            // console.log('error while logging', error);
            console.log('Unable to log error information.');
        });
    }

    render(){
        if(this.state.hasError){
            return(
                <div className='error-div'>
                    <div className='error-boundary'>
                        <div className='error-text'>
                            <span className='small-text'>Something went wrong</span>
                            <span className='big-text'>We are working on it !</span>
                        </div>
                        <img src={ErrorImg} width={this.props.width>800 ? '500px': '300px'} alt='error'/>
                        <div className='error-footer'>
                            <span>See this more often? Tell us more</span>
                            <br/>
                            <span className={`clr-ee4460 pointer`} 
                                style={{color: this.state.textCopied? 'rgb(75,75,75)': null}}
                                onClick={() => {
                                    this.setState({textCopied:true}); 
                                    navigator.clipboard.writeText(this.state.supportEmail)}}
                                title='Click to copy email address'
                            >
                                {this.state.supportEmail}
                            </span>
                            
                            <div>
                                <span className={`text-copied ${this.state.textCopied? 'click-animation-large':'text-slide-away'}`}
                                    onAnimationEnd={()=>this.setState({textCopied:false})}
                                >
                                    Copied
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {this.props.children}
                </div>
            )
        }

    }

}

export default ErrorBoundary;