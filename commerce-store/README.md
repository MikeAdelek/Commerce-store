
# E-commerce Platform

An Ecommerce platform built with React.js, Framer-Motion, and Tailwind CSS. Features product listing, cart management, checkout process, and responsive design.

## Features

- Product listing with search functionality
- Shopping cart with local storage persistence
- Checkout process with form validation
- Responsive design for all devices
- Dynamic product search

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-store
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the application

## Project Structure

```
├── components/
|   └── User.jsx           # User components
|   ├── Footer.jsx         # Footer component
|   ├── Header.jsx         # Header component
|   ├── Category.jsx       # category component
|   ├── CartPage.jsx       # CartPage component
│   ├── ProductPage.jsx    # Product display component
|   └── ImageCarousel.jsx  # ImageCarousel components
│   └── ant design/        # ant design components
├── pages/
│   ├── Layout.jsx         # layout of the page
│   └── checkout.jsx       # Checkout page
├── store/
│   └── CartContext.jsx    # Cart state management
├── utils/
│   └── validateForm.jsx   # Form validation
└── Admin/
    └── Login.jsx          # Login page
    └── SignUp.jsx         # SignUp page  
```

## Key Components

### Header
The header component is responsible for displaying the logo, navigation menu, and cart icon.

### User
The user component is responsible for displaying user information, such as name, email, and profile picture.

### ProductCard

Displays individual product information:

- Product image
- Title
- Price
- Add to cart button

### CartContext

Manages shopping cart functionality:

- Add/remove items
- Calculate total
- Persist cart data

### Checkout Form

Handles order completion:

- Shipping information
- Form validation
- Order confirmation

## Technologies Used

- React JS
- Tailwind CSS
- Framer-Motion
- Local Storage

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linting
```

### Type Checking

```bash
npm run type-check  # Run TypeScript compiler
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Troubleshooting

Common issues and solutions:

1. Images not loading:
   - Check image paths
   - Verify React js Image component usage

2. Build errors:

   ```bash
   # Clean install dependencies
   npm clean-install
   
   # Remove .next folder and rebuild
   rm -rf .next
   npm run build
   ```

## License

This project is licensed under the MIT License.
