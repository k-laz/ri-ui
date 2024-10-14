import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Hero,
  Dashboard,
  LogIn,
  SignUp,
  Blog,
  About,
  Faq,
  ForgotPassword,
} from './pages/';
import { PrivateRoute, Navbar } from './components/';
import { AuthProvider } from './hooks/AuthProvider';

function App() {
  return (
    <Router>
      <main className="relative isolate h-dvh bg-background px-6 pt-20 lg:px-8">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>
    </Router>
  );
}

export default App;
