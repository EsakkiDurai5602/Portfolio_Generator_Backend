import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";

const ensureThreeProjects = (projectsArray) => {
  const arr = projectsArray ? [...projectsArray] : [];
  while (arr.length < 3) {
    arr.push({ title: "", description: "", github: "", liveLink: "" });
  }
  return arr.slice(0, 3);
};

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [portfolio, setPortfolio] = useState({
    email: user?.email || localStorage.getItem("email") || "",
    fullName: "",
    title: "",
    profileImage: "",
    about: "",
    skills: "",
    education: [{ college: "", degree: "", year: "" }],
    projects: [
      { title: "", description: "", github: "", liveLink: "" },
      { title: "", description: "", github: "", liveLink: "" },
      { title: "", description: "", github: "", liveLink: "" }
    ],
    experience: [{ company: "", role: "", years: "" }],
    socialLinks: { github: "", linkedin: "", instagram: "" },
  });

  // Automatically fetch portfolio on mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await API.get("/portfolio/my/portfolio");
        if (response.data && response.data.data) {
          const data = response.data.data;
          setPortfolio({
            ...data,
            skills: data.skills ? data.skills.join(",") : "",
            projects: ensureThreeProjects(data.projects),
          });
          setHasPortfolio(true);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setHasPortfolio(false);
          setPortfolio((prev) => ({
            ...prev,
            email: user?.email || prev.email || "",
          }));
        } else {
          console.error("Failed to load portfolio:", err);
        }
      }
    };

    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);
    try {
      const response = await API.post("/portfolio/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.url) {
        setPortfolio((prev) => ({
          ...prev,
          profileImage: response.data.url,
        }));
        alert("Image uploaded successfully!");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Helper to strip database metadata fields like _id, userId, __v so Joi validation passes
  const getCleanPayload = () => {
    return {
      email: portfolio.email,
      fullName: portfolio.fullName,
      title: portfolio.title,
      profileImage: portfolio.profileImage,
      about: portfolio.about,
      skills: typeof portfolio.skills === "string"
        ? portfolio.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : portfolio.skills,
      education: portfolio.education.map((edu) => ({
        college: edu.college || "",
        degree: edu.degree || "",
        year: edu.year || "",
      })),
      projects: portfolio.projects
        .filter((proj) => proj.title && proj.title.trim())
        .map((proj) => ({
          title: proj.title || "",
          description: proj.description || "",
          github: proj.github || "",
          liveLink: proj.liveLink || "",
        })),
      experience: portfolio.experience.map((exp) => ({
        company: exp.company || "",
        role: exp.role || "",
        years: exp.years || "",
      })),
      socialLinks: {
        github: portfolio.socialLinks?.github || "",
        linkedin: portfolio.socialLinks?.linkedin || "",
        instagram: portfolio.socialLinks?.instagram || "",
      },
    };
  };

  const createPortfolio = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/portfolio", getCleanPayload());
      alert(response.data.message || "Portfolio created successfully");
      setHasPortfolio(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errMsg = Array.isArray(errors) ? errors.join("\n") : err.response?.data?.message;
      alert(errMsg || "Failed to create portfolio");
    }
  };

  const getPortfolio = async () => {
    try {
      const response = await API.get(`/portfolio/${portfolio.email}`);
      const data = response.data.data;
      setPortfolio({
        ...data,
        skills: data.skills ? data.skills.join(",") : "",
        projects: ensureThreeProjects(data.projects),
      });
      setHasPortfolio(true);
      alert("Portfolio Loaded Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Portfolio Not Found");
    }
  };

  const updatePortfolio = async () => {
    try {
      const response = await API.put("/portfolio", getCleanPayload());
      alert(response.data.message || "Portfolio Updated Successfully");
      setHasPortfolio(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errMsg = Array.isArray(errors) ? errors.join("\n") : err.response?.data?.message;
      alert(errMsg || "Failed to Update Portfolio");
    }
  };

  const togglePublish = async () => {
    try {
      const response = await API.patch("/portfolio/publish");
      alert(response.data.message || "Publish status updated");
      
      const responseGet = await API.get("/portfolio/my/portfolio");
      if (responseGet.data && responseGet.data.data) {
        const data = responseGet.data.data;
        setPortfolio({
          ...data,
          skills: data.skills ? data.skills.join(",") : "",
          projects: ensureThreeProjects(data.projects),
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update publish status");
    }
  };

  const deletePortfolio = async () => {
    try {
      await API.delete("/portfolio");
      alert("Deleted Successfully");
      setHasPortfolio(false);
      setPortfolio({
        email: user?.email || "",
        fullName: "", title: "", profileImage: "", about: "", skills: "",
        education: [{ college: "", degree: "", year: "" }],
        projects: [
          { title: "", description: "", github: "", liveLink: "" },
          { title: "", description: "", github: "", liveLink: "" },
          { title: "", description: "", github: "", liveLink: "" }
        ],
        experience: [{ company: "", role: "", years: "" }],
        socialLinks: { github: "", linkedin: "", instagram: "" },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Delete Portfolio");
    }
  };

  const logout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Portfolio Dashboard</h1>
        </div>

        {/* Banner based on portfolio existence */}
        {hasPortfolio ? (
          <div className="success-message">
            ✨ Your portfolio is loaded! You can modify or update details below.
          </div>
        ) : (
          <div className="error-message" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--accent-color)' }}>
            📝 Create portfolio first! Fill out the details below to get started.
          </div>
        )}

        <form onSubmit={createPortfolio} className="dashboard-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Email" value={portfolio.email}
                  onChange={(e) => setPortfolio({ ...portfolio, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Full Name" value={portfolio.fullName}
                  onChange={(e) => setPortfolio({ ...portfolio, fullName: e.target.value })} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Professional Title</label>
                <input type="text" placeholder="Professional Title" value={portfolio.title}
                  onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Profile Image (URL or Upload)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Profile Image URL" value={portfolio.profileImage}
                    onChange={(e) => setPortfolio({ ...portfolio, profileImage: e.target.value })} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '8px', fontSize: '13px', width: 'auto', flex: 1 }} />
                    {uploadingImage && <span style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: '600' }}>Uploading...</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>About Me</label>
              <textarea placeholder="About Me" value={portfolio.about}
                onChange={(e) => setPortfolio({ ...portfolio, about: e.target.value })} required />
            </div>
          </div>

          <div className="form-section">
            <h2>Skills</h2>
            <div className="form-group">
              <label>Skills (Comma-separated, e.g. HTML,CSS,JS,React)</label>
              <input type="text" placeholder="HTML,CSS,JS,React" value={portfolio.skills}
                onChange={(e) => setPortfolio({ ...portfolio, skills: e.target.value })} />
            </div>
          </div>

          <div className="form-section">
            <h2>Education</h2>
            <div className="form-row">
              <div className="form-group">
                <label>College</label>
                <input type="text" placeholder="College" value={portfolio.education[0].college}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    education: [{ ...portfolio.education[0], college: e.target.value }]
                  })} />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input type="text" placeholder="Degree" value={portfolio.education[0].degree}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    education: [{ ...portfolio.education[0], degree: e.target.value }]
                  })} />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" placeholder="Year" value={portfolio.education[0].year}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    education: [{ ...portfolio.education[0], year: e.target.value }]
                  })} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Projects (Up to 3)</h2>
            {portfolio.projects.map((project, index) => (
              <div key={index} className="project-form-card" style={{ marginBottom: index < 2 ? '24px' : '0', paddingBottom: index < 2 ? '24px' : '0', borderBottom: index < 2 ? '1px solid var(--card-border)' : 'none' }}>
                <h3 style={{ fontSize: '15px', color: 'var(--accent-color)', marginBottom: '12px' }}>Project {index + 1}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input type="text" placeholder="Title" value={project.title || ""}
                      onChange={(e) => {
                        const newProjects = [...portfolio.projects];
                        newProjects[index] = { ...newProjects[index], title: e.target.value };
                        setPortfolio({ ...portfolio, projects: newProjects });
                      }} />
                  </div>
                  <div className="form-group">
                    <label>GitHub Repo URL</label>
                    <input type="text" placeholder="Github Link" value={project.github || ""}
                      onChange={(e) => {
                        const newProjects = [...portfolio.projects];
                        newProjects[index] = { ...newProjects[index], github: e.target.value };
                        setPortfolio({ ...portfolio, projects: newProjects });
                      }} />
                  </div>
                  <div className="form-group">
                    <label>Live Link</label>
                    <input type="text" placeholder="Live Demo Link" value={project.liveLink || ""}
                      onChange={(e) => {
                        const newProjects = [...portfolio.projects];
                        newProjects[index] = { ...newProjects[index], liveLink: e.target.value };
                        setPortfolio({ ...portfolio, projects: newProjects });
                      }} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label>Description</label>
                  <textarea placeholder="Description" value={project.description || ""}
                    onChange={(e) => {
                      const newProjects = [...portfolio.projects];
                      newProjects[index] = { ...newProjects[index], description: e.target.value };
                      setPortfolio({ ...portfolio, projects: newProjects });
                    }} />
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2>Experience</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Company" value={portfolio.experience[0].company}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    experience: [{ ...portfolio.experience[0], company: e.target.value }]
                  })} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" placeholder="Role" value={portfolio.experience[0].role}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    experience: [{ ...portfolio.experience[0], role: e.target.value }]
                  })} />
              </div>
              <div className="form-group">
                <label>Years</label>
                <input type="text" placeholder="Years" value={portfolio.experience[0].years}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    experience: [{ ...portfolio.experience[0], years: e.target.value }]
                  })} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Social Links</h2>
            <div className="form-row">
              <div className="form-group">
                <label>GitHub Profile</label>
                <input type="text" placeholder="GitHub" value={portfolio.socialLinks.github}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    socialLinks: { ...portfolio.socialLinks, github: e.target.value }
                  })} />
              </div>
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input type="text" placeholder="LinkedIn" value={portfolio.socialLinks.linkedin}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    socialLinks: { ...portfolio.socialLinks, linkedin: e.target.value }
                  })} />
              </div>
              <div className="form-group">
                <label>Instagram Profile</label>
                <input type="text" placeholder="Instagram" value={portfolio.socialLinks.instagram}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    socialLinks: { ...portfolio.socialLinks, instagram: e.target.value }
                  })} />
              </div>
            </div>
          </div>

          <div className="dashboard-actions-grid">
            <button type="submit" className="btn-action btn-create">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create
            </button>
            <button type="button" className="btn-action btn-get" onClick={getPortfolio}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Get
            </button>
            <button type="button" className="btn-action btn-update" onClick={updatePortfolio}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
              Update
            </button>
            <button type="button" className="btn-action btn-delete" onClick={deletePortfolio}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              Delete
            </button>
            <button
              type="button"
              className="btn-action"
              style={{
                background: portfolio.isPublished
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: portfolio.isPublished
                  ? "0 4px 12px rgba(16, 185, 129, 0.25)"
                  : "0 4px 12px rgba(99, 102, 241, 0.25)"
              }}
              onClick={togglePublish}
            >
              {portfolio.isPublished ? "Unpublish" : "Publish"}
            </button>
            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <button type="button" className="btn-action btn-preview">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Preview
              </button>
            </Link>
            <button type="button" className="btn-action btn-dashboard-logout" onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;