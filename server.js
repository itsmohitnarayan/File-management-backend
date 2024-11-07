const express = require('express');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/files', fileRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
