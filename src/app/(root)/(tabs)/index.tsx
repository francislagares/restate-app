import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import NoResults from '@/components/NoResults';
import Search from '@/components/Search';
import icons from '@/constants/icons';
import { useAuthContext } from '@/lib/appwrite/contexts/global-provider';
import { useAppwrite } from '@/lib/appwrite/hooks/useAppwrite';
import {
  getLatestProperties,
  getProperties,
} from '@/lib/appwrite/services/api';

const Home = () => {
  const { user } = useAuthContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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

              {latestPropertiesLoading ? (
                <ActivityIndicator size='large' className='text-primary-300' />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={item => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName='flex gap-5 mt-5'
                />
              )}
            </View>

            {/* <Button title="seed" onPress={seed} /> */}

            <View className='mt-5'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='font-rubik-bold text-xl text-black-300'>
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className='font-rubik-bold text-base text-primary-300'>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
