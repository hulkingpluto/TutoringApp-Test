import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async function (req, res) {
    try {
      const token = req.user.token;
      const userId = req.user.user._id;

      
      res.redirect(`/dashboard.html?token=${token}&userId=${userId}`)
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.redirect("/");
    }
  }
);

// Logout route
router.get("/logout", function (req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/");
  });
});

export default router;
