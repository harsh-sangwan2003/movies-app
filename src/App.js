import './App.css';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={[<Banner />, <Movies />]} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
