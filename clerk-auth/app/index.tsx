import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { UserMenu } from '@/components/user-menu';
import { useUser } from '@clerk/clerk-expo';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, XIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const CLERK_LOGO = {
  light: require('@/assets/images/clerk-logo-light.png'),
  dark: require('@/assets/images/clerk-logo-dark.png'),
};

const LOGO_STYLE: ImageStyle = {
  height: 36,
  width: 40,
};

const SCREEN_OPTIONS = {
  header: () => (
    <View className="top-safe absolute left-0 right-0 flex-row justify-between px-4 py-2 web:mx-2">
      <ThemeToggle />
      <UserMenu />
    </View>
  ),
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const { user } = useUser();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="flex-row items-center justify-center gap-3.5">
          <Image
            source={CLERK_LOGO[colorScheme ?? 'light']}
            resizeMode="contain"
            style={LOGO_STYLE}
          />
          <Icon as={XIcon} className="mr-1 size-5" />
          <Image source={LOGO[colorScheme ?? 'light']} style={LOGO_STYLE} resizeMode="contain" />
        </View>
        <View className="max-w-sm gap-2 px-4">
          <Text variant="h1" className="text-3xl font-medium">
            Make it yours{user?.firstName ? `, ${user.firstName}` : ''}.
          </Text>
          <Text className="ios:text-foreground text-center font-mono text-sm text-muted-foreground">
            Update the screens and components to match your design and logic.
          </Text>
        </View>
        <View className="gap-2">
          <Link href="https://go.clerk.com/8e6CCee" asChild>
            <Button size="sm">
              <Text>Explore Clerk Docs</Text>
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button onPress={toggleColorScheme} size="icon" variant="ghost" className="rounded-full">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-6" />
    </Button>
  );
}
