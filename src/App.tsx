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
import { EmailVerificationStatus } from './pages/EmailVerificationStatus';
import EmailVerificationResponse from './pages/EmailVerificationResponse';
import UnsubscribePage from './pages/Unsubscribe';
import Footer from './components/Footer';
import TermsPage from './pages/TermsAndConditions';
import PrivacyPage from './pages/PrivacyPolicy';

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
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route
              path="/verify-email-notice"
              element={<EmailVerificationStatus />}
            />
            <Route
              path="/auth/verify-email"
              element={<EmailVerificationResponse />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </main>
    </Router>
  );
}

export default App;
