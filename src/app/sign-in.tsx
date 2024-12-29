import { Redirect } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import icons from '@/constants/icons';
import images from '@/constants/images';
import { useAuthContext } from '@/lib/appwrite/contexts/global-provider';
import { login } from '@/lib/appwrite/services/auth';

const SignIn = () => {
  const { refetch, loading, isLogged } = useAuthContext();

  if (!loading && isLogged) return <Redirect href='/' />;

  const handleLogin = async () => {
    const response = await login();

    if (response) {
      refetch({});
    } else {
      Alert.alert('Failed to log in');
    }
  };

  return (
    <SafeAreaProvider className='h-full bg-white'>
      <ScrollView contentContainerClassName='h-full'>
        <Image
          source={images.onboarding}
          className='h-4/6 w-full'
          resizeMode='contain'
        />

        <View className='px-10'>
          <Text className='text-center font-rubik text-base uppercase text-black-200'>
            Welcome to ReState
          </Text>

          <Text className='mt-2 text-center font-rubik-bold text-3xl text-black-300'>
            Let's Get You Closer to {'\n'}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>

          <Text className='mt-12 text-center font-rubik text-lg text-black-200'>
            Log in to ReState with Google
          </Text>

          <TouchableOpacity
            className='mt-5 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300'
            onPress={handleLogin}
          >
            <View className='flex flex-row items-center justify-center'>
              <Image
                source={icons.google}
                className='h-5 w-5'
                resizeMode='contain'
              />
              <Text className='ml-2 font-rubik-medium text-lg text-black-300'>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SignIn;
