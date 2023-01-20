import { Routes,Route,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import './app.css'


import {HomePage} from './pages/HomePage'
import {Menu} from './Layouts/Menu';
import { Game } from './pages/Game';
import {Category} from './pages/Category'
import {ListCategory} from './pages/ListCategory'
import {CreateCategory} from './pages/CreateCategory';

function App() {
  return (
    <div className="body">
    <Menu/>
      <Routes>
        <Route path="/Game/:category" element={<Category/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/ListCategory" element={<ListCategory />}/>
        <Route path="/category/create" element={<CreateCategory />} />
      </Routes>
    </div>
  );
}



export default App;
