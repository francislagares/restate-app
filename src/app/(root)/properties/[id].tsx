import { router, useLocalSearchParams } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Comment from '@/components/Comment';
import { facilities } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { useAppwrite } from '@/lib/appwrite/hooks/useAppwrite';
import { getProperty } from '@/lib/appwrite/services/api';

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get('window').height;

  const { data: property } = useAppwrite({
    fn: getProperty,
    params: {
      propertyId: id!,
    },
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 bg-white'
      >
        <View className='relative w-full' style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className='size-full'
            resizeMode='cover'
          />
          <Image
            source={images.whiteGradient}
            className='absolute top-0 z-40 w-full'
          />

          <View
            className='absolute inset-x-7 z-50'
            style={{
              top: Platform.OS === 'ios' ? 70 : 20,
            }}
          >
            <View className='flex w-full flex-row items-center justify-between'>
              <TouchableOpacity
                onPress={() => router.back()}
                className='flex size-11 flex-row items-center justify-center rounded-full bg-primary-200'
              >
                <Image source={icons.backArrow} className='size-5' />
              </TouchableOpacity>

              <View className='flex flex-row items-center gap-3'>
                <Image
                  source={icons.heart}
                  className='size-7'
                  tintColor={'#191D31'}
                />
                <Image source={icons.send} className='size-7' />
              </View>
            </View>
          </View>
        </View>

        <View className='mt-7 flex gap-2 px-5'>
          <Text className='font-rubik-extrabold text-2xl'>
            {property?.name}
          </Text>

          <View className='flex flex-row items-center gap-3'>
            <View className='flex flex-row items-center rounded-full bg-primary-100 px-4 py-2'>
              <Text className='font-rubik-bold text-xs text-primary-300'>
                {property?.type}
              </Text>
            </View>

            <View className='flex flex-row items-center gap-2'>
              <Image source={icons.star} className='size-5' />
              <Text className='mt-1 font-rubik-medium text-sm text-black-200'>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View className='mt-5 flex flex-row items-center'>
            <View className='flex size-10 flex-row items-center justify-center rounded-full bg-primary-100'>
              <Image source={icons.bed} className='size-4' />
            </View>
            <Text className='ml-2 font-rubik-medium text-sm text-black-300'>
              {property?.bedrooms} Beds
            </Text>
            <View className='ml-7 flex size-10 flex-row items-center justify-center rounded-full bg-primary-100'>
              <Image source={icons.bath} className='size-4' />
            </View>
            <Text className='ml-2 font-rubik-medium text-sm text-black-300'>
              {property?.bathrooms} Baths
            </Text>
            <View className='ml-7 flex size-10 flex-row items-center justify-center rounded-full bg-primary-100'>
              <Image source={icons.area} className='size-4' />
            </View>
            <Text className='ml-2 font-rubik-medium text-sm text-black-300'>
              {property?.area} sqft
            </Text>
          </View>

          <View className='mt-5 w-full border-t border-primary-200 pt-7'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Agent
            </Text>

            <View className='mt-4 flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className='size-14 rounded-full'
                />

                <View className='ml-3 flex flex-col items-start justify-center'>
                  <Text className='text-start font-rubik-bold text-lg text-black-300'>
                    {property?.agent.name}
                  </Text>
                  <Text className='text-start font-rubik-medium text-sm text-black-200'>
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View className='flex flex-row items-center gap-3'>
                <Image source={icons.chat} className='size-7' />
                <Image source={icons.phone} className='size-7' />
              </View>
            </View>
          </View>

          <View className='mt-7'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Overview
            </Text>
            <Text className='mt-2 font-rubik text-base text-black-200'>
              {property?.description}
            </Text>
          </View>

          <View className='mt-7'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className='mt-2 flex flex-row flex-wrap items-start justify-start gap-5'>
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    facility => facility.title === item,
                  );

                  return (
                    <View
                      key={index}
                      className='flex min-w-16 max-w-20 flex-1 flex-col items-center'
                    >
                      <View className='flex size-14 items-center justify-center rounded-full bg-primary-100'>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className='size-6'
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        className='mt-1.5 text-center font-rubik text-sm text-black-300'
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View className='mt-7'>
              <Text className='font-rubik-bold text-xl text-black-300'>
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={item => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className='size-40 rounded-xl'
                  />
                )}
                contentContainerClassName='flex gap-4 mt-3'
              />
            </View>
          )}

          <View className='mt-7'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Location
            </Text>
            <View className='mt-4 flex flex-row items-center justify-start gap-2'>
              <Image source={icons.location} className='h-7 w-7' />
              <Text className='font-rubik-medium text-sm text-black-200'>
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className='mt-5 h-52 w-full rounded-xl'
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className='mt-7'>
              <View className='flex flex-row items-center justify-between'>
                <View className='flex flex-row items-center'>
                  <Image source={icons.star} className='size-6' />
                  <Text className='ml-2 font-rubik-bold text-xl text-black-300'>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className='font-rubik-bold text-base text-primary-300'>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className='mt-5'>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className='absolute bottom-0 w-full rounded-t-2xl border-l border-r border-t border-primary-200 bg-white p-7'>
        <View className='flex flex-row items-center justify-between gap-10'>
          <View className='flex flex-col items-start'>
            <Text className='font-rubik-medium text-xs text-black-200'>
              Price
            </Text>
            <Text
              numberOfLines={1}
              className='text-start font-rubik-bold text-2xl text-primary-300'
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className='flex flex-1 flex-row items-center justify-center rounded-full bg-primary-300 py-3 shadow-md shadow-zinc-400'>
            <Text className='text-center font-rubik-bold text-lg text-white'>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
