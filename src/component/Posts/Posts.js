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
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Chris Hemsworth</span>
                        
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <div>
                    <button className='post-button pointer click-animation'>View Post</button>
                </div>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-small post'>
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Matt Leau</span>
                        <div>
                            <button className='post-button pointer click-animation'>Post</button>
                        </div>
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>Lorem ipsum Lorem Ipsum dhjghvs hsjh mhankjus hkk. Njam shgfnk shjgh ngs...</p>            
            </div>
            
            <div className='post-large post'>
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Pavel Gottleib</span>
                        <div>
                            <button className='post-button pointer click-animation'>Post</button>
                        </div>
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-large post'>
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Ravi Sharma</span>
                        <div>
                            <button className='post-button pointer click-animation'>Post</button>
                        </div>
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>jjdgfdnb hghdjkd mjhgdhbnd</p>
                <hr/>
                <div className='post-image'></div>
            </div>
            
            <div className='post-small post'>
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Andrei Neagoie</span>
                        <div>
                            <button className='post-button pointer click-animation'>Post</button>
                        </div>
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>Lorem ipsum Lorem Ipsum dhjghvs hsjh mhankjus hkk. Njam shgfnk shjgh ngs...</p>            
            </div>

            <div className='post-large post'>
                <div className='post-info'>
                    <div className='post-writer'>
                        <span>Andrei Neagoie</span>
                        <div>
                            <button className='post-button pointer click-animation'>Post</button>
                        </div>
                    </div>
                    <span className='post-timestamp'>Mon Dec 14 2020</span>
                </div>
                <p>jjdgfdnb hghdjkd mjhgdhbnd hjhdbnbndhknb shghshj gsh hgsh jshj shs, sjghs njjs bhshskalk xjjhd. Gkjshs hs bjsa kjskmbd mjabsbmnjsbvsknbsmnn nssjmbsk.</p>
                <hr/>
                <div className='post-image'></div>
            </div>
        </div>
    )
}

export default Posts;