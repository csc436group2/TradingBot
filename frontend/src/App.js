// import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';

function App() {

  // const [data, setData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/users").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, []);

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
