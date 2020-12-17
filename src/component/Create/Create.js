import React from 'react';

import './Create.scss';

const Create =() =>{
    return(
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
                <input 
                    type='file'
                />
                <div>
                    <button className='post-button pointer click-animation' type='submit'>feedPost</button>
                </div>
            </form>
        </div>
    )
}

export default Create;