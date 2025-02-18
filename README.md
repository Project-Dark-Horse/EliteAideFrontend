<div align="center">

# Get More Done with Less Stress – Meet Elite Aide

</div>

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
├── assets/                 # Static assets like images and fonts
├── components/            # Reusable UI components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── navigation/            # Navigation configuration
├── screens/               # Screen components
├── services/              # API and other services
├── theme/                 # Theme configuration
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── App.tsx                # Root component
```

## Getting Started

### Prerequisites
- Node.js >= 14.0.0 [Download Node.js](https://nodejs.org/en/download/)
- Yarn >= 1.22.0 [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- React Native environment setup [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

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
yarn start --reset-cache
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

## Build and Release

### Building the App
To build the app for production, run:
```bash
cd android
./gradlew assembleRelease
```

The APK will be located at:
```bash
android/app/build/outputs/apk/release/app-release.apk
```

### Releasing the App
To release the app, run:
```bash
./gradlew bundleRelease
```

The AAB will be located at:
```bash
android/app/build/outputs/bundle/release/app-release.aab
```

To install the APK on a connected device, run:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
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

### Voice Integration
- Voice input support for task creation and management.
- Example: "I have to buy groceries tomorrow" can be added via voice command.

### Location Access
- Geolocation-based reminders and notifications.
- Example: If you have a task to buy groceries and you are near a store, you will receive a popup: "Do you wanna buy groceries? You are nearby this PDH Groceries store."

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
````
