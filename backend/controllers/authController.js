const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate } = require("../utils/validators");
const { sendSuccess, sendError } = require("../utils/response");

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};


async function register(req, res) {
  try {
    const { error, value } = validate(req.body, "register");
    if (error) {
      const messages = error.details.map((e) => e.message);
      return sendError(res, "Validation Error", 400, messages);
    }

    const { name, email, password } = value;
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError(res, "Email already registered", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    return sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      "Registration successful",
      201
    );
  } catch (err) {
    console.error("Register error:", err);
    return sendError(res, err.message || "Registration failed", 500);
  }
}

async function login(req, res) {
  try {
    const { error, value } = validate(req.body, "login");
    if (error) {
      const messages = error.details.map((e) => e.message);
      return sendError(res, "Validation Error", 400, messages);
    }

    const { email, password } = value;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return sendError(res, "Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, "Invalid email or password", 401);
    }

    const token = generateToken(user._id, user.role);

    return sendSuccess(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return sendError(res, err.message || "Login failed", 500);
  }
}

async function logout(req, res) {
  try {
    return sendSuccess(res, null, "Logged out successfully");
  } catch (err) {
    return sendError(res, err.message || "Logout failed", 500);
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return sendError(res, "User not found", 404);
    }
    return sendSuccess(res, user);
  } catch (err) {
    return sendError(res, err.message || "Failed to fetch user", 500);
  }
}

module.exports = { register, login, logout, getCurrentUser };