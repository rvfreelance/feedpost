import React from 'react';

import './Posts.scss';


const Posts =(props) =>{

    return(
        <div className='posts'>
            {/* {
                props.feed.map(post=>{
                    return(
                        <div className='post-small'>
                            <p>Lorem ipsum Lorem Ipsum dhjghvs hsjh mhankjus hkk. Njam shgfnk shjgh ngs...</p>            
                        </div>
                    )
                })
            } */}
            
            <div className='post-large post'>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-small post'>
                <p>Lorem ipsum Lorem Ipsum dhjghvs hsjh mhankjus hkk. Njam shgfnk shjgh ngs...</p>            
            </div>
            
            <div className='post-large post'>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-large post'>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-small post'>
                <div className='post-info'>
                    <span className='post-writer'>FirstName LastName</span>
                    <span className='post-timestamp'>added on Mon Dec 14 2020</span>
                </div>
                <p>Lorem ipsum Lorem Ipsum dhjghvs hsjh mhankjus hkk. Njam shgfnk shjgh ngs...</p>            
            </div>

            <div className='post-large post'>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
        </div>
    )
}

export default Posts;