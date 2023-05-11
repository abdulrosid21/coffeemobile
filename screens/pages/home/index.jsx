import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/headers';

import CategoryList from '../../components/listcategory';
import Footer from '../../components/footer';
import Icon from 'react-native-vector-icons/Feather';
import axiosApiIntances from '../../utils/axios';
import {useDispatch} from 'react-redux';
import {getDetailMenu} from '../../redux/slice/menu';

function Home(props) {
  const url = 'https://res.cloudinary.com/dqgebz3rr/image/upload/v1679725330/';
  const dispatch = useDispatch();
  const [active, setActive] = useState('Foods');
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const getCategories = async () => {
    try {
      const result = await axiosApiIntances.get('/categories');
      setCategories(result.data.data);
    } catch (error) {
      console.loh(error);
    }
  };
  const getDataMenus = async () => {
    try {
      const result = await axiosApiIntances.get(
        `menus?keyword=${
          keyword || ''
        }&column=&sort=&limit=&category=${active}&page=${page}`,
      );

      setMenus(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataMenus();
    getCategories();
  }, []);

  useEffect(() => {
    getDataMenus();
  }, [active, page, keyword]);
  const handleDetail = async id => {
    try {
      await dispatch(getDetailMenu(id));
      props.navigation.navigate('Detail');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="w-screen h-full bg-[#EFEEEE]">
      <Header {...props} />
      <Text className="px-10 font-poppins-reguler font-bold text-black text-5xl">
        A good coffee is a good day
      </Text>
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
      <View className="flex flex-row w-full my-4 px-10 mt-5 h-12">
        <CategoryList
          categories={categories}
          active={active}
          setActive={setActive}
        />
      </View>
      <Text className="px-10 my-4 ml-auto font-poppins-reguler text-[#6A4029]">
        See More
      </Text>
      <View className="pl-10 w-full h-auto pt-11 ">
        <ScrollView
          className="flex-row gap-3"
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {menus.length > 0 ? (
            menus.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleDetail(item.id)}>
                  <View className="w-[220px] h-[270px]">
                    <View className="h-[220px] mt-auto  bg-white rounded-3xl">
                      <Image
                        className="mx-auto h-44 w-44 rounded-3xl -mt-16"
                        source={{uri: url + item.image}}
                      />
                      <Text className="mx-auto my-3 font-poppins-semibold text-xl text-black">
                        {item.menu_name}
                      </Text>
                      <Text className="mx-auto font-poppins-reguler text-xl text-[#6A4029]">
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
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
}

export default Home;
