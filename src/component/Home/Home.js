import React from 'react';

import WorldPost from '../../assets/svg/world_post.svg';

const Home =(props) =>{

    return(
        <div className='flex-c-c' style={{paddingTop: '100px'}}>
                <div style={{
                        width:'80%', 
                        height:'80vh', 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent: props.width>1000? 'space-between': 'center'
                    }}
                >
                    <div>
                        <span style={{fontSize:'2rem'}}>Let the world see what you post!</span>
                        <br/><br/><br/>
                        <button className='x-post-button' 
                            style={{fontSize:'2.5rem', boxShadow:'0px 0px 15px white'}}
                            onClick={()=>{
                                if(props.loginStatus){
                                    props.setAddFeed(true)
                                }else{
                                    props.setLoginPop(true);
                                    // props.setAddFeed(true);      
                                }
                            }}
                        >
                            Add Post
                        </button>
                    </div>
                    <img className={props.width>1000? '':'hidden'} 
                        src={WorldPost} 
                        width={props.width>1200? '500px': '350px'} 
                        alt=''
                    />
            </div>
        </div>
    )
}


export default Home;