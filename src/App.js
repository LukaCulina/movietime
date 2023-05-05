import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@mui/system';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

//import { Switch } from '@mui/base';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">
      <Container>
            <Routes>
              <Route path='/' element={<Trending/>} exact/>
              <Route path='/movies' element={<Movies/>}/>
              <Route path='/series' element={<Series/>}/>
              <Route path='/search' element={<Search/>}/>
            </Routes>
      </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
