import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './LogAuth/SignIn';
import Registration from './LogAuth/Registration';
function App() {
  return (
    <div className="App">

      <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
