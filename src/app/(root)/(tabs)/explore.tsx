import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/Search';
import icons from '@/constants/icons';
import { useAppwrite } from '@/lib/appwrite/hooks/useAppwrite';
import { getProperties } from '@/lib/appwrite/services/api';

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={item => item.$id}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className='mt-5 text-primary-300' />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='mt-5 flex flex-row items-center justify-between'>
              <TouchableOpacity
                onPress={() => router.back()}
                className='flex size-11 flex-row items-center justify-center rounded-full bg-primary-200'
              >
                <Image source={icons.backArrow} className='size-5' />
              </TouchableOpacity>

              <Text className='mr-2 text-center font-rubik-medium text-base text-black-300'>
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className='h-6 w-6' />
            </View>

            <Search />

            <View className='mt-5'>
              <Filters />

              <Text className='mt-5 font-rubik-bold text-xl text-black-300'>
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;
