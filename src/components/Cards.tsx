import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Models } from 'react-native-appwrite';

import icons from '@/constants/icons';
import images from '@/constants/images';

interface FeatruredCardProps {
  item: Models.Document;
  onPress: () => void;
}

export const FeaturedCard = ({ item, onPress }: FeatruredCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='item-start relative flex h-80 w-60 flex-col'
    >
      <Image source={images.japan} className='size-full rounded-2xl' />
      <Image
        source={images.cardGradient}
        className='absolute bottom-0 size-full rounded-2xl'
      />

      <View className='absolute right-5 top-5 flex flex-row items-center rounded-full bg-white/90 px-3 py-1.5'>
        <Image source={icons.star} className='size-3.5' />
        <Text className='ml-1 font-rubik-bold text-xs text-primary-300'>
          {item.rating}
        </Text>
      </View>

      <View className='absolute inset-x-5 bottom-5 flex flex-col items-start'>
        <Text
          className='font-rubik-extrabold text-xl text-white'
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className='font-rubik text-base text-white' numberOfLines={1}>
          {item.address}
        </Text>

        <View className='flex w-full flex-row items-center justify-between'>
          <Text className='font-rubik-extrabold text-xl text-white'>
            ${item.price}
          </Text>
          <Image source={icons.heart} className='size-5' />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = () => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  );
};
