import { Stack } from 'expo-router';

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function SignUpLayout() {
  return <Stack screenOptions={SCREEN_OPTIONS} />;
}
