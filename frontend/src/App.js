import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/home.view';
import LoginView from './views/login.view';
import './assets/css/fonts.css';

function App() {

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  // }, []);

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<LoginView />} />
          <Route path='/home' element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
