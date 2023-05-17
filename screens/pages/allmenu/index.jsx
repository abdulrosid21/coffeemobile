import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Header from '../../components/headers/header3';

import Icon from 'react-native-vector-icons/Feather';
import axiosApiIntances from '../../utils/axios';
import {useDispatch} from 'react-redux';
import {getDetailMenu} from '../../redux/slice/menu';

import {URL_IMAGE} from '@env';
function DataList(props) {
  const url = URL_IMAGE;
  const dispatch = useDispatch();
  const [menus, setMenus] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const getDataMenus = async () => {
    try {
      const result = await axiosApiIntances.get(
        `menus?keyword=${
          keyword || ''
        }&column=&sort=&limit=&category=&page=${currentPage}`,
      );
      setTotalPage(result.data.totalpage);
      setMenus(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataMenus();
  }, []);

  useEffect(() => {
    getDataMenus();
  }, [keyword, currentPage]);

  const handleDetail = async id => {
    try {
      await dispatch(getDetailMenu(id));
      props.navigation.push('Detail');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header name="All Menu" {...props} />
      <View className="px-10 my-2">
        <View className="flex-row items-center bg-[#EFEEEE] rounded-full p-2">
          <Icon name="search" size={30} color="#000" />
          <TextInput
            placeholder="Search"
            className="ml-3 flex-1 placeholder:text-lg placeholder:mt-2"
            value={keyword}
            onChangeText={value => setKeyword(value)}
          />
        </View>
      </View>

      <ScrollView className="w-screen h-screen bg-[#EFEEEE]">
        <View className="px-10 w-full py-4">
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
            <View className="flex-row h-[100%] flex-wrap justify-between gap-y-3">
              {menus.length > 0 ? (
                menus.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleDetail(item.id)}
                      className="gap-3">
                      <View className="w-[150px] h-[200px]">
                        <View className="h-[150px] mt-auto  bg-white rounded-3xl">
                          <Image
                            className="mx-auto h-32 w-32 rounded-3xl -mt-16"
                            source={{uri: url + item.image}}
                          />
                          <Text className="mx-auto my-3 font-poppins-semibold text-black">
                            {item.menu_name}
                          </Text>
                          <Text className="mx-auto font-poppins-reguler  text-[#6A4029]">
                            {item.price.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text className="text-black font-poppins-bold">
                  Menu belum tersedia
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View className="flex-row justify-center gap-x-3">
        <Button
          title="prev"
          onPress={goToPrevPage}
          disabled={currentPage === 1}
        />
        <Button
          title="next"
          onPress={goToNextPage}
          disabled={totalPage === currentPage}
        />
      </View>
    </>
  );
}

export default DataList;
