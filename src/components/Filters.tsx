import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { categories } from '@/constants/data';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || 'All',
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');

      router.setParams({ filter: '' });

      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='mb-2 mt-3'
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          className={`mr-4 flex flex-col items-start rounded-full px-4 py-2 ${
            selectedCategory === item.category
              ? 'bg-primary-300'
              : 'border border-primary-200 bg-primary-100'
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === item.category
                ? 'mt-0.5 font-rubik-bold text-white'
                : 'font-rubik text-black-300'
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
