const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: String,
    title: String,
    profileImage: String,
    about: String,

    skills: [String],

    education: [
      {
        college: String,
        degree: String,
        year: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveLink: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        years: String,
      },
    ],

    socialLinks: {
      github: String,
      linkedin: String,
      instagram: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        userName: String,
        text: {
          type: String,
          required: true,
        },
        replies: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            userName: String,
            text: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);