import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axiosApiIntances from '../../utils/axios';

const Menu = () => {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };
  const getCategories = async () => {
    try {
      const result = await axiosApiIntances.get('categories');
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View>
      <Text>AAA</Text>
    </View>
  );
};

export default Menu;
