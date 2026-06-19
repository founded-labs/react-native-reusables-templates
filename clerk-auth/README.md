# Clerk Auth Template

This is a [React Native](https://reactnative.dev) project built with [Expo](https://expo.dev), [Clerk](https://go.clerk.com/gjgxNgT), and [React Native Reusables](https://reactnativereusables.com).

It was initialized using the following command, then the `Clerk auth (Nativewind)` template was selected when prompted:

```bash
npx @react-native-reusables/cli@latest init
```

## Getting Started

Before running the app, make sure to:

1. [Set up your Clerk account](https://go.clerk.com/blVsQlm)
2. In the instance setup, leave the default option selected: **Email, phone, username**
3. Enable Apple, GitHub, and Google as sign-in options under SSO Connections
4. Rename `.env.example` to `.env.local` and paste your `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` from [your API keys](https://go.clerk.com/u8KAui7)

Then start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will launch the Expo Go Server. You can open the app with:

- **iOS**: press `i` to launch in the iOS simulator (Mac only)
- **Android**: press `a` to launch in the Android emulator
- **Web**: press `w` to run in a browser

Or scan the QR code with the [Expo Go](https://expo.dev/go) app to test on your device.

## Expo Go and Clerk

This template uses Clerk's JavaScript custom flows so it can run in Expo Go. Clerk's native components and native sign-in hooks require a development build. See Clerk's [Expo quickstart](https://clerk.com/docs/expo/getting-started/quickstart) for the current Expo Go and development build options.

Android Expo Go does not include Clerk's native `ClerkExpo` module. To keep the JavaScript-only flow working in Expo Go, this template includes:

- `shims/clerk-expo-native-module.js`, which exports `null` for Clerk's optional native module.
- The Android-only `resolveRequest` block in `metro.config.js`, which points Clerk's internal `NativeClerkModule` import to that shim.

If you switch this template to a development build, you can remove the Expo Go shim:

1. Delete `shims/clerk-expo-native-module.js`.
2. Remove the `path` import, `expoGoClerkNativeModuleShim`, `resolveRequest`, and `config.resolver.resolveRequest` block from `metro.config.js`.
3. Add Clerk's config plugin to `app.json` if you plan to use Clerk native components or native sign-in APIs:

```json
"plugins": [
  "expo-router",
  "expo-secure-store",
  "expo-web-browser",
  "expo-splash-screen",
  "expo-status-bar",
  "@clerk/expo"
]
```

## Included Screens and Features

- Protected routes using Clerk authentication
- Sign in screen
- OAuth with Apple, GitHub, and Google
- Forgot password screen
- Reset password screen
- Verify email screen
- User profile button
- Sign out screen

## Project Features

- ⚛️ Built with [Expo Router](https://expo.dev/router)
- 🔐 Authentication powered by [Clerk](https://go.clerk.com/Q1MKAz0)
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/) via [Nativewind](https://www.nativewind.dev/)
- 📦 UI powered by [React Native Reusables](https://github.com/founded-labs/react-native-reusables)
- 🚀 New Architecture enabled
- 🔥 Edge to Edge enabled
- 📱 Runs on iOS, Android, and Web

## Learn More

- [Clerk Docs](https://go.clerk.com/Q1MKAz0)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Nativewind Docs](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com)

---

If this template helps you move faster, consider giving [React Native Reusables](https://github.com/founded-labs/react-native-reusables) a ⭐ on GitHub. It helps a lot!
