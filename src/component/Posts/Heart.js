import React, { useState } from 'react';

// const Heart =(props) =>{
//     const [lovestate, setLovestate ] = useState(props.currentStatus);

class Heart extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            lovestate:false,
        }
    }


    componentDidMount =() =>{
        this.setState({ lovestate: this.props.currentStatus })
    }

    componentDidUpdate =(prevProps) =>{
        if(this.props.currentStatus !== prevProps.currentStatus){
            this.setState({ lovestate: this.props.currentStatus })
        }
    }

    render(){
        const { lovestate } = this.state;

        return(
            <div className='heart-svg'>
                <svg width="393" className={`pointer ${lovestate? 'svg-love':'svg-no-love'}`} height="293" xmlns="http://www.w3.org/2000/svg" 
                    onClick={()=>{
                        this.props.handleLove(this.props.postId, !lovestate); 
                        // setLovestate(!lovestate)
                    }}
                    // xmlSpace='preserve'
                >
                    {/* <g>
                    <g display="none" overflow="hidden" y="0" x="0" height="10%" width="10%" id="canvasGrid">
                    </g>
                    </g> */}
                    <g>
                    <path id="svg_1" d="m196.5007,74.90265c70.91495,-163.01724 348.76204,0 0,209.5936c-348.76204,-209.5936 -70.91495,-372.61084 0,-209.5936z" strokeWidth="8.5" stroke="#ee4460"/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default Heart;