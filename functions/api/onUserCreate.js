const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  logger.log("A new user signed in for the first time.");
  const {uid, email, phoneNumber, displayName, photoURL, metadata} = user;
  logger.log("User data:",
      {uid, email, phoneNumber, displayName, photoURL, metadata});
  const userData = {
    displayName: displayName || email || `User ${uid.substring(0, 5)}`,
    email: email || "",
    phoneNumber: phoneNumber || "-1",
    photoURL: photoURL && photoURL !== "" ? photoURL : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
    createdAt: metadata.creationTime,
  };
  try {
    // Create a new user document in firestore
    await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .set(userData);
    // Create a new chat collection in firestore
    const initialChatData = {
      text: "Hi! My name is Chatbot. How can I help you?",
      role: "assistant",
      createdAt: new Date().toISOString(),
    };
    // Create a new chat document in firestore
    await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("chats")
        .add(initialChatData);
    // Log success
    logger.log("User data created successfully.");
  } catch (error) {
    logger.error("Error creating user data:", error);
  }
},
);
