import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import mongoose from 'mongoose';
dotenv.config(); 

const app =  express();

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json()); 

app.use('/api/users', userRoutes); 
app.use('/api/projects', projectRoutes); 
app.get('/', (req, res) => {
  res.send('API is running');
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
mongoose.connect(process.env.MONGODB_URI).then((result)=>{
  console.log("Db connected successfully")
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch((error)=>{
  console.log("Error in connecting db",error)
})


// app.listen(PORT, () => {
//   console.log(` Server is running on http://localhost:${PORT}`);
// });
