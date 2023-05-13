const mongoose = require("mongoose");

const annotationSchema = new mongoose.Schema({
  time_Start: {
    type: Number,
    required: true,
  },
  time_End: {
    type: Number,
    required: true,
  },
  notation: {
    type: String,
    required: false,
  },
  drawing: {
    type: String,
    required: false,
  },
});

const videoSchema = new mongoose.Schema({
  video_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  annotations: [annotationSchema],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
  },
  video_id: [videoSchema],
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.password == candidatePassword) {
    return true;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", videoSchema);
const Annotation = mongoose.model("Annot", annotationSchema);

module.exports = { User, Video, Annotation };
