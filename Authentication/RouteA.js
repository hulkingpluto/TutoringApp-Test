import express from "express";
import passport from "passport";
import { signup } from "./Authentication.js"; 
import User from "../Models/User.js"; 

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    try {
      const token = req.query.code; 
      const profile = await signup(token, req.user.role); 
      res.redirect(`/profile?user=${profile.email}`); 
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.redirect("/login");
    }
  }
);

router.post("/authenticate", async (req, res) => {
  const { token } = req.body;
  try {
    const profile = await signup(token);
    res.status(200).json({ ...profile, token });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
});

router.get("/logout", function (req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/");
  });
});

export default router;
