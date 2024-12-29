import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthContext } from '@/lib/appwrite/contexts/global-provider';

const AppLayout = () => {
  const { loading, isLogged } = useAuthContext();

  if (loading) {
    return (
      <SafeAreaView className='flex h-full items-center justify-center bg-white'>
        <ActivityIndicator size='large' className='text-primary-300' />
      </SafeAreaView>
    );
  }

  if (!isLogged) {
    return <Redirect href='/sign-in' />;
  }

  return <Slot />;
};

export default AppLayout;
