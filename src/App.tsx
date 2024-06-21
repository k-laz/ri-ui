import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Hero,
  Dashboard,
  LogIn,
  SignUp,
  Blog,
  About,
  FilterSetup,
} from './pages/';
import { PrivateRoute, Navbar } from './components/';
import { AuthProvider } from './hooks/AuthProvider';

function App() {
  return (
    <Router>
      <Navbar />

      <main className="relative isolate h-dvh bg-background px-6 pt-20 lg:px-8">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/filter-setup" element={<FilterSetup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>

      {/* <footer>some footer</footer> */}
    </Router>
  );
}

export default App;
