import { useEffect, useState } from "react";
import API from "../services/api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    API.get(`/portfolio/${email}`)
      .then((res) => setPortfolio(res.data))
      .catch(() => alert("Portfolio not found"));
  }, []);

  if (!portfolio) {
    return (
      <div className="container">
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <div className="portfolio-container">

    
      <div className="profile-section">
        <img
          src={portfolio.profileImage || "https://via.placeholder.com/150"}
          alt="profile"
        />

        <h1>{portfolio.fullName}</h1>
        <h3>{portfolio.title}</h3>
      </div>

      
      <div className="section">
        <h2>About Me</h2>
        <p>{portfolio.about}</p>
      </div>

      
      <div className="section">
        <h2>Skills</h2>
        <ul id="skillsList">
          {portfolio.skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

    
      <div className="section">
        <h2>Education</h2>

        {portfolio.education?.map((edu, i) => (
          <div key={i}>
            <h3>{edu.college}</h3>
            <p>{edu.degree}</p>
            <p>{edu.year}</p>
          </div>
        ))}
      </div>

   
      <div className="section">
        <h2>Projects</h2>

        {portfolio.projects?.map((project, i) => (
          <div key={i}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {project.github && (
              <a href={project.github} target="_blank">
                GitHub
              </a>
            )}

            {project.liveLink && (
              <a href={project.liveLink} target="_blank" style={{ marginLeft: "10px" }}>
                Live Demo
              </a>
            )}
          </div>
        ))}
      </div>

      
      <div className="section">
        <h2>Experience</h2>

        {portfolio.experience?.map((exp, i) => (
          <div key={i}>
            <h3>{exp.company}</h3>
            <p>{exp.role}</p>
            <p>{exp.years}</p>
          </div>
        ))}
      </div>


      <div className="section">
        <h2>Social Links</h2>

        <div className="social-links">
          {portfolio.socialLinks?.github && (
            <a href={portfolio.socialLinks.github} target="_blank">
              GitHub
            </a>
          )}

          {portfolio.socialLinks?.linkedin && (
            <a href={portfolio.socialLinks.linkedin} target="_blank">
              LinkedIn
            </a>
          )}

          {portfolio.socialLinks?.instagram && (
            <a href={portfolio.socialLinks.instagram} target="_blank">
              Instagram
            </a>
          )}
        </div>
      </div>

    </div>
  );
}

export default Portfolio;