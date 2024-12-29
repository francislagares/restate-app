import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import icons from '@/constants/icons';
import { useAuthContext } from '@/lib/appwrite/contexts/global-provider';

export default function Index() {
  const { user } = useAuthContext();

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='px-5'>
        <View className='mt-5 flex flex-row items-center justify-between'>
          <View className='flex flex-row'>
            <Image
              source={{ uri: user?.avatar }}
              className='size-12 rounded-full'
            />

            <View className='ml-2 flex flex-col items-start justify-center'>
              <Text className='font-rubik text-xs text-black-100'>
                Good Morning
              </Text>
              <Text className='font-rubik-medium text-base text-black-300'>
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className='size-6' />
        </View>
      </View>
    </SafeAreaView>
  );
}
