const admin = require("firebase-admin");
admin.initializeApp();

// Import the funtion from the specific file
const {addMessage} = require("./api/addMessage");
const {onUserCreate} = require("./api/onUserCreate");

// Export the function for deployment
exports.addMessage = addMessage;
exports.onUserCreate = onUserCreate;
