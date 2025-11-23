# Firebase Auth Expo App

A complete React Native app built with Expo Router and Firebase Authentication, supporting Email/Password and Google Sign-In.

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

**Required packages:**
```bash
npm install firebase expo-auth-session expo-constants expo-crypto expo-web-browser @react-native-async-storage/async-storage
```

### 2. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Sign-in methods:
   - Enable **Email/Password**
   - Enable **Google**

#### Get Firebase Config

1. Go to Project Settings → General
2. Under "Your apps", click "Web" (</> icon)
3. Register your app
4. Copy the `firebaseConfig` object

#### Add Firebase Config

Open `src/firebase/firebaseConfig.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Google Sign-In Setup

#### Get OAuth Client IDs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (or create credentials)
3. Navigate to **APIs & Services** → **Credentials**
4. Create OAuth 2.0 Client IDs:

   **For Web:**
   - Application type: **Web application**
   - Add authorized redirect URIs:
     - `https://auth.expo.io/@YOUR_EXPO_USERNAME/firebase-auth-app`
   - Copy the **Client ID**

   **For Android (optional for Expo Go):**
   - Application type: **Android**
   - Package name: `com.yourcompany.firebaseauth` (from app.json)
   - SHA-1: Get from `expo credentials:manager`

   **For iOS (optional for Expo Go):**
   - Application type: **iOS**
   - Bundle ID: `com.yourcompany.firebaseauth` (from app.json)

#### Add Client IDs to Environment

Create a `.env` file or use `app.json` extra config:

**Option 1: Using app.json (Recommended for Expo)**

Add to `app.json`:
```json
{
  "expo": {
    "extra": {
      "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID": "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
      "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID": "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
      "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID": "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com"
    }
  }
}
```

Then access via:
```typescript
import Constants from 'expo-constants';
const webClientId = Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
```

**Option 2: Direct in firebaseConfig.ts (for testing)**

Update `src/firebase/firebaseConfig.ts`:
```typescript
export const GOOGLE_WEB_CLIENT_ID = "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";
```

### 4. Update Redirect URI

In `app/auth/login.tsx` and the Google Auth setup, make sure your redirect URI matches what you configured in Google Cloud Console.

For Expo Go, use: `https://auth.expo.io/@YOUR_EXPO_USERNAME/firebase-auth-app`

For standalone apps, use your custom scheme: `firebaseauth://`

## 🏃 Running the App

### Development

```bash
# Start Expo
npm start

# Run on specific platform
npm run web
npm run ios
npm run android
```

### Important Notes

- **Web:** Google Sign-In works out of the box with Web Client ID
- **Expo Go:** Works with proper configuration in Google Cloud Console
- **Standalone builds:** Requires platform-specific Client IDs

## 📁 Project Structure

```
FirebaseAuth/
├── app/
│   ├── _layout.tsx              # Root layout with AuthProvider
│   ├── index.tsx                # Auto-redirect based on auth state
│   ├── home.tsx                 # Protected home screen
│   └── auth/
│       ├── login.tsx            # Login screen
│       ├── signup.tsx           # Signup screen
│       └── password-reset.tsx   # Password reset screen
├── src/
│   ├── firebase/
│   │   └── firebaseConfig.ts    # Firebase initialization
│   ├── context/
│   │   └── AuthContext.tsx      # Auth state & methods
│   ├── components/
│   │   ├── AuthForm.tsx         # Reusable auth form components
│   │   └── LoadingScreen.tsx    # Loading indicator
│   ├── hooks/
│   │   └── useAuth.ts           # Auth context hook
│   └── utils/
│       └── firebaseHelpers.ts   # Firebase helper functions
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

## 🔑 Features

- ✅ Email/Password Authentication
- ✅ Google Sign-In (Web & Mobile)
- ✅ Password Reset
- ✅ Protected Routes
- ✅ Persistent Auth State
- ✅ Error Handling
- ✅ TypeScript
- ✅ Modern UI with Loading States
- ✅ Works on Web, iOS, and Android

## 🔒 Security Notes

1. **Never commit sensitive data:**
   - Add `.env` to `.gitignore`
   - Use environment variables for production
   - Keep Firebase config secure

2. **Firebase Security Rules:**
   - Configure Firestore/Storage rules in Firebase Console
   - Restrict access based on auth state

3. **OAuth Client IDs:**
   - Keep Client IDs secure
   - Use different IDs for development and production

## 🐛 Troubleshooting

### Google Sign-In not working

1. Verify Client ID is correct
2. Check redirect URI matches Google Cloud Console
3. Ensure Google Sign-In is enabled in Firebase Console
4. For web, check that the domain is authorized

### "Auth state undefined"

1. Check Firebase config is correct
2. Verify Firebase project is active
3. Check network connection

### Build errors

1. Clear cache: `expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Expo SDK compatibility

## 📚 Resources

- [Expo Router Docs](https://docs.expo.dev/routing/introduction/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google Sign-In](https://docs.expo.dev/guides/google-authentication/)

## 📝 License

MIT
