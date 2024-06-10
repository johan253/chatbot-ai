const admin = require
admin.initializeApp();

// Import the funtion from the specific file
const addMessage = require("./api/addMessage");

// Export the function for deployment
exports.addMessage = addMessage;
