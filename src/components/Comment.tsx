import { Image, Text, View } from 'react-native';
import { Models } from 'react-native-appwrite';

import icons from '@/constants/icons';

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View className='flex flex-col items-start'>
      <View className='flex flex-row items-center'>
        <Image source={{ uri: item.avatar }} className='size-14 rounded-full' />
        <Text className='ml-3 text-start font-rubik-bold text-base text-black-300'>
          {item.name}
        </Text>
      </View>

      <Text className='mt-2 font-rubik text-base text-black-200'>
        {item.review}
      </Text>

      <View className='mt-4 flex w-full flex-row items-center justify-between'>
        <View className='flex flex-row items-center'>
          <Image
            source={icons.heart}
            className='size-5'
            tintColor={'#0061FF'}
          />
          <Text className='ml-2 font-rubik-medium text-sm text-black-300'>
            120
          </Text>
        </View>
        <Text className='font-rubik text-sm text-black-100'>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
