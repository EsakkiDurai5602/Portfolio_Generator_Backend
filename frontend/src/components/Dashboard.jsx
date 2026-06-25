import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState({
    email: localStorage.getItem("email") || "",
    fullName: "",
    title: "",
    profileImage: "",
    about: "",
    skills: "",
    education: [
      {
        college: "",
        degree: "",
        year: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveLink: "",
      },
    ],
    experience: [
      {
        company: "",
        role: "",
        years: "",
      },
    ],
    socialLinks: {
      github: "",
      linkedin: "",
      instagram: "",
    },
  });

  const createPortfolio = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/portfolio/create", {
        ...portfolio,
        skills: portfolio.skills
          .split(",")
          .map((skill) => skill.trim()),
      });

      alert(response.data.message);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create portfolio"
      );
    }
  };

  const getPortfolio = async () => {
    try {
      const response = await API.get(
        `/portfolio/${portfolio.email}`
      );

      const data = response.data;

      setPortfolio({
        ...data,
        skills: data.skills.join(","),
      });

      alert("Portfolio Loaded Successfully");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Portfolio Not Found"
      );
    }
  };

  const updatePortfolio = async () => {
    try {
      const response = await API.put(
        `/portfolio/update/${portfolio.email}`,
        {
          ...portfolio,
          skills: portfolio.skills
            .split(",")
            .map((skill) => skill.trim()),
        }
      );

      alert(response.data.message);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to Update Portfolio"
      );
    }
  };

  const deletePortfolio = async () => {
    try {
      const response = await API.delete(
        `/portfolio/delete/${portfolio.email}`
      );

      alert(response.data.message);

      setPortfolio({
        email: localStorage.getItem("email") || "",
        fullName: "",
        title: "",
        profileImage: "",
        about: "",
        skills: "",
        education: [
          {
            college: "",
            degree: "",
            year: "",
          },
        ],
        projects: [
          {
            title: "",
            description: "",
            github: "",
            liveLink: "",
          },
        ],
        experience: [
          {
            company: "",
            role: "",
            years: "",
          },
        ],
        socialLinks: {
          github: "",
          linkedin: "",
          instagram: "",
        },
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to Delete Portfolio"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Portfolio Dashboard</h1>

      <form onSubmit={createPortfolio}>
        <h2>Personal Information</h2>

        <input
          type="email"
          placeholder="Email"
          value={portfolio.email}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              email: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Full Name"
          value={portfolio.fullName}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              fullName: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Professional Title"
          value={portfolio.title}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              title: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Profile Image URL"
          value={portfolio.profileImage}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              profileImage: e.target.value,
            })
          }
        />

        <textarea
          placeholder="About Me"
          value={portfolio.about}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              about: e.target.value,
            })
          }
          required
        />

        <h2>Skills</h2>

        <input
          type="text"
          placeholder="HTML,CSS,JavaScript,React"
          value={portfolio.skills}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              skills: e.target.value,
            })
          }
        />

        <h2>Education</h2>

        <input
          type="text"
          placeholder="College"
          value={portfolio.education[0].college}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              education: [
                {
                  ...portfolio.education[0],
                  college: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Degree"
          value={portfolio.education[0].degree}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              education: [
                {
                  ...portfolio.education[0],
                  degree: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Year"
          value={portfolio.education[0].year}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              education: [
                {
                  ...portfolio.education[0],
                  year: e.target.value,
                },
              ],
            })
          }
        />

        <h2>Projects</h2>

        <input
          type="text"
          placeholder="Project Title"
          value={portfolio.projects[0].title}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              projects: [
                {
                  ...portfolio.projects[0],
                  title: e.target.value,
                },
              ],
            })
          }
        />

        <textarea
          placeholder="Project Description"
          value={portfolio.projects[0].description}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              projects: [
                {
                  ...portfolio.projects[0],
                  description: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Github Link"
          value={portfolio.projects[0].github}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              projects: [
                {
                  ...portfolio.projects[0],
                  github: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Live Demo Link"
          value={portfolio.projects[0].liveLink}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              projects: [
                {
                  ...portfolio.projects[0],
                  liveLink: e.target.value,
                },
              ],
            })
          }
        />

        <h2>Experience</h2>

        <input
          type="text"
          placeholder="Company"
          value={portfolio.experience[0].company}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              experience: [
                {
                  ...portfolio.experience[0],
                  company: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={portfolio.experience[0].role}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              experience: [
                {
                  ...portfolio.experience[0],
                  role: e.target.value,
                },
              ],
            })
          }
        />

        <input
          type="text"
          placeholder="Years"
          value={portfolio.experience[0].years}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              experience: [
                {
                  ...portfolio.experience[0],
                  years: e.target.value,
                },
              ],
            })
          }
        />

        <h2>Social Links</h2>

        <input
          type="text"
          placeholder="Github Profile"
          value={portfolio.socialLinks.github}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              socialLinks: {
                ...portfolio.socialLinks,
                github: e.target.value,
              },
            })
          }
        />

        <input
          type="text"
          placeholder="LinkedIn Profile"
          value={portfolio.socialLinks.linkedin}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              socialLinks: {
                ...portfolio.socialLinks,
                linkedin: e.target.value,
              },
            })
          }
        />

        <input
          type="text"
          placeholder="Instagram Profile"
          value={portfolio.socialLinks.instagram}
          onChange={(e) =>
            setPortfolio({
              ...portfolio,
              socialLinks: {
                ...portfolio.socialLinks,
                instagram: e.target.value,
              },
            })
          }
        />

        <div className="button-group">
          <button type="submit">
            Create Portfolio
          </button>

          <button
            type="button"
            onClick={getPortfolio}
          >
            Get Portfolio
          </button>

          <button
            type="button"
            onClick={updatePortfolio}
          >
            Update Portfolio
          </button>

          <button
            type="button"
            onClick={deletePortfolio}
          >
            Delete Portfolio
          </button>
        </div>

        <div className="button-group">
          <Link to="/portfolio">
            <button type="button">
              Preview Portfolio
            </button>
          </Link>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;