import React, { useState } from 'react';
import Loading from '../Loading/Loading';
// import WorldPost from '../../assets/svg/world_post.svg';
import ReloadSvg from '../../assets/svg/reload.svg';
import HeartSvg from '../../assets/svg/heart.svg';
import HeartSvgFilled from '../../assets/svg/heart_filled.svg';

import './Home.scss';

const Home =(props) =>{
    const [rotate, setRotate] = useState(false);
    const [loveState, setLoveState] = useState(false);

    if(props.loginPop){
        return(
            <div className='full-screen flex-c-c'>
                <span className='screen1-txt'>hello, welcome to 
                    <br/>
                    <span className='feedpost'>feed<span style={{color:'rgb(238, 68, 96)'}}>Post</span></span>
                </span>
            </div>
        )
    }else{
        return(
            <div className='home'>
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>hello, welcome to 
                        <br/>
                        <span className='feedpost'>feed<span style={{color:'rgb(238, 68, 96)'}}>Post</span></span>
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>Question
                        <br/>
                        <br/>
                        <span className='feedpost'>What is feed<span style={{color:'rgb(238, 68, 96)'}}>Post</span>?</span>
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>you feed, we post 
                        <br/>
                        <span className='feedpost'>Didn't catch<span style={{color:'rgb(238, 68, 96)'}}> ?</span></span>
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen2-txt'>share a published post or<br/>create a new one
                        <br/>
                        <br/>
                        <span className='feedpost-small'>And we post it<span style={{color:'rgb(238, 68, 96)'}}> !!!</span></span>
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen2-txt'>it's so different🥱
                        <br/>
                        <br/>
                        <span className='feedpost-small'>Isn't everything the same<span style={{color:'rgb(238, 68, 96)'}}> ??</span></span>
                    </span>
                </div>
                
                
                
            
                
                <div className='full-screen flex-c-c'>
                    <span className='screen2-txt'>yes but
                        <br/>
                        <br/>
                        <span className='feedpost-small'>it feels different<span style={{color:'rgb(238, 68, 96)'}}> !!!</span></span>
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen2-txt'>I don't believe
                        <br/>
                        <br/>
                        <span className='feedpost-small'>Show me<span style={{color:'rgb(238, 68, 96)'}}> !!!</span></span>
                        <br/>
                        let me decide
                    </span>
                </div>
                <div className='full-screen flex-c-c'>
                    <span className='screen2-txt'>okay
                        <br/>
                        <br/>
                        <span className='feedpost-small'>Introducing the most<span style={{color:'rgb(238, 68, 96)'}}> ❤ features</span></span>
                    </span>
                </div>
    
                {/* Features ------------------------------------------------------- */}
                <div className='full-screen flex-c-c'>
                    <div style={{display:'flex', alignItems:'space-around', flexDirection:'column'}}>
                        <div className='flex-c-c'>
                            <button className={`update-button click-animation pointer ${rotate? 'rotate-infinite': ''}`}
                                style={{position:'relative', zIndex: 0,bottom:50, left:0, width:100, height:100, borderRadius: 150}}onClick={()=>setRotate(!rotate)}
                            >
                                <img src={ReloadSvg} width='50px' alt='refresh' />
                            </button>
                        </div>
                    <span className='screen2-txt'>can't resist clicking
                        <br/>
                        <span className='feedpost-small'>the most addictive<span style={{color:'rgb(238, 68, 96)'}}><br/>refresh button</span></span>
                    </span>
    
                    </div>
                </div>
    
                <div className='full-screen'>
                    {/* <div className='animation'> */}
                        <div className='flex-c-c' style={{ width:'100%', height:'30%'}}>
                            {
                                loveState? 
                                    <img className={`pointer ${loveState? 'svg-love':''}`} 
                                        src={HeartSvgFilled} 
                                        width='100%' 
                                        alt=''
                                        onClick={()=>setLoveState(!loveState)}    
                                    />
                                    :
                                    <img className={`pointer ${loveState? '':'svg-no-love'}`} 
                                        src={HeartSvg} 
                                        width='100%' 
                                        alt=''
                                        onClick={()=>setLoveState(!loveState)}
                                    />
                                    
                            }
                        </div>
                        {/* <span className='screen2-txt'>the most */}
                            <br/>
                            <span className='feedpost-small'>your<span style={{color:'rgb(238, 68, 96)'}}> lovebyte</span></span>
                        {/* </span> */}
                    {/* </div> */}
                </div>
                <div className='full-screen'>
                    <div className='animation'>
                        <div style={{ position:'relative', bottom:50}}>
                            <Loading />
                        </div>
                        <span className='screen2-txt'>the most
                            <br/>
                            <span className='feedpost-small'>satisfying<span style={{color:'rgb(238, 68, 96)'}}> animations</span></span>
                        </span>
                    </div>
                </div>
                {/* <div className='full-screen'>
                    <div className='animation'>
                        <Loading />
                        <span className='screen2-txt'>the most
                            <br/>
                            <span className='feedpost-small'>satisfying<span style={{color:'rgb(238, 68, 96)'}}> animations</span></span>
                        </span>
                    </div>
                </div> */}
              
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>
                        <br/> 
                        <span className='feedpost'>and a whole lot <span style={{color:'rgb(238, 68, 96)'}}>more...</span></span>
                    </span>
                </div>
    
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>
                        <br/>
                        <span className='feedpost'>the most amazing app<span style={{color:'rgb(238, 68, 96)'}}> !!!</span></span>
                    </span>
                </div>
    
                <div className='full-screen' style={{display:'flex', flexDirection:'column'}}>
                    <div className='flex-c-c' style={{width:'100%', height:'50%', alignItems:'flex-end', paddingBottom:50}}>
                        <div className='round-button pointer click-animation shadow'
                            style={{ position:'relative', right:0, bottom:0, width:100, height:100}}
                            onClick={()=>props.setLoginPop(true)}
                        >
                            <span style={{fontSize:'5rem'}}>+</span>
                        </div>
                    </div>
                    {/* <span className='screen1-txt'> */}
                        <br/>
                        <span className='feedpost'>start <span style={{color:'rgb(238, 68, 96)'}}>feeding !</span></span>
                    {/* </span> */}
                </div>
    
                
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'> not sold ?
                        <br/> 
                        <span className='feedpost'>you are<span style={{color:'rgb(238, 68, 96)'}}></span></span>
                        <br/>
                        Tough💪
                    </span>
                </div>
                
                <div className='full-screen flex-c-c'>
                    <span className='screen1-txt'>features you can't resist 
                        <br/> 
                        <span className='feedpost'>coming <span style={{color:'rgb(238, 68, 96)'}}>soon...</span></span>
                        <br/>
                        <span style={{fontSize:'1rem'}}>{'if(💪er > awesomeFeatures)😉'}</span>
                    </span>
                </div>
    
    
    
    
    
                {/* ADD POST ---------------------------------- */}
                    {/* <div className='flex-c-c' style={{paddingTop: '100px'}}>
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
                </div> */}
            </div>
    
    
        )
    }

}


export default Home;