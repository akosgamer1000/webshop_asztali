# Technical Documentation: Pixelforge Admin

## Project Overview

Pixelforge Admin is an Electron-based desktop application built with React, TypeScript, and Redux. The application serves as an admin panel for managing products, users, orders, and settings for an e-commerce platform specializing in computer hardware and components.

## Technology Stack

### Core Technologies
- **Electron**: Framework for building cross-platform desktop applications
- **React**: Frontend library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **Redux Toolkit**: State management solution
- **React Router**: Client-side routing

### UI Libraries
- **Ant Design**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **Lucide React**: Another icon library
- **Sonner**: Toast notification library

### Backend Communication
- **Axios**: HTTP client for API requests
- **JWT**: JSON Web Token for authentication

## Project Structure

```
webshop_asztali/
├── dist-electron/       # Compiled Electron code
├── dist-react/          # Compiled React UI code
├── src/                 # Source code
│   ├── electron/        # Electron main process code
│   │   └── main.ts      # Main Electron entry point
│   └── ui/              # React UI code
│       ├── assets/      # Static assets
│       ├── companents/  # UI components organized by feature
│       │   ├── common/  # Shared components
│       │   ├── layout/  # Layout components
│       │   ├── login/   # Authentication components
│       │   ├── order/   # Order management components
│       │   ├── product/ # Product management components
│       │   ├── profile/ # User profile components
│       │   ├── setting/ # Settings components
│       │   └── user/    # User management components
│       ├── hooks/       # Custom React hooks
│       ├── misch/       # Miscellaneous utilities
│       │   ├── store/   # Redux store slices
│       │   ├── Axios.ts # Axios configuration
│       │   └── Store.ts # Redux store configuration
│       ├── pages/       # Page components
│       │   └── product/ # Product-related pages
│       ├── router/      # Routing configuration
│       │   └── index.tsx # Main router setup
│       └── style/       # Styling files
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Architecture

### Electron Main Process
The Electron main process (`src/electron/main.ts`) is responsible for creating the application window and managing the application lifecycle. It configures the window dimensions, appearance, and loads the React UI.

### React UI
The React UI is organized using a feature-based architecture, where components, state, and logic are grouped by feature rather than type. This makes the codebase more maintainable and scalable.

### State Management
The application uses Redux Toolkit for state management with the following main slices:
- **Auth**: Manages authentication state (login, logout, tokens)
- **Settings**: Handles application settings and preferences

### Routing
The application uses React Router for navigation. Routes are protected by authentication, redirecting unauthorized users to the login page. The main routes include:
- `/login`: Authentication page
- `/products`: Product management
- `/users`: User management
- `/orders`: Order management
- `/setting`: Application settings
- `/profile`: User profile

A nested routing structure is implemented for the product creation workflow.

## Database Model

### Database Diagram
![Database Model Diagram](path/to/database-diagram.png)

### Table Descriptions

#### Users
Stores administrator user information.
- `id` (INT): Primary key, auto-increment
- `username` (VARCHAR): Unique username, required
- `password_hash` (VARCHAR): Argon2 hashed password, required
- `email` (VARCHAR): Unique email address, required
- `role` (ENUM): User role ('admin', 'manager', 'staff')
- `created_at` (TIMESTAMP): Account creation time
- `last_login` (TIMESTAMP): Last login timestamp

#### Products
Stores product information for various computer components.
- `id` (INT): Primary key, auto-increment
- `name` (VARCHAR): Product name, required
- `type` (ENUM): Product type ('processor', 'motherboard', 'memory', etc.)
- `price` (DECIMAL): Product price, required
- `stock` (INT): Available inventory, minimum 0
- `description` (TEXT): Product description
- `image_url` (VARCHAR): Path to product image

#### Orders
Tracks customer orders.
- `id` (INT): Primary key, auto-increment
- `customer_id` (INT): Foreign key to customers table
- `status` (ENUM): Order status ('pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `total_amount` (DECIMAL): Total order amount
- `created_at` (TIMESTAMP): Order creation time
- `updated_at` (TIMESTAMP): Last update timestamp

#### OrderItems
Stores individual items within orders.
- `id` (INT): Primary key, auto-increment
- `order_id` (INT): Foreign key to orders table
- `product_id` (INT): Foreign key to products table
- `quantity` (INT): Number of items, minimum 1
- `price` (DECIMAL): Price at time of purchase

## Authentication

The application implements JWT-based authentication:
- User credentials are validated against the backend API
- JWT tokens are stored in localStorage for persistence
- Protected routes check authentication state before rendering
- The application automatically attempts to log in using stored credentials

## API Communication

API requests are managed through a configured Axios instance (`src/ui/misch/Axios.ts`). The configuration includes:
- Base URL configuration
- Request/response interceptors
- Authorization header management
- Error handling

### API Endpoints

#### Authentication
- `POST /api/auth/login`: Authenticate user and retrieve JWT token
- `POST /api/auth/logout`: Invalidate session
- `GET /api/auth/profile`: Get current user profile

#### Products
- `GET /api/products`: Get list of products with optional filtering
- `GET /api/products/:id`: Get specific product details
- `POST /api/products`: Create new product
- `PUT /api/products/:id`: Update existing product
- `DELETE /api/products/:id`: Remove product

#### Users
- `GET /api/users`: Get list of users
- `GET /api/users/:id`: Get specific user details
- `POST /api/users`: Create new user
- `PUT /api/users/:id`: Update existing user
- `DELETE /api/users/:id`: Remove user

#### Orders
- `GET /api/orders`: Get list of orders
- `GET /api/orders/:id`: Get specific order details
- `POST /api/orders`: Create new order
- `PUT /api/orders/:id`: Update order status

## Installation Guide

### Development Environment Setup

#### Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Git

#### Installation Steps
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

4. Start the development server:
   ```
   npm run dev
   ```

5. Start Electron:
   ```
   npm run dev:electron
   ```

### Production Build

To create a production build for different platforms:

#### Windows
```
npm run dist:win
```
The command automatically handles transpiling Electron code, building the React UI, and packaging the application for Windows.

#### macOS
```
npm run dist:mac
```
The command automatically handles transpiling Electron code, building the React UI, and packaging the application for macOS.

#### Linux
```
npm run dist:linux
```
The command automatically handles transpiling Electron code, building the React UI, and packaging the application for Linux.

The built application will be available in the `dist` directory.

## Development Workflow

1. Make changes to the source code
2. For changes to Electron code, transpile with:
   ```
   npm run transpile:electron
   ```
3. Run the Vite development server:
   ```
   npm run dev
   ```
4. Launch the Electron application:
   ```
   npm run dev:electron
   ```

## Key Features

1. **Product Management**:
   - Create new computer component products across multiple categories
   - Edit existing products
   - View product details

2. **User Management**:
   - Add and manage admin users
   - User profile editing
   - Role-based access control

3. **Order Management**:
   - View order details
   - Track order status
   - Process orders

4. **Settings**:
   - Application configuration
   - UI preferences 

## Future Development

Potential future enhancements for the application:

1. **Advanced Analytics**: Implement a dashboard with sales statistics and trend analysis
2. **Inventory Management**: Add automatic stock level alerts and reordering functionality
3. **Customer Communication**: Add ability to send order updates and promotional emails
4. **Multi-language Support**: Internationalization for supporting multiple languages
5. **Dark Mode**: Implement a dark theme option for the user interface 