import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import { app, database } from './firebaseConfig';
import EditDoc from './Pages/EditDoc';
import Header from './Pages/Header';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage database={database} />}></Route>
        <Route path='/editDoc/:id' element={<EditDoc database={database} />}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
