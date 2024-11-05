import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Register from './Pages/Register';
import ChallengeList from './Pages/ChallengeList';
import ChallengeDetails from './Pages/ChallengeDetail';
import Navbar from './Components/Navbar';
import Index from './Pages/index';
import { AuthProvider } from "./Api/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* rutas protegidas  */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/challenges/:id" element={<ChallengeDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
