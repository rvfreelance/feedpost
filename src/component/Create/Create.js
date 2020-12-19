import React from 'react';

import './Create.scss';

const Create =() =>{
    return(
        <div className='create-feed'>
            <div className='create'>
                {/* <div>
                </div> */}
                <form className='grid-row-full' onSubmit={(e)=>{e.preventDefault();}}>
                    <span id='feed-title'>feed a new Post</span>
                    <input 
                        type='text'
                        placeholder='Add a Post Title'
                    />
                    <input 
                        type='text'
                        placeholder='Breifly describe the post'
                    />
                    <input 
                        type='url'
                        placeholder='Paste the link to the original post'
                    />
                    <label className="custom-file-upload">
                        <input type="file"/>
                        <span className='custom-title'>Add image</span>
                        <span style={{fontSize:'0.6rem', textDecoration:'none'}}>(.jpg/ .jpeg/ .png only)</span>
                    </label>
                    <div>
                        <button className='post-button feed-post pointer click-animation' type='submit'>feedPost</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create;