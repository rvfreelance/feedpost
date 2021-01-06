// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Posts from './component/Posts/Posts';
import Create from './component/Create/Create';
import Login from './component/Login/Login';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';

import ReloadSvg from './assets/svg/reload.svg';
import { firestore } from './firebase/firebase';

import WindowDimension from './component/WindowDimension/WindowDimension';

function App() {
  const { width } = WindowDimension();

  return(
    // <ErrorBoundary>
      <ActualApp width={width}/>
    // </ErrorBoundary>
  )
}


class ActualApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginStatus: true,
      loginPop: false,
      addFeed: false,
      userName: '',
      uid: null,
      img: null,
      posts: [],
      refreshPosts: false,
      error: false,
      filteredPosts: [],
      searchValue: '',
      noShow: false,
    }
  }

  FetchAllPosts =() =>{
    let feedsDb = [];

    firestore.collection('/feeds')
    .orderBy('f_updated', 'desc')
    // .limit(50)
    .get()
    .then(data=>{ 
      // console.log('data docs fetched: ', data.docs); 
      if(data.docs.length){
        data.docs.forEach(doc=>{
          // console.log(doc.id, doc.data());
          feedsDb.push(
            {
              'fId': doc.id,
              'fTitle': doc.data().f_title,
              'fBrief': doc.data().f_brief,
              'fImgLink': doc.data().f_image, 
              'fLink': doc.data().f_link,
              'fIsAuthor': doc.data().f_is_author,
              'fLoved': doc.data().f_loved,
              'fUpdated': doc.data().f_updated.toDate().toDateString(),
              'feederName': doc.data().feeder_name,
              'feederImgLink': doc.data().feeder_img,
              'feederUid': doc.data().feeder_uid
            }
          ) 
        })               
        // console.log(feedsDb);
        this.setState({ 
          refreshPosts: false, 
          posts: feedsDb
        })
        // setRefreshPosts(false);
        // setPosts(feedsDb);
      }else{
        this.setState({ 
          refreshPosts: false,
          noShow: true
        })
          // setRefreshPosts(false);
          // setNoShow(true);
      }  
    }).catch(error=>{
        this.setState({ refreshPosts: false });
        // setRefreshPosts(false);
        // console.log(error)
    })
  }

  setLoginStatus =(status) =>{
    this.setState({ loginStatus: status })
  }

  setLoginPop =(bool) =>{
    this.setState({ loginPop: bool })
  }

  setAddFeed =(bool) =>{
    this.setState({ addFeed: bool })
  }

  setName =(userName) =>{
    this.setState({ userName })
  }

  setUid =(uid) =>{
    this.setState({ uid })
  }

  setImg =(img) =>{
    this.setState({ img })
  }
  
  setPosts =(posts) =>{
    this.setState({ posts })
  }

  setRefreshPosts =(bool) =>{
    this.setState({ refreshPosts: bool })
  }

  setError =(bool) =>{
    this.setState({ error: bool })
  }

  setFilteredPosts =(filtered) =>{
    this.setState({ filteredPosts: filtered })
  }

  setSearchValue =(value) =>{
    this.setState({ searchValue: value })
  } 

  // setNoShow =(bool) =>{
  //   this.setState({ noShow: bool })
  // }

  render() {
    // const width  = Width();
    const { width } = this.props;

    const { loginStatus, loginPop, addFeed, userName, uid, img, posts, refreshPosts, error, 
      filteredPosts, searchValue, noShow } = this.state;

    const { FetchAllPosts, setLoginStatus, setLoginPop, setAddFeed, setName, setUid, setImg, setPosts, setRefreshPosts, setError, 
      setFilteredPosts, setSearchValue } = this;
  
    return (
      <div className="App">
        <Header 
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
          setLoginPop={setLoginPop}
          setPosts={setPosts}
          setName={setName}
          setUid={setUid}
          error={error}
          // width={width}
        />
  
        <ErrorBoundary 
          width={width}
          setError={setError}  
          uid={uid}
        >
          {
            loginPop || (!loginStatus && addFeed)? 
            (
              <Login 
                setLoginStatus={setLoginStatus}
                setLoginPop={setLoginPop}
                fetchPosts={FetchAllPosts}
                setName={setName}
                setUid={setUid}
                setImg={setImg}
              />
            )
            : null
          }
          {
            loginStatus && addFeed?
            (
              <Create 
                setAddFeed={setAddFeed}
                name={userName}
                uid={uid}
                img={img}
                setPosts={setPosts}
                posts={posts}
                width={width}
              />
            )
            : null
          }
          <Posts 
            posts={posts}
            setPosts={setPosts}
            setAddFeed={setAddFeed}
            refreshPosts={refreshPosts}
            setRefreshPosts={setRefreshPosts}
            noShow={noShow}
            width={width}
            loginStatus={loginStatus}
            setLoginPop={setLoginPop}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <div className={`${width<=800 ? 'bottom-fixed-bg':''} ${loginPop || addFeed? 'hidden':''}`}>
            {
              loginStatus && !addFeed ? 
              ( 
                <>
                  <button className={`update-button click-animation pointer ${refreshPosts? 'rotate-infinite': ''}`}
                    disabled={refreshPosts? true : false}
                    title='Refresh'
                    onClick={()=>{
                        setRefreshPosts(true);
                        setFilteredPosts([]);
                        setSearchValue(''); 
                        FetchAllPosts();
                      }}
                  >
                    <img src={ReloadSvg} width='25px' alt='refresh' />
                    {/* &#x21bb; */}
                  </button>
  
                  <div className='round-button pointer click-animation shadow'
                    onClick={()=>setAddFeed(true)}
                  >
                    <span>+</span>
                  </div>
                </>
              ) 
              : null
            }
          </div>
        </ErrorBoundary>
  
      </div>
    );
  
  }

}
// function App() {

//   const [ loginStatus, setLoginStatus ] = useState(true);      //false
//   const [ loginPop, setLoginPop ] = useState(false);            //false
//   const [ addFeed, setAddFeed ] = useState(false);              //false
//   const [ name, setName ] = useState('');                       //''
//   const [ uid, setUid ] = useState(null);                       //null
//   const [ img, setImg ] = useState(null);                       //null
//   const [ posts, setPosts ] = useState([]);                     //[]
//   const [ refreshPosts, setRefreshPosts ] = useState(false);    //false
//   const [ error, setError ] = useState(false);                  //false
//   const [ filteredPosts, setFilteredPosts ] = useState([]);     //[]
//   const [searchValue, setSearchValue] = useState('');           //''
//   const [ noShow, setNoShow ] = useState(false);                //false

//   const { width } = WindowDimension();

//   let feedsDb =[];

  // const FetchAllPosts =() =>{
  //   firestore.collection('/feeds')
  //   .orderBy('f_updated', 'desc')
  //   // .limit(50)
  //   .get()
  //   .then(data=>{ 
  //     // console.log('data docs fetched: ', data.docs); 
  //     if(data.docs.length){
  //       data.docs.forEach(doc=>{
  //         console.log(doc.id, doc.data());
  //         feedsDb.push(
  //           {
  //             'fId': doc.id,
  //             'fTitle': doc.data().f_title,
  //             'fBrief': doc.data().f_brief,
  //             'fImgLink': doc.data().f_image, 
  //             'fLink': doc.data().f_link,
  //             'fIsAuthor': doc.data().f_is_author,
  //             'fUpdated': doc.data().f_updated.toDate().toDateString(),
  //             'feederName': doc.data().feeder_name,
  //             'feederImgLink': doc.data().feeder_img,
  //             'feederUid': doc.data().feeder_uid
  //           }
  //         ) 
  //       })               
  //       // console.log(feedsDb);
  //       setRefreshPosts(false);
  //       setPosts(feedsDb);
  //     }else{
  //         setRefreshPosts(false);
  //         setNoShow(true);
  //     }  
  //   }).catch(error=>{
  //       setRefreshPosts(false);
  //       console.log(error)
  //   })
  // }
    
    // useEffect(()=>{
    //     FetchAllPosts();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    

  // return (
  //   <div className="App">
  //     <Header 
  //       loginStatus={loginStatus}
  //       setLoginStatus={setLoginStatus}
  //       setLoginPop={setLoginPop}
  //       setPosts={setPosts}
  //       setName={setName}
  //       setUid={setUid}
  //       error={error}
  //       width={width}
  //     />

  //     <ErrorBoundary 
  //       width={width}
  //       setError={setError}  
  //       uid={uid}
  //     >
  //       {
  //         loginPop || (!loginStatus && addFeed)? 
  //         (
  //           <Login 
  //             setLoginStatus={setLoginStatus}
  //             setLoginPop={setLoginPop}
  //             fetchPosts={FetchAllPosts}
  //             setName={setName}
  //             setUid={setUid}
  //             setImg={setImg}
  //           />
  //         )
  //         : null
  //       }
  //       {
  //         loginStatus && addFeed?
  //         (
  //           <Create 
  //             setAddFeed={setAddFeed}
  //             name={name}
  //             uid={uid}
  //             img={img}
  //             setPosts={setPosts}
  //             posts={posts}
  //           />
  //         )
  //         : null
  //       }
  //       <Posts 
  //         posts={posts}
  //         setPosts={setPosts}
  //         setAddFeed={setAddFeed}
  //         refreshPosts={refreshPosts}
  //         setRefreshPosts={setRefreshPosts}
  //         noShow={noShow}
  //         width={width}
  //         loginStatus={loginStatus}
  //         setLoginPop={setLoginPop}
  //         filteredPosts={filteredPosts}
  //         setFilteredPosts={setFilteredPosts}
  //         searchValue={searchValue}
  //         setSearchValue={setSearchValue}
  //       />
  //       <div className={`${width<=800 ? 'bottom-fixed-bg':''} ${loginPop || addFeed? 'hidden':''}`}>
  //         {
  //           loginStatus && !addFeed ? 
  //           ( 
  //             <>
  //               <button className={`update-button click-animation pointer ${refreshPosts? 'rotate-infinite': ''}`}
  //                 disabled={refreshPosts? true : false}
  //                 title='Refresh'
  //                 onClick={()=>{
  //                     setRefreshPosts(true);
  //                     setFilteredPosts([]);
  //                     setSearchValue(''); 
  //                     FetchAllPosts();
  //                   }}
  //               >
  //                 <img src={ReloadSvg} width='25px' alt='refresh' />
  //                 {/* &#x21bb; */}
  //               </button>

  //               <div className='round-button pointer click-animation shadow'
  //                 onClick={()=>setAddFeed(true)}
  //               >
  //                 <span>+</span>
  //               </div>
  //             </>
  //           ) 
  //           : null
  //         }
  //       </div>
  //     </ErrorBoundary>

  //   </div>
  // );
// }

export default App;
