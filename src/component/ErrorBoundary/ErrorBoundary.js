import React from 'react';

import ErrorImg from '../../assets/svg/error.svg';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state={
            status: false,
            supportEmail: 'support@envoq.in',
            textCopied: false,
        }
    }

    componentDidCatch =() =>{
        this.setState({ status: true })
    }

    render(){
        if(!this.state.status){
            return(
                <div className='error-boundary'>
                    <div className='error-text'>
                        <span className='small-text'>Something went wrong</span>
                        <span className='big-text'>We are working on it !</span>
                    </div>
                    <img src={ErrorImg} width={this.props.width>800 ? '500px': '300px'} alt='error'/>
                    <span className='error-footer'>See this more often? write to us at<br/>
                        <span className={`clr-blue pointer`} 
                            style={{color: this.state.textCopied? 'rgb(75,75,75)': null}}
                            onClick={() => {
                                this.setState({textCopied:true}); 
                                navigator.clipboard.writeText(this.state.supportEmail)}}
                        >
                            {this.state.supportEmail}
                        </span>
                        <span className={`text-copied ${this.state.textCopied? 'click-animation-large':'text-slide-away'}`}
                            onAnimationEnd={()=>this.setState({textCopied:false})}
                        >
                            Copied
                        </span>
                    </span>
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