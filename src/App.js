import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NumberPage, PagePage } from 'pages';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
            <Routes>
              <Route exact path='/' element={<NumberPage/>}/>
              <Route exact path='/pages/:id' element={<PagePage/>}/>
            </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
