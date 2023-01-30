import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import Movies from './components/Movies';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <Router>
        <NavBar />

        <Routes>
          <Route path='/' element={[<Banner />, <Movies />]} />

          <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
