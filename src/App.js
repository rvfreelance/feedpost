// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Posts from './component/Posts/Posts';
import Create from './component/Create/Create';
import Login from './component/Login/Login';

function App() {

  const [ loginStatus, setLoginStatus ] = useState(false);
  const [loginPop, setLoginPop] = useState(false)
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header 
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        setLoginPop={setLoginPop}
      />
      {
        loginPop? 
        (
          <Login 
            setLoginPop={setLoginPop}
          />
        )
        : null
      }
      {
        loginStatus?
        (
          <Create />
        )
        : null
      }
      <Posts />
    </div>
  );
}

export default App;
