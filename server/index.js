const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { User, Video, Annotation } = require("./models");

//new thing
const jwt = require("jsonwebtoken");
const router = express.Router();

const app = express();
const port = 3001;

app.use(cors());

mongoose.connect(
  "mongodb+srv://joeljacob2k1:x4M9jtEU2x1BY86z@cluster0.zpko0ri.mongodb.net/UpNote?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/details", async (req, res) => {
  // const user = await userModel.findOne({id: 123});
  const user = await userModel.find({});
  res.send(user);
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("coding is for ba");

  try {
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //implement later ::::: const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log("epic");
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("coding is for ba2");

  try {
    const user = await User.findOne({ email });

    console.log(user);

    if (user) {
      return res.status(401).json({ error: "Email already exists" });
    }

    // Create a new document using the model
    const newDoc = new User({
      email: email,
      password: password,
      userName: username,
    });

    console.log("does this work?");

    // Save the new document
    await newDoc.save();

    console.log("does this work now?");

    //implement later ::::: const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log("epic");
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
