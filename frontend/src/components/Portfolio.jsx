import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "./Header";

function Portfolio() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await API.get("/portfolio/my/portfolio");
        setPortfolio(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load portfolio"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <h2>Loading Portfolio...</h2>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="error-message">{error}</div>
          <button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </>
    );
  }

  if (!portfolio) {
    return (
      <>
        <Header />
        <div className="container">
          <h2>No Portfolio Found</h2>
          <p>Create your portfolio first in the dashboard.</p>
          <button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="portfolio-container">
        <div className="portfolio-nav">
          <button onClick={() => navigate("/dashboard")}>← Back to Edit</button>
        </div>

        <div className="profile-section">
          <img
            src={portfolio.profileImage || "https://via.placeholder.com/150"}
            alt="profile"
            className="profile-image"
          />
          <h1>{portfolio.fullName}</h1>
          <h2 className="title">{portfolio.title}</h2>
        </div>

        {portfolio.about && (
          <div className="section">
            <h3>About Me</h3>
            <p>{portfolio.about}</p>
          </div>
        )}

        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="section">
            <h3>Skills</h3>
            <ul id="skillsList">
              {portfolio.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {portfolio.education && portfolio.education.length > 0 && (
          <div className="section">
            <h3>Education</h3>
            {portfolio.education.map((edu, i) => (
              <div key={i} className="section-item">
                <h4>{edu.college}</h4>
                <p className="degree">{edu.degree}</p>
                <p className="year">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {portfolio.projects && portfolio.projects.length > 0 && (
          <div className="section">
            <h3>Projects</h3>
            {portfolio.projects.map((project, i) => (
              <div key={i} className="section-item">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {portfolio.experience && portfolio.experience.length > 0 && (
          <div className="section">
            <h3>Experience</h3>
            {portfolio.experience.map((exp, i) => (
              <div key={i} className="section-item">
                <h4>{exp.company}</h4>
                <p className="role">{exp.role}</p>
                <p className="years">{exp.years}</p>
              </div>
            ))}
          </div>
        )}

        {portfolio.socialLinks &&
          (portfolio.socialLinks.github ||
            portfolio.socialLinks.linkedin ||
            portfolio.socialLinks.instagram) && (
            <div className="section">
              <h3>Connect With Me</h3>
              <div className="social-links">
                {portfolio.socialLinks.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {portfolio.socialLinks.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {portfolio.socialLinks.instagram && (
                  <a
                    href={portfolio.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}

        <footer className="portfolio-footer">
          <p>© 2026 Created with Portfolio Generator</p>
        </footer>
      </div>
    </>
  );
}

export default Portfolio;
