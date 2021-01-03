import React, { useState } from 'react';

import SearchSvg from '../../assets/svg/search.svg';

import './SearchBar.scss';

async function trimString(string) {
    let tempStr = await string.trim().replace(/\s\s+/g, ' ');
    // console.log('TempString', tempStr);
    return tempStr;
}


const SearchBar =({ width, place }) =>{
    const [searchValue, setSearchValue] = useState('')

    // const SearchField =(str) =(setSearchValue(str)) => trimString(str);

    const onSearchChange = (string) =>{
        // console.log('String - ', string);
        // const searchStr = await trimString(string);
        // console.log('Search String - ', searchStr);
        // const response = await searchStr.response.string();
        // console.log('Response - ', response)
        setSearchValue(string);
    }

    const onSubmitSearch = async() =>{

        if(searchValue.length){
            const searchStr = await trimString(searchValue);
            console.log('Trimmed String', searchStr);
            console.log('form submitted');
        }else{
            console.log('form not submitted');
            return null;
        }

    }

    const widthResult =()=>{
        if(width<=800){
            return '90%';
        }else{ 
            return '50%'
        }
    }
    return(
        <div className='searchbar flex-c-c'>
            <form className='flex-sa-c' 
                onSubmit={e=>{e.preventDefault(); onSubmitSearch()}} 
                style={{width: widthResult()}}
            >
                <div className='bar'>
                        <input 
                            type='search'
                            value={searchValue}
                            placeholder='Search posts'
                            onChange={(e)=>onSearchChange(e.target.value)}
                        />
                        <button className='icon-div flex-c-c pointer click-animation' type='submit'>
                            <img className='icon-input' src={SearchSvg} alt='search' />
                        </button>
                </div>
                {/* <div>
                    <button className='post-button'>Search</button>
                </div> */}
            </form>
        </div>
    )
}

export default SearchBar;