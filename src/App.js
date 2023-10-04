//App.js

import History from './components/History';
import Home from './components/Home';
import './App.css';
import WordDetails from './components/WordDetails';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="navbar">
                <div className="appname"><h1>Dictonary App</h1></div>
                <div className="links">
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/history">History</Link></div>

                </div>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/word/:word" element={<WordDetails />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
