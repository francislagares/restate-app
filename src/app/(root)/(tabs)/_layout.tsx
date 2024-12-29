import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

import icons from '@/constants/icons';

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className='mt-3 flex flex-1 flex-col items-center'>
    <Image
      source={icon}
      tintColor={focused ? '#0061FF' : '#666876'}
      resizeMode='contain'
      className='size-6'
    />
    <Text
      className={`${
        focused
          ? 'font-rubik-medium text-primary-300'
          : 'font-rubik text-black-200'
      } mt-1 w-full text-center text-xs`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title='Home' />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title='Explore' />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title='Profile' />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
