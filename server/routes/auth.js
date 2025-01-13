import express from "express";
const router = express.Router();
import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName || "vu",
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);

// Route if something goes wrong
router.get("/login-failure", (req, res) => {
  res.send("Something went wrong...");
});

// Destroy user session
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("Error log out");
    } else {
      res.redirect("/");
    }
  });
});

// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

export default router;
