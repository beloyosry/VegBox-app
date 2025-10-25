# Image Setup Guide for VegBox App

## 📁 Folder Structure

All images should be placed in: `assets/images/`

## 📋 Required Images List

### Categories (6 images)
1. **vegetables.png** - Broccoli or mixed vegetables
2. **fruits.png** - Bananas or mixed fruits
3. **chicken.png** - Raw chicken pieces
4. **beef.png** - Raw beef cuts
5. **protein.png** - Eggs in carton
6. **seafood.png** - Lobster or mixed seafood

### Products (6 images)
1. **chicken-breast.png** - Chicken breast pieces
2. **chicken-frozen.png** - Frozen chicken in packaging
3. **beef-soup.png** - Beef cuts for soup
4. **beef-tenderloin.png** - Premium beef tenderloin
5. **eggs.png** - Omega eggs in carton
6. **banana.png** - Baby bananas

### Recipes (3 images)
1. **spaghetti.png** - Spaghetti bolognese dish
2. **rice-bowl.png** - Beef rice bowl
3. **salad.png** - Fresh healthy salad

### Login Screen (1 image)
1. **login-background.png** - Vegetables/food background (should be light/transparent)

## 📐 Image Specifications

### Recommended Sizes
- **Category images**: 400x400px
- **Product images**: 600x600px
- **Recipe images**: 400x300px
- **Login background**: 800x600px

### Format
- **Format**: PNG (with transparency where needed)
- **Quality**: High quality but optimized for mobile
- **File size**: Keep under 500KB per image

### Style Guidelines
- Use bright, appetizing food photography
- Clean backgrounds (white or transparent)
- Good lighting and sharp focus
- Professional product photography style

## 🔄 How Images Are Used

The app now uses local images instead of URLs. Here's how they're referenced:

```typescript
// In mock-data.ts
image: images.products.chickenBreast  // Local image
// Instead of:
image: "https://..." // URL
```

## ✅ After Adding Images

1. Place all PNG files in `assets/images/` folder
2. Make sure filenames match exactly (case-sensitive):
   - vegetables.png
   - fruits.png
   - chicken.png
   - etc.

3. Restart the development server:
```bash
npm start
```

4. Clear cache if images don't appear:
```bash
npx expo start -c
```

## 🎨 Where to Get Images

### Free Stock Photo Sites
- **Unsplash**: https://unsplash.com (search for food items)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

### Search Terms
- "fresh vegetables"
- "raw chicken breast"
- "beef tenderloin"
- "omega eggs"
- "baby banana"
- "spaghetti bolognese"
- "food ingredients"

## 🚨 Important Notes

1. **Copyright**: Only use images you have rights to use
2. **Optimization**: Compress images before adding (use TinyPNG or similar)
3. **Naming**: Use exact filenames as listed above
4. **Format**: PNG format is required for transparency support

## 🔍 Troubleshooting

### Images not showing?
1. Check filename spelling (case-sensitive)
2. Ensure files are in `assets/images/` folder
3. Restart expo server with cache clear: `npx expo start -c`
4. Check file format is PNG

### App crashes after adding images?
1. Check image file sizes (should be under 500KB each)
2. Ensure images are valid PNG files
3. Try restarting the development server

## 📝 Current Image Usage

The app is configured to use local images for:
- ✅ All category cards
- ✅ All product cards and details
- ✅ All recipe cards
- ✅ Login screen background

No internet connection needed for images once they're added!
