# BTC Neobank - Multi-Chain Swap Prototype

A Bitcoin-first, chain-abstracted neobank prototype that allows users to view multi-chain stablecoin balances and swap all funds to BTC in one click.

![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node-20.19.4-339933?logo=node.js)
![Status](https://img.shields.io/badge/Status-Demo-green)

---

## 📁 Project Structure

BTCNeobank/
├── App.js # Main application entry point
├── index.js # Root component 
├── package.json # Dependencies and scripts
├── README.md # This file
├── .gitignore # Git ignore rules
│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── BalanceCard.js # Individual balance card with chain info
│ │ ├── Button.js # Reusable button with variants
│ │ ├── ProgressStep.js # Step indicator for swap progress
│ │ ├── SkeletonLoader.js # Loading placeholder animations
│ │ └── ErrorState.js # Error UI components
│ │
│ ├── screens/ # Main application screens
│ │ ├── BalancesScreen.js # Main balance display screen
│ │ ├── ConfirmationModal.js # Swap confirmation modal
│ │ ├── ProgressModal.js # Multi-step progress tracker
│ │ └── SuccessScreen.js # Transaction success screen
│ │
│ ├── data/ # Mock data and constants
│ │ └── mockData.js # Balance data, BTC info, swap steps
│ │
│ ├── api/ # API layer
│ │ └── mockApi.js # Simulated API functions
│ │
│ └── styles/ # Styling and theming
│ └── theme.js # Design system tokens
│
├── android/ # Android native code
├── ios/ # iOS native code
└── node_modules/ # Dependencies (git-ignored)

---

## 🎯 Features

### Core Features ✅
- ✅ **Multi-Chain Balance View** - Display stablecoin balances across Base, Polygon, and Ethereum
- ✅ **One-Click Swap** - Convert all balances to Bitcoin with a single button
- ✅ **Real-Time Quote** - Fetch swap quotes with exchange rates and fees
- ✅ **Multi-Step Progress** - Visual feedback through 4 stages (Aggregating → Bridging → Swapping → Done)
- ✅ **Success Confirmation** - Detailed transaction summary with BTC received
- ✅ **Responsive Design** - Clean, modern UI that adapts to all screen sizes

### UX Features ✅
- ✅ **Skeleton Loaders** - Animated placeholders during data loading
- ✅ **Error States** - Comprehensive error handling with retry options
- ✅ **Pull-to-Refresh** - Manual balance refresh capability
- ✅ **Loading Indicators** - Clear feedback during async operations
- ✅ **Smooth Animations** - Fade in/out transitions and progress animations

---

## 🚀 Getting Started

### Prerequisites

> **Important**: This project requires specific versions to run correctly.

Make sure you have the following installed:

- **Node.js** `20.19.4` (Required - use nvm to install specific version)
- **npm** or **yarn**
- **React Native CLI** (`npm install -g react-native-cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** (for iOS, macOS only)
- **JDK 17** (for Android)

### Installing Node.js 20.19.4

#### Using NVM (Node Version Manager) - Recommended

**Windows:**

Install nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
Install Node 20.19.4
nvm install 20.19.4

Use Node 20.19.4
nvm use 20.19.4

Verify version
node --version

## 📦 Installation

### Step 1: Clone the Repository

git clone https://github.com/SingothuSrinu/btc-neobank-prototype.git
cd btc-neobank-prototype

### Step 2: Verify Node Version

node --version

Must output: v20.19.4
If not, switch using nvm:
nvm use 20.19.4

### Step 3: Install Dependencies

Using npm
npm install

OR using Yarn
yarn install

### Step 4: Install iOS Dependencies (macOS only)

Navigate to ios folder
cd ios

Install Ruby bundler (first time only)
bundle install

Install CocoaPods dependencies
bundle exec pod install

Return to root
cd ..

---

## 🏃 Running the Application

### Start Metro Bundler

First, start the Metro JavaScript bundler:

Using npm
npm start

OR using Yarn
yarn start

### Run on Android

Open a new terminal window and run:

Using npm
npm run android

OR using Yarn
yarn android

**Prerequisites for Android:**
- Android Studio installed
- Android SDK installed
- Android emulator running OR physical device connected
- USB debugging enabled (for physical device)

### Run on iOS (macOS only)

Open a new terminal window and run:

Using npm
npm run ios

OR using Yarn
yarn ios

**Prerequisites for iOS:**
- Xcode installed (from Mac App Store)
- Xcode Command Line Tools installed
- iOS Simulator running OR physical device connected
- Development provisioning profile (for physical device)

---

## 🎮 How to Use the App

### Complete User Flow

1. **View Balances** (Main Screen)
   - Launch the app
   - See three balance cards: Base (USDC), Polygon (USDT), Ethereum (DAI)
   - Total portfolio value displayed at bottom
   - Pull down to refresh balances

2. **Initiate Swap**
   - Tap "Swap All to BTC" button
   - App fetches swap quote (~1.5 seconds)

3. **Review Quote** (Confirmation Modal)
   - Total USD value being swapped
   - Estimated BTC to receive
   - Exchange rate: 1 BTC = $67,500
   - Network fees: 0.5%
   - Tap "Confirm & Swap" or "Cancel"

4. **Track Progress** (Progress Modal)
   - ✓ Aggregating balances (2 seconds)
   - ✓ Bridging funds (3 seconds)
   - ✓ Swapping to BTC (2.5 seconds)
   - ✓ Done (1 second)
   - Progress bar updates in real-time

5. **View Success** (Success Screen)
   - BTC amount received: ~0.0622 BTC
   - Transaction hash
   - Destination BTC address
   - Complete transaction details
   - Tap "Done" to return

### Expected Timing
- Quote Fetch: ~1.5 seconds
- Total Swap: ~8.5 seconds
- End-to-End: ~10 seconds

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native 0.73 |
| **Language** | JavaScript (ES6+) |
| **Node Version** | 20.19.4 (Required) |
| **State Management** | React Hooks (useState, useEffect) |
| **Styling** | StyleSheet API + Custom Design System |
| **Navigation** | Modal-based |
| **Safe Area** | react-native-safe-area-context |
| **Data** | Mock JSON (simulated APIs) |

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] App launches successfully
- [ ] Balances load with skeleton animation
- [ ] Three balance cards display correctly
- [ ] Total value calculates: $4,201.25
- [ ] "Swap All to BTC" button works
- [ ] Quote loads in ~1.5 seconds
- [ ] Confirmation modal displays correctly
- [ ] Progress steps animate sequentially
- [ ] Success screen shows BTC received
- [ ] "Done" returns to balances
- [ ] Pull-to-refresh works
- [ ] Error states display properly

### Simulated Features

This is a **demo prototype** with simulated functionality:
- Mock balance data (no real blockchain)
- Simulated API calls with delays
- Fixed BTC price: $67,500
- Random transaction hashes
- 10% error rate for testing error handling

---

## 🔧 Troubleshooting

### Common Issues

#### "Node version mismatch" Error

Switch to required version
nvm use 20.19.4

Reinstall dependencies
rm -rf node_modules
npm install

#### Metro Bundler Issues

Clear cache
npm start -- --reset-cache

OR
npx react-native start --reset-cache

#### Android Build Fails

Clean Android build
cd android
./gradlew clean
cd ..

Rebuild
npm run android

#### iOS Build Fails

Clean iOS build
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..

Clean Xcode derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

Rebuild
npm run ios

#### Port 8081 Already in Use

Kill Metro process
npx react-native start --port=8082

OR kill the process manually
lsof -ti:8081 | xargs kill

### Android-Specific Issues

**Gradle daemon issues:**

cd android
./gradlew --stop
cd ..

**ADB not recognized:**

Add to PATH (replace with your SDK location)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

### iOS-Specific Issues

**CocoaPods issues:**
cd ios
sudo gem install cocoapods
pod repo update
pod install
cd ..

**Xcode not opening:**

Open Xcode workspace directly
open ios/BTCNeobank.xcworkspace

---

## 🎨 Design System

### Color PalettePrimary: #21808D // Teal

Background: #FCFCF9 // Cream
Surface: #FFFFFE // White
Text: #13343B // Dark Slate
Success: #21808D // Teal
Error: #C0152F // Red

### Typography

H1: 30px / 600 weight
H2: 24px / 600 weight
H3: 20px / 550 weight
Body: 14px / 400 weight

### Spacing System

xs: 4px sm: 8px md: 16px
lg: 24px xl: 32px xxl: 48px

---

## 📊 Mock Data

### Sample Balance Data

{
chain: 'Base',
token: 'USDC',
amount: 1250.00,
usdValue: 1250.00
}

**Total Portfolio:** $4,201.25 across 3 chains

---

## 🔮 Future Enhancements

- [ ] Real OneBalance API integration
- [ ] Garden Finance swap execution
- [ ] LI.FI bridge integration
- [ ] Transaction history
- [ ] Real-time price feeds
- [ ] Multiple wallet support
- [ ] Biometric authentication
- [ ] Dark mode
- [ ] Push notifications

---

## 📝 Development Notes

### Time Investment
- Planning & Setup: 30 minutes
- Component Development: 3 hours
- Screen Implementation: 2 hours
- Polish & Animations: 1 hour
- Documentation: 30 minutes
- **Total: ~7 hours**

### Architecture Decisions

**Mock APIs:**
- Fast development
- Consistent testing
- Works offline
- Easy to replace

**Modal Navigation:**
- Simple state management
- Clear linear flow
- Minimal dependencies

---

## 🐛 Known Limitations

- Mock data only (no real blockchain)
- No data persistence
- Simulated API delays
- Fixed BTC price ($67,500)
- No transaction history
- Single session only

---

## 📄 License

This project is a demonstration prototype created for technical assessment purposes.

---

## 👨‍💻 Contact

**Developer:** [Your Name]  
**Email:** [your.email@example.com]  
**GitHub:** [github.com/yourusername]  
**LinkedIn:** [linkedin.com/in/yourprofile]

---

## 🙏 Acknowledgments

Built with React Native for [Company Name] Technical Assessment

---

**Last Updated:** November 1, 2025

---

## 📱 Screenshots

> Add screenshots of your running app here after deployment

### Balance Screen
![Balance Screen Placeholder]

### Confirmation Modal
![Confirmation Modal Placeholder]

### Progress Screen
![Progress Screen Placeholder]

### Success Screen
![Success Screen Placeholder]

---

## ⚡ Quick Commands Reference

Install dependencies
npm install

Start Metro
npm start

Run Android
npm run android

Run iOS
npm run ios

Clear cache
npm start -- --reset-cache

Check Node version
node --version # Must be v20.19.4

---

**Built with ❤️ using React Native**