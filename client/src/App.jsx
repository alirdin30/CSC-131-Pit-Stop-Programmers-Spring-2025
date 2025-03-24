import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Account from './pages/Account';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/account" element={<Account />} />
        <Route path="/services" element={<HomePage />} /> {/* TODO: Create Services page */}
        <Route path="/register" element={<Account />} /> {/* TODO: Create Register page */}
      </Routes>
    </Router>
  );
}

export default App;
