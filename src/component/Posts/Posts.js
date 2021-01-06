import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import WorldPost from '../../assets/svg/world_post.svg';
import Loading from '../Loading/Loading';
// import { storage } from '../../firebase/firebase';
import HeartSvg from '../../assets/svg/heart.svg';
import HeartSvgFilled from '../../assets/svg/heart_filled.svg';

import Heart from './Heart';

import './Posts.scss';


const Posts =(props) =>{
    const { posts, width,  noShow, loginStatus, setFilteredPosts, filteredPosts, searchValue, setSearchValue } = props;
    // const [love, setLove] = useState([]);
    const [lovedPosts, setLovedPosts] = useState([]);
    const renderPosts = () =>{
        if(searchValue.length){
            return filteredPosts;
        }else{
            return posts;
        }
    }

    const LovedPosts =(id, status) =>{
        console.log('postid: ', id, ', status: ', status);

        if(status){
            setLovedPosts([...lovedPosts, id]);
        }else{
            const filter = lovedPosts.filter(item=>{
                return( item!==id)
            })
            setLovedPosts(filter);
        }
    };  
    
    // LovedPosts= love.forEach(obj=>{
    //     return obj.postId
    // })

    // console.log('LovedPosts: ', LovedPosts)
    // const provideLoveStatus =(id) =>{
    //     console.log(lovedPosts.length);
    //     if(lovedPosts.length){
    //         const filter = lovedPosts.filter(item=>{
    //             return(item!== id)
    //         })
    //         console.log('provideLoveStatus filter: ', filter);
    //         return id===filter[0];
    //     }else{
    //         return false
    //     }
    // }

    //Give <img/> their image url for the respective posts
    // const feedImageUrl =(feedId, link) =>{
    //     console.log(feedId, link);
    //     storage.refFromURL(link)
    //         .getDownloadURL()
    //         .then(url=>{
    //             console.log('feedId: ', feedId, ', link: ', link, ', URL: ', url);
    //             return url;
    //         })
    //         .catch(error=>console.log(error))
    // } 

    // const handleLove =(postId, now) =>{
    //     if(now){
    //         setLove(...love, { 'postId': postId, 'loveState': now})
    //     }else{
    //         const filter = love.filter(obj=>{
    //             return( obj.postId!== postId )
    //         });
    //         setLove(filter);
    //     }
    // }
    

    // const replaceUrl =() =>{
        // let img = document.getElementById('138TbZThBVAhEY2WDpwT');
        // img.src = 'https://firebasestorage.googleapis.com/v0/b/feeds-db.appspot…hop.jpg?alt=media&token=224e9865-0964-42de-ac63-06231639ed0c';
    // }

    return(
        <div className={`posts ${props.width<=800? 'pb-90':''}`}>
            {
                loginStatus? 
                    <SearchBar 
                        width={props.width} 
                        posts={posts} 
                        setFilteredPosts={setFilteredPosts}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}    
                    /> 
                    : 
                    null
            }

            {
                searchValue.length ?
                
                    filteredPosts.length?
                    <span>Showing results for <strong><em>{searchValue}</em></strong></span>
                    :
                    <span>No results to show for <strong><em>{searchValue}</em></strong></span>
                    
                    :
                    null
                }

            {
                posts.length? 
                (
                    renderPosts().map(post=>{
                        return(
                            <div key={post.fId} className={`${post.fImgLink? 'x-post-large':'x-post-small'} x-post`}>
                                <span className='x-post-timestamp'>{post.fUpdated}</span>
                                <div className='x-post-info'>
                                    <div className='x-post-writer'>
                                        <span style={{textTransform:'capitalize'}}>{post.feederName}</span>
                                    </div>
                                    <div className={post.fLink? 'x-post-button-div': 'hidden'}>
                                        <button className='x-post-button pointer click-animation'
                                            onClick={()=> window.open(post.fLink, '_blank')}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                                <div className='x-post-desc'>
                                    <p className='x-post-title'>{post.fTitle}</p>
                                    <div className='x-post-brief'>
                                        <span>{post.fBrief}</span>
                                    </div>
                                    {/* <hr/> */}
                                </div>
                                {/* experimentalcss looks good */}
                                {/* <span style={{fontSize:'0.8rem'}}>{post.fBrief}</span> */}
                                <hr style={{width:'80%', color:'rgba(235, 235, 235, 0.5)'}} 
                                    className={post.fImgLink? '':'hidden'}/>
                                {
                                    post.fImgLink ? 
                                    <div className={post.fImgLink? 'x-post-image-vign':'hidden'}>
                                            {/* <img id={post.fId} src={feedImageUrl(post.fId, post.fImgLink)} alt=''/> */}
                                            <img id={post.fId} src={post.fImgLink} width='100%' alt=''/>
                                            {/* <img id={post.fId} src="https://firebasestorage.googleapis.com/v0/b/feeds-db.appspot…hop.jpg?alt=media&token=224e9865-0964-42de-ac63-06231639ed0c" alt=''/> */}
                                        </div>
                                    :
                                    null
                                }
                                {/* Done experimental css */}
                                <div className='x-bottom'>
                                    <div className='x-like'>
                                        {
                                            width>=800 ? 
                                            (
                                                <Heart currentStatus={lovedPosts.includes(post.fId)} handleLove={LovedPosts} postId={post.fId}/>
                                            )
                                            :
                                            lovedPosts.includes(post.fId) ?
                                            <img className='pointer click-animation' 
                                                src={HeartSvgFilled} 
                                                width='35px' 
                                                alt="didn't like the post"
                                                onClick={()=>LovedPosts(post.fId, false)}
                                            />
                                            :
                                            <img className='pointer click-animation' 
                                                src={HeartSvg} 
                                                width='35px' 
                                                alt='like the post'
                                                onClick={()=>LovedPosts(post.fId, true)}
                                            />
                                            
                                        }
                                    </div>
                                    {/* {
                                        lovedPosts.includes(post.fId) ?
                                    } */}
                                    <div className={`x-like-count ${lovedPosts.includes(post.fId)? '': 'hidden'}`}>
                                        {
                                            
                                            post.fLoved.length>2 ?
                                            <span>{post.fLoved.length}+</span>
                                            :
                                            <span>You loved it!</span>
                                        }
                                        {/* <span>100+</span> */}
                                    </div>
                                </div>
                                
                                
                                {
                                    post.fLink ?
                                    (
                                        <div className={`x-top ${post.fIsAuthor? 'x-post-author-div':''}`}>
                                            <span>{post.fIsAuthor? 'Author':'Shared Post'}</span>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>
                            // <div key={post.fId} className={`${post.fImgLink? 'post-large':'post-small'} post`}>
                            //     <div className='post-info'>
                            //         <div className='post-writer'>
                            //             <span style={{textTransform:'capitalize'}}>{post.feederName}</span>
                            //             <div className={post.fLink? '': 'hidden'}>
                            //                 <button className='post-button pointer click-animation'
                            //                     onClick={()=> window.open(post.fLink, '_blank')}
                            //                 >
                            //                     Post
                            //                 </button>
                            //             </div>
                            //         </div>
                            //         <span className='post-timestamp'>{post.fUpdated}</span>
                            //     </div>
                            //     <p>{post.fTitle}
                            //         {/* <hr/> */}
                            //     </p>
                            //     {/* <span style={{fontSize:'0.8rem'}}>{post.fBrief}</span> */}
                            //     <hr style={{width:'80%', color:'rgba(235, 235, 235, 0.5)'}} 
                            //         className={post.fImgLink? '':'hidden'}/>
                            //     {
                            //         post.fImgLink ? 
                            //             <div className={post.fImgLink? 'post-image':'hidden'}>
                            //                 {/* <img id={post.fId} src={feedImageUrl(post.fId, post.fImgLink)} alt=''/> */}
                            //                 <img id={post.fId} src={post.fImgLink} width='100%' alt=''/>
                            //                 {/* <img id={post.fId} src="https://firebasestorage.googleapis.com/v0/b/feeds-db.appspot…hop.jpg?alt=media&token=224e9865-0964-42de-ac63-06231639ed0c" alt=''/> */}
                            //             </div>
                            //         :
                            //         null
                            //     }
                            // </div>
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