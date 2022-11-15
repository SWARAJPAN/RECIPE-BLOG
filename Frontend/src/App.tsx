import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <div className='App'>
      <Home />
      {/* <Router>
        <Routes>
          <Route path='/publishers' element={<Home />} />

        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
