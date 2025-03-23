import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Protected/ProtectedRoute";
import { HomePage, LandingPage, RegisterPage, LoginPage } from "../../pages";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/decks" element={<HomePage />} />
        <Route path="/resultados" element={<HomePage />} />
        <Route element={<ProtectedRoute />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
