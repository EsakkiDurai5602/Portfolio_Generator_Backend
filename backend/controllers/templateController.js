const { sendSuccess, sendError } = require("../utils/response");

const templates = [
  {
    id: 1,
    name: "Minimal",
    description: "Clean and minimalist portfolio template",
    preview: "minimal-preview.jpg",
    features: ["Simple layout", "Fast loading", "Mobile friendly"],
  },
  {
    id: 2,
    name: "Professional",
    description: "Professional portfolio for corporate roles",
    preview: "professional-preview.jpg",
    features: ["Business layout", "Detailed sections", "Print friendly"],
  },
  {
    id: 3,
    name: "Creative",
    description: "Creative and colorful portfolio template",
    preview: "creative-preview.jpg",
    features: ["Vibrant colors", "Animations", "Portfolio showcase"],
  },
  {
    id: 4,
    name: "Developer",
    description: "Portfolio template for developers",
    preview: "developer-preview.jpg",
    features: ["GitHub integration", "Code samples", "Tech stack display"],
  },
];

async function getTemplates(req, res) {
  try {
    return sendSuccess(res, templates);
  } catch (err) {
    console.error("Get templates error:", err);
    return sendError(res, err.message || "Failed to fetch templates", 500);
  }
}

async function getTemplate(req, res) {
  try {
    const { templateId } = req.params;
    const template = templates.find((t) => t.id === parseInt(templateId));

    if (!template) {
      return sendError(res, "Template not found", 404);
    }

    return sendSuccess(res, template);
  } catch (err) {
    console.error("Get template error:", err);
    return sendError(res, err.message || "Failed to fetch template", 500);
  }
}

async function previewTemplate(req, res) {
  try {
    const { templateId } = req.params;
    const template = templates.find((t) => t.id === parseInt(templateId));

    if (!template) {
      return sendError(res, "Template not found", 404);
    }

    const sampleData = {
      template,
      samplePortfolio: {
        fullName: "John Doe",
        title: "Full Stack Developer",
        about: "Passionate developer with 3+ years of experience",
        skills: ["React", "Node.js", "MongoDB", "JavaScript"],
        education: [
          {
            college: "Tech University",
            degree: "B.Tech in Computer Science",
            year: "2021",
          },
        ],
        projects: [
          {
            title: "E-Commerce Platform",
            description: "Full stack e-commerce solution",
            github: "https://github.com",
            liveLink: "https://example.com",
          },
        ],
        experience: [
          {
            company: "Tech Corp",
            role: "Junior Developer",
            years: "2021 - Present",
          },
        ],
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          instagram: "https://instagram.com",
        },
      },
    };

    return sendSuccess(res, sampleData);
  } catch (err) {
    console.error("Preview template error:", err);
    return sendError(res, err.message || "Failed to preview template", 500);
  }
}

module.exports = { getTemplates, getTemplate, previewTemplate };
