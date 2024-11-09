# File-management-backend

## Overview

The **File-management-backend** is a comprehensive solution designed to streamline the management of files and inventory within an organization. It automates key processes such as file movement, purchase orders, inventory management, and sales orders. The system enhances transparency, reduces manual intervention, and ensures efficient tracking and management of files and inventory.

## Features

### 1. **File Movement Management**
   - **Automated File Tracking and Movement**: Automatically track files as they move between departments, logging and tracing their locations.
   - **Request and Approval Workflow**: Departments can request files, and approval is required before files are moved, ensuring accountability.
   - **Department-Specific Access Controls**: Role-based access controls to ensure that only authorized personnel can move or access files.
   - **File Movement Analytics**: Real-time analytics to identify bottlenecks and improve the efficiency of file movement.

### 2. **Inventory Management**
   - **Automated Purchase Orders and Tender Management**: Automate the creation of purchase orders, manage tender statuses, and notify stakeholders of updates.
   - **Request and Approval System for Inventory Items**: Departments can request inventory items, and approval is required before procurement.
   - **Inventory Backordering**: Track out-of-stock items and automatically create backorders for efficient restocking.
   - **Sales Orders and Tender Status Management**: Automate sales order management, track order statuses, and ensure timely delivery.
   - **Access Control for Inventory Data**: Role-based access to ensure only authorized personnel can modify or access critical inventory data.
   - **Stock Level and Usage Monitoring**: Monitor stock levels and consumption rates to prevent overstocking or stockouts. Automatically trigger purchase orders when stock drops below set thresholds.

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Material-UI, ApexCharts
- **Other Libraries**: Mongoose (ODM for MongoDB), React Router, React Hooks

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or remote instance)
- **Yarn** or **npm**

### Step 1: Clone the repository

```bash
git clone https://github.com/itsmohitnarayan/File-management-backend.git
cd File-management-backend
```

### Step 2: Install Dependencies

#### Backend (Node.js)
```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

Ensure you have the following environment variables set:

- `MONGODB_URI`: MongoDB connection URI
- `PORT`: Port for the backend API (default: `5000`)

### Step 4: Running the Application

#### Backend
```bash
npm run dev
```

The backend will be accessible at `http://localhost:5000`.

## API Endpoints

### File Movement API
- **GET /files**: Get a list of all files.
- **POST /files**: Add a new file to the system.
- **PUT /files/:id**: Update file details.
- **DELETE /files/:id**: Delete a file from the system.

### Purchase Order API
- **POST /purchase-orders**: Create a new purchase order.
- **GET /purchase-orders**: List all purchase orders.
- **GET /purchase-orders/:id**: Get details of a specific purchase order.
- **PUT /purchase-orders/:id**: Update the status of a purchase order.

### Inventory API
- **POST /inventory**: Create a new inventory item.
- **GET /inventory**: List all inventory items.
- **PUT /inventory/:id**: Update inventory item details.
- **DELETE /inventory/:id**: Delete an inventory item.

### Sales Order API
- **POST /sales-orders**: Create a new sales order.
- **GET /sales-orders**: List all sales orders.
- **PUT /sales-orders/:id**: Update sales order status.

## Contribution Guidelines

Feel free to fork this repository, create branches, and submit pull requests. Please ensure the following:

- Follow the existing code style and practices.
- Write unit tests for new features.
- Update documentation as necessary.

> This **File-management-backend** ensures efficient management of files and inventory, improves workflow automation, and enhances transparency. The system leverages modern technologies like Node.js, React, and MongoDB to deliver high-performance features and maintain a seamless experience across departments.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

