import express from 'express';
import {
  registerUser,
  loginUser,
registerAdmin}
  from "../controllers/authController.js"
import { verifyAdmin } from '../utils/verifyToken.js';

const authRoute = express.Router();

// Register a new user
authRoute.post('/register', registerUser);

// Login user
authRoute.post('/login', loginUser);
authRoute.post('/admin/login' ,loginUser);
authRoute.post('/admin/register', registerAdmin);

export default authRoute;
