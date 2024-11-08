import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes.js';
import tenderRoutes from './routes/tenderRoutes.js';
import inventoryRequestRoutes from './routes/inventoryRequestRoutes.js';
import backorderRoutes from './routes/backorderRoutes.js';
import salesOrderRoutes from './routes/salesOrderRoutes.js';
import cron from 'node-cron';
import { checkAndReorderStock } from './services/stockMonitorService.js';

// Initialize the express app
const app = express();

dotenv.config();  // Load environment variables

// Middleware to parse incoming JSON
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/sales-orders', salesOrderRoutes);
app.use('/api/backorders', backorderRoutes);
app.use('/api/inventory-requests', inventoryRequestRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Schedule to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled stock level check...');
  await checkAndReorderStock();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
