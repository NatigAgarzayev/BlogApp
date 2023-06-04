import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './features/authSlice';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getMe())
  }, [dispatch])

  return (
    <div className="App">
        <Header />
        <Outlet />
    </div>
  );
}

export default App;
