import '@/app/global.css';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import AuthProvider from '@/lib/appwrite/contexts/global-provider';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('@/assets/fonts/Rubik-Bold.ttf'),
    'Rubik-Regular': require('@/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-ExtraBold': require('@/assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Light': require('@/assets/fonts/Rubik-Light.ttf'),
    'Rubik-Medium': require('@/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('@/assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
