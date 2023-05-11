import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';

const CategoryList = ({categories, active, setActive}) => {
  return (
    <View className="bg-[#EFEEEE] rounded-md">
      <ScrollView
        className="flex-row"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categories.map(item => {
          return (
            <View
              key={item.id}
              className={
                active === item.category_name
                  ? 'px-4 py-2 border-b-2 border-b-[#6A4029]'
                  : 'px-4 py-2 '
              }>
              <Text
                className={
                  active === item.category_name
                    ? 'text-[#6A4029] font-poppins-semibold'
                    : 'text-black font-poppins-semibold'
                }
                onPress={() => setActive(item.category_name)}>
                {item.category_name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
