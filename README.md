
# MovieWorld React App

A modern, responsive movie discovery application built with React and TypeScript. Browse movies, view detailed information, and explore the world of cinema.

## 🎬 Features

- **Movie Browsing**: Browse through a collection of movies with an intuitive interface
- **Movie Details**: Click on any movie to view detailed information including plot, cast, ratings, and more
- **Responsive Design**: Optimized for desktop and mobile viewing
- **TypeScript Support**: Built with TypeScript for better type safety and developer experience
- **Modern React**: Uses React 19.1.0 with modern hooks and functional components

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movieworldapp-react-ts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📱 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🛠️ Technology Stack

- **React 19.1.0** - Frontend library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **React Scripts 5.0.1** - Build tool and development server
- **CSS3** - Styling and responsive design
- **Testing Library** - Component testing utilities

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── MovieDetails.tsx     # Movie details component
├── apiClient.ts         # HTTP client utilities
├── apiService.ts        # API service functions
├── apiEndpoints.ts      # API endpoint definitions
├── index.tsx            # Application entry point
└── index.css            # Global styles

public/
├── index.html           # HTML template
├── background.jpg       # Background image
├── Default_Image.png    # Fallback movie poster
└── ...                  # Other static assets
```

## 🎨 Key Components

### App Component
- Main application container
- Manages movie list state and selected movie
- Handles API calls and error states

### Movie Details
- Displays comprehensive movie information
- Shows poster, plot, cast, ratings, and technical details
- Responsive modal-style layout

### API Service
- Centralized API communication
- Movie fetching and details retrieval
- Error handling and data transformation

## 🌐 API Integration

The app integrates with movie APIs to fetch:
- Movie listings with titles, years, and posters
- Detailed movie information including plot, cast, and ratings
- High-quality movie posters and images

### API Configuration

The API endpoints are configured in `src/apiEndpoints.ts`. The app currently supports:

- **Local Development API**: For testing with local backend


## 🎯 Future Enhancements

- Search functionality
- Movie filtering and sorting
- User favorites and watchlists
- Movie recommendations
- User reviews and ratings

## 🐛 Known Issues

- Check the browser console for any runtime errors
- Ensure API endpoints are accessible
- Some older browsers may require polyfills

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. Please contact the maintainer for contribution guidelines.

---

Built with ❤️ using Create React App and TypeScript.
