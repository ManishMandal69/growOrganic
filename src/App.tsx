import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second-page"
          element={
            <ProtectedRoute>
              <SecondPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
