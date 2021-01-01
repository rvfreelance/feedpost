// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Posts from './component/Posts/Posts';
import Create from './component/Create/Create';
import Login from './component/Login/Login';

import { firestore } from './firebase/firebase';

import WindowDimension from './component/WindowDimension/WindowDimension';


function App() {

  const [ loginStatus, setLoginStatus ] = useState(false);
  const [ loginPop, setLoginPop ] = useState(false);
  const [ addFeed, setAddFeed ] = useState(false);
  const [ name, setName ] = useState('');
  const [ uid, setUid ] = useState(null);
  const [ img, setImg ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [ refreshPosts, setRefreshPosts ] = useState(false);
  
  const { width } = WindowDimension();

  const [ noShow, setNoShow ] = useState(false);
  let feedsDb =[];

  const FetchAllPosts =() =>{
    firestore.collection('/feeds')
    .orderBy('f_updated', 'desc')
    // .limit(50)
    .get()
    .then(data=>{ 
      // console.log('data docs fetched: ', data.docs); 
      if(data.docs.length){
        data.docs.forEach(doc=>{
          console.log(doc.id, doc.data());
          feedsDb.push(
            {
              'fId': doc.id,
              'fTitle': doc.data().f_title,
              'fBrief': doc.data().f_brief,
              'fImgLink': doc.data().f_image, 
              'fLink': doc.data().f_link,
              'fUpdated': doc.data().f_updated.toDate().toDateString(),
              'feederName': doc.data().feeder_name,
              'feederImgLink': doc.data().feeder_img,
              'feederUid': doc.data().feeder_uid
            }
          ) 
        })               
        // console.log(feedsDb);
        setRefreshPosts(false);
        setPosts(feedsDb);
      }else{
          setRefreshPosts(false);
          setNoShow(true);
      }  
    }).catch(error=>{
        setRefreshPosts(false);
        console.log(error)
    })
  }
    
    // useEffect(()=>{
    //     FetchAllPosts();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    

  return (
    <div className="App">
      <Header 
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        setLoginPop={setLoginPop}
        setPosts={setPosts}
      />
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
            name={name}
            uid={uid}
            img={img}
            setPosts={setPosts}
            posts={posts}
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
      />
      <div className={`${width<=800 ? 'bottom-fixed-bg':''} ${loginPop? 'hidden':''}`}>
        {
          loginStatus && !addFeed ? 
          ( 
            <>
              <button className={`update-button click-animation pointer ${refreshPosts? 'rotate-infinite': ''}`}
                disabled={refreshPosts? true : false}
                title='Refresh'
                onClick={()=>{setRefreshPosts(true); FetchAllPosts()}}
              >
                &#x21bb;
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
    </div>
  );
}

export default App;
