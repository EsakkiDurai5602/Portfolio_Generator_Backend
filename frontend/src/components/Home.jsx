import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />

      <section className="hero">
        <h1>Create Your Professional Portfolio</h1>

        <p>
          Build and showcase your skills, projects, and achievements with a
          modern, responsive portfolio website in minutes.
        </p>

        <div className="buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/register">
                <button className="btn-primary">Get Started</button>
              </Link>
              <Link to="/login">
                <button className="btn-secondary">Login</button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <button className="btn-primary">Go to Dashboard</button>
            </Link>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="cards">
          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <h3>Easy to Use</h3>
            <p>Create your portfolio with our intuitive interface. No coding required.</p>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <h3>Fully Responsive</h3>
            <p>Your portfolio looks perfect on all devices: desktop, tablet, and mobile.</p>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            <h3>Lightning Fast</h3>
            <p>Optimized performance ensures your portfolio loads instantly.</p>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <h3>Track Analytics</h3>
            <p>Monitor views and downloads of your portfolio in real-time.</p>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.45 21.75 10.95 21.35 10.55C20.95 10.15 20.45 10 19.9 10H16V6C16 5.45 15.85 4.95 15.45 4.55C15.05 4.15 14.55 4 14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 22 12 22Z"></path><circle cx="7.5" cy="10.5" r="1.5"></circle><circle cx="11.5" cy="7.5" r="1.5"></circle><circle cx="16.5" cy="11.5" r="1.5"></circle></svg>
            <h3>Modern Design</h3>
            <p>Beautiful, professional templates ready to showcase your work.</p>
          </div>

          <div className="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <h3>Secure</h3>
            <p>Your data is encrypted and stored securely with industry-standard practices.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Impress?</h2>
        <p>Join thousands of professionals building their portfolios with us.</p>
        {!isAuthenticated && (
          <Link to="/register">
            <button className="btn-large">Start Building Now</button>
          </Link>
        )}
      </section>

      <footer>
        <p>© 2026 Portfolio Generator • Built with love for creators</p>
      </footer>
    </>
  );
}

export default Home;
