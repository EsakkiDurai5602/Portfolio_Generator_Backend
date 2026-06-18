const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    email: String,

    fullName: String,
    title: String,
    profileImage: String,
    about: String,

    skills: [String],

    education: [
        {
            college: String,
            degree: String,
            year: String
        }
    ],

    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveLink: String
        }
    ],

    experience: [
        {
            company: String,
            role: String,
            years: String
        }
    ],

    socialLinks: {
        github: String,
        linkedin: String,
        instagram: String
    }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);