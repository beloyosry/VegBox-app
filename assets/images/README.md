# VegBox Images

This folder contains all images used in the VegBox app.

## Image List

### Categories
- `vegetables.png` - Vegetables category image
- `fruits.png` - Fruits category image
- `chicken.png` - Chicken category image
- `beef.png` - Beef category image
- `protein.png` - Protein/Eggs category image
- `seafood.png` - Seafood category image

### Products
- `chicken-breast.png` - Chicken breast frozen
- `chicken-frozen.png` - Chicken breast frozen (variant)
- `beef-soup.png` - Beef meat soup
- `beef-tenderloin.png` - Australia beef tenderloin
- `eggs.png` - Omega chicken eggs
- `banana.png` - Cavendish baby banana

### Recipes
- `spaghetti.png` - Classic spaghetti bolognese
- `rice-bowl.png` - Quick beef rice bowl
- `salad.png` - Morning healthy salad

### Login Screen
- `login-background.png` - Background image with vegetables for login screen

## Usage

Import images using:
```typescript
import chickenBreast from '@/assets/images/chicken-breast.png';
```

Or use with require:
```typescript
<Image source={require('@/assets/images/chicken-breast.png')} />
```

## Image Requirements

- Format: PNG with transparency where needed
- Size: Optimized for mobile (recommended max 800x800px for products)
- Quality: High quality but compressed for performance
