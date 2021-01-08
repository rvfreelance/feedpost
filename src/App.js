// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Posts from './component/Posts/Posts';
import Create from './component/Create/Create';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';

import ReloadSvg from './assets/svg/reload.svg';
import { firestore, auth, createUserProfileDocument } from './firebase/firebase';

import WindowDimension from './component/WindowDimension/WindowDimension';

function App() {
  // const [ currentUser, setCurrentUser ] = useState(null);

  const { width } = WindowDimension();
  
  // let unsubscribeFromAuth = null;

  // useEffect(()=>{

  //   unsubscribeFromAuth = auth.onAuthStateChanged(user=>{
  //     setCurrentUser(user)
  //     console.log(user);
  //   })

  //   return ()=>{
  //     unsubscribeFromAuth();
  //   }
  // }, [])


  return(
    // <ErrorBoundary>
      <ActualApp width={width} />
    // </ErrorBoundary>
  )
}


class ActualApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginStatus: false,
      loginPop: false,
      addFeed: false,
      userName: '',
      uid: null,
      img: null,
      posts: [],
      lovebytes:[],
      refreshPosts: false,
      error: false,
      filteredPosts: [],
      searchValue: '',
      noShow: false,

      currentUser: null,
    }
  }

  FetchAllPosts =() =>{
    let feedsDb = [];

    firestore.collection('/feeds')
    .orderBy('f_updated', 'desc')
    // .limit(50)
    .get()
    .then(data=>{ 
      //// console.log('data docs fetched: ', data.docs); 
      if(data.docs.length){
        data.docs.forEach(doc=>{
        //  console.log(doc.id, doc.data());
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
      }else{
        this.setState({ 
          refreshPosts: false,
          noShow: true
        })
      }  
    }).catch(error=>{
        this.setState({ refreshPosts: false });
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

  // inititalize once lovebytes & offLovebytes(offline Lovebytes)
  setLovebytes =(arr) =>{
    this.setState({ lovebytes: arr})
  }

  // componentDidUpdate =(prevProps) =>{
  //   if(this.props.currentUser !== prevProps.currentUser){ 
  //     if(this.props.currentUser){
  //       this.setState({ 
  //         loginPop: false,
  //         loginStatus: true,
  //         uid: this.props.currentUser.uid,
  //         userName: this.props.currentUser.displayName
  //       })
  //     }else{
  //       this.setState({
  //         loginPop: true,
  //         loginStatus: false,
  //         uid: null,
  //         userName: '',
  //         lovebytes:[],
  //         posts: []
  //       })
  //     }
  //   }
  // }
  
  unsubscribeFromAuth = null;

  componentDidMount =() =>{
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.get().then(doc => {
          this.setState({
            currentUser: {
              ...doc.data()
            }
          }, ()=>{
            // console.log(this.state.currentUser);
            this.FetchAllPosts();
            this.setState({
              loginPop: false,
              loginStatus: true,
              uid: this.state.currentUser.uid,
              lovebytes: this.state.currentUser.lovebytes,
              userName: this.state.currentUser.name
            })
          })
        })
      }else{
        this.setState({ 
          currentUser: userAuth,
          loginPop: false,
          loginStatus: false,
          uid: null,
          lovebytes: [],
          userName: '',
          posts: [],
          filteredPosts: []
        })
      }
    })
  }

  componentWillUnmount =() =>{
    this.unsubscribeFromAuth();
  }

  render() {
    // const width  = Width();
    const { width } = this.props;
    
    const { loginStatus, loginPop, addFeed, userName, uid, img, posts, lovebytes, refreshPosts, error, 
      filteredPosts, searchValue, noShow, currentUser } = this.state;
      
    const { FetchAllPosts, setLoginStatus, setLoginPop, setAddFeed, setName, setUid, setImg, setPosts, setRefreshPosts, setError, 
      setFilteredPosts, setSearchValue, setLovebytes } = this;

    return (
      <div className="App">
        <Header 
          // loginStatus={loginStatus}
          // setLoginStatus={setLoginStatus}
          setLoginPop={setLoginPop}
          // setPosts={setPosts}
          // setName={setName}
          // setUid={setUid}
          error={error}
          // setLovebytes={setLovebytes}
          currentUser={currentUser}
        />
  
        <ErrorBoundary 
          width={width}
          setError={setError}  
          uid={uid}
        >
          {
            loginPop || (!currentUser && addFeed)? 
            (
              <Login 
                setLoginStatus={setLoginStatus}
                setLoginPop={setLoginPop}
                setLovebytes={setLovebytes}
                fetchPosts={FetchAllPosts}
                setName={setName}
                setUid={setUid}
                setImg={setImg}
              />
            )
            : null
          }
          {
            currentUser && addFeed?
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
          {
            currentUser? 
            (
              <Posts 
                uid={uid}
                posts={posts}
                lovebytes={lovebytes}
                setLovebytes={setLovebytes}
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
            )
            :
            <Home 
              setAddFeed={setAddFeed}
              setLoginPop={setLoginPop}
              width={width}
            />
          }
          <div className={`${width<=800 ? 'bottom-fixed-bg':''} ${!currentUser || loginPop || addFeed? 'hidden':''}`}>
            {
              currentUser && !addFeed ? 
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

export default App;
