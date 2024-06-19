const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received  message request data:", data);

    // Validate required fields
    if (!data.text || !data.userId || !data.role) {
      logger.log("Required fields (text or userId) are missing");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "text, userId, and role are required fields",
      );
    }

    const {text, userId, role} = data;
    if (role !== "user" && role !== "assistant") {
      logger.log("Invalid role. Role must be either 'user' or 'assistant'");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Role must be either 'user' or 'assistant'",
      );
    }

    // Construct message data
    const messageData = {
      text,
      role,
      createdAt: new Date().toISOString(),
    };

    // Add message to the user's message subcollection in FIrestore
    const messageRef = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("chats")
        .add(messageData);

    logger.log("Message added successfully, message ID:", messageRef.id);

    // Return success status and message ID
    return {
      status: "success",
      messageId: messageRef.id,
    };
  } catch (error) {
    logger.error("Error adding message:", error);
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error.message,
    );
  }
});
