# node_assigment

#Shop Tech Project
Overview
Shop Tech is a straightforward project that combines both backend and frontend development. It leverages Node.js with Express for the backend and React with Redux for the frontend. The communication between the frontend and backend is handled through Axios, facilitating seamless API calls.

#Features
User Roles
The project introduces the concept of user roles, distinguishing between regular users and administrators (admins). This role-based system influences the functionalities available to different users.

User Authentication
User registration is a fundamental aspect of the system, ensuring that users have unique identities within the application. Passwords are securely hashed using bcrypt for enhanced security.

Admin Privileges
A key feature is the admin role, which grants specific privileges. Only users with the admin role are authorized to add new products to the shop. This functionality is accessible via the endpoint products/add-product.

Product Management
The application provides a simple product management system, allowing admins to expand the product catalog by adding new items. Regular users can explore the available products, add them to their carts, and review previously purchased items.

Shopping Cart
Users, regardless of their roles, can utilize a shopping cart feature. They can add products to their carts, providing a convenient way to keep track of selected items before proceeding to checkout.

Order History
For regular users, there is a straightforward order history feature. Users can view their previous orders, enhancing transparency and providing a record of their interactions with the platform.

Usage Guidelines
Admin Access:

To access admin privileges, ensure that your user account has been assigned the admin role.
Use the admin role to add new products to the shop.
Regular User Actions:

Explore the product catalog.
Add items to your shopping cart.
Review your order history.
Contributing
Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. For major changes, please open an issue first to discuss proposed alterations.
