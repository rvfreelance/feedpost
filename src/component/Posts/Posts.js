import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Heart from './Heart';

import HeartSvg from '../../assets/svg/heart.svg';
import HeartSvgFilled from '../../assets/svg/heart_filled.svg';
import WorldPost from '../../assets/svg/world_post.svg';

import firebase, { firestore } from '../../firebase/firebase';

import './Posts.scss';


const Posts =(props) =>{
    const { posts, width, lovebytes, setLovebytes,  noShow, loginStatus, setFilteredPosts, filteredPosts, searchValue, setSearchValue } = props;
    // const [lovedPosts, setLovedPosts] = useState([]);
    const [difficultyBanner, setDifficultyBanner] = useState(false);

    const renderPosts = () =>{
        if(searchValue.length){
            return filteredPosts;
        }else{
            return posts;
        }
    }

    const LovedPosts =(id, status) =>{

        const feedRef = firestore.doc(`/feeds/${id}`);
        const uidRef = firestore.doc(`/feeders/${props.uid}`);
        // //console.log(uidRef);
        // //console.log('postid: ', id, ', status: ', status);
        if(props.uid!==null){
            //check if only the posts which are not there gets added to the array 
            if(status && !lovebytes.includes(id)){
                
                //create a batch write to update lovebytes and f_loved arrays
                let batchAdd = firestore.batch();
                //update lovebytes in feeders
                batchAdd.update(uidRef, {
                    lovebytes: firebase.firestore.FieldValue.arrayUnion(id)
                });
                //update f_loved in feeds
                batchAdd.update(feedRef, {
                    f_loved: firebase.firestore.FieldValue.arrayUnion(props.uid)
                })
                //commit batch update
                batchAdd.commit().then(()=>{
                    // //console.log('added id: ', id);
                    setLovebytes([...lovebytes, id]);
                }).catch(error=>{
                        setDifficultyBanner(true);
                    //console.log('failed in batchAdd: ', error)
                })

            }else{
                //create a batch write to update lovebytes and f_loved arrays
                let batchRem = firestore.batch();
                //update lovebytes in feeders
                batchRem.update(uidRef, {
                    lovebytes: firebase.firestore.FieldValue.arrayRemove(id)
                });
                //update f_loved in feeds
                batchRem.update(feedRef, {
                    f_loved: firebase.firestore.FieldValue.arrayRemove(props.uid)
                })
                //commit batch update
                batchRem.commit().then(()=>{
                    const filter = lovebytes.filter(item=>{
                        return( item!==id)
                    })
                    // //console.log('removed id: ', id);
                    setLovebytes(filter);
                }).catch(error=>{
                    setDifficultyBanner(true);
                    //console.log('failed in batchRem: ', error)
                })
            }
        }else{
            setDifficultyBanner(true);
            return null;
        }
    };  
    
    // useEffect(()=>{
    //     const LoveBytes =() =>{
    //         if(props.uid!==null && lovedPosts){
    //             firestore.doc(`/feeders/${props.uid}`).update({
    //                 f_loved: firestore.FieldValue.arrayUnion
    //             })
    //         }
    //     }

    //     LoveBytes();
    // }, [lovedPosts])


    //Give <img/> their image url for the respective posts
    // const feedImageUrl =(feedId, link) =>{
    //     //console.log(feedId, link);
    //     storage.refFromURL(link)
    //         .getDownloadURL()
    //         .then(url=>{
    //             //console.log('feedId: ', feedId, ', link: ', link, ', URL: ', url);
    //             return url;
    //         })
    //         .catch(error=>{
                    //console.log(error)
                // })
    // } 


    // const replaceUrl =() =>{
        // let img = document.getElementById('138TbZThBVAhEY2WDpwT');
        // img.src = 'https://firebasestorage.googleapis.com/v0/b/feeds-db.appspot…hop.jpg?alt=media&token=224e9865-0964-42de-ac63-06231639ed0c';
    // }

    return(
        <div className={`posts ${props.width<=800? 'pb-90':''}`}>
            <div className={`transparent ${difficultyBanner? 'difficulty': ''}`}
                onAnimationEnd={()=>setDifficultyBanner(false)}    
            >
                <span>Unable to connect</span>
            </div>
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
                                {/* experimental css looks good */}
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
                                                <Heart currentStatus={lovebytes.includes(post.fId)} handleLove={LovedPosts} postId={post.fId}/>
                                            )
                                            :
                                            lovebytes.includes(post.fId) ?
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
                                    <div className={`x-like-count ${lovebytes.includes(post.fId)? '': 'hidden'}`}>
                                        {
                                            
                                            post.fLoved.length>2 ?
                                            <span>{post.fLoved.includes(props.uid) ? post.fLoved.length-1 : post.fLoved.length}+</span>
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