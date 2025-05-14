import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
   
    const { name, email, password, country } = req.body;

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) return res.status(409).json({ message: 'User already exists' });
   

    const hashedPassword = await bcrypt.hash(password, 10);

  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
    });

 
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("hello")

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      "success": true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: ' Internal Server error' });
  }
};
export const userProfile = (req,res)=>{
  const userId = req.user._id;
  User.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }).catch((error) => {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  });

 
};