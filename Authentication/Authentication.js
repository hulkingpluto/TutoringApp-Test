import User from "../Models/User.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signup(token, role = "student") {
  try {
    
    const _profile = jwt.decode(token);
    
    
    const user = {
      id: _profile.sub,
      fname: _profile.given_name,
      lname: _profile.family_name,
      email: _profile.email,
      role: role,
    };

    
    let existingUser = await User.findOne({ email: user.email });
    
    if (existingUser) {
      
      return existingUser;
    } else {
     
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
