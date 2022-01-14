import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import studentModel from "../models/studentModel.js";
import volunteerModel from "../models/volunteerModel.js";

const secret = 'test';

export const signin = async (req, res) => {
 
  const { email, password,userType } = req.body;

  try {
    if(userType === "student"){
      const oldUser = await studentModel.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    }
    else{
      const oldUser = await volunteerModel.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });

    }
   
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
 
    
  const { email, password, year , name,userType } = req.body;

  try {
    if(userType=="student"){
      const oldUser = await studentModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await studentModel.create({ email, password: hashedPassword, name, year });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });


    }
    else{
      const oldUser = await volunteerModel.findOne({ email });

      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await volunteerModel.create({ email, password: hashedPassword, name, year });
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    }
    
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};