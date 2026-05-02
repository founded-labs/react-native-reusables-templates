import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useSignIn } from '@clerk/expo';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import * as React from 'react';
import { View } from 'react-native';

export function ForgotPasswordForm() {
  const { email: emailParam = '' } = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = React.useState(emailParam);
  const { signIn, fetchStatus } = useSignIn();
  const [error, setError] = React.useState<{ email?: string; password?: string }>({});

  const onSubmit = async () => {
    if (!email) {
      setError({ email: 'Email is required' });
      return;
    }
    if (fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error: createError } = await signIn.create({
        identifier: email,
      });

      if (createError) {
        setError({ email: createError.longMessage ?? createError.message });
        return;
      }

      const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode();

      if (sendCodeError) {
        setError({ email: sendCodeError.longMessage ?? sendCodeError.message });
        return;
      }

      router.push(`/(auth)/reset-password?email=${email}`);
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      setError({ email: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Forgot password?</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={email}
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onChangeText={setEmail}
                onSubmitEditing={onSubmit}
                returnKeyType="send"
              />
              {error.email ? (
                <Text className="text-sm font-medium text-destructive">{error.email}</Text>
              ) : null}
            </View>
            <Button className={cn("w-full", fetchStatus === 'fetching' && 'opacity-50')} onPress={onSubmit}>
              <Text>Reset your password</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
