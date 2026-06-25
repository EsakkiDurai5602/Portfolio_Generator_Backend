import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <div className="logo">Portfolio Generator</div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Create Your Professional Portfolio</h1>

        <p>
          Build and showcase your skills, projects and achievements with a
          simple and attractive portfolio website.
        </p>

        <div className="buttons">
          <Link to="/register">
            <button>Get Started</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>

        <div className="cards">
          <div className="card">
            <h3>Create Portfolio</h3>
            <p>Add your personal details, education, projects and skills.</p>
          </div>

          <div className="card">
            <h3>Update Portfolio</h3>
            <p>Edit your portfolio information anytime.</p>
          </div>

          <div className="card">
            <h3>Delete Portfolio</h3>
            <p>Remove your portfolio from the database easily.</p>
          </div>

          <div className="card">
            <h3>Preview Portfolio</h3>
            <p>View your portfolio in a clean and professional design.</p>
          </div>
        </div>
      </section>

      <footer>© 2026 Portfolio Generator</footer>
    </>
  );
}

export default Home;