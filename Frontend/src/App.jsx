import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfileInput from "./Pages/ProfileInput";
import ProtectedRoute from "./Common/ProtectedRoute";
import PublicRoute from "./Common/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - only accessible when not logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        
        {/* Protected routes - only accessible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfileInput />} />
        </Route>
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;