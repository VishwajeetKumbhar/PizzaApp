import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login';
import PizzaScreen from './Components/PizzaScreen';
import Cartview from './Components/Cartview';
import Buynow from './Components/Buynow';
import Successful from './Components/Successful';
import Cancleful from './Components/Cancleful';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exat path='/' element={<PizzaScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singlepizza/:id' element={<Cartview />} />
        <Route path='/buynow' element={<Buynow />} />
        <Route path='/success' element={<Successful />} />
        <Route path='/cancle' element={<Cancleful />} />
      </Routes>
    </>
  );
}

export default App;
