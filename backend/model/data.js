const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
  organization: String,
  location: String,
  address: String,
  dob: String, // Store as a string
  image: String, // Assuming the image is stored as a string (URL or base64 data)
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
