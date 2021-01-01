import React from 'react';

import WorldPost from '../../assets/svg/world_post.svg';
import Loading from '../Loading/Loading';

import './Posts.scss';


const Posts =(props) =>{
    const { posts, noShow } = props;

    return(
        <div className={`posts ${props.width<=800? 'pb-90':''}`}>
            {
                posts.length? 
                (
                    posts.map(post=>{
                        return(
                            <div key={post.fId} className={`${post.fImgLink? 'post-large':'post-small'} post`}>
                                <div className='post-info'>
                                    <div className='post-writer'>
                                        <span style={{textTransform:'capitalize'}}>{post.feederName}</span>
                                        <div className={post.fLink? '': 'hidden'}>
                                            <button className='post-button pointer click-animation'
                                                onClick={()=> window.open(post.fLink, '_blank')}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                    <span className='post-timestamp'>{post.fUpdated}</span>
                                </div>
                                <p>{post.fTitle}
                                    {/* <hr/> */}
                                </p>
                                {/* <span style={{fontSize:'0.8rem'}}>{post.fBrief}</span> */}
                                <hr className={post.fImgLink? '':'hidden'}/>
                                <div className={post.fImgLink? 'post-image':'hidden'}></div>
                            </div>
                        )
                    })
                )
                :
                noShow || !props.loginStatus? 
                (
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
                            <button className='post-button' 
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
                ) 
                :
                <Loading />
            }
        
        </div>
    )
}

export default Posts;