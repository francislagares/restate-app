import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import Search from '@/components/Search';
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

        <Search />

        <View className='my-5'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Featured
            </Text>
            <TouchableOpacity>
              <Text className='font-rubik-bold text-base text-primary-300'>
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FeaturedCard />
      <Filters />
      <Card />
    </SafeAreaView>
  );
}
