import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../Models/User.js'; 

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ email: profile._json.email });
        
        
        if (!user) {
          user = new User({
            id: profile.id,
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile._json.email,
            password:"defaultpassword@123",
            role:"tutor", 
          });
          await user.save();
        }
        
        return done(null, user);
      } catch (error) {
        console.error('Error during Google OAuth:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
