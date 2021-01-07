import React, { useState } from 'react';
import PostBig from '../../assets/svg/post_big.svg';
// import WindowDimension from '../WindowDimension/WindowDimension';
import HideArrow from '../../assets/svg/hide_arrow.svg';

import './Create.scss';
import { firestore, firestoreTimestamp } from '../../firebase/firebase';

// function preview() {
// }

const ImageUpload =(props) =>{
    const { setImage } = props;

    const [ imagePreviewUrl, setImagePreviewUrl ] = useState('');
    let fileInput = React.createRef();

    const handleImageChange =(e) =>{
    
        e.preventDefault();
    
        const read = new FileReader();
    
        const imageFile = e.target.files[0];
    
        read.onloadend =() =>{
            const image = read.result;
            setImage(image);
            setImagePreviewUrl(image);
        };
    
        read.readAsDataURL(imageFile);
    }

    const handleClick =() =>{
        fileInput.current.click();
    }

    const handleRemove =() =>{
        setImage('');
        setImagePreviewUrl('');
        fileInput.current.value = null;
    };
    
    return(
        <div>
            {/* <input 
                type='file'
                onChange={handleImageChange}
                ref={fileInput}
            /> */}
            <label className="custom-file-upload">
                <input type="file" onChange={handleImageChange} ref={fileInput}/>
                <img
                    className={imagePreviewUrl? '':'hidden'} 
                    src={imagePreviewUrl} 
                    width="150px"
                    alt='uploaded'
                />

                <div style={{display:'flex', justifyContent:'space-between', width:'150px'}}>
                    <span className='custom-title' onClick={()=>handleClick()}>{imagePreviewUrl? 'Change':'Add image'}</span>
                    <span className={imagePreviewUrl? 'custom-title':'hidden'} onClick={()=>handleRemove()}>Remove</span>
                </div>
                <span style={{fontSize:'0.6rem', textDecoration:'none'}}>(.jpg/ .jpeg/ .png only)</span>
            </label>
        </div>
    )
}

const Create=(props) =>{
    const [image, setImage] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [postBrief, setPostBrief] = useState('');
    const [postLink, setPostLink] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const { width } = props;

    let feeds =[];
    const FeedIn =() =>{
        if(postTitle.length && props.uid!==null){
            firestore.collection('/feeds').add({
                'f_title': postTitle,
                'f_brief': postBrief,
                'f_link': postLink,
                'f_is_author': isAuthor, 
                'f_image': image,
                'f_loved': [],
                'f_updated': firestoreTimestamp,
                'feeder_name': props.name,
                'feeder_uid': props.uid,
                'feeder_img': props.img
            })
            .then(feed=>{
                // //console.log(feed.id);
                props.setAddFeed(false);
                
                //fetch the feed from firebase and add to current list
                firestore.doc(`/feeds/${feed.id}`).get()
                    .then(doc=>{
                        feeds.push({
                            'fId': feed.id,
                            'fTitle': doc.data().f_title,
                            'fBrief': doc.data().f_brief,
                            'fLink': doc.data().f_link,
                            'fIsAuthor': doc.data().f_is_author,
                            'fImage': doc.data().f_image,
                            'fLoved': doc.data().f_loved,
                            'fUpdated': doc.data().f_updated.toDate().toDateString(),
                            'feederName': doc.data().feeder_name,
                            'feederImg': doc.data().feeder_img,
                            'feederUid': doc.data().feeder_uid
                        });
    
                        feeds = [...feeds, ...props.posts];
    
                        props.setPosts(feeds);
                    }).catch(error=>{
                        //console.log(error)
                    })
            }).catch(error=>{
                //console.log('Something went wrong. Error: C-C-93')
            })
        }else{
            return null;
        }
    }
    return(
        <div className='create-feed'>
            <button className='top-hide-button pointer' title='Hide'
                onClick={()=>props.setAddFeed(false)}
            >
                <img className='animating-down-scale'src={HideArrow} width='40px' alt='hide button' />
            </button>
            <div className='create'>
                {/* <div>
                </div> */}
                {/* <PostBig width='500px' /> */}
                <form id='create-post-form' onSubmit={(e)=>{e.preventDefault(); FeedIn()}}>
                    {/* <span id='feed-title' className={width>600? 'hidden': ''} style={{paddingTop:'50px'}}>feed in</span> */}
                    <div className='onebytwo pbtm40'>
                        <div className='grid-row-full'>
                            <input 
                                type='text'
                                value={postTitle}
                                placeholder='Post title'
                                onChange={(e)=>setPostTitle(e.target.value)}
                                required
                            />
                            <input 
                                type='text'
                                value={postBrief}
                                placeholder='Brief description'
                                onChange={(e)=>setPostBrief(e.target.value)}
                            />
                            <input 
                                type='url'
                                value={postLink}
                                placeholder='Link to published post'
                                onChange={(e)=>setPostLink(e.target.value)}
                            />
                            {
                                postLink.length? 
                                    <div className='flex-sa-c'>
                                        <input style={{width:'20%'}} type='checkbox' checked={isAuthor} onChange={e=>setIsAuthor(e.target.checked)}/>
                                        <span style={{fontSize:'0.8rem'}}>I am the author of the linked post</span>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <ImageUpload setImage={setImage} image={image}/>
                        {/* <label className="custom-file-upload">
                            <input type="file" onChange={(e)=> this.handleChange(e)}/>
                            <img
                                className={this.state.file? '':'hidden'} 
                                src={this.state.file} width="150px"
                            />

                            <div style={{display:'flex', justifyContent:'space-between', width:'150px'}}>
                                <span className='custom-title'>{this.state.file? 'Change':'Add image'}</span>
                                <span className={this.state.file? 'custom-title':'hidden'} onClick={(e)=>e.preventDefault()}>Remove</span>
                            </div>
                            <span style={{fontSize:'0.6rem', textDecoration:'none'}}>(.jpg/ .jpeg/ .png only)</span>
                        </label> */}
                    </div>
                    <div>
                        <button className='post-button feed-post pointer click-animation' 
                            type='submit'    
                        >
                            feedPost
                        </button>
                    </div>
                </form>
                <div className={width<=600 ? 'hidden': 'image-big'} >
                    <span id='feed-title'>feed in</span>
                    <img src={PostBig} width='300px' alt=''/>
                </div>

            </div>
        </div>
    )
}

export default Create;