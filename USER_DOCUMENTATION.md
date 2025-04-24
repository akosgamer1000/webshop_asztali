# User Documentation: Pixelforge Admin

## Overview

Pixelforge Admin is a desktop application for managing an e-commerce platform specializing in computer hardware. It allows administrators to manage products, users, orders, and application settings.

## System Requirements

- Operating System: Windows 10/11, macOS 11+, or Linux
- Minimum 4GB RAM
- 500MB free disk space
- Internet connection for API communication
- Node.js (v16.x or higher)
- npm (v8.x or higher)

## Installation

### For Developers and Testing

1. Clone the repository:
   ```
   git clone https://github.com/your-username/webshop_asztali.git
   cd webshop_asztali
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Transpile Electron TypeScript code:
   ```
   npm run transpile:electron
   ```

4. Build the application:
   ```
   npm run build
   ```

5. Start the application:
   ```
   npm run dev:electron
   ```

### For End Users

1. Download the latest build for your operating system from the project release page
2. Extract the files to your preferred location
3. Run the application by clicking on the Pixelforge Admin executable

## Key Features

- Product Management: Add, edit, and view computer hardware products
- User Management: Add and manage administrative users
- Order Management: View and process customer orders
- Settings: Configure application preferences

## User Guide

### Login

1. Launch the Pixelforge Admin application
2. Enter your username and password
3. Click the "Login" button
4. If credentials are valid, you will be redirected to the products page

![Login Screen](path/to/login-screenshot.png)

### Products Management

#### Viewing Products
1. Click on "Products" in the sidebar
2. Browse the product list
3. Use search or filters to find specific products

![Products List](path/to/products-screenshot.png)

#### Creating a New Product
1. Click on "Products" in the sidebar
2. Click the "Create Product" button
3. Select the product type from the available options:
   - Processor
   - Motherboard
   - Memory
   - Hard Drive
   - Video Card
   - Power Supply
   - CPU Cooler
   - Case
4. Fill in the required fields for the selected product type
5. Click "Submit" to create the new product

![Add Product](path/to/add-product-screenshot.png)

#### Viewing Product Details
1. Find the product in the product list
2. Click on the product name
3. View detailed information about the product

### User Management

#### Viewing Users
1. Click on "Users" in the sidebar
2. Browse the user list
3. Use search or filters to find specific users

#### Adding a New User
1. Click on "Users" in the sidebar
2. Click the "Add User" button
3. Fill in the required fields:
   - Username
   - Email
   - Password
   - Role (Admin, User)
4. Click "Create" to add the new user

#### Viewing User Details
1. Find the user in the user list
2. Click on the username to view detailed information
3. User details are displayed including contact information and role

#### User Profile
1. Click on your username in the top-right corner
2. Select "Profile" from the dropdown menu
3. View and edit your profile information

### Order Management

#### Viewing Orders
1. Click on "Orders" in the sidebar
2. Browse the order list
3. Use search or filters to find specific orders

#### Viewing Order Details
1. Find the order in the order list
2. Click on the order number to view details
3. Review order details, items, and customer information

#### Updating Order Status
1. Navigate to the order details page
2. The current status is displayed at the top of the order details
3. To change status, use the status dropdown menu
4. Select the new status from available options:
   - Pending
   - Processing
   - Shipped
   - Delivered
   - Cancelled
5. The status is updated automatically when changed

### Settings

1. Click on "Settings" in the sidebar
2. Adjust application preferences:
   - Display settings
   - Notification preferences
   - Default values
3. Click "Save" to apply changes

## Troubleshooting

### Login Issues
- Ensure your username and password are correct
- Check that you have an active internet connection
- If you've forgotten your password, contact your system administrator

### Product Management Issues
- Ensure all required fields are filled when creating/editing products
- If images don't upload, check that they are in supported format (JPG, PNG)
- Maximum file size for images is 5MB

### Order Processing Issues
- If orders are not updating, refresh the page and try again
- Ensure you have the correct permissions to modify orders

## Support

For additional support:
- Email: support@pixelforge.com
- Phone: +1-555-123-4567
- Hours: Monday-Friday, 9am-5pm EST 