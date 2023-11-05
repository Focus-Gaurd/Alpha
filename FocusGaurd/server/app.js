import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import methodOverride from "method-override";
import User from "./models/users.js";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";

// const dbUrl = process.env.DB_URL;
const secret1 = process.env.SECRET;
const BASE_URL_BE = process.env.BASE_URL_BE;

import session from "express-session";

const sessionOptions = {
  secret: secret1,
  resave: false,
  saveUninitialized: false,
  cookies: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [BASE_URL_BE],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(methodOverride("_method"));

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.session.user });
  if (req.session.user) {
    return res.json({
      valid: true,
      user: req.session.user,
    });
  } else {
    return res.json({ valid: false });
  }
});

// app.post("/update", async (req, res) => {
//   // const { s1, s222 } = req.body;
//   try {
//     const user = await User.findOne({ email: req.session.user });
//     if (user) {
//       // user.s1 = s1;
//       // user.s2 = s222;
//       // await user.save();
//       res.json("done");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

app.post("/stopwatch", async (req, res) => {
  const user = await User.findOne({ email: req.session.user });
  if (req.session.user) {
    return res.json({
      valid: true,
      user: req.session.user,
    });
  } else {
    return res.json({ valid: false });
  }
});
app.post("/reqsend", async (req, res) => {
  const { second, minute, hour } = req.body;
  const user = await User.findOne({ email: req.session.user });
  if (req.session.user) {
    req.session.second = second;
    req.session.minute = minute;
    req.session.hour = hour;
    return res.json({
      valid: true,
    });
  } else {
    return res.json({ valid: false });
  }
});
app.post("/commit", async (req, res) => {
  // const { second, minute, hour } = req.body;
  const user = await User.findOne({ email: req.session.user });
  if (req.session.user) {
    return res.json({
      valid: true,
      second: req.session.second,
      minute: req.session.minute,
      hour: req.session.hour,
    });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (user) {
      // res.cookie("user", email);
      req.session.user = email;
      // req.session.s1 = user.s1;
      // req.session.s2 = user.s2;
      res.json({ exists: "exists" });
    } else {
      res.json("notExists");
    }
  } catch (error) {
    res.json("notExists");
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = new User(req.body);
    await user.save();
    // if (user) {
    // res.cookie("user", email);
    // req.session.user = email;
    // req.session.s1 = user.s1;
    // req.session.s2 = user.s2;
    res.json({ created: true });
    // } else {
    // res.json("notExists");
    // }
  } catch (error) {
    res.json({ created: false });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json("logedOut");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Is Listening On Port ${port}!`);
});
