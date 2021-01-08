import React from 'react';
import Loading from '../Loading/Loading';
import WorldPost from '../../assets/svg/world_post.svg';

import './Home.scss';

const Home =(props) =>{

    return(
        <div className='home'>
            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>hello, welcome to 
                    <br/>
                    <span className='feedpost'>feed<span style={{color:'rgb(238, 68, 96)'}}>Post</span></span>
                </span>
            </div>
            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>it feels
                    <br/>
                    <span className='feedpost'>different<span style={{color:'rgb(238, 68, 96)'}}>?</span></span>
                </span>
            </div>
            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>you are about to get
                    <br/>
                    <span className='feedpost'>amazed<span style={{color:'rgb(238, 68, 96)'}}>!!!</span></span>
                </span>
            </div>

            <div className='full-screen'>
                <div className='animation'>
                    <Loading />
                    <br/>
                    <br/>
                    <span className='feedpost'>satisfying<span style={{color:'rgb(238, 68, 96)'}}><br/>animation</span>?</span>
                </div>
            </div>

            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>
                    <br/> 
                    <span className='feedpost'>and a whole lot <span style={{color:'rgb(238, 68, 96)'}}>more...</span></span>
                </span>
            </div>
            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>
                    <br/> 
                    <span className='feedpost'>coming <span style={{color:'rgb(238, 68, 96)'}}>soon...</span></span>
                </span>
            </div>





            {/* ADD POST ---------------------------------- */}
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
        </div>


    )
}


export default Home;