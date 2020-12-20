import React, { useState } from 'react';

import './Create.scss';

// function preview() {
// }

const ImageUpload =(props) =>{
    const { image, setImage } = props;

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
                    src={imagePreviewUrl} width="150px"
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

const Create=() =>{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         file: null,
    //     }
    // }
    const [image, setImage] = useState('');
    // handleChange =(event) =>{
    //     this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    // }

    // render(){
        return(
            <div className='create-feed'>
                <div className='create'>
                    {/* <div>
                    </div> */}
                    <form id='create-post-form' onSubmit={(e)=>{e.preventDefault();}}>
                        <span id='feed-title'>feed in</span>
                        <div className='onebytwo pbtm40'>
                            <div className='grid-row-full'>
                                <input 
                                    type='text'
                                    placeholder='Post title'
                                />
                                <input 
                                    type='text'
                                    placeholder='Description'
                                />
                                <input 
                                    type='url'
                                    placeholder='Link to published post'
                                />
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
                            <button className='post-button feed-post pointer click-animation' type='submit'>feedPost</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    // }
}

export default Create;