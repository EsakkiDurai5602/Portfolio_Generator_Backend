const Contact = require("../models/Contact");
const { validate } = require("../utils/validators");
const { sendSuccess, sendError } = require("../utils/response");

async function submitContact(req, res) {
  try {
    const { error, value } = validate(req.body, "contact");
    if (error) {
      const messages = error.details.map((e) => e.message);
      return sendError(res, "Validation Error", 400, messages);
    }

    const contact = new Contact(value);
    await contact.save();

    return sendSuccess(
      res,
      contact,
      "Message sent successfully. We'll get back to you soon!",
      201
    );
  } catch (err) {
    console.error("Submit contact error:", err);
    return sendError(
      res,
      err.message || "Failed to send message",
      500
    );
  }
}

async function getAllContacts(req, res) {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    return sendSuccess(res, {
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get contacts error:", err);
    return sendError(res, err.message || "Failed to fetch messages", 500);
  }
}

async function getContact(req, res) {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return sendError(res, "Message not found", 404);
    }

    if (contact.status === "unread") {
      contact.status = "read";
      await contact.save();
    }

    return sendSuccess(res, contact);
  } catch (err) {
    console.error("Get contact error:", err);
    return sendError(res, err.message || "Failed to fetch message", 500);
  }
}

async function replyContact(req, res) {
  try {
    const { contactId } = req.params;
    const { adminReply } = req.body;

    if (!adminReply || adminReply.trim().length === 0) {
      return sendError(res, "Reply message is required", 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        adminReply,
        status: "replied",
      },
      { new: true }
    );

    if (!contact) {
      return sendError(res, "Message not found", 404);
    }

    return sendSuccess(res, contact, "Reply sent successfully");
  } catch (err) {
    console.error("Reply contact error:", err);
    return sendError(res, err.message || "Failed to send reply", 500);
  }
}

// Delete contact message (Admin only)
async function deleteContact(req, res) {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return sendError(res, "Message not found", 404);
    }

    return sendSuccess(res, null, "Message deleted successfully");
  } catch (err) {
    console.error("Delete contact error:", err);
    return sendError(res, err.message || "Failed to delete message", 500);
  }
}

module.exports = {
  submitContact,
  getAllContacts,
  getContact,
  replyContact,
  deleteContact,
};
