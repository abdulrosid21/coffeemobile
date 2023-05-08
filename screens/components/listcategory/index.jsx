import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';

const categories = [
  {id: 1, name: 'Coffee'},
  {id: 2, name: 'Promo'},
  {id: 3, name: 'Snack'},
  {id: 4, name: 'Non Coffee'},
  {id: 5, name: 'Favorite'},
];

const CategoryList = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <View className="bg-[#EFEEEE] rounded-md">
      <ScrollView
        className="flex-row"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <View
            key={category.id}
            className={`px-4 py-2 ${
              category.id === activeCategory
                ? 'border-b-2 border-[#6A4029]'
                : ''
            }`}>
            <Text
              className={`${
                category.id === activeCategory
                  ? 'text-[#6A4029] font-poppins-semibold'
                  : 'text-gray-500 font-poppins-semibold'
              }`}
              onPress={() => setActiveCategory(category.id)}>
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
