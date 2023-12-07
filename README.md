# Shop Tech Project

## Overview

**Shop Tech** is a simple e-commerce project that combines both backend and frontend components. The backend is built with Node.js using the Express framework, while the frontend utilizes React with Redux for state management. Axios is employed for efficient API communication.

## Features

### User Roles

The project introduces user roles, distinguishing between regular users and administrators. This role-based system influences available functionalities.

### User Authentication

User registration ensures unique identities with securely hashed passwords using bcrypt for enhanced security.

### Admin Privileges

Administrators, with specific roles, are authorized to add new products to the shop. This functionality is accessible via `products/add-product`.

### Product Management

The application provides a simple product management system, allowing administrators to expand the product catalog. Regular users can explore, add to carts, and review purchased items.

### Shopping Cart

Users can utilize a shopping cart feature to add and keep track of selected items before proceeding to checkout.

### Order History

Regular users can view their order history for transparency and record-keeping.

## Usage Guidelines

- **Admin Access:**
  - Ensure your user account has the admin role to access admin privileges.
  - Use admin privileges to add new products.

- **Regular User Actions:**
  - Explore the product catalog.
  - Add items to your shopping cart.
  - Review your order history.

## Contributing

Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. For major changes, please open an issue first to discuss proposed alterations.
