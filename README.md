<img src="https://github.com/Project-Dark-Horse/EliteAideFrontend/blob/main/src/assets/bot.png" alt="logo" title="Elite Aide" width="80"/>

# Elite Aide 

Elite Aide is an AI-powered task management application built with **React Native**. The project combines intelligent task organization with a modern user interface to enhance productivity.

## Features

- 🤖 AI-Powered Task Creation
- 📋 Task Management & Organization
- 🔍 Real-time Search
- 📅 Calendar Integration
- 🔐 Secure Authentication
- 🎯 Progress Tracking
- 🎤 Voice Input Support
- 📍 Geolocation
  


  <img src="https://github.com/user-attachments/assets/74ca8ffa-7b32-420c-86b3-4d1f9691bec5" alt="User-Flow" width="1279">
  

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
- Yarn >= 1.22.0
- React Native environment setup

### Step 1: Environment Setup

Complete the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

### Step 2: Installation

```bash
# Clone repository
git clone https://github.com/Project-Dark-Horse/EliteAideFrontend.git

# Install dependencies
yarn install

# Create .env file
BASE_URL=https://api.eliteaide.tech/
```

### Step 3: Start Metro Server

```bash
# Start Metro
yarn start
```

### Step 4: Run Application

For Android:
```bash
yarn android
```

For iOS:
```bash
yarn ios
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
yarn start --reset-cache
```

2. Clean and rebuild:
```bash
# For Android
cd android && ./gradlew clean
cd .. && yarn android

# For iOS
cd ios && pod install
cd .. && yarn ios
```

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript](https://www.typescriptlang.org)

## Contributing to EliteAideFrontend

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Add feature_name'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open a Pull Request




We love contributions from the community! Contributing isn’t just about code, you can help out by suggesting new features, enhancing documentation, and much more.

### How to Contribute
1. **Fork the repository** on GitHub.
2. **Clone** the project to your own machine.
3. **Commit changes** to your own branch: git commit -m 'Add some feature'
4. **Push** your work back up to your fork.
5. Submit a **Pull request** so that we can review your changes

### Code of Conduct
This project and everyone participating in it is governed by the [EliteAide Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Issue and Feature Request
- Please search for existing issues before creating a new one.
- Use the provided templates for new issues and feature requests.

### License
This project is licensed under the [MIT License](LICENSE.txt).

### Acknowledgements
- Thanks to all the contributors who’ve helped build EliteAide.


## Contact

Email: eliteaideio@gmail.com

---
