# EliteAideFrontend

Elite Aide is an AI-powered task management application built with **React Native**. The project combines intelligent task organization with a modern user interface to enhance productivity.

## Features

- 🤖 AI-Powered Task Creation
- 📋 Task Management & Organization
- 🔍 Real-time Search
- 📅 Calendar Integration
- 🔐 Secure Authentication
- 🎯 Progress Tracking
- 🎤 Voice Input Support

## Git Flow

The project uses the following Git flow structure:

```plaintext
main
│
├── feature/     // New features
│   └── (e.g., AI chat integration, task management)
|
├── api-handling/     // API Integration
│   └── (backend connectivity, data handling)
│
├── bugfix/  // Bug fixes
│   └── (issue resolutions)
│
├── release/1.0.0     // Release preparation
│   ├── feature/
│   ├── bugfix/
|   |── api-handling/
│   └── (final adjustments)
│
└── hotfix/        // Critical fixes
    └── (urgent production fixes)
```

## Project Structure

```plaintext
src/
├── assets/                # Static assets
├── components/           # Reusable components
│   ├── HomePage/
│   │   ├── PinnedTasks
│   │   ├── UpcomingTasks
│   │   └── message
│   └── SearchBar
├── context/            # Context providers
├── navigation/        # Navigation setup
├── screens/          # Application screens
├── types/           # TypeScript definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0
- React Native environment setup

### Step 1: Environment Setup

Complete the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

### Step 2: Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Create .env file
BASE_URL=https://api.eliteaide.tech/
```

### Step 3: Start Metro Server

```bash
# Start Metro
npm start
```

### Step 4: Run Application

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

## Key Features Implementation

### Authentication
- Email/Password login
- OTP verification
- Password reset flow

### Task Management
- AI-powered task creation
- Task categorization
- Priority levels
- Status tracking
- Search functionality

### Calendar Integration
- Date-based task view
- Task scheduling
- Timeline visualization

## Troubleshooting

If you encounter issues:

1. Clear Metro bundler cache:
```bash
npm start -- --reset-cache
```

2. Clean and rebuild:
```bash
# For Android
cd android && ./gradlew clean
cd .. && npm run android

# For iOS
cd ios && pod install
cd .. && npm run ios
```

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript](https://www.typescriptlang.org)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Email: eliteaideio@gmail.com

---

@Priyanka Deshmukh