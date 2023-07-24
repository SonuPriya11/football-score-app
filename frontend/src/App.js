import './App.css';
import Home from './components/Home';
import Tournament from './components/Tournament'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Statstics from './components/Statstics';
import PointsTable from './components/PointsTable';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/tournament' element={<Tournament />}></Route>
          <Route path='/pointstable/:id' element={<PointsTable />}></Route>
          <Route path='/stats' element={<Statstics />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
