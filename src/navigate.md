# Hero → Collection Page Navigation Guide

## Overview
Your Hero section now seamlessly navigates to the Collection page when users click "View Collection".

## What's New

### 1. **Hover Tooltip on "View Collection" Button**
- When you hover over the "View Collection" button, a tooltip appears
- Shows: "Browse our full collection →"
- Smooth fade-in animation from top
- Premium glassmorphic design matching the site aesthetic

### 2. **Click Navigation**
- Clicking "View Collection" navigates to the full collection page
- Smooth page transition
- Same 3D coin cursor continues across pages

### 3. **Back Navigation**
- Collection page has a "Back to Home" button at the top
- Arrow slides left on hover
- Returns you to the Hero section

## File Structure

### App.jsx (Main Container)
```jsx
import Hero from './Hero';
import CollectionPage from './CollectionPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <div>
      {currentPage === 'home' && <Hero onViewCollection={() => setCurrentPage('collection')} />}
      {currentPage === 'collection' && <CollectionPage onBackToHome={() => setCurrentPage('home')} />}
    </div>
  );
}
```

### How It Works
1. **App.jsx** manages which page is shown using `currentPage` state
2. **Hero.jsx** receives `onViewCollection` prop - calls it when button is clicked
3. **CollectionPage.jsx** receives `onBackToHome` prop - calls it when back button is clicked
4. State changes trigger smooth page transitions

## User Experience Flow

1. User lands on **Hero page**
2. Hovers over "View Collection" → sees tooltip hint
3. Clicks "View Collection" → navigates to Collection page
4. Browses products, filters by category, searches
5. Clicks "Back to Home" → returns to Hero section

## Features

### Hero Page
- 3D rotating 1 rupee coin cursor
- Hover tooltip on "View Collection" button
- Smooth navigation on click
- Same premium dark aesthetic

### Collection Page
- "Back to Home" button (top-left, appears only when navigated from Hero)
- 9 product cards with filters
- Search functionality
- Category tabs
- Same 3D coin cursor
- Same background system

## Alternative Setup (Multiple HTML Pages)

If you prefer separate HTML files instead of SPA:

1. **index.html** → imports Hero.jsx
2. **collection.html** → imports CollectionPage.jsx

Update Hero.jsx:
```javascript
const openCollection = () => {
  window.location.href = '/collection.html';
};
```

Update CollectionPage.jsx:
```javascript
const goBack = () => {
  window.location.href = '/index.html';
};
```

## CSS Features Added

### Tooltip Styles
- Glassmorphic tooltip with backdrop blur
- Animated arrow pointing down
- Smooth fade + slide animation
- Gold border matching site theme

### Back Button Styles
- Subtle hover effect
- Arrow slides left on hover
- Glassmorphic background
- Matches overall design system

All effects use the same 3D transforms, gold gradients, and premium interactions as the rest of your site!
