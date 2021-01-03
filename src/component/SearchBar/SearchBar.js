import React, { useState } from 'react';

import SearchSvg from '../../assets/svg/search.svg';

import './SearchBar.scss';

async function trimString(string) {
    let tempStr = await string.trim().replace(/\s\s+/g, ' ');
    // console.log('TempString', tempStr);
    return tempStr;
}

async function filterSearchResults(posts, search) {
    let filtered = await posts.filter(post=>{
        return post.fTitle.toLowerCase().includes(search.toLowerCase()) || 
                post.feederName.toLowerCase().includes(search.toLowerCase())
    })

    // console.log(filtered);
    return filtered;
}
const SearchBar =({ width, posts, setFilteredPosts, searchValue, setSearchValue }) =>{
    const [ search, setSearch ] = useState('');
    // const SearchField =(str) =(setSearchValue(str)) => trimString(str);

    const onSearchChange = (string) =>{
        // console.log('String - ', string);
        // const searchStr = await trimString(string);
        // console.log('Search String - ', searchStr);
        // const response = await searchStr.response.string();
        // console.log('Response - ', response)
        setSearch(string);
        if(!string.length){
            setSearchValue('')
            setFilteredPosts([]);
        }
    }

    const onSubmitSearch = async() =>{

        if(search.length){
            const searchStr = await trimString(search);
            // console.log('Trimmed String', searchStr);
            // console.log('form submitted');
            const filteredPosts = await filterSearchResults(posts, searchStr);
            console.log('Filtered Search Results', filteredPosts);

            setSearchValue(searchStr);
            setFilteredPosts(filteredPosts);
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
                            value={search}
                            placeholder='Search'
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