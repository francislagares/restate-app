import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import icons from '@/constants/icons';
import images from '@/constants/images';

const SignIn = () => {
  const handleLogin = () => {
    // Implement Google login
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
          <Text className='font-rubik text-black-200 text-center text-base uppercase'>
            Welcome to ReState
          </Text>

          <Text className='font-rubik-bold text-black-300 mt-2 text-center text-3xl'>
            Let's Get You Closer to {'\n'}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>

          <Text className='font-rubik text-black-200 mt-12 text-center text-lg'>
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
              <Text className='font-rubik-medium text-black-300 ml-2 text-lg'>
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
