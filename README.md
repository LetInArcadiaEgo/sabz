# Sabz Real Estate Platform

## 📋 Project Overview

**Sabz** is a modern, comprehensive real estate platform specifically designed for buying and selling properties in Lahore, Pakistan. Built with React and Firebase, this application provides a seamless user experience for property owners to list their properties and for potential buyers to discover and explore real estate options.

### 🎯 Key Features

- **Property Listings**: Browse and search through available properties
- **Multi-step Listing Creation**: Guided property submission process
- **Property Management**: Edit and manage existing listings
- **Interactive Property Details**: Comprehensive property information pages
- **Mobile-First Design**: Responsive design with bottom navigation
- **Image Management**: Upload, organize, and display property photos
- **Real-time Data**: Firebase integration for live data synchronization

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.4.0** - Client-side routing
- **CSS Modules** - Scoped styling approach
- **Inter Font** - Modern, professional typography

### Backend & Database
- **Firebase 11.6.0** - Backend-as-a-Service platform
  - **Firestore** - NoSQL document database
  - **Firebase Authentication** - User authentication system
  - **Firebase Storage** - File storage for property images
- **React Firebase Hooks 5.1.1** - React hooks for Firebase

### UI/UX Libraries
- **React Icons 5.5.0** - Comprehensive icon library
- **Tabler Icons React 3.31.0** - Additional icon set
- **React Confetti 6.4.0** - Success animations
- **Embla Carousel React 8.6.0** - Image carousel component

### Drag & Drop
- **@dnd-kit/core 6.3.1** - Modern drag and drop library
- **@dnd-kit/sortable 10.0.0** - Sortable components
- **@dnd-kit/utilities 3.2.2** - Utility functions

### Mobile Interactions
- **HammerJS 2.0.8** - Touch gesture library

## 📁 Project Structure

```
realestateproject/
├── public/                          # Static assets
│   ├── images/                      # Property and branding images
│   │   ├── house1.jpg              # Sample property images
│   │   ├── house2.jpeg
│   │   ├── house3.jpg
│   │   ├── house4.jpg
│   │   ├── Sabz_Logo_WhiteBG_transparent.png
│   │   └── sabz_minimal2.png
│   ├── index.html                   # Main HTML template
│   ├── manifest.json               # PWA manifest
│   └── robots.txt                  # Search engine directives
│
├── src/                            # Source code
│   ├── App.js                      # Main application component
│   ├── index.js                    # Application entry point
│   ├── setupTests.js               # Test configuration
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Shared components
│   │   │   ├── Button/             # Button components
│   │   │   │   ├── ExitButton.jsx          # Modal/flow exit button
│   │   │   │   └── NavigationButtons.jsx   # Previous/Next navigation
│   │   │   ├── Counter/            # Numeric input counter
│   │   │   ├── EditModal/          # Modal for editing
│   │   │   └── PhotoManager/       # Drag-and-drop photo management
│   │   ├── layout/                 # Layout components
│   │   │   ├── BottomNav/          # Mobile bottom navigation
│   │   │   ├── Footer/             # Page footer
│   │   │   └── Navbar/             # Top navigation bar
│   │   ├── ListingCard/            # Property card component
│   │   │   ├── ImageCarousel.jsx   # Multi-image carousel
│   │   │   └── ListingCard.jsx     # Individual property card
│   │   └── Search/                 # Search component
│   │
│   ├── config/                     # Configuration files
│   │   └── firebase.js             # Firebase configuration
│   │
│   ├── features/                   # Feature-specific components
│   │   ├── listing-create/         # Property creation flow
│   │   │   ├── intro/              # Introduction screen
│   │   │   ├── step1/              # Basic property information
│   │   │   │   ├── Address.jsx     # Address input
│   │   │   │   ├── Amenities.jsx   # Property amenities
│   │   │   │   ├── BasicInfo.jsx   # Bedrooms, bathrooms, etc.
│   │   │   │   └── PropType.jsx    # Property type selection
│   │   │   └── step2/              # Detailed information
│   │   │       ├── Description.jsx # Property description
│   │   │       ├── Photos.jsx      # Photo upload
│   │   │       ├── Price.jsx       # Pricing information
│   │   │       ├── Publish.jsx     # Final review and publish
│   │   │       ├── Success.jsx     # Success confirmation
│   │   │       └── Title.jsx       # Property title
│   │   ├── listing-edit/           # Property editing functionality
│   │   │   ├── EditCards/          # Individual edit components
│   │   │   │   ├── 01_PhotosCard/
│   │   │   │   ├── 02_PriceCard/
│   │   │   │   ├── 03_TitleCard/
│   │   │   │   ├── 04_PropertyTypeCard/
│   │   │   │   ├── 05_BasicInfoCard/
│   │   │   │   ├── 06_LocationCard/
│   │   │   │   └── 07_AmenitiesCard/
│   │   │   └── EditListing.jsx     # Main edit page
│   │   └── my-listings/            # User's property management
│   │       └── MyListings.jsx      # Dashboard for user properties
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useListings.js          # Data fetching for listings
│   │   └── useScrollVisibility.js  # Scroll-based UI visibility
│   │
│   ├── pages/                      # Main page components
│   │   ├── home/                   # Homepage
│   │   │   └── HomePage.jsx        # Main landing page
│   │   └── listing/                # Individual property page
│   │       ├── components/         # Property page components
│   │       │   ├── ListingContact/
│   │       │   ├── ListingDescription/
│   │       │   ├── ListingFeatures/
│   │       │   ├── ListingHeader/
│   │       │   ├── ListingImage/
│   │       │   ├── ListingInfoGrid/
│   │       │   ├── ListingMainInfo/
│   │       │   └── ListingStatus/
│   │       └── ListingPage.jsx     # Main property detail page
│   │
│   ├── styles/                     # Global styles
│   │   └── global.css              # Global CSS with Inter font
│   │
│   └── utils/                      # Utility functions
│       └── firestore.js            # Firestore database operations
│
├── package.json                    # Project dependencies and scripts
├── package-lock.json              # Locked dependency versions
└── README.md                      # This documentation file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Firebase project with Firestore, Authentication, and Storage enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd realestateproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Architecture & Design Patterns

### Component Architecture

The application follows a **feature-based** architecture with clear separation of concerns:

- **Pages**: Top-level route components
- **Features**: Business logic grouped by functionality
- **Components**: Reusable UI components
- **Hooks**: Custom hooks for data fetching and state management

### State Management

- **Local State**: React's `useState` for component-specific state
- **Custom Hooks**: Centralized data fetching logic
- **Firebase Real-time**: Live data synchronization

### Styling Approach

- **CSS Modules**: Scoped styling to prevent conflicts
- **Consistent Design System**: Shared styles and components
- **Mobile-First**: Responsive design starting from mobile

## 🏠 Core Features Breakdown

### 1. Property Browsing (Homepage)

**Location**: `src/pages/home/HomePage.jsx`

- **Functionality**: Displays all available properties in a grid layout
- **Components Used**:
  - `Search` - Property search functionality
  - `ListingCard` - Individual property preview cards
- **Data Source**: Firebase Firestore via `useListings` hook

### 2. Property Creation Flow

**Location**: `src/features/listing-create/`

A **guided 9-step process** for creating property listings:

#### Step 1: Basic Property Information (4 screens)
1. **Property Type** (`PropType.jsx`) - House, Flat, Room, etc.
2. **Basic Info** (`BasicInfo.jsx`) - Bedrooms, bathrooms, area
3. **Address** (`Address.jsx`) - Location details
4. **Amenities** (`Amenities.jsx`) - Property features

#### Step 2: Detailed Information (5 screens)
1. **Photos** (`Photos.jsx`) - Image upload with drag-and-drop
2. **Title** (`Title.jsx`) - Property title
3. **Description** (`Description.jsx`) - Detailed description
4. **Price** (`Price.jsx`) - Pricing information
5. **Publish** (`Publish.jsx`) - Final review and submission

**Success Page**: Confirmation with celebration animation

### 3. Property Management

**Location**: `src/features/my-listings/MyListings.jsx`

- **Dashboard**: Overview of user's listed properties
- **Actions**: Edit, View, Share individual listings
- **Navigation**: Direct access to editing interface

### 4. Property Editing

**Location**: `src/features/listing-edit/`

**Modular editing system** with dedicated cards for each property aspect:
1. **Photos Card** - Image management
2. **Price Card** - Pricing updates
3. **Title Card** - Title editing
4. **Property Type Card** - Type modifications
5. **Basic Info Card** - Room and area details
6. **Location Card** - Address updates
7. **Amenities Card** - Feature management

### 5. Property Detail Page

**Location**: `src/pages/listing/ListingPage.jsx`

**Comprehensive property information** including:
- **Image Gallery**: Multiple property photos
- **Property Details**: Price, location, features
- **Description**: Detailed property information
- **Contact Information**: Owner contact details
- **Status Indicators**: Availability status

## 🎨 UI/UX Design System

### Design Principles

1. **Mobile-First**: Optimized for mobile devices with responsive design
2. **Clean Interface**: Minimal, uncluttered design
3. **Intuitive Navigation**: Clear user flow and navigation
4. **Professional Branding**: Consistent Sabz brand identity

### Key UI Components

#### Navigation
- **Top Navbar**: Logo and tagline
- **Bottom Navigation**: Home, Submit, My Listings (mobile-optimized)
- **Scroll Visibility**: Smart hiding/showing based on scroll direction

#### Interactive Elements
- **Drag-and-Drop**: Photo management with visual feedback
- **Touch Gestures**: Mobile-optimized interactions
- **Loading States**: User feedback during data operations
- **Success Animations**: Engaging confirmation experiences

#### Visual Design
- **Typography**: Inter font family for modern, readable text
- **Color Scheme**: Professional green (Sabz = Green in Urdu)
- **Card-Based Layout**: Consistent card design throughout
- **Image Carousels**: Smooth image browsing experience

## 🔧 Custom Hooks

### `useListings`
**Location**: `src/hooks/useListings.js`

Manages property data fetching:
- `useListings()` - Fetches all properties
- `useListing(id)` - Fetches single property by ID
- Returns: `{ listings/listing, loading, error }`

### `useScrollVisibility`
**Location**: `src/hooks/useScrollVisibility.js`

Controls UI element visibility based on scroll:
- Hides/shows bottom navigation during scroll
- Enhances user experience by maximizing content space

## 🗃 Data Management

### Firebase Integration

#### Firestore Database
**Location**: `src/utils/firestore.js`

**Core Operations**:
- `getListings()` - Fetch all property listings
- `getListing(id)` - Fetch single property
- `addListing(data)` - Create new property listing

**Data Structure** (Property Document):
```javascript
{
  id: "unique_id",
  title: "Property Title",
  description: "Property Description", 
  price: 2500000, // Price in PKR
  propertyType: {
    place: "House",
    type: "Entire place"
  },
  basicInfo: {
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 2500,
    areaUnit: "Sq Ft"
  },
  address: {
    street: "Street Address",
    city: "Lahore",
    state: "Punjab", 
    country: "Pakistan"
  },
  amenities: ["power", "gas", "internet"],
  images: ["url1", "url2", "url3"],
  locationDetails: "Area, City",
  squareFootage: "2500 sqft",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Authentication
- Google Authentication integration
- User session management
- Protected routes for listing management

#### Storage
- Image upload and management
- Optimized image delivery
- Secure file access

## 🛣 Routing Structure

The application uses **React Router DOM** for navigation:

```
/ (Home)
├── /property/:id (Property Details)
├── /my-listings (User Dashboard)
├── /my-listings/edit/:id (Edit Property)
└── /listing-flow (Property Creation)
    ├── /step-1/
    │   ├── /1_proptype
    │   ├── /2_basicinfo
    │   ├── /3_address
    │   └── /4_amenities
    ├── /step-2/
    │   ├── /intro
    │   ├── /1_photos
    │   ├── /title
    │   ├── /description
    │   ├── /price
    │   └── /publish
    └── /success
```

### Navigation Logic

- **Conditional Navigation**: Different navigation elements for different routes
- **Flow Protection**: Prevents users from jumping steps in creation flow
- **Back Navigation**: Consistent back button behavior
- **Auto-scroll**: Automatic scroll to top on route changes

## 📱 Mobile Optimization

### Responsive Design
- **Breakpoint-based**: Optimized for different screen sizes
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Performance**: Optimized images and lazy loading

### Bottom Navigation
- **Three Main Actions**: Home, Submit Property, My Listings
- **Visual Feedback**: Active state indication
- **Scroll Behavior**: Auto-hide during content browsing

## 🧪 Available Scripts

- **`npm start`** - Development server (localhost:3000)
- **`npm build`** - Production build
- **`npm test`** - Run test suite
- **`npm eject`** - Eject from Create React App (irreversible)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms
- **Firebase Hosting** (recommended for Firebase integration)
- **Netlify**
- **Vercel**
- **Traditional web servers**

### Environment Variables Required
```env
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

## 🔮 Future Enhancements

### Planned Features
- **Advanced Search**: Filters by price, location, property type
- **User Profiles**: Enhanced user management and preferences
- **Messaging System**: Direct communication between buyers and sellers
- **Map Integration**: Property location visualization
- **Payment Integration**: Online payment processing
- **Reviews & Ratings**: Property and user review system
- **Real Estate Analytics**: Market insights and trends

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Offline Support**: PWA capabilities
- **Real-time Chat**: WebSocket integration
- **Advanced Image Processing**: Automatic optimization and resizing
- **SEO Optimization**: Meta tags and structured data

## 🐛 Known Issues & Limitations

### Current Limitations
- **Mock Data**: Some components use placeholder data
- **Basic Authentication**: Limited user management features
- **Image Storage**: Local images in development
- **Search Functionality**: Basic search implementation

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **JavaScript Required**: Application requires JavaScript enabled

## 🤝 Contributing

### Development Guidelines
1. Follow existing code structure and naming conventions
2. Use CSS Modules for styling
3. Implement proper error handling
4. Write meaningful commit messages
5. Test on multiple devices and browsers

### Code Style
- **JavaScript**: ES6+ features, functional components
- **CSS**: CSS Modules with BEM-like naming
- **File Organization**: Feature-based structure
- **Comments**: Clear documentation for complex logic

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙋‍♂️ Support

For questions, issues, or feature requests, please contact the development team.

---

**Sabz Real Estate Platform** - Making property transactions simple and transparent in Lahore, Pakistan. 🏠💚
