# VegBox Quick Start Guide

## 🚀 Run the App

1. **Install dependencies** (already done):

```bash
npm install
```

2. **Start the development server**:

```bash
npm start
```

3. **Choose your platform**:
    - Press `i` for iOS simulator
    - Press `a` for Android emulator
    - Press `w` for web browser
    - Scan QR code with Expo Go app on your phone

## 🔐 Login Credentials

```
Phone Number: 012345678910
Password: 123456
```

## 🎯 Testing the App

### 1. Login Flow

-   Open the app → You'll see the login screen
-   Enter credentials: `012345678910` / `123456`
-   Click "Login" button
-   You'll be redirected to the home screen

### 2. Browse Products

-   **Home Screen**: View categories, flash sales, and today's specials
-   **Categories Tab**: Browse all product categories
-   Tap on any product to view details

### 3. Add to Cart

-   On product detail screen, adjust quantity
-   Click "Add to Cart"
-   Cart icon in bottom navigation shows item count

### 4. Manage Cart

-   Tap cart icon in bottom navigation
-   Select items using checkboxes
-   Adjust quantities with +/- buttons
-   View total price for selected items

### 5. Checkout

-   Select items in cart
-   Click "Checkout" button
-   Order confirmation will appear
-   Selected items are removed from cart

### 6. Profile

-   View user information
-   Logout option available

## 📱 App Features

### Screens

1. **Login** - Authentication with validation
2. **Home** - Product discovery with categories and sales
3. **Categories** - Grid view of all categories
4. **Product Detail** - Full product information
5. **Cart** - Shopping cart management
6. **Orders** - Order history (placeholder)
7. **Profile** - User profile and settings

### Key Functionality

-   ✅ Login/Logout
-   ✅ Browse products by category
-   ✅ View product details
-   ✅ Add/remove items from cart
-   ✅ Update quantities
-   ✅ Select items for checkout
-   ✅ Place orders
-   ✅ Loading states with 1s delay
-   ✅ Error handling
-   ✅ Form validation

## 🛠️ Technical Stack

-   **React Native** - Mobile framework
-   **TypeScript** - Type safety
-   **Expo Router** - Navigation
-   **Zustand** - State management
-   **TanStack Query** - Data fetching
-   **Axios** - HTTP client

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── config/         # API configuration
├── constants/      # Colors, spacing, etc.
├── data/           # Mock data
├── hooks/          # Custom hooks
├── providers/      # Context providers
├── services/       # API services
├── store/          # Zustand stores
└── types/          # TypeScript types
```

## 🎨 Design Features

-   **Dynamic Color System** - Centralized theme
-   **Responsive Layout** - Works on all screen sizes
-   **Clean UI** - Modern, user-friendly design
-   **Smooth Animations** - Native feel
-   **Loading States** - User feedback
-   **Error Handling** - Graceful error messages

## 🔄 Mock API Simulation

All API calls have a 1-second delay to simulate real network behavior:

-   Login: 1s delay
-   Product fetching: 1s delay
-   Order creation: 1.5s delay

## 💡 Tips

1. **Test Different Credentials**: Try wrong credentials to see error handling
2. **Add Multiple Items**: Test cart with various products
3. **Quantity Management**: Increase/decrease quantities in cart
4. **Select/Deselect**: Use checkboxes to manage checkout items
5. **Navigation**: Explore all tabs and screens

## 🐛 Troubleshooting

### App won't start?

```bash
# Clear cache and restart
npx expo start -c
```

### Dependencies issue?

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Simulator not opening?

-   Make sure Xcode (iOS) or Android Studio is installed
-   Check that simulators/emulators are set up

## 📞 Support

For issues or questions, check:

-   PROJECT_README.md for detailed documentation
-   Expo documentation: https://docs.expo.dev
-   React Native docs: https://reactnative.dev

---

**Enjoy exploring VegBox! 🥬🛒**
